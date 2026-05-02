import { generateGeminiResponse } from '../../../lib/gemini';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let { messages, memory = {}, lead = {} } = body;

    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid messages format' }), { status: 400 });
    }

    messages = messages.slice(-20);
    const lastUser = messages[messages.length - 1]?.content?.toLowerCase?.() || '';

    const profile = {
      city: memory.city || '',
      businessType: memory.businessType || '',
      branches: memory.branches || ''
    };

    const systemMessage = {
      role: 'user',
      content: `You are JM Tekhub Assistant, a professional sales consultant for JM Tekhub.
Products: Restaurant POS, Supermarket POS, Web Development, AI Chatbots.
Restaurant POS supports tables, split payments, M-Pesa, PDQ, reports, inventory, petty cash, kitchen workflow.
Use consultative sales style. Be concise.
If user mentions restaurant/cafe/hotel prioritize Restaurant POS.
If user asks price, quote, demo, install, setup -> request lead details politely.
Use memory context when relevant.
Known customer context: City=${profile.city}; Business=${profile.businessType}; Branches=${profile.branches}
Pricing depends on users, branches, devices, modules, customization.`
    };

    const reply = await generateGeminiResponse([systemMessage, ...messages]);

    const wantsLead = /(price|cost|quote|demo|setup|install)/i.test(lastUser);
    const wantsRestaurant = /(restaurant|cafe|coffee|hotel|food|table|kitchen)/i.test(lastUser);
    const wantsWeb = /(website|web app|site)/i.test(lastUser);
    const wantsBot = /(chatbot|ai bot|assistant)/i.test(lastUser);

    let product = 'General Services';
    if (wantsRestaurant) product = 'Restaurant POS';
    else if (wantsWeb) product = 'Web Development';
    else if (wantsBot) product = 'AI Chatbots';

    return Response.json({
      message: reply || 'How can I help you today?',
      lead_capture: wantsLead,
      suggested_product: product,
      next_action: wantsLead ? 'Collect name, business, phone, branches' : 'Continue conversation'
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || 'Failed to generate response' }), { status: 500 });
  }
}
