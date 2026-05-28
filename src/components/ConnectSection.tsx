import type { MouseEvent } from 'react';
import { profile } from '../data/profile';
import { RESUME_PATH } from '../lib/nav';

type ConnectSectionProps = {
  onEmailClick: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export default function ConnectSection({ onEmailClick }: ConnectSectionProps) {
  return (
    <section id="connect" className="contact-bar panel-frame" data-reveal aria-labelledby="connect-heading">
      <div className="contact-bar__intro">
        <h2 id="connect-heading" data-scrub-text>
          Let&apos;s build the next dependable system.
        </h2>
        <a href={`mailto:${profile.contacts.email}`} data-magnetic onClick={onEmailClick}>
          Email Abdussamad Farooq Saeed
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
          <a href={`mailto:${profile.contacts.email}`} data-magnetic onClick={onEmailClick}>
            Email Abdussamad
          </a>
          <a
            href={profile.contacts.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
          >
            LinkedIn profile
          </a>
          <a
            href={profile.contacts.github}
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
          >
            GitHub profile
          </a>
          <a href={RESUME_PATH} target="_blank" rel="noopener noreferrer" data-magnetic>
            Download resume PDF
          </a>
        </div>
      </div>
    </section>
  );
}
