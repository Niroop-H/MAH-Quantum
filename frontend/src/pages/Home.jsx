import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ChevronDown, Building2, Truck, Activity, Zap, Target,
  Cpu, Layers3, Rocket, ShieldCheck, Landmark, Globe2, Award,
} from 'lucide-react';
import Drone from '../components/Drone';
import ParticleCanvas from '../components/ParticleCanvas';
import { Magnetic, TiltCard, CountUp, Marquee } from '../components/Interactive';

const INK = '#0B0F19';
const BLUE = '#0B5FFF';
const MAGENTA = '#C6006F';
const LINE = '#E4E7EC';

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

const layers = [
  { id: 'L1', name: 'Perception' },
  { id: 'L2', name: 'Memory' },
  { id: 'L3', name: 'Reasoning' },
  { id: 'L4', name: 'Planning' },
  { id: 'L5', name: 'Learning' },
];

const credentials = [
  { tag: 'NCAGE 8066Y', label: 'NATO Commercial & Government Entity', icon: ShieldCheck },
  { tag: 'UK CCS', label: 'Crown Commercial Service — Overseas Supplier', icon: Landmark },
  { tag: 'EU PIC', label: 'European Commission — Participant ID', icon: Globe2 },
  { tag: 'ISO 8000-116 IBRN', label: 'IN-KA.UDYAM:UDYAM-KR-03-0680324 — Govt. of India', icon: Award },
];

const partners = ['Intel', 'IBM', 'Microsoft', 'Google Cloud'];

const stats = [
  { value: '25+', label: 'Depth Layers', sub: 'D25 Framework', icon: Layers3 },
  { value: '@1007', label: 'Intelligence Index', sub: 'Composite Score', icon: Cpu },
  { value: '5', label: 'Core Sectors', sub: 'Industry Coverage', icon: Target },
  { value: '5', label: 'Brain Layers', sub: 'Cognitive Architecture', icon: Rocket },
];

const pillars = [
  { tag: '[CORE-01]', title: 'Zero-State Core', icon: Cpu, desc: 'A domain-agnostic intelligence foundation deployable across industries without structural modification.' },
  { tag: '[CORE-02]', title: 'Quantum Brain', icon: Layers3, desc: 'Five functional layers integrating perception, memory, reasoning, planning and continuous learning.' },
  { tag: '[CORE-03]', title: 'Production-Ready', icon: ShieldCheck, desc: 'Enterprise-grade systems embedded as operational infrastructure, not standalone tools.' },
];

const industries = [
  { icon: Building2, label: 'Manufacturing' },
  { icon: Truck, label: 'Logistics' },
  { icon: Activity, label: 'Healthcare' },
  { icon: Zap, label: 'Energy' },
  { icon: Target, label: 'Enterprise' },
];

/* ── small building blocks ──────────────────────────────────────────── */

function Eyebrow({ children, color = BLUE, dot = true }) {
  return (
    <span className="mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em]" style={{ color }}>
      {dot && <span className="h-1.5 w-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />}
      {children}
    </span>
  );
}

function SplitReveal({ text, className = '', delay = 0 }) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="mr-[0.28em] inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.75, delay: delay + i * 0.045, ease: [0.16, 1, 0.3, 1] }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* auto-cycling Quantum Brain layer panel — used in hero (compact) and core-tech (full) */
function LayerStack({ compact = false }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % (layers.length + 1)), 1600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`glass overflow-hidden rounded-2xl ${compact ? '' : 'shadow-[0_20px_60px_rgba(0,0,0,0.06)]'}`}>
      {layers.map((l, i) => {
        const isActive = active === i;
        return (
          <div
            key={l.id}
            onMouseEnter={() => setActive(i)}
            className={`flex items-center gap-4 border-b border-slate-200/70 px-5 last:border-b-0 transition-colors duration-300 ${compact ? 'py-2.5' : 'py-4'} ${isActive ? 'bg-[#0B5FFF]/[0.06]' : ''}`}
          >
            <span
              className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-mono text-[10px] font-bold transition-colors duration-300"
              style={{ background: isActive ? BLUE : '#F1F5F9', color: isActive ? '#fff' : '#94A3B8' }}
            >
              {isActive && (
                <motion.span
                  layoutId={`layer-glow-${compact ? 'sm' : 'lg'}`}
                  className="absolute inset-0 -z-10 rounded-md opacity-60 blur-[6px]"
                  style={{ background: BLUE }}
                />
              )}
              {i + 1}
            </span>
            <span className={`flex-1 font-outfit font-medium ${compact ? 'text-sm' : 'text-[15px]'}`} style={{ color: INK }}>
              {l.name}
            </span>
            {!compact && <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">{l.id}</span>}
          </div>
        );
      })}
      <div
        className={`flex items-center gap-4 px-5 transition-colors duration-500 ${compact ? 'py-2.5' : 'py-4'}`}
        style={{ background: active === layers.length ? BLUE : INK }}
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/10 font-mono text-[10px] font-bold text-white">C</span>
        <span className="flex-1 font-outfit font-semibold text-sm text-white">Zero-State Core</span>
      </div>
    </div>
  );
}

