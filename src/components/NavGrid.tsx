import { navBlurb, navItems } from '../lib/nav';

export default function NavGrid() {
  return (
    <nav className="nav-grid panel-frame nav-grid--desktop" data-reveal aria-label="Primary">
      {navItems.map((item, index) => (
        <a key={item.href} href={item.href} className="nav-grid__item" data-tilt>
          <span className="nav-grid__icon">{item.icon}</span>
          <span className="nav-grid__index">{String(index + 1).padStart(2, '0')}</span>
          <h3 className="nav-grid__title">{item.label}</h3>
          <p>{navBlurb(item.label)}</p>
        </a>
      ))}
    </nav>
  );
}
