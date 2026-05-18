# GenAI Chat Assistant

A highly responsive, full-stack AI chat application built with **Next.js** and **Express.js**. It features a modern, dark-mode, minimalist user interface inspired by Google Gemini, paired with a powerful backend that utilizes **Groq (LLaMA 3)** for lightning-fast inference and **Tavily** for real-time web search tool calling.

## 🚀 Live Demo
- **Frontend (Vercel):** [https://gen-ai-theta-sepia.vercel.app](https://gen-ai-theta-sepia.vercel.app)
- **Backend (Render):** [https://gen-ai-8mgx.onrender.com](https://gen-ai-8mgx.onrender.com)

## ✨ Key Features

- **Modern UI/UX:** A sleek, pure-black, Gemini-inspired single-column layout with right-aligned user prompts, clean left-aligned AI text, auto-resizing text areas, and dynamic typing indicators.
- **Intelligent Tool Calling:** The AI model dynamically decides when to answer directly and when to execute the `webSearch` tool to fetch real-time data from the internet.
- **Session Memory:** Built-in chat history using `node-cache` on the backend. Every browser session generates a unique `threadId`, allowing the AI to remember the context of the conversation.
- **High Performance:** Powered by Groq Cloud inference (Llama-3.3-70b-versatile) for ultra-low latency text generation.
- **CORS & Proxying:** Configured with Next.js rewrites to securely proxy frontend requests to the Express API.

## 🛠️ Tech Stack

### Frontend (`/client`)
- **Framework:** Next.js (App Router)
- **Library:** React 19
- **Styling:** Tailwind CSS v4
- **Deployment:** Vercel

### Backend (`/server`)
- **Framework:** Node.js + Express.js
- **AI Inference:** Groq SDK (`llama-3.3-70b-versatile`)
- **Search API:** Tavily Core
- **Caching:** `node-cache` (Memory persistence)
- **Deployment:** Render

## 📂 Project Structure

```text
GEN_AI/
├── client/                 # Next.js Frontend
│   ├── src/
│   │   ├── app/            # Next.js App Router (page.jsx, layout.jsx, globals.css)
│   │   └── components/     # React UI Components (ChatInput, ChatMessage, etc.)
│   ├── next.config.mjs     # Next.js config & backend API proxy
│   └── package.json
│
├── server/                 # Express.js Backend
│   ├── app.js              # Express server, CORS config, and routes
│   ├── generate.js         # Core AI logic (Groq API, Tool Calling loop, Cache)
│   ├── .env                # API Keys (Groq, Tavily)
│   └── package.json
└── README.md
```

## 💻 Running Locally

### 1. Clone the repository
```bash
git clone https://github.com/apoorv2766/GEN_AI.git
cd GEN_AI
```

### 2. Setup Backend
Open a terminal and navigate to the `server` directory:
```bash
cd server
npm install
```
Create a `.env` file inside the `server` folder with your API keys:
```env
GROQ_API_KEY=your_groq_api_key_here
TAVILY_API_KEY=your_tavily_api_key_here
```
Start the backend server:
```bash
npm run dev
# OR: node --env-file=.env app.js
```
*The backend will run on `http://localhost:3001`.*

### 3. Setup Frontend
Open a new terminal and navigate to the `client` directory:
```bash
cd client
npm install
```
Start the Next.js development server:
```bash
npm run dev
```
*The frontend will run on `http://localhost:3000`. It is configured to automatically proxy `/chat` requests to your local backend on port 3001.*

## ☁️ Deployment Guides

### Frontend (Vercel)
1. Import the repository into Vercel.
2. Under "Root Directory", select the `client` folder.
3. Add an Environment Variable: `BACKEND_URL` pointing to your deployed Render URL.
4. Deploy!

### Backend (Render)
1. Create a new Web Service on Render and connect the repository.
2. Set "Root Directory" to `server`.
3. Build Command: `npm install`
4. Start Command: `node app.js`
5. Add your `GROQ_API_KEY` and `TAVILY_API_KEY` to the Environment settings.
6. Deploy!