/* hero's right-column composition: drone → data beam → brain panel */
function HeroVisual() {
  return (
    <div className="relative mx-auto max-w-md lg:mx-0">
      <div aria-hidden="true" className="absolute -inset-24 -z-10">
        <div className="absolute left-1/2 top-4 h-72 w-72 -translate-x-1/2 rounded-full bg-[#00B4FF]/20 blur-[90px] animate-blob" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[#FF00A0]/15 blur-[90px] animate-blob-delay" />
      </div>

      <Drone className="relative z-20 mx-auto w-[80%]" />

      <div className="relative z-10 mx-auto h-9 w-px bg-gradient-to-b from-[#00B4FF]/70 to-transparent overflow-hidden">
        <motion.span
          className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-[#00B4FF]"
          style={{ boxShadow: '0 0 10px 2px rgba(0,180,255,0.7)' }}
          animate={{ y: [0, 36], opacity: [1, 0] }}
          transition={{ duration: 1.3, repeat: Infinity, ease: 'easeIn' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 -mt-px"
      >
        <LayerStack compact />
      </motion.div>
    </div>
  );
}

/* scroll-linked "words light up" pull-quote */
function RevealWord({ word, range, progress }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block">
      {word}
    </motion.span>
  );
}

function ScrollStatement({ text }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'start 0.35'] });
  const words = text.split(' ');
  return (
    <p ref={ref} className="flex flex-wrap font-outfit text-2xl font-medium leading-snug sm:text-3xl lg:text-4xl" style={{ color: INK }}>
      {words.map((w, i) => (
        <RevealWord key={i} word={w} range={[i / words.length, (i + 1) / words.length]} progress={scrollYProgress} />
      ))}
    </p>
  );
}

/* soft ambient light that tracks the cursor within a section — not a cursor replacement */
function useAmbientGlow() {
  const glowRef = useRef(null);
  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (!glowRef.current) return;
    glowRef.current.style.setProperty('--sx', `${e.clientX - rect.left}px`);
    glowRef.current.style.setProperty('--sy', `${e.clientY - rect.top}px`);
  };
  return { glowRef, onMove };
}

