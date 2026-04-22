import { useState } from 'react';
import { profile } from '../data/profile';
import { IconArrowUpRight, IconPin } from '../lib/icons';

const featured = profile.experience.slice(0, 4);

const monogram = (company: string) => {
  const parts = company.replace(/[()]/g, '').split(/[\s.,-]+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

const tagKeywords: [string, RegExp][] = [
  ['LLMs', /llm|gpt/i],
  ['Agents', /agent/i],
  ['RAG', /rag|retrieval/i],
  ['Arabic NLP', /arabic|nlp/i],
  ['Vision', /vision|yolo|opencv/i],
  ['Linux', /linux|infrastructure/i],
  ['Security', /security|penetration|malware/i],
  ['Next.js', /next\.js|next js/i],
  ['Research', /research|dataset/i],
  ['Enterprise', /enterprise|production/i]
];

const tagsFor = (bullets: string[]) => {
  const joined = bullets.join(' ');
  const out: string[] = [];
  for (const [label, re] of tagKeywords) {
    if (re.test(joined)) out.push(label);
    if (out.length >= 4) break;
  }
  return out;
};

export default function Experience() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="experience"
      className="mx-auto w-[min(100%-1.5rem,1340px)] mt-20 md:mt-28"
      aria-labelledby="experience-title"
    >
      <div data-reveal className="mb-8 md:mb-10 max-w-[60ch]">
        <span className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 border border-cyan-400/25 text-cyan-300 text-[0.68rem] font-medium uppercase tracking-[0.22em] px-3 py-1 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(61,217,234,0.9)]" />
          Featured experience
        </span>
        <h2
          id="experience-title"
          className="font-bold uppercase text-[clamp(2rem,3.6vw,3rem)] leading-[1.02] tracking-[-0.035em] text-slate-50 text-balance"
        >
          A tight signal across <span className="text-cyan-300">research</span>, infrastructure,
          and shipped systems.
        </h2>
        <p data-scrub-text className="mt-4 text-slate-400 text-base max-w-[55ch]">
          Seven roles across LLMs, cybersecurity AI, and enterprise deployment. Click a role for mission detail.
        </p>
      </div>

      <div
        data-pin-section
        className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] gap-6 lg:gap-10 items-start"
      >
        <aside data-pin-target className="grid gap-2.5 lg:self-start">
          {featured.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`text-left px-3.5 py-3 rounded-2xl border transition-all duration-200 ${
                active === i
                  ? 'border-cyan-400/30 bg-gradient-to-b from-cyan-400/8 to-transparent'
                  : 'border-white/8 bg-ink-200/40 hover:border-white/15'
              }`}
            >
              <span
                className={`block h-2 w-2 rounded-full mb-2 ${
                  active === i
                    ? 'bg-cyan-400 shadow-[0_0_10px_rgba(61,217,234,0.9)]'
                    : 'bg-slate-600'
                }`}
              />
              <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                {item.period}
              </span>
              <span className="block text-[0.88rem] text-slate-100 leading-snug mt-1">
                {item.role}
              </span>
              <span className="block text-[0.72rem] text-slate-500 mt-0.5">
                {item.company.split(',')[0]}
              </span>
            </button>
          ))}
        </aside>

        <div className="grid gap-3.5">
          {featured.map((item, i) => {
            const tags = tagsFor(item.bullets);
            const isOpen = active === i;
            return (
              <article
                key={i}
                className={`rounded-[22px] border overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? 'border-cyan-400/30 bg-gradient-to-b from-ink-300/80 to-ink-200/60'
                    : 'border-white/8 bg-ink-200/40'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActive(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-start gap-4 md:gap-5 p-5 md:p-6 text-left hover:bg-white/2"
                >
                  <span
                    aria-hidden
                    className="shrink-0 grid place-items-center h-12 w-12 rounded-2xl bg-gradient-to-br from-cyan-300/30 to-cyan-500/5 border border-cyan-400/25 text-cyan-200 font-bold text-sm"
                  >
                    {monogram(item.company)}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-[1.06rem] md:text-[1.12rem] font-semibold text-slate-100 tracking-tight leading-tight">
                      {item.role}
                    </span>
                    <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="text-[0.88rem] text-slate-400">
                        {item.company.split(',')[0]}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[0.7rem] uppercase tracking-[0.12em] text-slate-500 px-2 py-0.5 rounded-full bg-white/3 border border-white/5">
                        <IconPin size={10} />
                        {item.location.split(',')[0]}
                      </span>
                    </span>
                  </span>
                  <span className="shrink-0 hidden md:inline-flex rounded-full bg-cyan-400/10 border border-cyan-400/25 text-cyan-300 text-[0.66rem] font-semibold uppercase tracking-[0.16em] px-3 py-1.5 whitespace-nowrap">
                    {item.period}
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-[cubic-bezier(0.22,0.68,0.18,1)] ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 md:px-6 pb-6 pt-2 border-t border-white/5 space-y-4">
                      <ul className="list-disc pl-5 space-y-2 text-slate-300/90 text-[0.94rem] leading-[1.65]">
                        {item.bullets.map((b, k) => (
                          <li key={k}>{b}</li>
                        ))}
                      </ul>
                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {tags.map((t) => (
                            <span
                              key={t}
                              className="px-2.5 py-1 rounded-full bg-cyan-400/8 border border-cyan-400/25 text-cyan-200 text-[0.68rem] uppercase tracking-[0.14em]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                      {item.companyUrl && (
                        <a
                          href={item.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/12 text-slate-200 text-[0.72rem] uppercase tracking-[0.14em] hover:border-cyan-400/40 hover:bg-cyan-400/5 hover:text-cyan-200 transition"
                        >
                          Visit company
                          <IconArrowUpRight size={11} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
