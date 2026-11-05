const navItems = [
  { label: 'Dashboard', href: '#overview' },
  { label: 'Agent overview', href: '#agents' },
  { label: 'Care coordination', href: '#care-flow' },
  { label: 'Staff contact', href: '#contact' },
];

function Header() {
  return (
    <header className="topbar">
      <div className="brand" aria-label="AgentClinic home">
        <span className="brand-mark">AC</span>
        <span>AgentClinic</span>
      </div>

      <nav className="main-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export default Header;
