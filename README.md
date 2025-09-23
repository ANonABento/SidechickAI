# AI Productivity Dashboard + Discord Bot

## 📖 Overview

This project is a **demo productivity assistant** that combines a clean **Next.js dashboard** and a **Discord bot**. Users can interact with an AI agent either via a web interface or directly inside Discord. The assistant can draft responses, summarize inputs, and serve as the foundation for advanced features such as task scheduling, notifications, and integrations with other platforms.

The goal of this demo is to:

* Showcase a working **AI-powered productivity dashboard**
* Provide a **Discord bot** integration to enable multi-channel interactions
* Build a foundation that can later be extended to Slack, Gmail, or SMS

---

## 🚀 Tech Stack

### Core

* **Language**: TypeScript (Node.js 20+)
* **Framework**: Next.js 15 (App Router)
* **UI**: React, TailwindCSS, shadcn/ui (for polished UI components)
* **AI Integration**: OpenAI API via Vercel AI SDK

### Discord Bot

* **Platform**: Discord Interactions API (slash commands)
* **Hosting**: Serverless API route in Next.js (Vercel Edge or Node function)
* **Features**: `/ask` command to query the AI assistant

### Database (optional for demo)

* **ORM**: Prisma
* **Database**: SQLite (for local dev) → Postgres (Neon/Supabase for production)
* **Use**: Store user queries and AI responses (can be disabled in early demo)

### Deployment & Infra

* **Hosting**: Vercel (dashboard + bot)
* **Version Control**: GitHub (monorepo structure)
* **Package Manager**: PNPM (recommended)

---

## 📂 Project Structure

```
/ai-productivity
  /apps
    /dashboard    # Next.js frontend dashboard
    /bot          # Discord bot handler (API route)
  /prisma         # Database schema + migrations (optional)
  /packages       # Shared UI or logic (future use)
  .env.local      # Environment variables
  README.md       # Project documentation
```

---

## 🔄 Tech Flow

### Dashboard Flow

1. User opens the **dashboard**.
2. They type a query (e.g., "summarize meeting notes").
3. The query is sent to `/api/ai`.
4. The AI model (OpenAI) generates a response.
5. Response is shown in the dashboard (and optionally stored in DB).

### Discord Flow

1. User runs `/ask` in Discord.
2. Discord forwards the command to our bot’s interaction endpoint.
3. The endpoint calls the same `/api/ai` function used by the dashboard.
4. AI responds, and the bot sends the reply back to the Discord channel.

---

## 👤 User Flow

* **On Dashboard**:

  * Open dashboard → Enter prompt → Get AI response instantly.
  * (Future) Responses saved to history, tasks created automatically.

* **On Discord**:

  * Run `/ask <prompt>` → Bot replies with AI-generated response.
  * (Future) Sync responses to dashboard for unified history.

---

## 🛠 Setup

### Prerequisites

* Node.js 20+
* PNPM (recommended) or npm
* Vercel account (for hosting)
* Discord Developer account (for bot setup)
* OpenAI API key

### Environment Variables

Create `.env.local` in the root:

```
OPENAI_API_KEY=your_openai_key_here
DISCORD_PUBLIC_KEY=your_discord_public_key
DISCORD_BOT_TOKEN=your_discord_bot_token
DISCORD_APPLICATION_ID=your_discord_app_id
```

### Install & Run

```bash
pnpm install
pnpm dev
```

* Dashboard: [http://localhost:3000](http://localhost:3000)
* Bot: Runs as API route, exposed when deployed to Vercel

---

## 📦 Deployment

* **Dashboard + Bot** → Deploy via Vercel
* Configure Discord bot’s **Interactions Endpoint URL** in the [Discord Developer Portal](https://discord.com/developers/applications)
* Point it to your deployed API endpoint (e.g., `https://your-app.vercel.app/api/discord`)

---

## 🔮 Future Roadmap

* Add authentication (NextAuth.js)
* Add Prisma logging of queries/responses
* Add task scheduling and reminders
* Integrate with Slack, Gmail, Twilio SMS
* Add analytics dashboard (query volume, response quality)
