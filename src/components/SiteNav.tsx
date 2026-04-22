import { useState } from 'react';
import { IconMenu } from '../lib/icons';

const nav = [
  { href: '#hero', label: 'Profile' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#background', label: 'Background' },
  { href: '#connect', label: 'Connect' }
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-3 z-40 mx-auto mt-3 w-[min(100%-1rem,1340px)]">
      <div className="flex items-center gap-3 px-2.5 py-2 rounded-full border border-white/8 bg-ink-200/70 backdrop-blur-xl shadow-[0_28px_60px_-24px_rgba(0,0,0,0.75)]">
        <a href="#hero" className="flex items-center gap-2.5 pr-2 pl-1 shrink-0">
          <span
            aria-hidden
            className="grid place-items-center h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-300 to-cyan-600 text-ink-0 font-bold text-sm shadow-[0_6px_16px_-4px_rgba(61,217,234,0.55)]"
          >
            AK
          </span>
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="text-[0.62rem] uppercase tracking-[0.22em] text-slate-500">Dossier</span>
            <span className="text-[0.85rem] font-semibold text-slate-100">Abdussamad</span>
          </span>
        </a>

        <nav aria-label="Sections" className="hidden lg:flex flex-1 justify-center gap-1">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3.5 py-1.5 rounded-full text-[0.72rem] font-medium uppercase tracking-[0.16em] text-slate-400 hover:text-white hover:bg-white/5 transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <span
          role="status"
          className="hidden md:inline-flex items-center gap-2 shrink-0 ml-auto lg:ml-0 pl-3 pr-3.5 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/5 text-cyan-300 text-[0.66rem] font-medium uppercase tracking-[0.14em]"
        >
          <span
            aria-hidden
            className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(61,217,234,0.9)]"
            style={{ animation: 'pulse-dot 2s cubic-bezier(0.16,1,0.3,1) infinite' }}
          />
          Available for senior AI roles
        </span>

        <button
          type="button"
          className="lg:hidden grid place-items-center h-9 w-9 rounded-full border border-white/10 text-slate-200"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <IconMenu size={18} />
        </button>
      </div>

      {open && (
        <div className="lg:hidden mt-2 rounded-2xl border border-white/8 bg-ink-200/90 backdrop-blur-xl p-2 grid gap-1">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-xl text-sm uppercase tracking-[0.14em] text-slate-300 hover:text-white hover:bg-white/5"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
