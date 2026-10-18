
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <a
        className="brand"
        href="#top"
        aria-label="TripWise home"
      >
        <span className="brand-symbol">✳</span>
        <span>
          tripwise<span className="brand-period">.</span>
        </span>
      </a>

      <nav className="nav-links" aria-label="Main navigation">
        <a className="nav-link active" href="#explore">
          Explore
        </a>

        <a className="nav-link" href="#my-trip">
          My Trip
        </a>
      </nav>

      <a className="nav-cta" href="#explore">
        Let's explore <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}

export default Navbar;
