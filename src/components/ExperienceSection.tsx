import { profile } from '../data/profile';

type ExperienceSectionProps = {
  activeExperience: number | null;
  onToggleExperience: (index: number) => void;
};

export default function ExperienceSection({
  activeExperience,
  onToggleExperience
}: ExperienceSectionProps) {
  return (
    <section id="experience" className="content-split" data-pin-section aria-labelledby="experience-heading">
      <div className="section-copy" data-reveal data-pin-target>
        <p className="section-label">Experience</p>
        <h2 id="experience-heading" data-scrub-text>
          Featured experience
        </h2>
        <p>
          A record of building and scaling AI systems in research labs, enterprise teams,
          and production engineering environments.
        </p>
        <a
          href={profile.contacts.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          data-magnetic
        >
          View LinkedIn experience timeline
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
              <div className="timeline__button">
                <div className="timeline__period">{entry.period}</div>
                <div className="timeline__body">
                  <h3>{entry.role}</h3>
                  <p className="timeline__company">
                    {entry.company}
                    {entry.companyUrl && (
                      <>
                        {' '}
                        <a
                          href={entry.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="timeline__company-link"
                          aria-label={`${entry.company} website (opens in new tab)`}
                        >
                          (link)
                        </a>
                      </>
                    )}
                  </p>
                  <p className="timeline__location">{entry.location}</p>
                  <div className={`timeline__details ${isOpen ? 'timeline__details--open' : ''}`}>
                    <div className="timeline__details-inner">
                      {entry.bullets.map((bullet) => (
                        <p key={bullet}>{bullet}</p>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className={`timeline__side ${isOpen ? 'timeline__side--open' : ''}`}
                  aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${entry.role} details`}
                  aria-expanded={isOpen}
                  onClick={() => onToggleExperience(index)}
                >
                  <span className="timeline__toggle">{isOpen ? '−' : '+'}</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
