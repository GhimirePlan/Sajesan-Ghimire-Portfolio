import { useState } from 'react';
export default function Footer() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <footer className="border-t border-white/10 py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-secondary">
      <p>© {new Date().getFullYear()} Sajesan Ghimire</p>
      <div className="flex items-center gap-5">
        <span>
          Built by{' '}
          <a
            className="text-[#c9b5ff] hover:text-white"
            href="https://www.plan.com.np"
            target="_blank"
            rel="noopener noreferrer"
          >
            Plan Ghimire
          </a>
        </span>
        <a href="#" className="hover:text-white">
          Back to top ↑
        </a>
        <button
          aria-label="Close Footer"
          className="hover:text-white"
          onClick={() => setVisible(false)}
        >
          ×
        </button>
      </div>
    </footer>
  );
}
