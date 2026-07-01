import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Truck, Activity, Zap, Target } from 'lucide-react';

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' } };

const INK = '#0B0F19';
const BLUE = '#0B5FFF';
const MAGENTA = '#C6006F';
const LINE = '#E4E7EC';

/* ── Architecture schematic — the hero's signature element ─────────── */
const layers = [
  { id: 'L1', name: 'Perception', y: 20 },
  { id: 'L2', name: 'Memory', y: 88 },
  { id: 'L3', name: 'Reasoning', y: 156 },
  { id: 'L4', name: 'Planning', y: 224 },
  { id: 'L5', name: 'Learning', y: 292 },
];

function BrainSchematic() {
  return (
    <svg viewBox="0 0 460 380" className="w-full h-auto max-w-md" role="img" aria-label="Quantum Brain five-layer architecture diagram">
      {layers.map((l, i) => (
        <g key={l.id}>
          <motion.path
            d={`M190,${l.y + 24} C 250,${l.y + 24} 250,196 300,196`}
            fill="none"
            stroke={LINE}
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.6, ease: 'easeInOut' }}
          />
          <motion.g
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <rect x="20" y={l.y} width="170" height="48" fill="#FFFFFF" stroke={INK} strokeWidth="1" />
            <text x="34" y={l.y + 20} fontFamily="ui-monospace, monospace" fontSize="10" fill={BLUE} fontWeight="600">{l.id}</text>
            <text x="34" y={l.y + 36} fontFamily="Outfit, sans-serif" fontSize="14" fill={INK} fontWeight="600">{l.name}</text>
          </motion.g>
        </g>
      ))}
      <motion.g
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <rect x="300" y="156" width="140" height="80" fill={INK} />
        <text x="370" y="192" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="16" fill="#FFFFFF" fontWeight="700">[-0-]</text>
        <text x="370" y="212" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fill="#94A3B8" letterSpacing="0.5">ZERO-STATE CORE</text>
      </motion.g>
    </svg>
  );
}

const credentials = [
  { tag: 'NCAGE 8066Y', label: 'NATO Commercial & Government Entity' },
  { tag: 'UK CCS', label: 'Crown Commercial Service — Overseas Supplier' },
  { tag: 'EU PIC', label: 'European Commission — Participant ID' },
  { tag: 'UDYAM-KR-03-0680324', label: 'Govt. of India — MSME Registered' },
];

const partners = ['Intel', 'IBM', 'Microsoft', 'Google Cloud'];

const stats = [
  { value: '25+', label: 'Depth Layers', sub: 'D25 Framework' },
  { value: '@1007', label: 'Intelligence Index', sub: 'Composite Score' },
  { value: '5', label: 'Core Sectors', sub: 'Industry Coverage' },
  { value: '5', label: 'Brain Layers', sub: 'Cognitive Architecture' },
];

