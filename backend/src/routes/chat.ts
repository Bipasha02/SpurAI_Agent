import { Router } from 'express';
import db from '../db/client';
import { validateMessage } from '../utils/validate';
import { generateReply } from '../services/ai.service';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

router.post('/chat/message', async (req, res) => {
  const { message: rawMessage, sessionId } = req.body;

  // Validation
  const validation = validateMessage(rawMessage);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.message });
  }

  const userMessage = rawMessage.length > 500 ? rawMessage.substring(0, 500) : rawMessage;

  // Ensure session
  const conversationId = sessionId || uuidv4();
  if (!sessionId) {
    db.prepare('INSERT INTO conversations (id) VALUES (?)').run(conversationId);
  }

  // Save user message
  db.prepare('INSERT INTO messages (conversation_id, sender, text) VALUES (?, ?, ?)')
    .run(conversationId, 'user', userMessage);

  try {
    const aiReply = await generateReply(conversationId, userMessage, db);

    // Save AI message
    db.prepare('INSERT INTO messages (conversation_id, sender, text) VALUES (?, ?, ?)')
      .run(conversationId, 'ai', aiReply);

    return res.json({ reply: aiReply, sessionId: conversationId });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to generate response.' });
  }
});

export default router;