import { generateGeminiResponse } from "../../../lib/gemini";
import { classificationPrompt } from "../../../lib/classifier";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let { messages, memory = {}, lead = {} } = body;

    if (!Array.isArray(messages)) {
      return Response.json({ error: "Invalid messages format" }, { status: 400 });
    }

    const lastUser =
      messages[messages.length - 1]?.content?.toLowerCase?.() || "";

    // -------------------------------
    // 1. AI CLASSIFICATION STEP
    // -------------------------------
    const classificationRaw = await generateGeminiResponse([
      classificationPrompt(messages, memory),
    ]);

    let state;
    try {
      state = JSON.parse(classificationRaw);
    } catch {
      state = {
        intent: "general",
        stage: "DISCOVERY",
        confidence: 0.5,
        leadReady: false,
      };
    }

    // -------------------------------
    // 2. UPDATE MEMORY (STATEFUL)
    // -------------------------------
    const updatedMemory = {
      ...memory,
      intent: state.intent,
      stage: state.stage,
      confidence: state.confidence,
    };

    // -------------------------------
    // 3. BUSINESS LOGIC ENGINE
    // -------------------------------
    const shouldRequestLead =
      state.leadReady ||
      state.stage === "LEAD_CAPTURE" ||
      /demo|quote|price|cost|install/i.test(lastUser);

    const productMap: Record<string, string> = {
      restaurant_pos: "Restaurant POS",
      web_development: "Web Development",
      ai_chatbot: "AI Chatbots",
      general: "General Services",
    };

    const product = productMap[state.intent] || "General Services";

    // -------------------------------
    // 4. SYSTEM PROMPT (CONTEXTUAL)
    // -------------------------------
    const systemMessage = {
      role: "user",
      content: `
You are JM Tekhub AI Sales Assistant.

Product focus: ${product}

Stage: ${state.stage}
Intent: ${state.intent}

Guidelines:
- Be concise and professional
- If DISCOVERY → explain value briefly
- If QUALIFICATION → ask smart business questions
- If PROPOSAL → explain solution fit
- If LEAD_CAPTURE → request contact details politely
- Never overwhelm user with pricing early

Context:
${JSON.stringify(updatedMemory)}
`,
    };

    // -------------------------------
    // 5. RESPONSE GENERATION
    // -------------------------------
    const reply = await generateGeminiResponse([
      systemMessage,
      ...messages,
    ]);

    // -------------------------------
    // 6. RESPONSE CONTRACT
    // -------------------------------
    return Response.json({
      message: reply || "How can I help you today?",
      state: updatedMemory,
      suggested_product: product,
      lead_capture: shouldRequestLead,
      next_action: shouldRequestLead
        ? "COLLECT_LEAD"
        : "CONTINUE_CONVERSATION",
    });
  } catch (error: any) {
    return Response.json(
      { error: error.message || "Failed to generate response" },
      { status: 500 }
    );
  }
}