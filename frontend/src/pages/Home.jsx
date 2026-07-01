import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Brain, Zap, Building2, Truck, Activity, Target } from 'lucide-react';
import ParticleCanvas from '../components/ParticleCanvas';

const fadeUp = { initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const heroSlides = [
  {
    kicker: 'Quantum [-0-] Brain',
    title: 'Enterprise Intelligence, Rebuilt From Zero.',
    desc: 'A 5-layer cognitive architecture deployed as core infrastructure — not a bolt-on tool.',
    cta: { label: 'Explore the Architecture', to: '/architecture' },
    gradient: 'from-slate-950 via-slate-900 to-[#001830]',
  },
  {
    kicker: 'Global Recognition',
    title: 'NCAGE Registered. Crown Commercial Approved.',
    desc: 'Recognized by NATO procurement, the UK Crown Commercial Service, and the European Commission.',
    cta: { label: 'View Credentials', to: '/about' },
    gradient: 'from-slate-950 via-[#1a0b2e] to-[#2d0a3d]',
  },
  {
    kicker: 'Technology Partners',
    title: 'Built Alongside Intel, IBM, Microsoft, Google Cloud.',
    desc: 'Our infrastructure is engineered on and validated with the platforms enterprises already trust.',
    cta: { label: 'View Solutions', to: '/services' },
    gradient: 'from-slate-950 via-[#001830] to-[#001424]',
  },
];

function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % heroSlides.length), 6000);
    return () => clearInterval(t);
  }, []);

  const slide = heroSlides[active];

  return (
    <section className="relative h-[92vh] min-h-[600px] overflow-hidden bg-slate-950" data-testid="hero-carousel">
      <ParticleCanvas className="opacity-30" />
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}
        >
          <div className="absolute inset-0 flex items-end pb-20 sm:pb-28">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="max-w-2xl"
              >
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#00B4FF] mb-4 font-ibm">
                  {slide.kicker}
                </span>
                <h1 className="font-outfit font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-5 tracking-tight">
                  {slide.title}
                </h1>
                <p className="text-slate-300 text-base sm:text-lg mb-8 font-ibm leading-relaxed">
                  {slide.desc}
                </p>
                <Link to={slide.cta.to} className="btn-primary inline-flex items-center gap-2" data-testid="hero-carousel-cta">
                  {slide.cta.label} <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 right-6 sm:right-12 flex gap-2 z-10">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            data-testid={`hero-dot-${i}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-8 bg-[#00B4FF]' : 'w-4 bg-white/30 hover:bg-white/50'}`}
          />
        ))}
      </div>
    </section>
  );
}

const updates = [
  { tag: 'Recognition', title: 'MAH Quantum registered as NCAGE entity', desc: 'Now recognized for NATO and allied government procurement.', to: '/about' },
  { tag: 'Partnership', title: 'MAH Quantum joins global technology partner programs', desc: 'Validated partnerships with Intel, IBM, Microsoft, and Google Cloud.', to: '/about' },
  { tag: 'Compliance', title: 'Registered UK Crown Commercial overseas supplier', desc: 'Approved to engage with UK government procurement frameworks.', to: '/about' },
];

const homePartners = [
  { name: 'Intel', logo: '/partners/intel.svg' },
  { name: 'IBM', logo: '/partners/ibm.svg' },
  { name: 'Microsoft', logo: '/partners/microsoft.svg' },
  { name: 'Google Cloud', logo: '/partners/google-cloud.svg' },
];

const pillars = [
  { icon: Cpu, title: 'Zero-State Core', desc: 'Domain-agnostic intelligence foundation deployable across industries without structural modification.', color: '#00B4FF' },
  { icon: Brain, title: 'Quantum Brain', desc: '5-layer cognitive architecture integrating perception, memory, reasoning, planning and continuous learning.', color: '#8B5CF6' },
  { icon: Zap, title: 'Production-Ready', desc: 'Enterprise-grade systems embedded as core operational infrastructure, not standalone tools.', color: '#FF00A0' },
];

