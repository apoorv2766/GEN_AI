import { useState } from 'react';

/* Action icon button */
function ActionBtn({ title, children }) {
  return (
    <button
      title={title}
      className="p-1.5 rounded-full text-[#9aa0a6] hover:text-white hover:bg-white/10
        transition-colors duration-150"
    >
      {children}
    </button>
  );
}

/* Typing dots */
function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 py-3">
      <span className="w-2 h-2 rounded-full bg-[#9aa0a6] dot-1 inline-block" />
      <span className="w-2 h-2 rounded-full bg-[#9aa0a6] dot-2 inline-block" />
      <span className="w-2 h-2 rounded-full bg-[#9aa0a6] dot-3 inline-block" />
    </div>
  );
}

export default function ChatMessage({ role, content, isTyping = false }) {
  const [copied, setCopied] = useState(false);
  const isUser = role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(content || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* ── USER bubble (right-aligned pill) ── */
  if (isUser) {
    return (
      <div className="flex justify-end px-4 mb-2 msg-in">
        <div className="max-w-[70%] bg-[#282828] text-[#e8eaed] text-[15px] leading-[1.6]
          px-4 py-2.5 rounded-[22px] rounded-br-md">
          {content}
        </div>
      </div>
    );
  }

  /* ── ASSISTANT response (plain text, left-aligned) ── */
  return (
    <div className="px-5 mb-1 msg-in">
      {isTyping ? (
        <TypingDots />
      ) : (
        <>
          {/* Text body — plain, no bubble */}
          <div className="text-[15px] leading-[1.75] text-[#e8eaed] whitespace-pre-wrap break-words mb-3">
            {content}
          </div>

          {/* Action icon row */}
          <div className="flex items-center gap-0.5 mb-4">
            {/* Copy */}
            <ActionBtn title={copied ? 'Copied!' : 'Copy'}>
              {copied ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
              )}
            </ActionBtn>

            {/* Thumbs up */}
            <ActionBtn title="Good response">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/>
                <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
              </svg>
            </ActionBtn>

            {/* Thumbs down */}
            <ActionBtn title="Bad response">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z"/>
                <path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
              </svg>
            </ActionBtn>

            {/* Share */}
            <ActionBtn title="Share">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                <polyline points="16 6 12 2 8 6"/>
                <line x1="12" y1="2" x2="12" y2="15"/>
              </svg>
            </ActionBtn>

            {/* Refresh */}
            <ActionBtn title="Regenerate">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10"/>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
              </svg>
            </ActionBtn>

            {/* More */}
            <ActionBtn title="More">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>
              </svg>
            </ActionBtn>
          </div>
        </>
      )}
    </div>
  );
}
