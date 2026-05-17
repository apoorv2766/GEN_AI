import { useState } from 'react';

const mockHistory = [
  { id: 1, title: 'How does React work?', date: 'Today' },
  { id: 2, title: 'Explain async/await in JS', date: 'Today' },
  { id: 3, title: 'Best practices for REST APIs', date: 'Yesterday' },
  { id: 4, title: 'What is Tailwind CSS?', date: 'Yesterday' },
  { id: 5, title: 'Node.js vs Bun runtime', date: 'Last 7 days' },
  { id: 6, title: 'Docker compose basics', date: 'Last 7 days' },
];

const grouped = mockHistory.reduce((acc, item) => {
  acc[item.date] = acc[item.date] || [];
  acc[item.date].push(item);
  return acc;
}, {});

export default function Sidebar({ isOpen, onNewChat }) {
  const [activeId, setActiveId] = useState(null);

  return (
    <aside
      className={`flex flex-col h-full bg-[#171717] text-white transition-all duration-300 ease-in-out
        ${isOpen ? 'w-64' : 'w-0 overflow-hidden'}`}
    >
      {/* Top */}
      <div className="flex items-center justify-between px-3 pt-3 pb-2">
        {/* Logo / brand */}
        <div className="flex items-center gap-2 px-2 py-1">
          <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-black">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"
                fill="currentColor"/>
            </svg>
          </div>
          <span className="text-sm font-semibold text-white/90">GenAI Chat</span>
        </div>
      </div>

      {/* New Chat button */}
      <div className="px-3 pb-2">
        <button
          id="new-chat-btn"
          onClick={onNewChat}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/80
            hover:bg-white/10 hover:text-white transition-colors duration-150 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="shrink-0">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>New chat</span>
        </button>
      </div>

      {/* History */}
      <div className="flex-1 overflow-y-auto px-3 space-y-4 py-2">
        {Object.entries(grouped).map(([group, items]) => (
          <div key={group}>
            <p className="text-xs text-white/40 font-medium px-2 mb-1">{group}</p>
            <ul className="space-y-0.5">
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveId(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm truncate transition-colors duration-150
                      ${activeId === item.id
                        ? 'bg-white/10 text-white'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom user section */}
      <div className="px-3 pb-3 pt-2 border-t border-white/10">
        <button
          id="user-profile-btn"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors duration-150"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500
            flex items-center justify-center text-white text-sm font-semibold shrink-0">
            U
          </div>
          <div className="text-left overflow-hidden">
            <p className="text-sm text-white font-medium truncate">User</p>
            <p className="text-xs text-white/40 truncate">Free plan</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="ml-auto text-white/40 shrink-0">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
      </div>
    </aside>
  );
}
