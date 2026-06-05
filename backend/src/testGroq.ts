import { callGroq } from "./gateway/groq";

async function run() {

  const result =
    await callGroq(
      "Explain ML in one sentence."
    );

  console.log(result);
}

run();