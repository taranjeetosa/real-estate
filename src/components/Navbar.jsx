import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

export default function Navbar({ links = [], onGetStarted }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleGetStarted() {
    closeMenu();
    onGetStarted();
  }

  return (
    <header className="site-header academy-header" data-testid="site-navbar">
      <a className="brand academy-brand" href="#home" aria-label="One Stock Academy home">
        <img className="brand-logo" src="/logo-brand.png" alt="One Stock Academy" />
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={21} /> : <Menu size={21} />}
      </button>
      <nav className={menuOpen ? "main-nav open" : "main-nav"} aria-label="Main navigation">
        {links.map(({ label, href }) => (
          <a href={href} key={href} onClick={closeMenu}>{label}</a>
        ))}
        {onGetStarted && (
          <button className="button button-nav" type="button" onClick={handleGetStarted}>
            Get started <ArrowRight size={16} />
          </button>
        )}
      </nav>
    </header>
  );
}