export default function Home() {
  const hero = useAmbientGlow();

  return (
    <div className="bg-white">
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        onMouseMove={hero.onMove}
        className="relative overflow-hidden pb-28 pt-32 sm:pb-36 sm:pt-40"
        data-testid="hero-section"
      >
        {/* backdrop layers */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage: 'linear-gradient(to right, #E4E7EC 1px, transparent 1px), linear-gradient(to bottom, #E4E7EC 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse 80% 55% at 50% 0%, black 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 55% at 50% 0%, black 40%, transparent 100%)',
          }}
        />
        <ParticleCanvas className="opacity-[0.35]" />
        <div
          ref={hero.glowRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(600px circle at var(--sx,50%) var(--sy,20%), rgba(0,180,255,0.07), transparent 62%)' }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
            <div>
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                <Eyebrow>AI Infrastructure — Deep Tech</Eyebrow>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  Systems Operational
                </span>
              </motion.div>

              <h1 className="mb-6 font-outfit text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-[3.5rem]" style={{ color: INK }}>
                <SplitReveal text="Enterprise intelligence," delay={0.1} />
                <br />
                <SplitReveal text="rebuilt from zero." delay={0.42} className="text-gradient-blue" />
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.6 }}
                className="mb-9 max-w-lg font-ibm text-base leading-relaxed text-slate-600 sm:text-lg"
              >
                MAH Quantum builds the Quantum [-0-] Brain — a five-layer cognitive architecture that manufacturers, hospitals, and enterprises run as core infrastructure, not a bolted-on tool.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.6 }} className="flex flex-wrap items-center gap-5">
                <Magnetic>
                  <Link to="/architecture" data-testid="hero-explore-cta" className="btn-primary inline-flex items-center gap-2">
                    See the architecture <ArrowRight size={16} />
                  </Link>
                </Magnetic>
                <Magnetic strength={10}>
                  <Link to="/about" data-testid="hero-credentials-cta" className="btn-secondary inline-flex items-center gap-2">
                    Read our credentials
                  </Link>
                </Magnetic>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <HeroVisual />
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-slate-400 sm:flex"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <ChevronDown size={16} />
        </motion.div>
      </section>

      {/* ── CREDENTIALS ──────────────────────────────────────────────── */}
      <section className="border-y py-16" style={{ borderColor: LINE, background: '#F8FAFC' }}>
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {credentials.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div key={c.tag} {...fadeUp} transition={{ delay: i * 0.08, duration: 0.5 }}>
                  <TiltCard className="card-glass h-full rounded-2xl p-5">
                    <Icon size={18} style={{ color: MAGENTA }} className="mb-3" strokeWidth={1.75} />
                    <div className="mb-1.5 font-mono text-xs font-semibold" style={{ color: MAGENTA }}>{c.tag}</div>
                    <div className="font-ibm text-sm leading-snug text-slate-600">{c.label}</div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 flex flex-col items-center gap-6 border-t pt-10" style={{ borderColor: LINE }}>
            <span className="font-mono text-xs uppercase tracking-widest text-slate-400">Technology &amp; Cloud Partners</span>
            <Marquee items={partners} className="w-full" />
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.label} {...fadeUp} transition={{ delay: i * 0.08, duration: 0.5 }}>
                  <TiltCard className="card-glass h-full rounded-2xl p-6 text-center sm:text-left">
                    <Icon size={20} style={{ color: BLUE }} className="mb-4 hidden sm:block" strokeWidth={1.75} />
                    <div className="mb-1 font-outfit text-3xl font-bold sm:text-4xl" style={{ color: INK }}>
                      <CountUp value={s.value} />
                    </div>
                    <div className="text-sm font-semibold text-slate-800">{s.label}</div>
                    <div className="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-slate-400">{s.sub}</div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PILLARS ──────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: '#F5F7FA' }}>
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="mb-14 max-w-xl">
            <Eyebrow>Our Approach</Eyebrow>
            <h2 className="font-outfit text-3xl font-bold leading-tight sm:text-4xl" style={{ color: INK }}>
              Built for enterprise. Designed for scale.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.title} {...fadeUp} transition={{ delay: i * 0.1, duration: 0.5 }}>
                  <TiltCard className="card-glass group h-full rounded-2xl p-8">
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: 'rgba(11,95,255,0.08)' }}>
                      <Icon size={20} style={{ color: BLUE }} strokeWidth={1.75} />
                    </div>
                    <div className="mb-3 font-mono text-xs" style={{ color: MAGENTA }}>{p.tag}</div>
                    <h3 className="mb-3 font-outfit text-xl font-semibold" style={{ color: INK }}>{p.title}</h3>
                    <p className="font-ibm text-sm leading-relaxed text-slate-500">{p.desc}</p>
                    <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ color: BLUE }}>
                      Learn more <ArrowRight size={14} />
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── QUANTUM BRAIN SPEC SHEET ─────────────────────────────────── */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
            <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
              <Eyebrow>Core Technology</Eyebrow>
              <h2 className="mb-6 font-outfit text-3xl font-bold leading-tight sm:text-4xl" style={{ color: INK }}>
                The Quantum [-0-] Brain
              </h2>
              <p className="mb-4 font-ibm text-base leading-relaxed text-slate-600">
                A modular, scalable cognitive architecture integrating perception, memory, reasoning, planning, and continuous learning into a single intelligence system.
              </p>
              <p className="mb-8 font-ibm text-sm leading-relaxed text-slate-500">
                Unlike task-specific AI tools, the Quantum Brain enables contextual continuity and adaptive decision-making across complex operational workflows — from an edge sensor in the field to the enterprise core.
              </p>
              <Magnetic strength={8}>
                <Link to="/architecture" data-testid="home-architecture-cta" className="inline-flex items-center gap-2 border-b pb-0.5 text-sm font-semibold" style={{ color: INK, borderColor: INK }}>
                  View full architecture <ArrowRight size={14} />
                </Link>
              </Magnetic>
            </motion.div>

            <motion.div {...fadeUp} transition={{ delay: 0.1, duration: 0.6 }}>
              <LayerStack />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ───────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: '#F5F7FA' }}>
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="mb-14 max-w-xl">
            <Eyebrow color={MAGENTA}>Industries</Eyebrow>
            <h2 className="font-outfit text-3xl font-bold sm:text-4xl" style={{ color: INK }}>
              Intelligent systems across sectors.
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {industries.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <motion.div key={ind.label} {...fadeUp} transition={{ delay: i * 0.06, duration: 0.5 }}>
                  <TiltCard className="card-glass h-full rounded-2xl" spotColor="198,0,111">
                    <Link
                      to="/industries"
                      data-testid={`home-industry-${ind.label.toLowerCase()}`}
                      className="group flex flex-col items-center gap-3 rounded-2xl p-6 text-center"
                    >
                      <Icon size={22} style={{ color: INK }} className="transition-colors group-hover:text-[#0B5FFF]" strokeWidth={1.5} />
                      <span className="font-ibm text-sm font-medium text-slate-700">{ind.label}</span>
                    </Link>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── STATEMENT ────────────────────────────────────────────────── */}
      <section className="py-28">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
          <div className="border-l-2 pl-8" style={{ borderColor: BLUE }}>
            <div className="mb-8">
              <ScrollStatement text="We build the intelligence layer so enterprises can move from reactive to autonomous — without rebuilding what already works." />
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2 font-ibm text-sm">
              {[
                { label: 'Architecture', to: '/architecture' },
                { label: 'Services', to: '/services' },
                { label: 'Industries', to: '/industries' },
                { label: 'Contact', to: '/contact' },
              ].map((l) => (
                <Link key={l.label} to={l.to} className="border-b border-transparent pb-0.5 text-slate-500 transition-colors hover:border-slate-400 hover:text-[#0B0F19]">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────── */}
      <section className="border-t py-24" style={{ borderColor: LINE, background: '#F5F7FA' }}>
        <div className="mx-auto max-w-3xl px-6">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="relative overflow-hidden rounded-[2rem]">
            <div
              aria-hidden="true"
              className="absolute inset-0 animate-spin-slow opacity-60 blur-2xl"
              style={{ background: 'conic-gradient(from 0deg, #00B4FF, #FF00A0, #7C5CFF, #00B4FF)' }}
            />
            <div className="relative m-[2px] rounded-[calc(2rem-2px)] bg-white/85 px-8 py-16 text-center backdrop-blur-2xl sm:px-16">
              <h2 className="mb-6 font-outfit text-3xl font-bold sm:text-4xl" style={{ color: INK }}>
                Ready to deploy intelligent systems?
              </h2>
              <p className="mb-8 font-ibm text-base text-slate-600">
                Partner with MAH Quantum to embed AI as foundational infrastructure within your organization.
              </p>
              <Magnetic>
                <Link to="/contact" data-testid="home-contact-cta" className="btn-primary inline-flex items-center gap-2">
                  Start a conversation <ArrowRight size={16} />
                </Link>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
