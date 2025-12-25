# Spur – AI Live Chat Agent 

An end-to-end AI customer support agent with persistent chat, FAQ suggestions, and LLM integration.

---

## Tech Stack

- **Frontend**: SvelteKit + Vite + Tailwind CSS
- **Backend**: Node.js + TypeScript + Express
- **Database**: SQLite (`better-sqlite3`)
- **AI**: OpenAI integration (mocked for reliable demo)
- **Deployment**: Vercel (frontend), Render (backend-ready)

---

## Features

- Real-time chat interface with message history
- Clickable FAQ suggestions ("What’s your return policy?")
- Session persistence via SQLite
- Clean, mobile-responsive UI
- Full error handling (network, LLM, input validation)

---

## AI Integration

> **Mock Mode Enabled**  
> To avoid external dependencies during evaluation, AI responses are **simulated** using rule-based logic.

The real OpenAI integration is fully implemented and can be enabled by:
1. Setting `USE_MOCK_AI = false` in `backend/src/services/ai.service.ts`
2. Adding a valid `OPENAI_API_KEY` in `backend/.env`

All LLM calls are structured with:
- System prompt (store policies)
- Conversation history (last 6 messages)
- Timeout & error handling

---

## Local Setup

### Prerequisites
- Node.js v18+
- npm

### 1. Clone & Install
```bash
# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Set up DB
cd ../backend && npm run db:setup

# Run
cd backend && npm run dev          # http://localhost:3001
cd frontend && npm run dev         # http://localhost:5173