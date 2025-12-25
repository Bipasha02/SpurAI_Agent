# Spur – AI Live Chat Agent (Take-Home Assignment)

A mini customer support chat widget powered by an AI agent, built as a founding full-stack engineer candidate for Spur.

> ✅ **Live Demo**: [https://spur-ai-agent.vercel.app](https://spur-ai-agent.vercel.app)  
> 📦 **GitHub**: [your-github-username/spur-ai-agent](https://github.com/your-github-username/spur-ai-agent)

---

## 🛠 Tech Stack

- **Frontend**: SvelteKit + Tailwind CSS
- **Backend**: Node.js + TypeScript + Express
- **Database**: SQLite (via `better-sqlite3`)
- **LLM**: OpenAI (`gpt-4o-mini`) — **mocked for demo**
- **Deployment**: Vercel (frontend), Render (backend)

---

## 🚀 Local Setup

### Prerequisites
- Node.js v18+
- npm

### 1. Clone & Install
```bash
git clone https://github.com/your-github-username/spur-ai-agent.git
cd spur-ai-agent

# Install frontend
cd frontend && npm install && cd ..

# Install backend
cd backend && npm install && cd ..