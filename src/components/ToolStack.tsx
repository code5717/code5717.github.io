const tools = [
  { name: 'Python', glyph: 'Py' },
  { name: 'C / C++', glyph: 'C++' },
  { name: 'CUDA', glyph: 'CU' },
  { name: 'PyTorch', glyph: 'Pt' },
  { name: 'Hugging Face', glyph: 'HF' },
  { name: 'Linux', glyph: 'Lx' },
  { name: 'Docker', glyph: 'Dk' },
  { name: 'Vim', glyph: 'Vi' },
  { name: 'OpenCV', glyph: 'CV' },
  { name: 'YOLO', glyph: 'YL' },
  { name: 'JetBrains', glyph: 'JB' },
  { name: 'Ninja', glyph: 'Nj' }
];

// Duplicate list once for seamless infinite scroll
const rail = [...tools, ...tools];

export default function ToolStack() {
  return (
    <section
      aria-labelledby="stack-title"
      className="relative mx-auto w-[min(100%-1.5rem,1340px)] mt-20 md:mt-28"
    >
      <div data-reveal className="mb-7 max-w-[60ch]">
        <span className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 border border-cyan-400/25 text-cyan-300 text-[0.68rem] font-medium uppercase tracking-[0.22em] px-3 py-1 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(61,217,234,0.9)]" />
          What I work with
        </span>
        <h2
          id="stack-title"
          className="font-bold uppercase text-[clamp(1.8rem,3.2vw,2.7rem)] leading-[1.02] tracking-[-0.035em] text-slate-50"
        >
          The <span className="text-cyan-300">tools</span> I reach for daily.
        </h2>
      </div>

      {/* Grid row (static, visible on desktop for density) */}
      <div
        data-reveal
        className="hidden md:grid grid-cols-8 gap-2.5 mb-4"
        style={{ ['--reveal-delay' as string]: '100ms' }}
      >
        {tools.slice(0, 8).map((t) => (
          <div
            key={t.name}
            title={t.name}
            className="group relative aspect-square rounded-2xl border border-white/8 bg-ink-200/70 hover:border-cyan-400/30 grid place-items-center overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
          >
            <div
              aria-hidden
              className="absolute inset-x-0 -top-6 h-12 bg-gradient-to-b from-cyan-400/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
            />
            <span className="relative text-[1.3rem] font-semibold text-cyan-200 tracking-tight">
              {t.glyph}
            </span>
            <span className="absolute bottom-2.5 text-[0.58rem] uppercase tracking-[0.14em] text-slate-400">
              {t.name}
            </span>
          </div>
        ))}
      </div>

      {/* Infinite marquee below */}
      <div
        className="relative overflow-hidden border-y border-white/8 py-3 mask-marquee"
        aria-hidden
        style={{
          maskImage:
            'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)'
        }}
      >
        <div
          className="flex gap-8 whitespace-nowrap"
          style={{ animation: 'marquee 34s linear infinite', width: 'max-content' }}
        >
          {rail.map((t, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-slate-400"
            >
              <span
                className="grid place-items-center h-6 w-6 rounded-md bg-cyan-400/10 border border-cyan-400/25 text-cyan-300 text-[0.58rem] font-bold"
              >
                {t.glyph}
              </span>
              {t.name}
              <span aria-hidden className="text-slate-700 ml-4">
                //
              </span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
