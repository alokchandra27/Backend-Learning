import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// async function run() {
//   try {
//     const interaction = await ai.interactions.create({
//       model: "gemini-3.5-flash",
//       input: "Explain how AI works in a few words",
//     });
//     console.log(interaction.output_text);
//   } catch (error) {
//     console.log("Error in AI Service: " + error);
//   }
// }
// run();

async function generateImageCaption(base64ImageFile) {
  try {
    const interaction = await ai.interactions.create({
      model: "gemini-2.5-flash",
      input: [
        { type: "text", text: "Caption this image." },
        {
          type: "image",
          data: base64ImageFile,
          mime_type: "image/jpeg",
        },
      ],
      system_instruction:
        "Funny & Meme-style, witty caption with emojis. Max 10 words. Use 3 Hastags related to the image",
    });
    return interaction.output_text;
  } catch (error) {
    console.log("Error in AI Service: " + error);
  }
}

export { generateImageCaption };
