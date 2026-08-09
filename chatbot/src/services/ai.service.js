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
  });
  return response.output_text;
}

export { generateText };

// async function main() {
//   const interaction = await ai.interactions.create({
//     model: "gemini-3.6-flash",
//     input: "How does AI work?",
//   });
//   console.log(interaction.output_text);
// }

// await main();