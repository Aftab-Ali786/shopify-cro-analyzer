import { Request, Response } from "express";

import { crawlShopifyStore } from "../crawler/shopifyCrawler";
import { buildEvidence } from "../evidence/buildEvidence";

import { generateCROPrompt } from "../prompts/croPrompt";

import { analyzeEvidence as analyzeRuleBased } from "../analyzer/croAnalyzer";
import { analyzeEvidence as analyzeAI } from "../services/openaiService";

import { analyzeScreenshot } from "../analyzer/screenshotAnalyzer";
import { analyzeCategories } from "../analyzer/categoryAnalyzer";

export const analyzeStore = async (
  req: Request,
  res: Response
) => {
  const startedAt = Date.now();

  try {

    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "Store URL is required",
      });
    }

    /* ---------------- Screenshot filename ---------------- */

    const screenshotFilename = `screenshot-${Date.now()}.png`;

    /* ---------------- Crawl Store ---------------- */

    const evidence = await crawlShopifyStore(
      url,
      screenshotFilename
    );

    const structuredEvidence =
      buildEvidence(evidence);

    /* ---------------- Rule Analysis ---------------- */

    const ruleReport =
      analyzeRuleBased(evidence);

    /* ---------------- Screenshot Analysis ---------------- */

    const screenshotIssues =
      analyzeScreenshot(evidence);

    /* ---------------- Category Scores ---------------- */

    const categoryScores =
      analyzeCategories(evidence);

    /* ---------------- AI Analysis ---------------- */

    let aiReportParsed = {
      overallScore: ruleReport.overallScore,
      summary: "",
      strengths: [],
      weaknesses: [],
      opportunities: [],
    };

    try {

      const prompt =
        generateCROPrompt(structuredEvidence);

      const aiResponse =
        await analyzeAI(prompt);

      aiReportParsed =
        JSON.parse(aiResponse);

    } catch (err) {

      console.log("Gemini unavailable.");
      console.log("Using Rule Based Report.");

    }

    /* ---------------- Screenshot URL ---------------- */

    const protocol = req.protocol;
    const host = req.get("host");

    const screenshotUrl =
      `${protocol}://${host}/screenshots/${screenshotFilename}`;

    /* ---------------- Statistics ---------------- */

    const finishedAt = Date.now();

    const crawlTime =
      ((finishedAt - startedAt) / 1000).toFixed(2);

    /* ---------------- Response ---------------- */

    return res.status(200).json({

      success: true,

      metadata: {

        analyzedAt: new Date(),

        crawlTime,

        apiVersion: "1.0.0",

        generator: "Shopify CRO Engine",

      },

      evidence: {

        ...structuredEvidence,

        screenshot: screenshotUrl,

      },

      screenshotIssues,

      categoryScores,

      ruleReport,

      aiReport: aiReportParsed,

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message: "Failed to analyze store",

      error:
        error instanceof Error
          ? error.message
          : "Unknown Error",

    });

  }
};