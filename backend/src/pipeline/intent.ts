import { callGroq } from "../gateway/groq";

export async function extractIntent(
  userPrompt: string
) {

  const prompt = `

You are an AI application analyst.

Convert the user request into JSON.

Return ONLY valid JSON.

{
  "appName":"",
  "appType":"",
  "features":[],
  "entities":[],
  "integrations_requested":[],
  "assumptions":[]
}

User Request:

${userPrompt}

`;

  return callGroq(prompt);
}