export function generateCROPrompt(evidence: any) {
  return `
You are a Senior Shopify CRO Consultant with expertise in ecommerce UX, merchandising, and conversion optimization.

Your task is to analyze ONLY the provided evidence.

Do NOT make assumptions or hallucinate missing information.

Evaluate:

1. Homepage
2. Hero Section
3. Navigation
4. Collections
5. Products
6. Trust Signals
7. Pricing
8. CTA Quality
9. Mobile UX (if inferable)
10. Overall Conversion Potential

Return ONLY valid JSON.

{
  "overallScore": 0,
  "summary": "",
  "strengths": [],
  "weaknesses": [],
  "opportunities": [
    {
      "title": "",
      "impact": "High | Medium | Low",
      "confidence": 0,
      "effort": "Easy | Medium | Hard",
      "reason": "",
      "recommendation": ""
    }
  ]
}

Evidence:

${JSON.stringify(evidence, null, 2)}
`;
}