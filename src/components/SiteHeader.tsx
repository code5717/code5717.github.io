import { useRef } from 'react';
import { profile } from '../data/profile';
import { navItems, RESUME_PATH, type SectionId } from '../lib/nav';
import { IconArrowRight, IconMenu } from '../lib/icons';
import { useMobileMenuMotion } from '../lib/gsap/dom';

type SiteHeaderProps = {
  topbarScrolled: boolean;
  menuOpen: boolean;
  activeSection: SectionId;
  menuButtonRef: React.RefObject<HTMLButtonElement>;
  firstMenuLinkRef: React.RefObject<HTMLAnchorElement>;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
};

export default function SiteHeader({
  topbarScrolled,
  menuOpen,
  activeSection,
  menuButtonRef,
  firstMenuLinkRef,
  onToggleMenu,
  onCloseMenu
}: SiteHeaderProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLElement>(null);

  useMobileMenuMotion(menuOpen, { backdropRef, drawerRef, menuButtonRef });

  return (
    <>
      <header className={`topbar ${topbarScrolled ? 'topbar--scrolled' : ''}`}>
        <a href="#hero" className="brand-mark" data-magnetic aria-label={`${profile.name} home`}>
          <span className="brand-mark__meta">
            <strong>{profile.name}</strong>
            <small>Living in Kingdom of Saudi Arabia · Canadian Citizen</small>
          </span>
        </a>

        <div className="topbar__status">
          <span className="status-dot" />
          <span>Available for new opportunities</span>
        </div>

        <nav className="topbar__nav" aria-label="Primary">
          <div className="desktop-nav">
            {navItems.slice(1).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`desktop-nav__link ${activeSection === item.id ? 'desktop-nav__link--active' : ''}`}
                aria-current={activeSection === item.id ? 'location' : undefined}
              >
                {item.label === "Let's Connect" ? 'Connect' : item.label}
              </a>
            ))}
          </div>
          <button
            ref={menuButtonRef}
            type="button"
            className="menu-button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            onClick={onToggleMenu}
          >
            <IconMenu size={18} />
          </button>
        </nav>

        <a
          className="topbar__resume"
          href={RESUME_PATH}
          target="_blank"
          rel="noopener noreferrer"
          data-magnetic
          aria-label="Download Abdussamad Farooq Saeed resume PDF"
        >
          <span>Download Resume</span>
          <IconArrowRight size={13} />
        </a>

        <div className="topbar__progress" aria-hidden="true" />
      </header>

      <div
        ref={backdropRef}
        className={`mobile-menu-backdrop ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
        onClick={onCloseMenu}
      />

      <nav
        ref={drawerRef}
        id="mobile-navigation"
        className={`mobile-menu mobile-menu--drawer ${menuOpen ? 'is-open' : ''}`}
        aria-label="Main navigation"
        aria-hidden={!menuOpen}
      >
        {navItems.map((item, index) => (
          <a
            key={item.href}
            ref={index === 0 ? firstMenuLinkRef : undefined}
            href={item.href}
            className={`mobile-menu__link ${activeSection === item.id ? 'mobile-menu__link--active' : ''}`}
            aria-current={activeSection === item.id ? 'location' : undefined}
            onClick={onCloseMenu}
            tabIndex={menuOpen ? 0 : -1}
          >
            <span className="mobile-menu__index">{String(index + 1).padStart(2, '0')}</span>
            <span>{item.label}</span>
          </a>
        ))}
        <a
          className="mobile-menu__cta"
          href={RESUME_PATH}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onCloseMenu}
          tabIndex={menuOpen ? 0 : -1}
          aria-label="Download Abdussamad Farooq Saeed resume PDF"
        >
          <span>Download Resume</span>
          <IconArrowRight size={13} />
        </a>
      </nav>
    </>
  );
}
