import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Handshake, Briefcase, Globe } from 'lucide-react';

const fadeUp = { initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const focusAreas = [
  { icon: Handshake, title: 'Strategic Partnerships', desc: 'Building and managing enterprise and institutional collaborations.' },
  { icon: Briefcase, title: 'Business Development', desc: 'Driving commercial engagements and go-to-market strategy.' },
  { icon: Globe, title: 'Industry Engagement', desc: 'Representing MAH Quantum in cross-sector conversations and standards work.' },
];

export default function QuantaIndustries() {
  return (
    <div className="bg-[#F8FAFC]">
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] orb-blue pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <Link to="/industries" className="inline-flex items-center gap-2 text-sm font-ibm text-slate-500 hover:text-slate-900 mb-8">
            <ArrowLeft size={16} /> Back to Industries
          </Link>
          <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <img
              src="/companies/quanta-industries.png"
              alt="Quanta Industries"
              className="w-20 h-20 object-cover rounded-xl border border-slate-200"
            />
            <div>
              <span className="chip-blue mb-3 inline-block">Business & Strategic Collaboration Division</span>
              <h1 className="font-outfit font-bold text-5xl sm:text-6xl text-slate-900 leading-tight">
                Quanta <span className="text-gradient">Industries</span>
              </h1>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.p {...fadeUp} transition={{ duration: 0.6 }} className="text-slate-600 text-lg leading-relaxed font-ibm max-w-3xl mb-14">
            Quanta Industries is the business and strategic collaboration division of MAH Quantum — facilitating
            partnerships, enterprise discussions, and industry engagement across our sectors of operation.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {focusAreas.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.title} {...fadeUp} transition={{ delay: i * 0.1, duration: 0.6 }} className="card-glass p-6">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: '#FF00A018' }}>
                    <Icon size={20} style={{ color: '#FF00A0' }} />
                  </div>
                  <h4 className="font-outfit font-semibold text-slate-900 text-base mb-2">{f.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-ibm">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <h2 className="font-outfit font-bold text-3xl text-slate-900 mb-4">Work with Quanta Industries</h2>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              Get in touch <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
