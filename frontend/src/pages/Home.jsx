import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Cpu, Brain, Eye, RefreshCw, Target, Zap, Building2, Truck, Activity } from 'lucide-react';
import ParticleCanvas from '../components/ParticleCanvas';

const LOGO = '/logo.jpeg';
const fadeUp = { initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

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
      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="hero-section">
        {/* Background orbs */}
        <div className="orb-blue absolute top-0 right-0 w-[700px] h-[700px] pointer-events-none" />
        <div className="orb-pink absolute bottom-0 left-0 w-[600px] h-[600px] pointer-events-none" style={{ animationDelay: '4s' }} />

        {/* Particle Network */}
        <ParticleCanvas className="opacity-70" />

        {/* Floating badges */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block" style={{ zIndex: 2 }}>
          <div className="float-1 absolute top-32 left-12 card-glass px-4 py-2.5 rounded-xl">
            <span className="text-xs font-semibold text-[#00B4FF]">D25</span>
            <span className="text-xs text-slate-500 ml-1">Deep Reasoning</span>
          </div>
          <div className="float-2 absolute top-48 right-16 card-glass px-4 py-2.5 rounded-xl">
            <span className="text-xs font-semibold text-[#FF00A0]">@1007</span>
            <span className="text-xs text-slate-500 ml-1">Intelligence Index</span>
          </div>
          <div className="float-3 absolute bottom-40 right-20 card-glass px-4 py-2.5 rounded-xl">
            <span className="text-xs font-semibold text-gradient">[-0-]</span>
            <span className="text-xs text-slate-500 ml-1">Zero-State Core</span>
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-8">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="flex justify-center mb-8">
            <img src={LOGO} alt="MAH Quantum" className="w-28 h-28 rounded-full object-cover shadow-[0_0_50px_rgba(0,180,255,0.4)] border-2 border-white/60" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }} className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium bg-white/60 backdrop-blur-md border border-white/80 text-slate-700 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00B4FF] animate-pulse" />
              Quantum [-0-] Brain • Zero-State Core Architecture
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }} className="font-outfit font-bold text-5xl sm:text-6xl lg:text-7xl text-slate-900 leading-tight mb-6 tracking-tight">
            Engineering Intelligence{' '}
            <span className="text-gradient block sm:inline">Beyond Boundaries</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }} className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-ibm">
            Advanced AI and IT systems embedded as foundational infrastructure within enterprise environments — designed to reduce operational losses and enable data-driven decision-making.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6 }} className="flex flex-wrap gap-4 justify-center">
            <Link to="/architecture" data-testid="hero-explore-cta" className="btn-primary flex items-center gap-2">
              Explore Quantum Brain <ArrowRight size={18} />
            </Link>
            <Link to="/services" data-testid="hero-solutions-cta" className="btn-secondary">
              View Solutions
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-slate-400 flex flex-col items-center gap-1" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <span className="text-xs text-slate-400">Scroll</span>
          <ChevronDown size={20} />
        </motion.div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white border-y border-slate-100">
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

      {/* ── PILLARS ───────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="chip-blue mb-3 inline-block">Our Approach</span>
            <h2 className="font-outfit font-bold text-4xl sm:text-5xl text-slate-900 mb-4">Built for Enterprise. <span className="text-gradient">Designed for Scale.</span></h2>
            <p className="text-slate-500 max-w-xl mx-auto text-base">MAH Quantum delivers integrated intelligence systems that function as core operational layers within organizations.</p>
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
              <h2 className="font-outfit font-bold text-4xl sm:text-5xl text-slate-900 mb-6 leading-tight">
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

            {/* Visual */}
            <motion.div {...fadeUp} transition={{ delay: 0.2, duration: 0.7 }} className="relative flex justify-center">
              <div className="relative w-72 h-72">
                {/* Pulsing rings */}
                <div className="absolute inset-0 rounded-full border border-[#00B4FF]/20 pulse-ring-1" />
                <div className="absolute inset-4 rounded-full border border-[#FF00A0]/15 pulse-ring-2" />
                <div className="absolute inset-8 rounded-full border border-[#00B4FF]/10 pulse-ring-3" />
                {/* Core */}
                <div className="absolute inset-12 rounded-full card-glass flex items-center justify-center shadow-[0_0_40px_rgba(0,180,255,0.2)]">
                  <div className="text-center">
                    <div className="font-outfit font-bold text-2xl text-gradient">[-0-]</div>
                    <div className="text-xs text-slate-500 mt-1 font-ibm">Zero-State Core</div>
                  </div>
                </div>
                {/* Orbital dots */}
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
            <h2 className="font-outfit font-bold text-4xl sm:text-5xl text-slate-900 mb-4">Intelligent Systems <span className="text-gradient">Across Sectors</span></h2>
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

      {/* ── CTA BANNER ────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00B4FF]/8 via-transparent to-[#FF00A0]/8" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div {...fadeUp} transition={{ duration: 0.7 }}>
            <h2 className="font-outfit font-bold text-4xl sm:text-5xl text-slate-900 mb-6">
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
