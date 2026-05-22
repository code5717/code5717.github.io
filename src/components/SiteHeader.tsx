import type { RefObject } from 'react';
import { profile } from '../data/profile';
import { navItems, type SectionId } from '../lib/nav';
import { IconMenu } from '../lib/icons';

type SiteHeaderProps = {
  topbarScrolled: boolean;
  menuOpen: boolean;
  activeSection: SectionId;
  menuButtonRef: RefObject<HTMLButtonElement>;
  firstMenuLinkRef: RefObject<HTMLAnchorElement>;
  drawerRef: RefObject<HTMLElement>;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
};

export default function SiteHeader({
  topbarScrolled,
  menuOpen,
  activeSection,
  menuButtonRef,
  firstMenuLinkRef,
  drawerRef,
  onToggleMenu,
  onCloseMenu
}: SiteHeaderProps) {
  return (
    <>
      <header className={`topbar ${topbarScrolled ? 'topbar--scrolled' : ''}`}>
        <a href="#hero" className="brand-mark" aria-label={`${profile.name} home`}>
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
      </header>

      <div
        className={`mobile-menu-backdrop ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
        onClick={onCloseMenu}
      />

      <nav
        ref={drawerRef}
        id="mobile-navigation"
        className={`mobile-menu mobile-menu--drawer ${menuOpen ? 'is-open' : ''}`}
        aria-label="Mobile"
        aria-hidden={!menuOpen}
      >
        {navItems.map((item, index) => (
          <a
            key={item.href}
            ref={index === 0 ? firstMenuLinkRef : undefined}
            href={item.href}
            className={`mobile-menu__link ${activeSection === item.id ? 'mobile-menu__link--active' : ''}`}
            onClick={onCloseMenu}
            tabIndex={menuOpen ? 0 : -1}
          >
            <span className="mobile-menu__icon">{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </>
  );
}
