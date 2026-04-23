import { useEffect, useState } from 'react';
import { profile } from './data/profile';
import { useReveal } from './lib/useReveal';
import {
  IconArrowRight,
  IconBriefcase,
  IconFolder,
  IconGlobe,
  IconLayers,
  IconMail,
  IconMenu,
  IconUser
} from './lib/icons';

const navItems = [
  { href: '#hero', label: 'Profile', icon: <IconUser size={18} /> },
  { href: '#experience', label: 'Experience', icon: <IconBriefcase size={18} /> },
  { href: '#skills', label: 'Skills', icon: <IconLayers size={18} /> },
  { href: '#projects', label: 'Projects', icon: <IconFolder size={18} /> },
  { href: '#background', label: 'Background', icon: <IconGlobe size={18} /> },
  { href: '#connect', label: "Let's Connect", icon: <IconMail size={18} /> }
];

const heroSignal = ['Agentic workflows', 'Arabic NLP', 'Computer vision', 'CUDA + HPC', 'Systems design'];

const skillBands = [
  {
    title: 'Languages',
    items: ['Python', 'C', 'C++', 'CUDA', 'SQL', 'Go']
  },
  {
    title: 'Machine Learning',
    items: ['PyTorch', 'Transformers', 'YOLO', 'OpenCV', 'TinyGrad']
  },
  {
    title: 'Data & Platforms',
    items: ['Linux', 'Docker', 'Kafka', 'BigQuery', 'Git', 'CMake']
  },
  {
    title: 'Systems & Tooling',
    items: ['HPC', 'RAG', 'CUDA Opt', 'Cybersecurity', 'Agents', 'Ninja']
  }
];

