import dotenv from "dotenv";
dotenv.config();

export async function callOpenRouter(
  prompt: string
) {

  const response =
    await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          Authorization:
            `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          model:
            "deepseek/deepseek-chat",

          messages: [
            {
              role: "user",
              content: prompt
            }
          ]
        })
      }
    );

  const data =
    await response.json();

  return data.choices[0]
    .message.content;
}