import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';

const fadeUp = { initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const divisions = [
  {
    id: 'ds-industries',
    name: 'D.S Industries',
    tagline: 'Engineering & Manufacturing Division',
    image: '/companies/ds-industries.jpeg',
    desc: 'The industrial engineering and production arm — responsible for hardware integration, manufacturing partnerships, and physical deployment of MAH Quantum systems.',
    to: '/industries/ds-industries',
  },
  {
    id: 'quanta-industries',
    name: 'Quanta Industries',
    tagline: 'Business & Strategic Collaboration Division',
    image: '/companies/quanta-industries.png',
    desc: 'The business and strategic collaboration division facilitating partnerships, enterprise discussions, and industry engagement on behalf of MAH Quantum.',
    to: '/industries/quanta-industries',
  },
];

export default function Industries() {
  return (
    <div className="bg-[#F8FAFC]">
      {/* Header */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] orb-blue pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="max-w-3xl">
            <span className="chip-blue mb-4 inline-block">Industries</span>
            <h1 className="font-outfit font-bold text-5xl sm:text-6xl text-slate-900 leading-tight mb-6">
              Our <span className="text-gradient">Divisions</span>
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed font-ibm">
              MAH Quantum operates through specialized divisions, each focused on a distinct part of bringing intelligent systems from research to real-world deployment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Division Cards */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {divisions.map((d, i) => (
              <motion.div
                key={d.id}
                {...fadeUp}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                data-testid={`division-card-${d.id}`}
              >
                <Link to={d.to} className="card-glass overflow-hidden group flex flex-col h-full">
                  <div className="relative h-48 overflow-hidden bg-slate-900 flex items-center justify-center p-8">
                    <img
                      src={d.image}
                      alt={d.name}
                      className="max-h-full max-w-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <div className="text-xs font-semibold font-ibm text-[#00B4FF] mb-2">{d.tagline}</div>
                    <h2 className="font-outfit font-bold text-2xl text-slate-900 mb-3">{d.name}</h2>
                    <p className="text-slate-600 text-sm leading-relaxed font-ibm mb-6 flex-1">{d.desc}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#00B4FF] font-ibm">
                      Explore division <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Link to Sectors */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6 }}
            className="card-glass p-10 flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: '#00B4FF15' }}>
                <Compass size={22} style={{ color: '#00B4FF' }} />
              </div>
              <div>
                <span className="text-xs font-semibold font-ibm text-[#00B4FF] block mb-1">Looking for sector solutions?</span>
                <h3 className="font-outfit font-semibold text-xl text-slate-900">
                  See how we apply AI across manufacturing, healthcare, logistics, energy, and enterprise.
                </h3>
              </div>
            </div>
            <Link to="/sectors" data-testid="industries-sectors-link" className="btn-primary inline-flex items-center gap-2 whitespace-nowrap">
              View sectors <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <h2 className="font-outfit font-bold text-4xl text-slate-900 mb-4">
              Partner with <span className="text-gradient">Our Divisions</span>
            </h2>
            <p className="text-slate-500 text-base mb-8 font-ibm">
              Reach out to explore engineering, manufacturing, or strategic collaboration opportunities.
            </p>
            <Link to="/contact" data-testid="industries-contact-cta" className="btn-primary inline-flex items-center gap-2">
              Get Started <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