const pillars = [
  { tag: '[CORE-01]', title: 'Zero-State Core', desc: 'A domain-agnostic intelligence foundation deployable across industries without structural modification.' },
  { tag: '[CORE-02]', title: 'Quantum Brain', desc: 'Five functional layers integrating perception, memory, reasoning, planning and continuous learning.' },
  { tag: '[CORE-03]', title: 'Production-Ready', desc: 'Enterprise-grade systems embedded as operational infrastructure, not standalone tools.' },
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
    <div className="bg-white">
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="pt-28 sm:pt-36 pb-20" data-testid="hero-section">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-14 lg:gap-20 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-block font-mono text-xs tracking-[0.2em] uppercase mb-5" style={{ color: BLUE }}>
                AI Infrastructure — Deep Tech
              </span>
              <h1 className="font-outfit font-bold text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] mb-6" style={{ color: INK }}>
                Enterprise intelligence, rebuilt from zero.
              </h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-9 max-w-lg font-ibm">
                MAH Quantum builds the Quantum [-0-] Brain — a five-layer cognitive architecture that manufacturers, hospitals, and enterprises run as core infrastructure, not a bolted-on tool.
              </p>
              <div className="flex flex-wrap items-center gap-5 mb-10">
                <Link
                  to="/architecture"
                  data-testid="hero-explore-cta"
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200"
                  style={{ background: INK }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = BLUE)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = INK)}
                >
                  See the architecture <ArrowRight size={16} />
                </Link>
                <Link to="/about" data-testid="hero-credentials-cta" className="text-sm font-semibold border-b border-slate-300 hover:border-[#0B0F19] pb-0.5 transition-colors" style={{ color: INK }}>
                  Read our credentials
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }} className="flex justify-center lg:justify-end">
              <BrainSchematic />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CREDENTIALS BAND ────────────────────────────────────────── */}
      <section className="border-t border-b py-14" style={{ borderColor: LINE, background: '#F5F7FA' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x" style={{ borderColor: LINE }}>
            {credentials.map((c, i) => (
              <motion.div key={c.tag} {...fadeUp} transition={{ delay: i * 0.08, duration: 0.5 }} className="py-4 sm:py-0 sm:px-6 first:sm:pl-0">
                <div className="font-mono text-xs font-semibold mb-1.5" style={{ color: MAGENTA }}>{c.tag}</div>
                <div className="text-slate-600 text-sm leading-snug font-ibm">{c.label}</div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 pt-6 border-t flex flex-wrap items-center gap-x-8 gap-y-2" style={{ borderColor: LINE }}>
            <span className="font-mono text-xs uppercase tracking-widest text-slate-400">Technology Partners</span>
            {partners.map((p) => (
              <span key={p} className="text-sm font-semibold font-outfit" style={{ color: INK }} data-testid={`home-partner-${p.toLowerCase().replace(/\s+/g, '-')}`}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x" style={{ borderColor: LINE }}>
            {stats.map((s, i) => (
              <motion.div key={s.label} {...fadeUp} transition={{ delay: i * 0.08, duration: 0.5 }} className="px-6 first:pl-0 text-center sm:text-left">
                <div className="font-outfit font-bold text-3xl sm:text-4xl mb-1" style={{ color: INK }}>{s.value}</div>
                <div className="font-semibold text-slate-800 text-sm">{s.label}</div>
                <div className="font-mono text-slate-400 text-[11px] mt-0.5 uppercase tracking-wide">{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PILLARS ──────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: '#F5F7FA' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="max-w-xl mb-14">
            <span className="font-mono text-xs tracking-[0.2em] uppercase mb-3 inline-block" style={{ color: BLUE }}>Our Approach</span>
            <h2 className="font-outfit font-bold text-3xl sm:text-4xl leading-tight" style={{ color: INK }}>
              Built for enterprise. Designed for scale.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: LINE }}>
            {pillars.map((p, i) => (
              <motion.div key={p.title} {...fadeUp} transition={{ delay: i * 0.1, duration: 0.5 }} className="bg-white p-8">
                <div className="font-mono text-xs mb-4" style={{ color: MAGENTA }}>{p.tag}</div>
                <h3 className="font-outfit font-semibold text-xl mb-3" style={{ color: INK }}>{p.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-ibm">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUANTUM BRAIN SPEC SHEET ────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
              <span className="font-mono text-xs tracking-[0.2em] uppercase mb-3 inline-block" style={{ color: BLUE }}>Core Technology</span>
              <h2 className="font-outfit font-bold text-3xl sm:text-4xl mb-6 leading-tight" style={{ color: INK }}>
                The Quantum [-0-] Brain
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-4 font-ibm">
                A modular, scalable cognitive architecture integrating perception, memory, reasoning, planning, and continuous learning into a single intelligence system.
              </p>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 font-ibm">
                Unlike task-specific AI tools, the Quantum Brain enables contextual continuity and adaptive decision-making across complex operational workflows.
              </p>
              <Link to="/architecture" data-testid="home-architecture-cta" className="inline-flex items-center gap-2 text-sm font-semibold border-b pb-0.5" style={{ color: INK, borderColor: INK }}>
                View full architecture <ArrowRight size={14} />
              </Link>
            </motion.div>

            <motion.div {...fadeUp} transition={{ delay: 0.1, duration: 0.6 }} className="border" style={{ borderColor: LINE }}>
              {layers.map((l, i) => (
                <div key={l.id} className="flex items-center gap-4 px-6 py-4 border-b last:border-b-0" style={{ borderColor: LINE }}>
                  <span className="font-mono text-xs font-semibold w-7" style={{ color: BLUE }}>{l.id}</span>
                  <span className="font-outfit font-medium text-sm flex-1" style={{ color: INK }}>{l.name}</span>
                </div>
              ))}
              <div className="flex items-center gap-4 px-6 py-4" style={{ background: INK }}>
                <span className="font-mono text-xs font-semibold w-7" style={{ color: '#94A3B8' }}>C</span>
                <span className="font-outfit font-medium text-sm flex-1 text-white">Zero-State Core</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ───────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: '#F5F7FA' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="max-w-xl mb-14">
            <span className="font-mono text-xs tracking-[0.2em] uppercase mb-3 inline-block" style={{ color: MAGENTA }}>Industries</span>
            <h2 className="font-outfit font-bold text-3xl sm:text-4xl" style={{ color: INK }}>
              Intelligent systems across sectors.
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px" style={{ background: LINE }}>
            {industries.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <motion.div key={ind.label} {...fadeUp} transition={{ delay: i * 0.06, duration: 0.5 }}>
                  <Link to="/industries" data-testid={`home-industry-${ind.label.toLowerCase()}`} className="bg-white p-6 flex flex-col items-center gap-3 text-center group hover:bg-[#FAFBFC] transition-colors">
                    <Icon size={22} style={{ color: INK }} className="group-hover:text-[#0B5FFF] transition-colors" strokeWidth={1.5} />
                    <span className="text-sm font-medium text-slate-700 font-ibm">{ind.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── STATEMENT ────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="border-l-2 pl-8" style={{ borderColor: BLUE }}>
            <p className="font-outfit font-medium text-2xl sm:text-3xl leading-snug mb-8" style={{ color: INK }}>
              We build the intelligence layer so enterprises can move from reactive to autonomous — without rebuilding what already works.
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm font-ibm">
              {[
                { label: 'Architecture', to: '/architecture' },
                { label: 'Services', to: '/services' },
                { label: 'Industries', to: '/industries' },
                { label: 'Contact', to: '/contact' },
              ].map((l) => (
                <Link key={l.label} to={l.to} className="text-slate-500 hover:text-[#0B0F19] transition-colors border-b border-transparent hover:border-slate-400 pb-0.5">
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────── */}
      <section className="py-24 border-t" style={{ borderColor: LINE, background: '#F5F7FA' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <h2 className="font-outfit font-bold text-3xl sm:text-4xl mb-6" style={{ color: INK }}>
              Ready to deploy intelligent systems?
            </h2>
            <p className="text-slate-600 text-base mb-8 font-ibm">
              Partner with MAH Quantum to embed AI as foundational infrastructure within your organization.
            </p>
            <Link
              to="/contact"
              data-testid="home-contact-cta"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-200"
              style={{ background: INK }}
              onMouseEnter={(e) => (e.currentTarget.style.background = BLUE)}
              onMouseLeave={(e) => (e.currentTarget.style.background = INK)}
            >
              Start a conversation <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