export default function App() {
  useReveal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeExperience, setActiveExperience] = useState<number | null>(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(pointer: fine)');
    if (reducedMotion.matches || !finePointer.matches) return;

    const heroVisual = document.querySelector<HTMLElement>('[data-interactive-hero]');
    const magneticTargets = document.querySelectorAll<HTMLElement>('[data-magnetic]');
    const tiltTargets = document.querySelectorAll<HTMLElement>('[data-tilt]');

    const cleanup: Array<() => void> = [];

    if (heroVisual) {
      const handleMove = (event: PointerEvent) => {
        const rect = heroVisual.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        const tiltX = (py - 0.5) * -10;
        const tiltY = (px - 0.5) * 12;

        heroVisual.style.setProperty('--pointer-x', `${(px * 100).toFixed(2)}%`);
        heroVisual.style.setProperty('--pointer-y', `${(py * 100).toFixed(2)}%`);
        heroVisual.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
        heroVisual.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
      };

      const resetHero = () => {
        heroVisual.style.removeProperty('--pointer-x');
        heroVisual.style.removeProperty('--pointer-y');
        heroVisual.style.removeProperty('--tilt-x');
        heroVisual.style.removeProperty('--tilt-y');
      };

      heroVisual.addEventListener('pointermove', handleMove);
      heroVisual.addEventListener('pointerleave', resetHero);
      cleanup.push(() => {
        heroVisual.removeEventListener('pointermove', handleMove);
        heroVisual.removeEventListener('pointerleave', resetHero);
      });
    }

    magneticTargets.forEach((element) => {
      const handleMove = (event: PointerEvent) => {
        const rect = element.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 14;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 12;
        element.style.setProperty('--magnetic-x', `${x.toFixed(2)}px`);
        element.style.setProperty('--magnetic-y', `${y.toFixed(2)}px`);
      };

      const reset = () => {
        element.style.removeProperty('--magnetic-x');
        element.style.removeProperty('--magnetic-y');
      };

      element.addEventListener('pointermove', handleMove);
      element.addEventListener('pointerleave', reset);
      cleanup.push(() => {
        element.removeEventListener('pointermove', handleMove);
        element.removeEventListener('pointerleave', reset);
      });
    });

    tiltTargets.forEach((element) => {
      const handleMove = (event: PointerEvent) => {
        const rect = element.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        element.style.setProperty('--tilt-x', `${((py - 0.5) * -7).toFixed(2)}deg`);
        element.style.setProperty('--tilt-y', `${((px - 0.5) * 9).toFixed(2)}deg`);
      };

      const reset = () => {
        element.style.removeProperty('--tilt-x');
        element.style.removeProperty('--tilt-y');
      };

      element.addEventListener('pointermove', handleMove);
      element.addEventListener('pointerleave', reset);
      cleanup.push(() => {
        element.removeEventListener('pointermove', handleMove);
        element.removeEventListener('pointerleave', reset);
      });
    });

    return () => cleanup.forEach((fn) => fn());
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const featuredProjects = [
    {
      ...profile.projects[0],
      image: '/imgs/proj-cubesat.png',
      imageAlt: 'CubeSat debris detection interface showing orbital tracking and telemetry visuals.',
      summary: 'YOLOv11-based debris detection and onboard systems integration for a constrained CubeSat platform.',
      tags: ['YOLOv11', 'Embedded C++', 'Telemetry']
    },
    {
      ...profile.projects[1],
      image: '/imgs/proj-arcade.png',
      imageAlt: 'Custom arcade cabinet hardware with illuminated controls and a retro game display.',
      summary: 'Custom Raspberry Pi 5 arcade hardware with a compact software stack for retro and WASM-based play.',
      tags: ['Raspberry Pi 5', 'WASM Games', 'Hardware Build']
    },
    {
      ...profile.projects[2],
      image: '/imgs/proj-compiler.png',
      imageAlt: 'Programming language project interface with compiler diagnostics and syntax views.',
      summary: 'A programming language built from scratch, covering lexer, parser, semantics, diagnostics, and execution flow.',
      tags: ['Language Design', 'Parsing', 'Semantics']
    }
  ];

  return (
    <div className="site-shell">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <div className="chrome-grid" aria-hidden="true" />
      <div className="chrome-vignette" aria-hidden="true" />

      <header className="topbar">
        <a href="#hero" className="brand-mark" aria-label={`${profile.name} home`}>
          <span className="brand-mark__meta">
            <strong>{profile.name}</strong>
            <small>Saudi Arabia • Canada</small>
          </span>
        </a>

        <div className="topbar__status">
          <span className="status-dot" />
          <span>Available for new opportunities</span>
        </div>

        <button
          type="button"
          className="menu-button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <IconMenu size={18} />
        </button>

        {menuOpen && (
          <nav id="mobile-navigation" className="mobile-menu" aria-label="Section navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main id="main" className="page">
        <section id="hero" className="hero panel-frame panel-frame--hero">
          <div className="hero__ambient hero__ambient--one" aria-hidden="true" />
          <div className="hero__ambient hero__ambient--two" aria-hidden="true" />
          <div className="hero__rail hero__rail--left" aria-hidden="true">
            <span>Systems • Vision • NLP</span>
          </div>

          <div className="hero__copy" data-reveal>
            <p className="eyebrow">Senior AI Engineer • Saudi Arabia</p>
            <h1 className="hero__title" aria-label="I build intelligent systems that hold up in production.">
              <span className="hero__title-line" data-stagger-text>
                I Build
              </span>
              <span className="hero__title-line" data-stagger-text>
                Intelligent
              </span>
              <span className="hero__title-line hero__title-line--accent" data-stagger-text>
                Systems_
              </span>
            </h1>
            <p className="hero__lede">
              Designing and shipping production systems across agentic workflows, Arabic NLP,
              computer vision, and high-performance compute.
            </p>
            <div className="hero__ticker" aria-label="Core focus areas">
              <div className="hero__ticker-track">
                {[...heroSignal, ...heroSignal].map((item, index) => (
                  <span key={`${item}-${index}`}>{item}</span>
                ))}
              </div>
            </div>
            <div className="hero__actions">
              <a className="button button--primary" href="#projects" data-magnetic>
                <span>View My Work</span>
                <span className="button__icon">
                  <IconArrowRight size={14} />
                </span>
              </a>
            </div>
          </div>

          <div
            className="hero__visual"
            data-reveal
            data-interactive-hero
            style={{ ['--reveal-delay' as string]: '120ms' }}
          >
            <div className="portrait-frame">
              <div className="portrait-frame__inner">
                <img
                  src="/imgs/pfp-regenerated.png"
                  alt={`Portrait of ${profile.name}`}
                  className="portrait-frame__image"
                />
              </div>
            </div>

            <div className="floating-card floating-card--signature">
              <div>
                <p className="floating-card__label">Based in Saudi Arabia</p>
              </div>
              <div>
                <strong>AI Systems</strong>
                <span>LLMs, vision, HPC</span>
              </div>
            </div>
          </div>
        </section>

        <section className="nav-grid panel-frame" data-reveal aria-label="Quick navigation">
          {navItems.map((item, index) => (
            <a key={item.href} href={item.href} className="nav-grid__item" data-tilt>
              <span className="nav-grid__icon">{item.icon}</span>
              <span className="nav-grid__index">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="nav-grid__title">{item.label}</h3>
              <p>{navBlurb(item.label)}</p>
            </a>
          ))}
        </section>

        <section id="experience" className="content-split" data-pin-section>
          <div className="section-copy" data-reveal data-pin-target>
            <p className="section-label">Experience</p>
            <h2 data-scrub-text>Featured experience</h2>
            <p>
              A record of building and scaling AI systems in research labs, enterprise teams,
              and production engineering environments.
            </p>
            <a href={profile.contacts.linkedin} target="_blank" rel="noreferrer" data-magnetic>
              View full timeline
            </a>
          </div>

          <div className="timeline panel-frame" data-reveal style={{ ['--reveal-delay' as string]: '120ms' }}>
            {profile.experience.map((entry, index) => {
              const isOpen = activeExperience === index;
              return (
                <article
                  key={`${entry.company}-${entry.period}`}
                  className={`timeline__entry ${isOpen ? 'timeline__entry--active' : ''}`}
                >
                  <button
                    type="button"
                    className="timeline__button"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setActiveExperience((current) => (current === index ? null : index))
                    }
                  >
                    <div className="timeline__period">{entry.period}</div>
                    <div className="timeline__body">
                      <h3>{entry.role}</h3>
                      <p className="timeline__company">{entry.company}</p>
                      <p className="timeline__location">{entry.location}</p>
                      <div className={`timeline__details ${isOpen ? 'timeline__details--open' : ''}`}>
                        <div className="timeline__details-inner">
                          {entry.bullets.map((bullet) => (
                            <p key={bullet}>{bullet}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className={`timeline__side ${isOpen ? 'timeline__side--open' : ''}`}>
                      <span className="timeline__toggle">{isOpen ? '−' : '+'}</span>
                    </div>
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <section id="skills" className="content-split content-split--skills">
          <div className="section-copy" data-reveal>
            <p className="section-label">Skills</p>
            <h2 data-scrub-text>Capabilities &amp; tooling</h2>
            <p>Languages, frameworks, and infrastructure I rely on when shipping robust software.</p>
          </div>

          <div className="skill-grid" data-reveal style={{ ['--reveal-delay' as string]: '120ms' }}>
            {skillBands.map((band) => (
              <article key={band.title} className="skill-card panel-frame">
                <p className="skill-card__title">{band.title}</p>
                <div className="tag-row">
                  {band.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="content-split">
          <div className="section-copy" data-reveal>
            <p className="section-label">Projects</p>
            <h2 data-scrub-text>Selected projects</h2>
            <p>
              A few systems shaped for real operating conditions, constrained hardware, and
              measurable performance.
            </p>
            <a href={profile.contacts.github} target="_blank" rel="noreferrer" data-magnetic>
              View all projects
            </a>
          </div>

          <div className="project-grid" data-reveal style={{ ['--reveal-delay' as string]: '120ms' }}>
            {featuredProjects.map((project, index) => (
              <article key={project.name} className="project-card panel-frame" data-scale-fade data-tilt>
                <div className="project-card__media">
                  <img src={project.image} alt={project.imageAlt} />
                </div>
                <span className="project-card__index">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="project-card__title">{project.name}</h3>
                <p className="project-card__summary">{project.summary}</p>
                <div className="project-card__tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="background" className="content-split">
          <div className="section-copy" data-reveal>
            <p className="section-label">Background</p>
            <h2 data-scrub-text>Education &amp; context</h2>
            <p>Academic foundation, publication status, certification, and language range behind the work.</p>
          </div>

          <div className="background-grid" data-reveal style={{ ['--reveal-delay' as string]: '120ms' }}>
            <article className="meta-card meta-card--featured panel-frame">
              <span className="meta-card__label">Education</span>
              <h3>{profile.education.degree}</h3>
              <p>{profile.education.institution}</p>
              <small>{profile.education.period}</small>
              <div className="meta-card__body">
                <span>Coursework</span>
                <p>{profile.education.coursework}</p>
              </div>
            </article>

            <div className="meta-stack">
              <article className="meta-card panel-frame">
                <span className="meta-card__label">Certification</span>
                <h3>{profile.certification.title}</h3>
                <p>{profile.certification.issuer}</p>
                <small>Verified training</small>
              </article>

              <article className="meta-card panel-frame">
                <span className="meta-card__label">Publication</span>
                <h3>{profile.publication.status}</h3>
                <p>{profile.publication.title}</p>
                <small>{profile.publication.venue}</small>
              </article>
            </div>

            <article className="meta-card meta-card--languages panel-frame">
              <div>
                <span className="meta-card__label">Languages</span>
                <h3>Working languages</h3>
              </div>
              <div className="language-list">
                {profile.languages.map((item) => (
                  <div key={item.name} className="language-list__item">
                    <strong>{item.name}</strong>
                    <span>{item.fluency}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section id="connect" className="contact-bar panel-frame" data-reveal>
          <div className="contact-bar__intro">
            <h2>Let&apos;s build the next dependable system.</h2>
            <a href={`mailto:${profile.contacts.email}`} data-magnetic>
              Get in touch
            </a>
          </div>

          <div className="contact-bar__detail">
            <span className="section-label">Availability</span>
            <p>Open to AI engineering, systems architecture, and R&amp;D opportunities.</p>
            <small>Based in {profile.location}</small>
          </div>

          <div className="contact-bar__detail">
            <span className="section-label">Connect</span>
            <div className="contact-links">
              <a href={`mailto:${profile.contacts.email}`} data-magnetic>
                Email
              </a>
              <a href={profile.contacts.linkedin} target="_blank" rel="noreferrer" data-magnetic>
                LinkedIn
              </a>
              <a href={profile.contacts.github} target="_blank" rel="noreferrer" data-magnetic>
                GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span className="footer__brand">{profile.name}</span>
        <p>
          &copy; 2026 Production systems, research, and engineering work.
        </p>
        <div className="footer__links">
          <a href={profile.contacts.portfolio} target="_blank" rel="noreferrer" data-magnetic>
            Portfolio
          </a>
          <a href={profile.contacts.github} target="_blank" rel="noreferrer" data-magnetic>
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}

function navBlurb(label: string) {
  switch (label) {
    case 'Profile':
      return 'Current role, location, and working focus.';
    case 'Experience':
      return 'Teams, systems, and delivery history.';
    case 'Projects':
      return 'Builds tuned for real constraints.';
    case 'Skills':
      return 'Languages, platforms, and tooling.';
    case 'Background':
      return 'Education, writing, and fluency.';
    default:
      return 'Open to new collaborations and roles.';
  }
}
