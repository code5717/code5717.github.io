import { profile } from '../data/profile';

export default function SkillsSection() {
  return (
    <section id="skills" className="content-split content-split--skills" aria-labelledby="skills-heading">
      <div className="section-copy" data-reveal>
        <p className="section-label">Skills</p>
        <h2 id="skills-heading" data-scrub-text>
          Capabilities &amp; tooling
        </h2>
        <p>Languages, frameworks, and infrastructure I rely on when shipping robust software.</p>
      </div>

      <div className="skill-grid" data-reveal style={{ ['--reveal-delay' as string]: '120ms' }}>
        {profile.skillGroups.map((band) => (
          <article key={band.label} className="skill-card panel-frame">
            <p className="skill-card__title">{band.label}</p>
            <div className="tag-row">
              {band.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
