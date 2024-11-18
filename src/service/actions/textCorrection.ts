export const correctText = async (text: string): Promise<string> => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: "Correct the following text." },
        { role: "user", content: text },
      ],
    }),
  });
  const data = await response.json();
  return data.choices[0].message.content.trim();
};
