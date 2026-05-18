import { useState } from 'react';
import { createPortal } from 'react-dom';

/* Action icon button */
function ActionBtn({ title, onClick, children }) {
  return (
    <button
      title={title}
      onClick={onClick}
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
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const isUser = role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(content || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    setLiked(true);
    setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(true);
    setLiked(false);
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
    <div className="px-5 mb-1 msg-in relative">
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
            <ActionBtn title={copied ? 'Copied!' : 'Copy'} onClick={handleCopy}>
              {copied ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </ActionBtn>

            {/* Thumbs up */}
            <ActionBtn title="Good response" onClick={handleLike}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className={liked ? "text-white" : ""}
              >
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
              </svg>
            </ActionBtn>

            {/* Thumbs down */}
            <ActionBtn title="Bad response" onClick={handleDislike}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                fill={disliked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className={disliked ? "text-white" : ""}
              >
                <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z" />
                <path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
              </svg>
            </ActionBtn>
          </div>

          {/* Copy Toast */}
          {copied && typeof window !== 'undefined' && createPortal(
            <div className="fixed top-6 right-6 bg-[#2a2a2a] text-[#e8eaed] border border-white/10 px-4 py-2.5 rounded-full shadow-lg text-sm z-50 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied to clipboard
            </div>,
            document.body
          )}
        </>
      )}
    </div>
  );
}
