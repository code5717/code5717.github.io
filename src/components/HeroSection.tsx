import { heroSignal, RESUME_PATH } from '../lib/nav';
import { IconArrowRight } from '../lib/icons';

export default function HeroSection() {
  return (
    <section id="hero" className="hero panel-frame panel-frame--hero" aria-labelledby="hero-title">
      <div className="hero__copy">
        <h1 id="hero-title" className="hero__title">
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
        <p className="hero__role" data-stagger-text>
          Senior AI Engineer
        </p>
        <p className="hero__lede">
          Designing and shipping production-grade AI systems across agentic workflows,
          Arabic NLP, computer vision, and high-performance compute.
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
              src="/imgs/pfp-520.webp?v=3"
              srcSet="/imgs/pfp-520.webp?v=3 520w, /imgs/pfp-1040.webp?v=3 1040w"
              sizes="(max-width: 400px) 180px, (max-width: 640px) 204px, (max-width: 900px) 280px, (max-width: 1180px) 40vw, 660px"
              alt="Professional portrait of Abdussamad Farooq Saeed, Senior AI Engineer."
              className="portrait-frame__image"
              width="1040"
              height="1040"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
