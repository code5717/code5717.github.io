import { profile } from '../data/profile';
import { RESUME_PATH } from '../lib/nav';

export default function SiteFooter() {
  return (
    <footer className="footer" data-reveal>
      <span className="footer__brand">{profile.name}</span>
      <p>&copy; 2026 Production systems, research, and engineering work.</p>
      <div className="footer__links">
        <a href={RESUME_PATH} target="_blank" rel="noopener noreferrer" data-magnetic>
          Download resume PDF
        </a>
        <a href={profile.contacts.portfolio} target="_blank" rel="noopener noreferrer" data-magnetic>
          Portfolio home
        </a>
        <a href={profile.contacts.github} target="_blank" rel="noopener noreferrer" data-magnetic>
          GitHub profile
        </a>
      </div>
    </footer>
  );
}
