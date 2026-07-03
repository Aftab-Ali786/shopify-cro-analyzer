import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function analyzeEvidence(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",

      contents: prompt,

      config: {
        responseMimeType: "application/json",

        responseSchema: {
          type: Type.OBJECT,

          properties: {
            overallScore: {
              type: Type.INTEGER,
            },

            summary: {
              type: Type.STRING,
            },

            strengths: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },

            weaknesses: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },

            opportunities: {
              type: Type.ARRAY,

              items: {
                type: Type.OBJECT,

                properties: {
                  title: {
                    type: Type.STRING,
                  },

                  impact: {
                    type: Type.STRING,
                  },

                  confidence: {
                    type: Type.NUMBER,
                  },

                  effort: {
                    type: Type.STRING,
                  },

                  reason: {
                    type: Type.STRING,
                  },

                  recommendation: {
                    type: Type.STRING,
                  },
                },

                required: [
                  "title",
                  "impact",
                  "confidence",
                  "effort",
                  "reason",
                  "recommendation",
                ],
              },
            },
          },

          required: [
            "overallScore",
            "summary",
            "strengths",
            "weaknesses",
            "opportunities",
          ],
        },
      },
    });

    return response.text || "{}";
  } catch (error: any) {
    console.error("========= GEMINI ERROR =========");
    console.error(error);

    if (error.message) {
      console.error(error.message);
    }

    if (error.response) {
      console.error(error.response);
    }

    throw error;
  }
}