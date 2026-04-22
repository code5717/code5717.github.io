import { useState, useMemo } from 'react';
import { profile } from '../data/profile';

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const initials = (s: string) => {
  const parts = s.split(/[\s+/-]+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2);
  return (parts[0][0] + parts[1][0]).slice(0, 2);
};

export default function Skills() {
  const tabs = useMemo(
    () => [{ id: 'all', label: 'All' }, ...profile.skillGroups.map((g) => ({ id: slug(g.label), label: g.label }))],
    []
  );
  const flat = useMemo(
    () =>
      profile.skillGroups.flatMap((g) =>
        g.items.map((item) => ({ item, group: slug(g.label), groupLabel: g.label }))
      ),
    []
  );

  const [filter, setFilter] = useState('all');

  return (
    <section
      id="skills"
      className="mx-auto w-[min(100%-1.5rem,1340px)] mt-20 md:mt-28"
      aria-labelledby="skills-title"
    >
      <div data-reveal className="mb-8 md:mb-10 max-w-[60ch]">
        <span className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 border border-cyan-400/25 text-cyan-300 text-[0.68rem] font-medium uppercase tracking-[0.22em] px-3 py-1 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(61,217,234,0.9)]" />
          Skills
        </span>
        <h2
          id="skills-title"
          className="font-bold uppercase text-[clamp(2rem,3.6vw,3rem)] leading-[1.02] tracking-[-0.035em] text-slate-50 text-balance"
        >
          Capabilities across <span className="text-cyan-300">systems</span>, languages, and AI
          infrastructure.
        </h2>
      </div>

      <div
        data-reveal
        className="flex flex-wrap gap-2 mb-7"
        role="tablist"
        aria-label="Skills filter"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={filter === tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded-full text-[0.74rem] font-medium uppercase tracking-[0.14em] transition-all duration-200 ${
              filter === tab.id
                ? 'bg-cyan-400 text-ink-0 shadow-[0_10px_22px_-12px_rgba(61,217,234,0.8)]'
                : 'bg-ink-200/60 border border-white/10 text-slate-400 hover:text-slate-100 hover:border-white/20'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        data-reveal
        style={{ ['--reveal-delay' as string]: '120ms' }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2"
      >
        {flat.map((s, i) => {
          const hidden = filter !== 'all' && s.group !== filter;
          return (
            <div
              key={i}
              hidden={hidden}
              className="flex items-center gap-3 px-3 py-2.5 rounded-2xl border border-white/8 bg-ink-200/60 hover:border-cyan-400/30 hover:bg-cyan-400/3 transition-all duration-200 hover:-translate-y-0.5"
            >
              <span
                aria-hidden
                className="shrink-0 grid place-items-center h-8 w-8 rounded-lg bg-cyan-400/10 border border-cyan-400/25 text-cyan-300 text-[0.7rem] font-bold uppercase"
              >
                {initials(s.item)}
              </span>
              <span className="flex-1 min-w-0 text-[0.88rem] font-medium text-slate-100 truncate">
                {s.item}
              </span>
              <span className="shrink-0 text-[0.6rem] uppercase tracking-[0.12em] text-slate-500 hidden md:inline">
                {s.groupLabel.split(' ')[0]}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
