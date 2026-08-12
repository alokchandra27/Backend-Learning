import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function generateText(historyArray) {
  const response = await ai.interactions.create({
    model: "gemini-2.5-flash", 
    store: false, 
    input: historyArray,
    system_instruction: "You are a helpful assistant that provides concise and informative responses.keep your answers short and to the point. Avoid unnecessary details or lengthy explanations.and think step by step before answering.",
  });
  return response.output_text;
}

export { generateText };
