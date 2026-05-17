import { useState, useRef, useEffect } from 'react';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';

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
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4
              M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
          </svg>
        </div>
        <span className="text-white font-semibold text-[15px]">GenAI</span>
      </div>

      {/* New chat */}
      <button
        id="new-chat-btn"
        onClick={onNewChat}
        title="New chat"
        className="w-9 h-9 rounded-full flex items-center justify-center
          text-[#9aa0a6] hover:text-white hover:bg-white/10 transition-colors duration-150"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
      </button>
    </header>
  );
}

/* ── Welcome / empty state ── */
function WelcomeScreen({ onSuggestion }) {
  const suggestions = [
    'Help me write a cover letter',
    'Explain quantum computing simply',
    'Write a Node.js REST API',
    'Give me 10 startup ideas for 2025',
  ];

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-6 pb-10 gap-8 text-center">
      {/* Gemini-style gradient orb */}
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500
        flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.4)]">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white"
          strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
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

/* ══════════════════════════════════════ */
export default function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleNewChat = () => {
    setMessages([]);
    setInputValue('');
  };

  const handleSend = async () => {
    const text = inputValue.trim();
    if (!text || isLoading) return;

    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setInputValue('');
    setIsLoading(true);

    // TODO: connect to server POST /chat
    // const res = await fetch('/chat', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ message: text }),
    // });
    // const data = await res.json();
    // setMessages((prev) => [...prev, { role: 'assistant', content: data.message }]);

    // Placeholder — remove once server is connected
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `This is a placeholder response. Connect your /chat endpoint to see real AI responses.\n\nYou asked: "${text}"`,
        },
      ]);
      setIsLoading(false);
    }, 1500);
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
