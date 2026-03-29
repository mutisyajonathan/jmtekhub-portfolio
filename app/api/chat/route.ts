import { generateGeminiResponse } from "../../../lib/gemini";


export async function POST(req: Request) {
  try {
    const body = await req.json();
    let { messages } = body;

    // ✅ VALIDATION
    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Invalid messages format" }),
        { status: 400 }
      );
    }

    // ✅ COST / TOKEN CONTROL
    if (messages.length > 20) {
      messages = messages.slice(-20);
    }

    // ✅ SYSTEM PROMPT (STRICT + CONVERSION FOCUSED)
    const systemMessage = {
      role: "user",
      content: `
You are JM Tekhub Assistant, a professional support and sales assistant.

PRIMARY GOAL:
Convert user interest into real inquiries while being helpful.

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
- Be concise, clear, practical
- Always relate to JM Tekhub services
- Avoid generic explanations

PRICING:
- Say pricing depends on requirements
- Suggest contacting for quote

CTA INSTRUCTIONS (STRICT):

You MUST include a CTA token when conditions are met.

Rules:
- If user asks about systems, products, POS, restaurant solutions → ALWAYS include:
  [CTA_DEMO]

- If user asks about pricing, cost, or contact → ALWAYS include:
  [CTA_CONTACT]

- This is NOT optional
- CTA must be on a new line
- Do NOT explain tokens
- Do NOT modify tokens

Examples:

User: "Do you build POS systems?"
Response:
"Yes, we build POS systems.\n[CTA_DEMO]"

User: "How much does it cost?"
Response:
"Pricing depends on your needs.\n[CTA_CONTACT]"

TONE:
Professional, helpful, confident
`
    };

    const finalMessages = [systemMessage, ...messages];

    // ✅ CALL GEMINI
    let reply = await generateGeminiResponse(finalMessages);

    if (!reply) {
      reply = "Sorry, I couldn’t generate a response. Please try again.";
    }

    // 🔍 LAST USER MESSAGE (for fallback logic)
    const lastUserMessage =
      messages[messages.length - 1]?.content?.toLowerCase() || "";

    // 🔍 INTENT DETECTION (BACKEND ENFORCEMENT)
    const wantsDemo =
      lastUserMessage.includes("pos") ||
      lastUserMessage.includes("system") ||
      lastUserMessage.includes("restaurant") ||
      lastUserMessage.includes("solution") ||
      lastUserMessage.includes("build");

    const wantsContact =
      lastUserMessage.includes("price") ||
      lastUserMessage.includes("cost") ||
      lastUserMessage.includes("how much") ||
      lastUserMessage.includes("contact");

    // 🔍 EXISTING CTA DETECTION
    let hasDemoCTA = reply.includes("[CTA_DEMO]");
    let hasContactCTA = reply.includes("[CTA_CONTACT]");

    // ✅ FORCE CTA IF MODEL MISSES IT
    if (wantsDemo && !hasDemoCTA) {
      reply += "\n[CTA_DEMO]";
      hasDemoCTA = true;
    }

    if (wantsContact && !hasContactCTA) {
      reply += "\n[CTA_CONTACT]";
      hasContactCTA = true;
    }

    // ✅ CLEAN MESSAGE (REMOVE TOKENS)
    const cleanMessage = reply
      .replace("[CTA_DEMO]", "")
      .replace("[CTA_CONTACT]", "")
      .trim();

    // ✅ RESPONSE
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