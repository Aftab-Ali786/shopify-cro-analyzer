export interface Opportunity {

    title: string;

    impact: "High" | "Medium" | "Low";

    confidence: number;

    effort: "Easy" | "Medium" | "Hard";

    reason: string;

    recommendation: string;

}

export interface CROReport {

    overallScore: number;

    summary: string;

    opportunities: Opportunity[];

}