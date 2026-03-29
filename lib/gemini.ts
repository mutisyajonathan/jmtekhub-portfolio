export async function generateGeminiResponse(messages: any[]) {
  const API_KEY = process.env.GEMINI_API_KEY;

 const response = await fetch(
  `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
    }),
  }
);

  const data = await response.json();

  if (!response.ok) {
    throw new Error("We are currently offline... reach out through our contact page"/*JSON.stringify(data)*/);
  }

  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}