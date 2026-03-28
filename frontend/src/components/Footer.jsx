import { Link } from 'react-router-dom';
import { Mail, MapPin, Twitter, Linkedin, Github } from 'lucide-react';

const LOGO = '/logo.jpeg';

const footerLinks = {
  Company: [
    { to: '/about', label: 'About Us' },
    { to: '/team', label: 'Our Team' },
    { to: '/services', label: 'Services' },
    { to: '/contact', label: 'Contact' },
  ],
  Technology: [
    { to: '/architecture', label: 'Quantum Brain' },
    { to: '/d25', label: 'D25@1007 Framework' },
    { to: '/industries', label: 'Industries' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={LOGO} alt="MAH Quantum" className="w-10 h-10 rounded-full object-cover shadow-[0_0_16px_rgba(0,180,255,0.4)]" />
              <span className="font-outfit font-bold text-xl tracking-tight">
                MAH <span className="text-gradient">Quantum</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
              Engineering intelligent systems that operate seamlessly within real-world enterprise environments. Powered by the Quantum [-0-] Brain cognitive framework.
            </p>
            <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
              <Mail size={14} className="text-[#00B4FF]" />
              <a href="mailto:nirooph@mahquantum.tech" className="hover:text-[#00B4FF] transition-colors">
                nirooph@mahquantum.tech
              </a>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <a href="#" data-testid="footer-twitter" className="p-2 rounded-lg bg-white/5 hover:bg-[#00B4FF]/20 hover:text-[#00B4FF] transition-all duration-200">
                <Twitter size={16} />
              </a>
              <a href="#" data-testid="footer-linkedin" className="p-2 rounded-lg bg-white/5 hover:bg-[#00B4FF]/20 hover:text-[#00B4FF] transition-all duration-200">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-outfit font-semibold text-white mb-4 text-sm uppercase tracking-widest">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-slate-400 text-sm hover:text-[#00B4FF] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} MAH Quantum. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00B4FF] animate-pulse" />
            <span className="text-slate-500 text-xs">Systems Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
