import type { JSX } from 'react';
import {
  IconUser,
  IconBriefcase,
  IconFolder,
  IconBolt,
  IconGraduation,
  IconMail
} from '../lib/icons';

const tiles: { href: string; label: string; kicker: string; icon: JSX.Element }[] = [
  { href: '#hero', kicker: 'Who', label: 'Profile', icon: <IconUser size={18} /> },
  { href: '#experience', kicker: 'Work', label: 'Experience', icon: <IconBriefcase size={18} /> },
  { href: '#projects', kicker: 'Builds', label: 'Projects', icon: <IconFolder size={18} /> },
  { href: '#skills', kicker: 'Stack', label: 'Skills', icon: <IconBolt size={18} /> },
  { href: '#background', kicker: 'Path', label: 'Background', icon: <IconGraduation size={18} /> },
  { href: '#connect', kicker: 'Reach', label: "Let's Connect", icon: <IconMail size={18} /> }
];

export default function QuickTiles() {
  return (
    <section
      aria-label="Quick navigation"
      className="mx-auto w-[min(100%-1.5rem,1340px)] mt-6 md:mt-10"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5" data-reveal>
        {tiles.map((t, i) => (
          <a
            key={t.href}
            href={t.href}
            className="group relative overflow-hidden rounded-2xl border border-white/6 bg-ink-200/70 hover:bg-ink-300/70 p-4 flex items-center gap-3 transition-all duration-200 hover:border-cyan-400/30 hover:-translate-y-0.5"
            style={{ ['--reveal-delay' as string]: `${i * 40}ms` }}
          >
            <span
              aria-hidden
              className="absolute inset-x-0 -top-6 h-16 bg-gradient-to-b from-cyan-300/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
            />
            <span className="relative grid place-items-center h-10 w-10 rounded-xl bg-cyan-400/10 border border-cyan-400/25 text-cyan-300">
              {t.icon}
            </span>
            <span className="relative">
              <span className="block text-[0.62rem] font-medium uppercase tracking-[0.22em] text-slate-500">
                {t.kicker}
              </span>
              <span className="block text-[0.92rem] font-semibold text-slate-100">{t.label}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
