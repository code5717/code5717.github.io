import { heroSignal, RESUME_PATH } from '../lib/nav';
import { IconArrowRight } from '../lib/icons';

export default function HeroSection() {
  return (
    <section id="hero" className="hero panel-frame panel-frame--hero" aria-labelledby="hero-title">
      <div className="hero__ambient hero__ambient--one" aria-hidden="true" />
      <div className="hero__ambient hero__ambient--two" aria-hidden="true" />
      <div className="hero__rail hero__rail--left" aria-hidden="true">
        <span>Systems • Vision • NLP</span>
      </div>

      <div className="hero__copy">
        <p className="eyebrow">Senior AI Engineer</p>
        <h1
          id="hero-title"
          className="hero__title"
          aria-label="I build intelligent systems that hold up in production."
        >
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
          <a
            className="button button--secondary"
            href={RESUME_PATH}
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
          >
            <span>Download Resume</span>
            <span className="button__icon">
              <IconArrowRight size={14} />
            </span>
          </a>
        </div>
      </div>

      <div className="hero__visual" data-interactive-hero>
        <div className="portrait-frame portrait-frame--static">
          <div className="portrait-frame__inner">
            <img
              src="/imgs/proj-agents.png"
              alt="Abstract connected agent network representing production AI systems and orchestration."
              className="portrait-frame__image"
              width="1200"
              height="750"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
