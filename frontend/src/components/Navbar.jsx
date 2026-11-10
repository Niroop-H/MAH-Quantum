import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { to: '/about', label: 'About' },
  { to: '/architecture', label: 'Architecture' },
  { to: '/d25', label: 'Projects' },
  { to: '/industries', label: 'Industries' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 18);
    };

    onScroll();

    window.addEventListener(
      'scroll',
      onScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        'scroll',
        onScroll
      );
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`site-nav ${
        scrolled ? 'site-nav-scrolled' : ''
      }`}
    >

      <div className="nav-inner">

        <Link
          to="/"
          className="brand"
          aria-label="MAH Quantum™ home"
        >

          <img
            src="/logo.jpeg"
            alt=""
          />

          <span>
            MAH <b>QUANTUM<sup className="brand-trademark">™</sup></b>
          </span>

        </Link>


        <nav
          className="desktop-nav"
          aria-label="Primary navigation"
        >

          {navLinks.map((link) => (

            <Link
              key={link.to}
              to={link.to}
              className={
                location.pathname === link.to
                  ? 'active'
                  : ''
              }
            >
              {link.label}
            </Link>

          ))}

          <a className="nav-external-link" href="https://mqsiquantum.mahquantum.tech/" target="_blank" rel="noopener noreferrer">
            MQSI Quantum <ArrowUpRight size={12} />
          </a>

        </nav>


        <Link
          className="nav-contact"
          to="/contact"
        >
          Contact
          <ArrowUpRight size={15} />
        </Link>


        <button
          className="mobile-menu"
          onClick={() => setOpen(!open)}
          aria-label="Open navigation"
        >

          {open
            ? <X size={21} />
            : <Menu size={21} />
          }

        </button>

      </div>


      {open && (

        <div className="mobile-nav">

          {navLinks.map((link) => (

            <Link
              key={link.to}
              to={link.to}
            >
              {link.label}
            </Link>

          ))}

          <a className="mobile-nav-external" href="https://mqsiquantum.mahquantum.tech/" target="_blank" rel="noopener noreferrer">
            MQSI Quantum Mission <ArrowUpRight size={15} />
          </a>

          <Link
            to="/contact"
            className="mobile-contact"
          >
            Contact MAH Quantum™
            <ArrowUpRight size={15} />
          </Link>

        </div>

      )}

    </header>
  );
}
