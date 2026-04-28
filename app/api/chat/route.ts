import { generateGeminiResponse } from "../../../lib/gemini";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let { messages } = body;

    // ---------------- VALIDATION ----------------
    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Invalid messages format" }),
        { status: 400 }
      );
    }

    // ---------------- LIMIT CONTEXT ----------------
    if (messages.length > 20) {
      messages = messages.slice(-20);
    }

    // ---------------- SYSTEM PROMPT ----------------
    const systemMessage = {
      role: "user",
      content: `
You are JM Tekhub Assistant, a professional support and sales assistant.

PRIMARY GOAL:
Help users understand JM Tekhub services and guide them toward inquiries naturally.

BUSINESS:
JM Tekhub — Software development & IT solutions

CONTACT:
Phone: +254 720 294 569
Email: mutisyajonathan.ke@gmail.com

SERVICES:
- Restaurant & Supermarket POS Systems
- Custom Web Development
- Mobile & Desktop Apps
- API Integration
- AI Chatbots
- Database Design
- IT Consulting

RESPONSE RULES:
- Be concise, practical, and human-like
- Ask follow-up questions when needed
- Do NOT rush into sales
- Avoid generic marketing language

PRICING RULE:
- Always say pricing depends on requirements

CTA RULES:
- You MAY include [CTA_DEMO] only when user shows clear intent to request demo, pricing, or implementation discussion
- You MAY include [CTA_CONTACT] only when user is ready to contact, request quote, or proceed
- NEVER include CTA during early exploration or question-based learning
- NEVER force CTA

TONE:
Professional, helpful, natural, conversational
`
    };

    const finalMessages = [systemMessage, ...messages];

    // ---------------- GEMINI CALL ----------------
    let reply = await generateGeminiResponse(finalMessages);

    if (!reply) {
      reply = "Sorry, I couldn't generate a response. Please try again.";
    }

    // ---------------- LAST USER MESSAGE ----------------
    const lastUserMessage =
      messages[messages.length - 1]?.content?.toLowerCase() || "";

    // ---------------- INTENT DETECTION (SAFE VERSION) ----------------

    // High intent (only true conversion signals)
    const wantsDemo =
      lastUserMessage.includes("price") ||
      lastUserMessage.includes("cost") ||
      lastUserMessage.includes("quote") ||
      lastUserMessage.includes("demo") ||
      lastUserMessage.includes("contact");

    // Exploration stage (NO CTA allowed)
    const isExploring =
      lastUserMessage.includes("how") ||
      lastUserMessage.includes("what") ||
      lastUserMessage.includes("can you") ||
      lastUserMessage.includes("do you") ||
      lastUserMessage.includes("tell me more");

    const allowDemoCTA = wantsDemo && !isExploring;

    const wantsContact =
      lastUserMessage.includes("contact") ||
      lastUserMessage.includes("email") ||
      lastUserMessage.includes("call");

    const allowContactCTA = wantsContact && !isExploring;

    // ---------------- DETECT MODEL CTA ----------------
    let hasDemoCTA = reply.includes("[CTA_DEMO]");
    let hasContactCTA = reply.includes("[CTA_CONTACT]");

    // ---------------- SAFE CTA ENFORCEMENT ----------------
    if (allowDemoCTA && !hasDemoCTA) {
      reply += "\n[CTA_DEMO]";
      hasDemoCTA = true;
    }

    if (allowContactCTA && !hasContactCTA) {
      reply += "\n[CTA_CONTACT]";
      hasContactCTA = true;
    }

    // ---------------- CLEAN RESPONSE ----------------
    const cleanMessage = reply
      .replace("[CTA_DEMO]", "")
      .replace("[CTA_CONTACT]", "")
      .trim();

    // ---------------- RESPONSE ----------------
    return Response.json({
      message: cleanMessage,
      cta: {
        demo: hasDemoCTA,
        contact: hasContactCTA,
      },
      lead: hasDemoCTA || hasContactCTA,
    });

  } catch (err: any) {
    console.error("Gemini error:", err);

    return new Response(
      JSON.stringify({
        error: err.message || "Failed to generate response",
      }),
      { status: 500 }
    );
  }
}