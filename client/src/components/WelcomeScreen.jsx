const SUGGESTIONS = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    label: 'Explain a concept',
    prompt: 'Explain quantum computing in simple terms',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    label: 'Write code',
    prompt: 'Write a Node.js Express REST API with CRUD operations',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    label: 'Summarize text',
    prompt: 'Summarize the key ideas from the book "Atomic Habits"',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    label: 'Get ideas',
    prompt: 'Give me 10 creative startup ideas for 2025',
  },
];

export default function WelcomeScreen({ onSuggestion }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4 text-center gap-8 pb-10">
      {/* Icon */}
      <div className="w-14 h-14 rounded-full bg-[#10a37f] flex items-center justify-center
        shadow-[0_0_30px_#10a37f55]">
        <svg width="28" height="28" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835
            A9.964 9.964 0 0 0 18.306.5a10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.664
            4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0
            10.855 4.835 9.965 9.965 0 0 0 7.516 3.35 10.078 10.078 0 0 0 9.617-6.981 9.967 9.967
            0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813Z"
            fill="white"/>
        </svg>
      </div>

      {/* Heading */}
      <div>
        <h1 className="text-3xl font-semibold text-white mb-2">How can I help you today?</h1>
        <p className="text-white/40 text-sm">Ask me anything — code, ideas, explanations, and more.</p>
      </div>

      {/* Suggestion cards */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-xl">
        {SUGGESTIONS.map((s) => (
          <button
            key={s.label}
            id={`suggestion-${s.label.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => onSuggestion(s.prompt)}
            className="flex flex-col items-start gap-3 p-4 rounded-xl bg-white/[0.06]
              border border-white/10 text-left hover:bg-white/10 hover:border-white/20
              transition-all duration-200 group"
          >
            <span className="text-white/50 group-hover:text-[#10a37f] transition-colors duration-200">
              {s.icon}
            </span>
            <div>
              <p className="text-sm font-medium text-white/80">{s.label}</p>
              <p className="text-xs text-white/40 mt-0.5 line-clamp-2">{s.prompt}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
