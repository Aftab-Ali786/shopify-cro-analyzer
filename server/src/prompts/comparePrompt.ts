export function generateComparisonPrompt(
  evidenceA: any,
  evidenceB: any
) {
  return `
You are one of the world's best Shopify CRO experts.

Compare these two ecommerce stores.

Judge:

Homepage

Navigation

Branding

Products

Trust

Collections

Merchandising

Customer Journey

Return ONLY JSON.

{
"winner":"",
"summary":"",
"advantagesStoreA":[],
"advantagesStoreB":[],
"recommendations":[]
}

Store A

${JSON.stringify(evidenceA,null,2)}

Store B

${JSON.stringify(evidenceB,null,2)}
`;
}