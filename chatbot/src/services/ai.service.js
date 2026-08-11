import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function generateText(prompt) {
  const response = await ai.interactions.create({
    model: "gemini-2.5-flash",
    input: prompt,
    conversation: {
      history: chatHistory,
    },
  });
  return response.output_text;
}

export { generateText };