const stats = [
  { value: '25+', label: 'Depth Layers', sub: 'D25 Framework' },
  { value: '@1007', label: 'Intelligence Index', sub: 'Composite Score' },
  { value: '5', label: 'Core Sectors', sub: 'Industry Coverage' },
  { value: '5', label: 'Brain Layers', sub: 'Cognitive Architecture' },
];

const industries = [
  { icon: Building2, label: 'Manufacturing' },
  { icon: Truck, label: 'Logistics' },
  { icon: Activity, label: 'Healthcare' },
  { icon: Zap, label: 'Energy' },
  { icon: Target, label: 'Enterprise' },
];

export default function Home() {
  return (
    <div className="bg-[#F8FAFC]">
      <HeroCarousel />

      {/* ── LATEST UPDATES STRIP ─────────────────────────────────────── */}
      <section className="py-4 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 sm:grid-cols-3 gap-px bg-slate-100">
          {updates.map((u) => (
            <Link key={u.title} to={u.to} className="bg-white p-6 hover:bg-slate-50 transition-colors group">
              <span className="text-xs font-semibold text-[#00B4FF] uppercase tracking-wide font-ibm">{u.tag}</span>
              <h4 className="font-outfit font-semibold text-slate-900 text-base mt-2 mb-2 leading-snug group-hover:text-[#00B4FF] transition-colors">{u.title}</h4>
              <p className="text-slate-500 text-xs font-ibm leading-relaxed">{u.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div key={s.label} {...fadeUp} transition={{ delay: i * 0.1, duration: 0.5 }} className="text-center">
                <div className="font-outfit font-bold text-4xl text-gradient mb-1">{s.value}</div>
                <div className="font-semibold text-slate-800 text-sm">{s.label}</div>
                <div className="text-slate-400 text-xs mt-0.5">{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECOGNIZED BY ─────────────────────────────────────────────── */}
      <section className="py-14 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.p {...fadeUp} transition={{ duration: 0.5 }} className="text-center text-xs font-semibold tracking-widest uppercase text-slate-400 mb-8 font-ibm">
            Recognized Technology Partner
          </motion.p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center">
            {homePartners.map((p, i) => (
              <motion.div
                key={p.name}
                {...fadeUp}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                data-testid={`home-partner-${p.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center justify-center h-16 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <img src={p.logo} alt={`${p.name} — MAH Quantum technology partner`} className="max-h-8 sm:max-h-10 w-auto object-contain" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PILLARS ───────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="chip-blue mb-3 inline-block">Our Approach</span>
            <h2 className="font-outfit font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-4">Built for Enterprise. <span className="text-gradient">Designed for Scale.</span></h2>
            <p className="text-slate-500 max-w-xl mx-auto text-base px-4">MAH Quantum delivers integrated intelligence systems that function as core operational layers within organizations.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.title} {...fadeUp} transition={{ delay: i * 0.12, duration: 0.6 }} className="card-glass p-8">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${p.color}18` }}>
                    <Icon size={24} style={{ color: p.color }} />
                  </div>
                  <h3 className="font-outfit font-semibold text-xl text-slate-900 mb-3">{p.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-ibm">{p.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── QUANTUM BRAIN PREVIEW ─────────────────────────────────────── */}
      <section className="py-24 section-alt overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp} transition={{ duration: 0.7 }}>
              <span className="chip-blue mb-4 inline-block">Core Technology</span>
              <h2 className="font-outfit font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-6 leading-tight">
                The Quantum <span className="text-gradient">[-0-] Brain</span>
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-8 font-ibm">
                A modular, scalable cognitive architecture integrating perception, memory, reasoning, planning, and continuous learning into a cohesive intelligence system.
              </p>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 font-ibm">
                Unlike conventional AI systems constrained by task-specific design, the Quantum Brain enables contextual continuity, multi-step reasoning, and adaptive decision-making across complex operational workflows.
              </p>
              <Link to="/architecture" data-testid="home-architecture-cta" className="btn-primary inline-flex items-center gap-2">
                Explore Architecture <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div {...fadeUp} transition={{ delay: 0.2, duration: 0.7 }} className="relative flex justify-center">
              <div className="relative w-72 h-72">
                <div className="absolute inset-0 rounded-full border border-[#00B4FF]/20 pulse-ring-1" />
                <div className="absolute inset-4 rounded-full border border-[#FF00A0]/15 pulse-ring-2" />
                <div className="absolute inset-8 rounded-full border border-[#00B4FF]/10 pulse-ring-3" />
                <div className="absolute inset-12 rounded-full card-glass flex items-center justify-center shadow-[0_0_40px_rgba(0,180,255,0.2)]">
                  <div className="text-center">
                    <div className="font-outfit font-bold text-2xl text-gradient">[-0-]</div>
                    <div className="text-xs text-slate-500 mt-1 font-ibm">Zero-State Core</div>
                  </div>
                </div>
                {['Perception', 'Memory', 'Reasoning', 'Planning', 'Learning'].map((layer, i) => {
                  const angle = (i / 5) * 360 - 90;
                  const rad = (angle * Math.PI) / 180;
                  const x = 50 + 42 * Math.cos(rad);
                  const y = 50 + 42 * Math.sin(rad);
                  return (
                    <div key={layer} className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full card-glass flex items-center justify-center" style={{ left: `${x}%`, top: `${y}%` }}>
                      <div className="w-2 h-2 rounded-full" style={{ background: i % 2 === 0 ? '#00B4FF' : '#FF00A0' }} />
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="chip-pink mb-3 inline-block">Industries</span>
            <h2 className="font-outfit font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-4">Intelligent Systems <span className="text-gradient">Across Sectors</span></h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {industries.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <motion.div key={ind.label} {...fadeUp} transition={{ delay: i * 0.08, duration: 0.5 }}>
                  <Link to="/industries" data-testid={`home-industry-${ind.label.toLowerCase()}`} className="card-glass p-6 flex flex-col items-center gap-3 text-center group block">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00B4FF]/10 to-[#FF00A0]/8 flex items-center justify-center group-hover:from-[#00B4FF]/20 group-hover:to-[#FF00A0]/15 transition-all duration-300">
                      <Icon size={22} className="text-slate-600 group-hover:text-[#00B4FF] transition-colors" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-[#00B4FF] transition-colors">{ind.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link to="/industries" data-testid="home-industries-cta" className="btn-secondary inline-flex items-center gap-2">
              View All Industries <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATEMENT + QUICK LINKS ──────────────────────────────────── */}
      <section className="py-20 bg-slate-950 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h2 {...fadeUp} transition={{ duration: 0.7 }} className="font-outfit font-semibold text-2xl sm:text-3xl lg:text-4xl text-white leading-snug mb-10">
            We build the intelligence layer so enterprises can move from reactive to autonomous — <span className="text-gradient">without rebuilding what already works.</span>
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-ibm">
            {[
              { label: 'Architecture', to: '/architecture' },
              { label: 'Services', to: '/services' },
              { label: 'Industries', to: '/industries' },
              { label: 'Contact', to: '/contact' },
            ].map((l) => (
              <Link key={l.label} to={l.to} className="text-slate-400 hover:text-[#00B4FF] transition-colors border-b border-transparent hover:border-[#00B4FF] pb-0.5">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00B4FF]/8 via-transparent to-[#FF00A0]/8" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div {...fadeUp} transition={{ duration: 0.7 }}>
            <h2 className="font-outfit font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-6">
              Ready to Deploy <span className="text-gradient">Intelligent Systems?</span>
            </h2>
            <p className="text-slate-600 text-lg mb-8 font-ibm">
              Partner with MAH Quantum to embed AI as foundational infrastructure within your organization.
            </p>
            <Link to="/contact" data-testid="home-contact-cta" className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4">
              Start a Conversation <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
