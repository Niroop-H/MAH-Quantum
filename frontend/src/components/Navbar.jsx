import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Magnetic } from './Interactive';

const LOGO = '/logo.jpeg';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/architecture', label: 'Architecture' },
  { to: '/d25', label: 'D25@1007' },
  { to: '/industries', label: 'Industries' },
  { to: '/services', label: 'Services' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-nav shadow-[0_2px_20px_rgba(0,0,0,0.06)]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" data-testid="nav-logo" className="flex items-center gap-2.5 group">
              <span className="relative flex items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-[#00B4FF]/40 animate-pulse-ring" />
                <img
                  src={LOGO}
                  alt="MAH Quantum"
                  className="relative w-9 h-9 rounded-full object-cover shadow-[0_0_12px_rgba(0,180,255,0.35)] group-hover:shadow-[0_0_20px_rgba(0,180,255,0.5)] transition-shadow duration-300"
                />
              </span>
              <span className="font-outfit font-bold text-lg text-slate-900 tracking-tight hidden sm:block">
                MAH <span className="text-gradient">Quantum</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    data-testid={`nav-link-${link.label.toLowerCase().replace('@', '').replace('/', '')}`}
                    className={`relative px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      active ? 'text-[#00B4FF]' : 'text-slate-600 hover:text-[#00B4FF]'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-lg bg-[#00B4FF]/8"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block">
                <Magnetic strength={8}>
                  <Link
                    to="/contact"
                    data-testid="nav-contact-btn"
                    className="inline-flex px-4 py-2 rounded-lg btn-primary text-sm"
                  >
                    Contact Us
                  </Link>
                </Magnetic>
              </div>
              <button
                data-testid="nav-mobile-toggle"
                onClick={() => setOpen(!open)}
                className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Toggle menu"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {open && (
        <div
          data-testid="nav-mobile-drawer"
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" />
          <div
            className="absolute top-16 left-0 right-0 glass-nav shadow-lg p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? 'text-[#00B4FF] bg-[#00B4FF]/8'
                      : 'text-slate-700 hover:text-[#00B4FF] hover:bg-[#00B4FF]/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="mt-2 px-4 py-3 rounded-xl btn-primary text-sm text-center"
              >
                Contact Us
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
