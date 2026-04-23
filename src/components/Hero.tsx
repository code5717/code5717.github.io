import { IconArrowRight, IconDoc } from '../lib/icons';

const bio =
  'I ship production AI systems — LLM pipelines, computer vision, and HPC infrastructure. I take research into reliable, measurable deployment across agentic workflows, RAG, CUDA, and Linux.';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative mx-auto w-[min(100%-1.5rem,1340px)] pt-14 md:pt-20 pb-8 md:pb-14 grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-8 lg:gap-14 items-center"
    >
      <div data-reveal>
        <p className="inline-flex items-center gap-3 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-cyan-400 mb-7">
          <span aria-hidden className="w-8 h-px bg-cyan-400" />
          Senior AI Engineer
        </p>
        <h1 className="font-bold uppercase text-[clamp(2.6rem,6.8vw,5.8rem)] leading-[0.92] tracking-[-0.04em] text-slate-50 mb-7 text-balance">
          I BUILD{' '}
          <span className="text-cyan-300">AI</span>
          <br />
          SYSTEMS
          <br />
          THAT MATTER
          <span
            className="inline-block text-cyan-300 ml-1"
            style={{ animation: 'blink 1.1s steps(1) infinite' }}
            aria-hidden
          >
            _
          </span>
        </h1>
        <p className="text-slate-300/90 text-[1.02rem] leading-[1.65] max-w-[56ch] mb-8">
          {bio}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2.5 py-2 pl-5 pr-2 rounded-full bg-cyan-400 hover:bg-cyan-300 text-ink-0 text-[0.78rem] font-semibold uppercase tracking-[0.16em] shadow-[0_16px_36px_-14px_rgba(61,217,234,0.7),inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <span>View my work</span>
            <span className="grid place-items-center w-8 h-8 rounded-full bg-ink-0 text-cyan-300 transition-transform duration-200 group-hover:translate-x-1">
              <IconArrowRight size={14} />
            </span>
          </a>
          <a
            href="/RESUME-ABDUSSAMAD-APRIL-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-slate-100 text-[0.78rem] font-medium uppercase tracking-[0.16em] hover:border-cyan-400/40 hover:bg-white/5 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <IconDoc size={14} />
            Résumé
          </a>
        </div>
      </div>

      {/* Photo panel - rectangular, matches reference */}
      <div className="relative" data-reveal style={{ ['--reveal-delay' as string]: '120ms' }}>
        <div
          aria-hidden
          className="absolute -inset-6 rounded-[32px] blur-2xl opacity-70"
          style={{
            background:
              'radial-gradient(ellipse at 60% 40%, rgba(61,217,234,0.35), transparent 60%), radial-gradient(ellipse at 20% 90%, rgba(255,151,87,0.18), transparent 60%)'
          }}
        />
        <div
          className="relative overflow-hidden rounded-[26px] p-[1.5px] shadow-[0_40px_80px_-28px_rgba(0,0,0,0.85)]"
          style={{
            background:
              'conic-gradient(from 140deg at 60% 40%, rgba(61,217,234,0.55), rgba(61,217,234,0.05) 30%, rgba(255,151,87,0.35) 60%, rgba(61,217,234,0.25) 100%)'
          }}
        >
          <div className="relative rounded-[24px] overflow-hidden bg-ink-100 aspect-[4/5]">
            <img
              src="/imgs/hero-portrait.png"
              alt="Portrait of Abdussamad Farooq Saeed"
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
              decoding="async"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, transparent 55%, rgba(10,15,26,0.35) 82%, rgba(10,15,26,0.85) 100%)'
              }}
            />

            {/* Corner info overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(61,217,234,0.9)]" />
                <div className="leading-tight">
                  <p className="text-[0.62rem] tracking-[0.22em] uppercase text-slate-400">On station</p>
                  <p className="text-sm font-medium text-slate-100">Al-Khobar, SA</p>
                </div>
              </div>
              <span className="font-mono text-[0.62rem] tracking-[0.18em] text-cyan-300/80">CAM/OPR-07</span>
            </div>

            {/* Top-left label */}
            <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-ink-0/50 border border-white/10 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-warm-500 shadow-[0_0_8px_rgba(255,151,87,0.8)]" />
              <span className="text-[0.6rem] tracking-[0.2em] uppercase font-medium text-warm-400">Live</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
