import { profile } from '../data/profile';
import { IconArrowUpRight } from '../lib/icons';

// Map projects to generated image thumbnails by index/name
const thumbFor = (name: string): string => {
  const n = name.toLowerCase();
  if (n.includes('cubesat') || n.includes('debris')) return '/imgs/proj-cubesat.png';
  if (n.includes('vibecoding') || n.includes('a7-py')) return '/imgs/proj-vibecoding.png';
  if (n.includes('rotate') || n.includes('high performance')) return '/imgs/proj-compiler.png';
  if (n.includes('arraylist')) return '/imgs/proj-arraylist.png';
  if (n.includes('arcade')) return '/imgs/proj-arcade.png';
  if (n.includes('deep agent')) return '/imgs/proj-agents.png';
  return '/imgs/proj-agents.png';
};

const tagKeywords: [string, RegExp][] = [
  ['Computer Vision', /yolo|vision|opencv|debris/i],
  ['Embedded', /embedded|raspberry|esp32|cubesat|gyroscope/i],
  ['AI Agents', /agent|autonomous/i],
  ['Compilers', /compiler|lexer|parser|tokeniz|ast/i],
  ['Systems', /c\+\+|c11|c17|systems|memory|malloc/i],
  ['RAG', /rag|retrieval|embedding/i],
  ['Simulation', /simulator|godot|orbital/i],
  ['HPC', /cuda|hpc|performance|mb\/s/i],
  ['WASM', /wasm|webassembly/i]
];

const tagsFor = (bullets: string[]) => {
  const joined = bullets.join(' ');
  const out: string[] = [];
  for (const [label, re] of tagKeywords) {
    if (re.test(joined)) out.push(label);
    if (out.length >= 2) break;
  }
  return out;
};

const featured = profile.projects.slice(0, 3);

export default function Projects() {
  return (
    <section
      id="projects"
      className="mx-auto w-[min(100%-1.5rem,1340px)] mt-20 md:mt-28"
      aria-labelledby="projects-title"
    >
      <div data-reveal className="mb-8 md:mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="max-w-[60ch]">
          <span className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 border border-cyan-400/25 text-cyan-300 text-[0.68rem] font-medium uppercase tracking-[0.22em] px-3 py-1 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(61,217,234,0.9)]" />
            Selected projects
          </span>
          <h2
            id="projects-title"
            className="font-bold uppercase text-[clamp(2rem,3.6vw,3rem)] leading-[1.02] tracking-[-0.035em] text-slate-50 text-balance"
          >
            Shipped builds across <span className="text-cyan-300">compilers</span>, agents,
            CubeSats, and applied AI.
          </h2>
        </div>
        <a
          href="https://github.com/code5717"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 text-slate-200 text-[0.74rem] uppercase tracking-[0.14em] px-4 py-2 hover:border-cyan-400/40 hover:text-cyan-200 hover:bg-cyan-400/5 transition"
        >
          All projects on GitHub
          <IconArrowUpRight size={12} />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 md:gap-4">
        {featured.map((project, i) => {
          const tags = tagsFor(project.bullets);
          return (
            <article
              key={i}
              data-reveal
              style={{ ['--reveal-delay' as string]: `${i * 70}ms` }}
              className="group relative flex flex-col rounded-[22px] overflow-hidden border border-white/8 bg-ink-200/60 hover:border-cyan-400/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.85)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-ink-100">
                <img
                  src={thumbFor(project.name)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  data-scale-fade
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(10,15,26,0.15) 0%, rgba(10,15,26,0.12) 60%, rgba(10,15,26,0.8) 100%)'
                  }}
                />
                <span className="absolute top-3 right-3 inline-flex items-center rounded-full bg-ink-0/55 backdrop-blur-md border border-white/10 text-cyan-200 text-[0.64rem] font-medium uppercase tracking-[0.14em] px-2.5 py-1">
                  {project.period}
                </span>
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-ink-0/55 backdrop-blur-md border border-white/10 text-slate-300 text-[0.6rem] font-medium uppercase tracking-[0.18em] px-2.5 py-1">
                  File {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="flex-1 flex flex-col gap-3 p-5">
                <h3 className="text-[1.04rem] font-semibold text-slate-100 leading-snug tracking-tight">
                  {project.name}
                </h3>
                <p className="text-slate-400 text-[0.9rem] leading-[1.55] line-clamp-3">
                  {project.bullets[0]}
                </p>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md bg-white/4 border border-white/8 text-slate-300 text-[0.64rem] font-medium uppercase tracking-[0.14em]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-auto pt-3 border-t border-white/6 flex items-center justify-between">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-cyan-300 text-[0.74rem] font-medium uppercase tracking-[0.16em] hover:gap-2 transition-all"
                    >
                      View project
                      <IconArrowUpRight size={12} />
                    </a>
                  ) : (
                    <span className="text-slate-500 text-[0.7rem] uppercase tracking-[0.14em]">
                      Case study — private
                    </span>
                  )}
                  <span aria-hidden className="font-mono text-[0.64rem] tracking-[0.18em] text-slate-500">
                    PRJ/{String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
