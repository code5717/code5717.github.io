import { profile } from '../data/profile';
import { IconGraduation, IconClipboard, IconAward, IconHeart, IconGlobe } from '../lib/icons';

export default function Background() {
  return (
    <section
      id="background"
      className="mx-auto w-[min(100%-1.5rem,1340px)] mt-20 md:mt-28"
      aria-labelledby="background-title"
    >
      <div data-reveal className="mb-8 md:mb-10 max-w-[60ch]">
        <span className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 border border-cyan-400/25 text-cyan-300 text-[0.68rem] font-medium uppercase tracking-[0.22em] px-3 py-1 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(61,217,234,0.9)]" />
          Education &amp; more
        </span>
        <h2
          id="background-title"
          className="font-bold uppercase text-[clamp(2rem,3.6vw,3rem)] leading-[1.02] tracking-[-0.035em] text-slate-50 text-balance"
        >
          The supporting <span className="text-cyan-300">record</span>.
        </h2>
      </div>

      <div
        data-reveal
        className="grid grid-flow-dense grid-cols-1 md:grid-cols-6 gap-3 auto-rows-[minmax(180px,auto)]"
      >
        <Card
          icon={<IconGraduation size={14} />}
          label="Education"
          code="REC/EDU"
          className="md:col-span-4"
        >
          <div>
            <h3 className="text-[1.02rem] font-semibold text-slate-100 leading-snug tracking-tight">
              {profile.education.degree}
            </h3>
            <p className="text-slate-400 text-[0.88rem] mt-1">
              {profile.education.institution} · {profile.education.location}
            </p>
          </div>
          <Kv items={[
            ['Period', profile.education.period],
            ['Coursework', profile.education.coursework]
          ]} />
        </Card>

        <Card
          icon={<IconClipboard size={14} />}
          label="Publication"
          code="REC/PUB"
          className="md:col-span-2"
        >
          <div>
            <h3 className="text-[1.02rem] font-semibold text-slate-100 leading-snug tracking-tight">
              {profile.publication.status}
            </h3>
            <p className="text-slate-400 text-[0.88rem] mt-2 leading-[1.5]">
              {profile.publication.title}
            </p>
          </div>
          <p className="text-cyan-300 text-[0.72rem] uppercase tracking-[0.12em] font-medium mt-auto">
            {profile.publication.venue}
          </p>
        </Card>

        <Card
          icon={<IconAward size={14} />}
          label="Certification"
          code="REC/CERT"
          className="md:col-span-2"
        >
          <div>
            <h3 className="text-[1.02rem] font-semibold text-slate-100 leading-snug tracking-tight">
              {profile.certification.title}
            </h3>
            <p className="text-slate-400 text-[0.88rem] mt-1">{profile.certification.issuer}</p>
          </div>
        </Card>

        <Card
          icon={<IconHeart size={14} />}
          label="Volunteering"
          code="REC/VOL"
          className="md:col-span-4"
        >
          <div>
            <h3 className="text-[1.02rem] font-semibold text-slate-100 leading-snug tracking-tight">
              {profile.volunteering.role}
            </h3>
            <p className="text-slate-400 text-[0.88rem] mt-1">
              {profile.volunteering.organization} · {profile.volunteering.period}
            </p>
          </div>
          <p className="text-slate-300 text-[0.88rem] leading-[1.6]">
            {profile.volunteering.bullets[0]}
          </p>
        </Card>

        <Card
          icon={<IconGlobe size={14} />}
          label="Languages"
          code="REC/LANG"
          className="md:col-span-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {profile.languages.map((lang) => (
              <div
                key={lang.name}
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/2 border border-white/6"
              >
                <span className="text-[0.95rem] font-semibold text-slate-100">{lang.name}</span>
                <span className="text-[0.7rem] uppercase tracking-[0.14em] text-cyan-300">
                  {lang.fluency}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}

function Card({
  icon,
  label,
  code,
  children,
  className = ''
}: {
  icon: React.ReactNode;
  label: string;
  code: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      className={`rounded-[22px] border border-white/8 bg-ink-200/60 p-5 md:p-6 flex flex-col gap-3.5 hover:border-cyan-400/30 transition-colors duration-200 ${className}`}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="inline-flex items-center gap-2.5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-cyan-300">
          <span className="grid place-items-center h-7 w-7 rounded-lg bg-cyan-400/10 border border-cyan-400/25">
            {icon}
          </span>
          {label}
        </span>
        <span className="font-mono text-[0.62rem] tracking-[0.18em] text-slate-500">{code}</span>
      </div>
      {children}
    </article>
  );
}

function Kv({ items }: { items: [string, string][] }) {
  return (
    <div className="grid gap-2 text-[0.88rem]">
      {items.map(([k, v]) => (
        <div key={k} className="grid grid-cols-[96px_1fr] gap-3 items-baseline">
          <span className="text-[0.68rem] uppercase tracking-[0.14em] text-slate-500">{k}</span>
          <span className="text-slate-300 leading-[1.5]">{v}</span>
        </div>
      ))}
    </div>
  );
}
