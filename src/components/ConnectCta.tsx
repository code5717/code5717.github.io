import { profile } from '../data/profile';
import { IconArrowRight, IconMail, IconGithub, IconLinkedin, IconDoc } from '../lib/icons';

async function copyEmail(email: string) {
  if (!email || !navigator.clipboard || !window.isSecureContext) return false;
  try {
    await navigator.clipboard.writeText(email);
    return true;
  } catch {
    return false;
  }
}

export default function ConnectCta() {
  const onCopy = async () => {
    const ok = await copyEmail(profile.contacts.email);
    if (ok) window.__showToast?.('Email copied to clipboard');
    else window.__showToast?.(`Email: ${profile.contacts.email}`);
  };

  return (
    <section
      id="connect"
      className="mx-auto w-[min(100%-1.5rem,1340px)] mt-20 md:mt-28"
      aria-labelledby="connect-title"
    >
      <div
        data-reveal
        className="relative overflow-hidden rounded-[28px] border border-cyan-400/25 px-6 md:px-10 lg:px-16 py-14 md:py-20 text-center"
        style={{
          background:
            'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(61,217,234,0.18), transparent 60%), linear-gradient(180deg, rgba(23,31,48,0.85), rgba(13,19,31,0.9))'
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.5] pointer-events-none"
          style={{
            background:
              'repeating-linear-gradient(-45deg, transparent 0 28px, rgba(61,217,234,0.04) 28px 29px)'
          }}
        />

        <p className="relative text-[0.78rem] font-medium uppercase tracking-[0.24em] text-cyan-300 mb-5">
          Let's work together
        </p>
        <h2
          id="connect-title"
          className="relative font-bold uppercase text-[clamp(2.4rem,6.2vw,5rem)] leading-[0.95] tracking-[-0.04em] text-slate-50 text-balance mb-4"
        >
          Let's build
          <br />
          <span className="text-cyan-300">something</span>
          <br />
          meaningful
          <span
            className="text-cyan-300 inline-block ml-1"
            style={{ animation: 'blink 1.1s steps(1) infinite' }}
            aria-hidden
          >
            _
          </span>
        </h2>
        <p
          data-scrub-text
          className="relative text-slate-300/90 text-base max-w-[52ch] mx-auto mb-8 leading-[1.65]"
        >
          Open to senior AI roles and consulting on production LLM pipelines, agentic systems,
          and HPC-intensive AI infrastructure. If that overlaps with what you're building, reach out.
        </p>

        <div className="relative inline-flex flex-wrap justify-center items-center gap-3">
          <button
            type="button"
            onClick={onCopy}
            className="group inline-flex items-center gap-2.5 py-2 pl-5 pr-2 rounded-full bg-cyan-400 hover:bg-cyan-300 text-ink-0 text-[0.78rem] font-semibold uppercase tracking-[0.14em] shadow-[0_16px_36px_-14px_rgba(61,217,234,0.75),inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <span className="normal-case tracking-normal text-[0.92rem] font-medium">
              {profile.contacts.email}
            </span>
            <span className="grid place-items-center w-8 h-8 rounded-full bg-ink-0 text-cyan-300 transition-transform duration-200 group-hover:translate-x-1">
              <IconArrowRight size={14} />
            </span>
          </button>
          <a
            href={`mailto:${profile.contacts.email}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-slate-100 text-[0.78rem] font-medium uppercase tracking-[0.16em] hover:border-cyan-400/40 hover:bg-white/5 transition-all duration-200"
          >
            <IconMail size={14} />
            Send email
          </a>
        </div>

        <div className="relative mt-9 flex justify-center gap-2.5" aria-label="Social links">
          <SocialLink href={profile.contacts.github} label="GitHub">
            <IconGithub size={18} />
          </SocialLink>
          <SocialLink href={profile.contacts.linkedin} label="LinkedIn">
            <IconLinkedin size={18} />
          </SocialLink>
          <SocialLink href="/RESUME-ABDUSSAMAD-FEB-2026.pdf" label="Résumé PDF">
            <IconDoc size={18} />
          </SocialLink>
        </div>
      </div>
    </section>
  );
}

function SocialLink({
  href,
  label,
  children
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid place-items-center h-11 w-11 rounded-full bg-white/4 border border-white/10 text-slate-300 hover:text-cyan-200 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:-translate-y-0.5 transition-all duration-200"
    >
      {children}
    </a>
  );
}
