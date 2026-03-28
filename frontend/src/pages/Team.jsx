import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Crown } from 'lucide-react';

const fadeUp = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };
const fadeIn  = { initial: { opacity: 0 },        whileInView: { opacity: 1 },        viewport: { once: true } };

/* ── DATA ──────────────────────────────────────────────────────────────────── */

const directors = [
  {
    id: 'nh',
    name: 'Niroop H',
    initials: 'NH',
    gradient: 'from-[#00B4FF] to-[#0070CC]',
    glow: 'rgba(0,180,255,0.22)',
    border: 'rgba(0,180,255,0.35)',
  },
  {
    id: 'mn',
    name: 'Mounashree N',
    initials: 'MN',
    gradient: 'from-[#FF00A0] to-[#CC007A]',
    glow: 'rgba(255,0,160,0.20)',
    border: 'rgba(255,0,160,0.32)',
  },
  {
    id: 'hm',
    name: 'Huchahanumaiah M',
    initials: 'HM',
    gradient: 'from-[#7C3AED] to-[#4C1D95]',
    glow: 'rgba(124,58,237,0.20)',
    border: 'rgba(124,58,237,0.32)',
  },
];

const coreMembers = [
  { id: 'qc-1', name: 'Core Engineer I',   role: 'Advanced R&D' },
  { id: 'qc-2', name: 'Core Engineer II',  role: 'AI Systems Research' },
  { id: 'qc-3', name: 'Core Engineer III', role: 'Quantum Architecture' },
  { id: 'qc-4', name: 'Core Engineer IV',  role: 'Cognitive Systems' },
];

const quantaMembers = [
  { id: 'qt-1',  name: 'Engineer I',   role: 'R&D' },
  { id: 'qt-2',  name: 'Engineer II',  role: 'R&D' },
  { id: 'qt-3',  name: 'Engineer III', role: 'R&D' },
  { id: 'qt-4',  name: 'Engineer IV',  role: 'R&D' },
  { id: 'qt-5',  name: 'Engineer V',   role: 'R&D' },
  { id: 'qt-6',  name: 'Engineer VI',  role: 'R&D' },
];

/* ── COMPONENTS ────────────────────────────────────────────────────────────── */

