const { GoogleGenerativeAI } = require("@google/generative-ai");
const { OpenAI } = require("openai");

const EVALUATION_SYSTEM_PROMPT = `You are an expert Senior Engineering Manager conducting a mock interview. Your task is to evaluate the candidate's answer. Evaluate based on: 1. Relevance & Correctness. 2. Technical Depth. 3. Communication & Structure. Return your evaluation STRICTLY as a JSON object with this structure: { "overallScore": Number, "metrics": { "technicalDepth": Number, "communication": Number, "confidence": Number }, "strengths": ["..."], "weaknesses": ["..."], "actionableSuggestions": ["..."], "improvedAnswer": "..." } Do not include markdown formatting like \`\`\`json, return raw JSON.`;

/**
 * Evaluate Interview Answer using configured AI Provider
 * Supported Providers: 'openai', 'gemini'
 */
exports.evaluateAnswer = async (question, transcription) => {
  const provider = process.env.AI_PROVIDER || "gemini"; // default to gemini
  const userPrompt = `Question: ${question}\nCandidate's Answer: ${transcription}`;

  try {
    let rawJsonResponse = "";

    if (provider === "openai") {
      if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is missing");
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: EVALUATION_SYSTEM_PROMPT },
          { role: "user", content: userPrompt }
        ],
        response_format: { type: "json_object" }
      });
      rawJsonResponse = completion.choices[0].message.content;

    } else if (provider === "gemini") {
      if (!process.env.GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is missing");
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const result = await model.generateContent({
        contents: [
          { role: "user", parts: [{ text: EVALUATION_SYSTEM_PROMPT + "\n\n" + userPrompt }] }
        ],
        generationConfig: {
          responseMimeType: "application/json",
        }
      });
      rawJsonResponse = result.response.text();

    } else {
      throw new Error(`Unsupported AI_PROVIDER configured: ${provider}`);
    }

    // Parse strictly because we forced the LLM into JSON mode
    return JSON.parse(rawJsonResponse);

  } catch (error) {
    console.error(`❌ Evaluation Error (${provider}):`, error.message);
    
    // Fallback Mock JSON to prevent frontend crash
    return {
      overallScore: 7.0,
      metrics: { technicalDepth: 7, communication: 7, confidence: 7 },
      strengths: ["API Error occurred, returned dummy response", "Provided a basic answer"],
      weaknesses: ["Unable to verify due to AI limits"],
      actionableSuggestions: ["Check the backend API keys and console logs"],
      improvedAnswer: "Ensure API keys and providers are correctly configured in .env."
    };
  }
};
