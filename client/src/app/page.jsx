"use client";
import { useState, useRef, useEffect } from 'react';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';

/* ── Minimal header ── */
function Header({ onNewChat }) {
  return (
    <header className="flex items-center justify-between px-5 py-3 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400
          flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4
              M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
          </svg>
        </div>
        <span className="text-white font-semibold text-[15px]">GenAI</span>
      </div>
    </header>
  );
}

/* ── Welcome / empty state ── */
function WelcomeScreen({ onSuggestion }) {
  const suggestions = [
    'Create a fullstack AI SaaS application',
    'Build a subtitle editor using React',
    'Generate REST API with Node.js and MongoDB',
    'Explain Next.js Server Actions',
  ];

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-6 pb-10 gap-8 text-center">
      {/* Gemini-style gradient orb */}
      <div className="w-16 h-16 rounded-full bg-red-500  bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500
        flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.4)]">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white"
          strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83
            M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
        </svg>
      </div>

      <div>
        <h1 className="text-2xl font-semibold text-white mb-1">How can I help you today?</h1>
        <p className="text-[#9aa0a6] text-sm">Ask me anything — I'm here to assist.</p>
      </div>

      {/* Suggestion pills */}
      <div className="flex flex-col gap-2 w-full max-w-sm">
        {suggestions.map((s) => (
          <button
            key={s}
            id={`suggestion-${s.slice(0, 20).toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => onSuggestion(s)}
            className="text-left px-4 py-3 rounded-2xl bg-[#1e1e1e] border border-white/[0.08]
              text-[#c4c7cc] text-sm hover:bg-[#2a2a2a] hover:border-white/20
              transition-all duration-150"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Use a ref so the thread ID persists across re-renders for the same chat session
  const threadIdRef = useRef(Date.now().toString(36) + Math.random().toString(36).substring(2, 8));

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleNewChat = () => {
    setMessages([]);
    setInputValue('');
    // Generate a new thread ID when starting a new chat
    threadIdRef.current = Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
  };

  const handleSend = async () => {
    const text = inputValue.trim();
    if (!text || isLoading) return;

    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const res = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ threadId: threadIdRef.current, message: text }),
      });
      const data = await res.json();
      console.log("data: ", data);

      // The server returns the result in data.message
      setMessages((prev) => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error) {
      console.error("Error communicating with server:", error);
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: "Sorry, I couldn't connect to the server."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#000] text-white overflow-hidden">
      <Header onNewChat={handleNewChat} />

      {/* Chat body */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex flex-col h-full">
            <WelcomeScreen onSuggestion={setInputValue} />
          </div>
        ) : (
          <div className="max-w-2xl mx-auto w-full py-4">
            {messages.map((msg, i) => (
              <ChatMessage key={i} role={msg.role} content={msg.content} />
            ))}
            {isLoading && <ChatMessage role="assistant" isTyping />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSend}
        isLoading={isLoading}
      />
    </div>
  );
}
