import { profile } from '../data/profile';

export default function BackgroundSection() {
  return (
    <section id="background" className="content-split" aria-labelledby="background-heading">
      <div className="section-copy" data-reveal>
        <p className="section-label">Background</p>
        <h2 id="background-heading" data-scrub-text>
          Education &amp; context
        </h2>
        <p>Academic foundation, publication status, certification, and language range behind the work.</p>
      </div>

      <div className="background-grid" data-reveal>
        <article className="meta-card meta-card--featured panel-frame" data-meta-card data-tilt>
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
          <article className="meta-card panel-frame" data-meta-card data-tilt>
            <span className="meta-card__label">Certification</span>
            <h3>{profile.certification.title}</h3>
            <p>{profile.certification.issuer}</p>
            <small>Verified training</small>
          </article>

          <article className="meta-card panel-frame" data-meta-card data-tilt>
            <span className="meta-card__label">Publication</span>
            <h3>{profile.publication.status}</h3>
            <p>{profile.publication.title}</p>
            <small>{profile.publication.venue}</small>
            <div className="meta-card__body">
              <span>Detail</span>
              <p>{profile.publication.detail}</p>
            </div>
          </article>
        </div>

        <article className="meta-card meta-card--volunteering panel-frame" data-meta-card data-tilt>
          <span className="meta-card__label">Volunteering</span>
          <h3>{profile.volunteering.role}</h3>
          <p>{profile.volunteering.organization}</p>
          <small>{profile.volunteering.period}</small>
          <div className="meta-card__body">
            <span>Highlight</span>
            <p>{profile.volunteering.bullets[0]}</p>
          </div>
        </article>

        <article className="meta-card meta-card--languages panel-frame" data-meta-card data-tilt>
          <div>
            <span className="meta-card__label">Languages</span>
            <h3>Working languages</h3>
          </div>
          <div className="language-list">
            {profile.languages.map((item) => (
              <div key={item.name} className="language-list__item" data-meta-item>
                <strong>{item.name}</strong>
                <span>{item.fluency}</span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