function DirectorCard({ d, index }) {
  return (
    <motion.div
      {...fadeUp}
      transition={{ delay: index * 0.12, duration: 0.65 }}
      data-testid={`director-card-${d.id}`}
      className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-white/55 backdrop-blur-xl"
      style={{
        border: `1.5px solid ${d.border}`,
        boxShadow: `0 8px 40px ${d.glow}, 0 2px 12px rgba(0,0,0,0.04)`,
      }}
    >
      {/* Top gradient line */}
      <div
        className="absolute top-0 left-8 right-8 h-[2px] rounded-full"
        style={{ background: `linear-gradient(90deg, transparent, ${d.border}, transparent)` }}
      />

      {/* Crown badge */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
        <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-white border font-ibm" style={{ borderColor: d.border, color: d.gradient.includes('00B4FF') ? '#0070CC' : d.gradient.includes('FF00A0') ? '#CC007A' : '#6D28D9' }}>
          <Crown size={9} />
          Board of Directors
        </span>
      </div>

      {/* Avatar */}
      <div
        className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${d.gradient} flex items-center justify-center mt-4 mb-5 shadow-lg`}
        style={{ boxShadow: `0 8px 24px ${d.glow}` }}
      >
        <span className="font-outfit font-bold text-2xl text-white tracking-wide">{d.initials}</span>
      </div>

      {/* Name */}
      <h3 className="font-outfit font-bold text-xl text-slate-900 leading-tight tracking-tight">{d.name}</h3>
      <p className="text-xs text-slate-400 mt-1 font-ibm tracking-widest uppercase">Director</p>
    </motion.div>
  );
}

function CoreCard({ m, index }) {
  return (
    <motion.div
      {...fadeUp}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      data-testid={`core-member-${m.id}`}
      className="flex items-center gap-4 px-5 py-4 rounded-xl bg-white/50 backdrop-blur-md border border-slate-200/80 hover:border-[#00B4FF]/30 hover:shadow-[0_4px_20px_rgba(0,180,255,0.08)] transition-all duration-250"
    >
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00B4FF]/15 to-[#FF00A0]/10 flex items-center justify-center flex-shrink-0">
        <span className="font-outfit font-bold text-xs text-[#00B4FF]">{m.name.charAt(0)}{m.name.split(' ')[1]?.charAt(0)}</span>
      </div>
      <div className="min-w-0">
        <p className="font-outfit font-semibold text-sm text-slate-800 truncate">{m.name}</p>
        <p className="text-xs text-slate-400 font-ibm">{m.role}</p>
      </div>
    </motion.div>
  );
}

/* ── PAGE ──────────────────────────────────────────────────────────────────── */

export default function Team() {
  return (
    <div className="bg-[#F8FAFC]">

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-[480px] h-[480px] orb-blue pointer-events-none opacity-60" />
        <div className="absolute bottom-0 left-0 w-[360px] h-[360px] orb-pink pointer-events-none opacity-50" />
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div {...fadeUp} transition={{ duration: 0.7 }}>
            <span className="chip-blue mb-4 inline-block">Our People</span>
            <h1 className="font-outfit font-bold text-5xl sm:text-6xl text-slate-900 leading-tight mb-5 tracking-tight">
              The Team Behind <span className="text-gradient">MAH Quantum</span>
            </h1>
            <p className="text-slate-500 text-base leading-relaxed max-w-xl font-ibm">
              A structured organisation of directors, advanced researchers, and engineering talent — unified by a single mission.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── BOARD OF DIRECTORS ─────────────────────────────────────────────── */}
      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">

          {/* Section label */}
          <motion.div {...fadeIn} transition={{ duration: 0.5 }} className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            <span className="font-outfit font-bold text-xs tracking-[0.2em] uppercase text-slate-400 px-3">Board of Directors</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          </motion.div>

          {/* 3 Director Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {directors.map((d, i) => (
              <DirectorCard key={d.id} d={d} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── QUANTUM CORE DIVISION ──────────────────────────────────────────── */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">

          {/* Section label */}
          <motion.div {...fadeIn} transition={{ duration: 0.5 }} className="mb-8">
            <div className="flex items-center gap-3 mb-1">
              <span className="w-2 h-2 rounded-full bg-gradient-to-br from-[#00B4FF] to-[#FF00A0]" />
              <span className="font-outfit font-bold text-xs tracking-[0.18em] uppercase text-[#00B4FF]">Advanced R&amp;D</span>
            </div>
            <h2 className="font-outfit font-bold text-2xl text-slate-900 tracking-tight">Quantum Core Division</h2>
            <p className="text-slate-400 text-sm font-ibm mt-1">Deep systems research and cognitive architecture engineering</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" data-testid="quantum-core-section">
            {coreMembers.map((m, i) => (
              <CoreCard key={m.id} m={m} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM QUANTA ────────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">

          {/* Section label */}
          <motion.div {...fadeIn} transition={{ duration: 0.5 }} className="mb-8">
            <div className="flex items-center gap-3 mb-1">
              <span className="w-2 h-2 rounded-full bg-slate-300" />
              <span className="font-outfit font-bold text-xs tracking-[0.18em] uppercase text-slate-400">R&amp;D Engineers</span>
            </div>
            <h2 className="font-outfit font-bold text-2xl text-slate-900 tracking-tight">Team Quanta</h2>
            <p className="text-slate-400 text-sm font-ibm mt-1">Research and development engineering team</p>
          </motion.div>

          {/* Minimal list grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2" data-testid="team-quanta-section">
            {quantaMembers.map((m, i) => (
              <motion.div
                key={m.id}
                {...fadeIn}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                data-testid={`quanta-member-${m.id}`}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 transition-colors duration-200 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-[#00B4FF] transition-colors flex-shrink-0" />
                <div className="min-w-0">
                  <span className="font-ibm text-sm text-slate-700 font-medium">{m.name}</span>
                  <span className="text-slate-400 text-xs ml-2 font-ibm">{m.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HIERARCHY NOTE ─────────────────────────────────────────────────── */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div {...fadeIn} transition={{ duration: 0.5 }} className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0 text-xs font-ibm text-slate-400">
            <span className="font-semibold text-slate-600">Board of Directors</span>
            <span className="hidden sm:block mx-3 text-slate-200">—</span>
            <span className="sm:hidden text-slate-200">|</span>
            <span>Quantum Core Division</span>
            <span className="hidden sm:block mx-3 text-slate-200">—</span>
            <span className="sm:hidden text-slate-200">|</span>
            <span>Team Quanta</span>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="py-20 section-alt">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <h2 className="font-outfit font-bold text-3xl text-slate-900 mb-4">
              Join the <span className="text-gradient">Mission</span>
            </h2>
            <p className="text-slate-500 text-sm mb-8 font-ibm">
              MAH Quantum is building the intelligence infrastructure of tomorrow. We're always looking for exceptional talent.
            </p>
            <Link to="/contact" data-testid="team-contact-cta" className="btn-primary inline-flex items-center gap-2">
              Get in Touch <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
