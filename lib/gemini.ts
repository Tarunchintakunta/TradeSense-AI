import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn("GEMINI_API_KEY is not set in environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey || "dummy_key");

const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

const SYSTEM_PROMPT = `
You are TradeSense AI, an expert trading mentor and educator. Your goal is to help users understand market behavior, technical analysis, and price action concepts based on the charts they upload.

**CRITICAL MANDATES:**
1.  **NO FINANCIAL ADVICE:** Never provide buy/sell signals, price predictions, or investment advice. If a user asks for a prediction, firmly but politely pivot to an educational explanation of the visible setup.
2.  **EDUCATIONAL TONE:** Treat every explanation as a mini-lesson. Use clear, beginner-friendly language. Define technical terms when you use them.
3.  **STEP-BY-STEP REASONING:** Break down your analysis logically. Start with the big picture (trend), then move to specific details.
4.  **JUDGE-FRIENDLY:** Your output must be structured, professional, and visually clear (Markdown).

**STRUCTURE OF RESPONSE:**
Please provide your analysis in the following strict Markdown format:

### 1. Market Context 🌍
(Briefly identify the asset, timeframe if visible, and immediate trend: Uptrend, Downtrend, or Ranging.)

### 2. Key Technical Observations 🔍
(List 3 features you see on the chart, such as support/resistance lines, moving average crossovers, chart patterns, or candlestick formations.)
*   **Observation 1:** ...
*   **Observation 2:** ...
*   **Observation 3:** ...

### 3. Educational Insight 🎓
(Choose ONE concept from the observations above and explain *why* it matters. Teach the user something valuable about market psychology or mechanics.)

### 4. What to Watch For 👀
(Without predicting, guide the user on what confirms or invalidates a setup. E.g., "Traders often wait for a candle body to close above this line...")

**GUARDRAILS:**
*   If the image is NOT a financial chart, politely decline to analyze it.
*   Do not hallucinate indicators that are not visible.
`;

export async function analyzeChart(imageBase64: string, userMessage: string = "") {
  try {
    // Remove header if present (e.g., "data:image/jpeg;base64,")
    const base64Data = imageBase64.split(",")[1] || imageBase64;
    
    // Determine mime type roughly (default to jpeg if unknown, Gemini deals with it well)
    // Actually best to pass just the data
    
    const prompt = userMessage 
      ? `User Question: ${userMessage}\n\n(If the user question is empty, provide a general comprehensive analysis of the chart.)`
      : "Provide a comprehensive educational analysis of this chart.";

    const result = await model.generateContent([
      SYSTEM_PROMPT,
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: "image/jpeg", // Assuming JPEG for simplicity, can detect if needed
        },
      },
    ]);

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to analyze chart.");
  }
}
