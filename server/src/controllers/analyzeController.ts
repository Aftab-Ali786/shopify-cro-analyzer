import { Request, Response } from "express";
import { crawlShopifyStore } from "../crawler/shopifyCrawler";
import { buildEvidence } from "../evidence/buildEvidence";
import { generateCROPrompt } from "../prompts/croPrompt";
import { analyzeEvidence as analyzeRuleBased } from "../analyzer/croAnalyzer";
import { analyzeEvidence as analyzeAI } from "../services/openaiService";
import { analyzeScreenshot } from "../analyzer/screenshotAnalyzer";
import { analyzeCategories } from "../analyzer/categoryAnalyzer";

export const analyzeStore = async (req: Request, res: Response) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "Store URL is required",
      });
    }
    
    // 💡 Generate a single unique filename for this tracking loop session
    const screenshotFilename = `screenshot-${Date.now()}.png`;

    // 1. Crawl and shape structural metrics (Passing the filename down)
    const evidence = await crawlShopifyStore(url, screenshotFilename);
    const structuredEvidence = buildEvidence(evidence);

    // 2. Generate local rule-based scores/opportunities
    const ruleReport = analyzeRuleBased(evidence);  
     
    const screenshotIssues =
    analyzeScreenshot(evidence);

    const categoryScores =
analyzeCategories(evidence);

    // 3. Compile the structural prompt and ask Gemini AI
    const prompt = generateCROPrompt(structuredEvidence);
    const aiResponse = await analyzeAI(prompt);

    // 4. Safely parse the strict schema JSON object
    let aiReportParsed = { overallScore: 100, summary: "", strengths: [], weaknesses: [], opportunities: [] };
    try {
      aiReportParsed = JSON.parse(aiResponse);
    } catch (parseError) {
      console.error("Critical fallback triggered for AI parse:", parseError);
    }

    // 5. Build up the clean static URL string pointing to your Express backend static port
    // 5. Build Screenshot URL
const protocol = req.protocol;
const host = req.get("host");

const screenshotUrl = `${protocol}://${host}/screenshots/${screenshotFilename}`;

// 6. Send response
return res.status(200).json({
  success: true,

  evidence: {
    ...structuredEvidence,
    screenshot: screenshotUrl,
    
  },
  screenshotIssues,
  ruleReport,
  aiReport: aiReportParsed,
  categoryScores,
});

  } catch (error) {
    console.error("Crawler Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to crawl website",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};