import { callGroq } from "./groq";
import { callGemini } from "./gemini";
import { callOpenRouter } from "./openrouter";

export async function callModel(
  provider: string,
  prompt: string
) {

  try {

    switch (provider) {

      case "gemini":
        return await callGemini(prompt);

      case "groq":
        return await callGroq(prompt);

      case "openrouter":
        return await callOpenRouter(prompt);

      default:
        throw new Error("Unknown Provider");
    }

  } catch (error) {

    console.log(
      "Primary provider failed. Falling back..."
    );

    try {

      return await callGroq(prompt);

    } catch {

      return await callOpenRouter(prompt);

    }
  }
}