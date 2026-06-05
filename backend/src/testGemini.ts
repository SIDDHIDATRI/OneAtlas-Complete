import { callGemini } from "./gateway/gemini";

async function run() {
  const result = await callGemini(
    "Reply with only: Gemini working"
  );

  console.log(result);
}

run();