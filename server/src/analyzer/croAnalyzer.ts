import { HomepageEvidence } from "../types/shopify";
import { CROReport, Opportunity } from "../types/cro";

export function analyzeEvidence(
    evidence: HomepageEvidence
): CROReport {
    const opportunities: Opportunity[] = [];
    let score = 100;

    if (evidence.ctas.length === 0) {
        score -= 15;
        opportunities.push({
            title: "Missing CTA",
            impact: "High",       
            confidence: 0.99,
            effort: "Easy",
            reason: "Homepage does not contain CTA buttons.",
            recommendation: "Add a prominent Shop Now button."
        } as const); 
    }

    if (evidence.products.length < 4) {
        score -= 10;
        opportunities.push({
            title: "Low Product Visibility",
            impact: "Medium",
            confidence: 0.90,
            effort: "Medium",
            reason: "Only a few products are visible.",
            recommendation: "Display more featured products."
        } as const);
    }

    if (evidence.imageCount < 10) {
        score -= 5;
        opportunities.push({
            title: "Too Few Images",
            impact: "Medium",
            confidence: 0.88,
            effort: "Easy",
            reason: "Images build customer trust.",
            recommendation: "Increase lifestyle photography."
        } as const);
    }

    return {
        overallScore: score,
        summary: `${opportunities.length} opportunities detected.`,
        opportunities
    };
}