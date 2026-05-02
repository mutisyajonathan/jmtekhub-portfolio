export const classificationPrompt = (messages: any[], memory: any) => ({
  role: "user",
  content: `
You are an AI routing engine for JM Tekhub.

Classify the user's intent and conversation stage.

Return ONLY valid JSON:

{
  "intent": "restaurant_pos | web_development | ai_chatbot | general",
  "stage": "DISCOVERY | QUALIFICATION | PROPOSAL | LEAD_CAPTURE",
  "confidence": 0.0-1.0,
  "leadReady": true/false
}

Rules:
- restaurant-related business → restaurant_pos
- website/app requests → web_development
- chatbot/automation → ai_chatbot
- pricing/demo/quote strongly increases leadReady
- be conservative with leadReady unless strong intent

Memory:
${JSON.stringify(memory)}

Messages:
${JSON.stringify(messages.slice(-10))}
`
});