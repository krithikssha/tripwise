import "./Navbar.css";

const navItems = [
  { label: "Discover", href: "#explore" },
  { label: "My Trip", href: "#my-trip" },
  { label: "Journal", href: "#travel-journal" },
  { label: "Plan a trip", href: "#trip-planner" },
];

function Navbar() {
  return (
    <header className="navbar">
      <a
        className="brand"
        href="#top"
        aria-label="TripWise home"
      >
        <span className="brand-symbol" aria-hidden="true">
          ✳
        </span>

        <span className="brand-wordmark">
          tripwise<span className="brand-period">.</span>
          <span className="brand-tagline">
            YOUR LITTLE GUIDE TO THE WORLD
          </span>
        </span>
      </a>

      <nav className="nav-links" aria-label="Main navigation">
        {navItems.map((item) => (
          <a
            className="nav-link"
            href={item.href}
            key={item.href}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <a className="nav-cta" href="#explore">
        <span>Find your next escape</span>
        <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}

export default Navbar;