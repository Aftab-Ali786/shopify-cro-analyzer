import { Request, Response } from "express";
import { crawlShopifyStore } from "../crawler/shopifyCrawler";
import { buildEvidence } from "../evidence/buildEvidence";
import { analyzeEvidence as analyzeRule } from "../analyzer/croAnalyzer";
import { analyzeEvidence as analyzeAI } from "../services/openaiService";

export const compareStores = async (
  req: Request,
  res: Response
) => {
  try {
    const { url1, url2 } = req.body;

    if (!url1 || !url2) {
      return res.status(400).json({
        success: false,
        message: "Both URLs are required",
      });
    }

    // Crawl both stores in parallel
    const [storeA, storeB] = await Promise.all([
      crawlShopifyStore(url1, {} as any),
      crawlShopifyStore(url2, {} as any),
    ]);

    // Build structured evidence
    const evidenceA = buildEvidence(storeA);
    const evidenceB = buildEvidence(storeB);

    // Rule-based analysis
    const ruleA = analyzeRule(storeA);
    const ruleB = analyzeRule(storeB);

    // Gemini comparison prompt
    const comparisonPrompt = `
You are a Senior Shopify CRO Consultant.

Compare these two Shopify stores.

Return ONLY valid JSON.

{
  "winner":"",
  "summary":"",
  "advantagesStoreA":[],
  "advantagesStoreB":[],
  "recommendations":[]
}

Store A:

${JSON.stringify(evidenceA, null, 2)}

Store B:

${JSON.stringify(evidenceB, null, 2)}
`;

    const aiResponse = await analyzeAI(comparisonPrompt);

    let comparison = {};

    try {
      comparison = JSON.parse(aiResponse);
    } catch {
      comparison = {
        raw: aiResponse,
      };
    }

    return res.json({
      success: true,

      storeA: {
        evidence: evidenceA,
        rule: ruleA,
      },

      storeB: {
        evidence: evidenceB,
        rule: ruleB,
      },

      comparison,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Comparison failed",
    });
  }
};