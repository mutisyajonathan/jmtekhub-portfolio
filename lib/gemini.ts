export async function generateGeminiResponse(messages: any[]) {
  const API_KEY = process.env.GEMINI_API_KEY;

  if (!API_KEY) {
    throw new Error("Gemini API key missing");
  }

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 8000); // 8 second timeout

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          contents: messages.map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
          })),
        }),
      }
    );

    clearTimeout(timeout);

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error:", data);
      throw new Error("Gemini API unavailable");
    }

    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response right now."
    );
  } catch (error: any) {
    clearTimeout(timeout);

    if (error.name === "AbortError") {
      throw new Error("Gemini request timeout");
    }

    throw new Error(error.message || "Gemini unavailable");
  }
}