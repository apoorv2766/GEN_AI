import { useRef, useEffect } from 'react';

export default function ChatInput({ value, onChange, onSend, isLoading }) {
  const textareaRef = useRef(null);

  /* Auto-resize */
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 180) + 'px';
  }, [value]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      if (value.trim()) onSend();
    }
  };

  return (
    <div className="px-4 pb-5 pt-2 bg-[#000]">
      <div className="max-w-4xl mx-auto">
        {/* Input pill */}
        <div className="flex items-end gap-3 bg-[#1e1e1e] rounded-[28px] px-4 py-3
          border border-white/[0.08] focus-within:border-white/20 transition-colors duration-200">

          {/* Plus button */}
          {/* <button
            id="attach-btn"
            title="Add attachment"
            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center
              text-[#9aa0a6] hover:text-white hover:bg-white/10 transition-colors duration-150 mb-0.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button> */}

          {/* Textarea */}
          <textarea
            id="chat-input"
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything"
            rows={1}
            disabled={isLoading}
            className="flex-1 bg-transparent text-[15px] text-[#e8eaed] placeholder-[#5f6368]
              outline-none leading-6 max-h-[180px] py-0.5 disabled:opacity-50"
          />

          {/* Right buttons */}
          <div className="flex items-center gap-2 shrink-0 mb-0.5">
            {/* Mic */}
            {/* <button
              id="mic-btn"
              title="Use microphone"
              className="w-8 h-8 rounded-full flex items-center justify-center
                text-[#9aa0a6] hover:text-white hover:bg-white/10 transition-colors duration-150"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            </button> */}

            {/* Send / stop */}
            <button
              id="send-btn"
              onClick={onSend}
              disabled={isLoading || !value.trim()}
              title={isLoading ? 'Stop' : 'Send'}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-150
                ${value.trim() && !isLoading
                  ? 'bg-white text-black hover:bg-white/90 cursor-pointer shadow-md'
                  : 'bg-[#2e2e2e] text-[#5f6368] cursor-not-allowed'}`}
            >
              {isLoading ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="5" y="5" width="14" height="14" rx="2" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
