import { OpenAI } from 'openai';

const USE_MOCK_AI = true;

const openai = USE_MOCK_AI
  ? null
  : new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      timeout: 10000,
    });

const STORE_KNOWLEDGE = `
You are a helpful support agent for "SpurStore", a small online clothing store.

Store policies:
- Shipping: Free worldwide shipping. Delivers in 5–10 business days.
- Returns: 30-day return policy. Items must be unworn with tags.
- Support Hours: Mon–Fri, 9 AM – 6 PM IST.
- Contact: support@SpurStore.com

Answer clearly, concisely, and politely. Never mention you're an AI.
Use only the information above unless asked something general.
`.trim();

function getMockReply(userMessage: string): string {
  const msg = userMessage.toLowerCase();

  if (msg.includes('ship') || msg.includes('deliver') || msg.includes('usa') || msg.includes('canada') || msg.includes('international')) {
    return "Yes! We offer free worldwide shipping. Delivery takes 5–10 business days.";
  }

  if (msg.includes('return') || msg.includes('refund') || msg.includes('exchange')) {
    return "We have a 30-day return policy at SpurStore. Just make sure items are unworn with original tags attached.";
  }

  if (msg.includes('support') || msg.includes('contact') || msg.includes('email') || msg.includes('hours') || msg.includes('time')) {
    return "Our support team is available Mon–Fri, 9 AM – 6 PM IST. You can reach us at support@SpurStore.com.";
  }

  if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey')) {
    return "Hello! 👋 I'm the support agent for SpurStore. How can I help you today?";
  }

  return "Thanks for your message! I'm here to help with questions about shipping, returns, or support hours. Just ask!";
}

export async function generateReply(
  conversationId: string,
  userMessage: string,
  db: any
): Promise<string> {
  if (USE_MOCK_AI) {
    return getMockReply(userMessage);
  }

  try {
    const msgs = db
      .prepare(`SELECT sender, text FROM messages WHERE conversation_id = ? ORDER BY created_at DESC LIMIT 6`)
      .all(conversationId)
      .reverse();

    const history = msgs.map((m: any) => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text,
    }));

    const messages = [
      { role: 'system', content: STORE_KNOWLEDGE },
      ...history,
      { role: 'user', content: userMessage },
    ];

    const response = await openai!.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      max_tokens: 250,
    });

    return response.choices[0].message.content?.trim() || 'Hmm, I’m not sure. Can you rephrase?';
  } catch (error: any) {
    console.error('LLM Error:', error.message);
    if (error.status === 401) {
      return 'Support system misconfigured. Please notify admin.';
    }
    return 'Sorry, our agent is having trouble right now. Please try again.';
  }
}