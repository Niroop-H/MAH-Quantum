import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Zap, Brain, Globe, Shield, Activity } from 'lucide-react';

const fadeUp = { initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const metrics = [
  { id: 1, icon: Globe, name: 'Contextual Coherence', score: 94, desc: 'Maintains accurate context across multi-step interactions and complex reasoning chains.', color: '#00B4FF' },
  { id: 2, icon: TrendingUp, name: 'Decision Accuracy', score: 96, desc: 'Correctness of inferences and decisions across diverse operational scenarios.', color: '#0EA5E9' },
  { id: 3, icon: Brain, name: 'Learning Efficiency', score: 89, desc: 'Speed and quality of adaptation from new data and feedback signals.', color: '#7C3AED' },
  { id: 4, icon: Zap, name: 'Dynamic Adaptability', score: 92, desc: 'Capacity to recalibrate in response to changing environments and constraints.', color: '#EC4899' },
  { id: 5, icon: Shield, name: 'System Robustness', score: 97, desc: 'Reliability and fault-tolerance under adverse and edge-case conditions.', color: '#FF00A0' },
  { id: 6, icon: Activity, name: 'Cross-Domain Performance', score: 91, desc: 'Consistency of intelligence quality across different industries and use cases.', color: '#06B6D4' },
];

function CircleMetric({ metric, delay }) {
  const [animated, setAnimated] = useState(false);
  const r = 40;
  const circ = 2 * Math.PI * r;
  const offset = circ - (animated ? metric.score / 100 : 0) * circ;
  const Icon = metric.icon;

  return (
    <motion.div
      {...fadeUp}
      transition={{ delay, duration: 0.6 }}
      onViewportEnter={() => setAnimated(true)}
      viewport={{ once: true }}
      data-testid={`d25-metric-${metric.id}`}
      className="card-glass p-6 flex flex-col items-center text-center"
    >
      {/* SVG ring */}
      <div className="relative w-24 h-24 mb-4">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={r} fill="none" stroke="#E2E8F0" strokeWidth="8" />
          <circle
            cx="50" cy="50" r={r}
            fill="none"
            stroke={metric.color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1.5s ease-in-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-outfit font-bold text-xl text-slate-900">{animated ? metric.score : 0}</span>
        </div>
      </div>

      <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: `${metric.color}15` }}>
        <Icon size={16} style={{ color: metric.color }} />
      </div>
      <h3 className="font-outfit font-semibold text-base text-slate-900 mb-2">{metric.name}</h3>
      <p className="text-slate-500 text-xs leading-relaxed font-ibm">{metric.desc}</p>
    </motion.div>
  );
}

export default function D25() {
  return (
    <div className="bg-[#F8FAFC]">
      {/* Header */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] orb-blue pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] orb-pink pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="max-w-3xl">
            <span className="chip-pink mb-4 inline-block">Benchmarking Framework</span>
            <h1 className="font-outfit font-bold text-5xl sm:text-6xl text-slate-900 leading-tight mb-6">
              D25<span className="text-gradient">@1007</span> Framework
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed font-ibm">
              A structured internal benchmarking framework designed to guide and evaluate the progression of the Quantum Brain architecture toward generalized intelligence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* D25 + @1007 Explainer */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="card-glass p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#00B4FF]/8 blur-[40px]" />
              <div className="font-outfit font-black text-6xl text-gradient mb-4">D25</div>
              <h2 className="font-outfit font-bold text-2xl text-slate-900 mb-4">Depth Level 25</h2>
              <p className="text-slate-600 text-base leading-relaxed font-ibm mb-4">
                D25 denotes the system's capacity for deep, multi-layered reasoning across interconnected tasks and decision chains.
              </p>
              <p className="text-slate-500 text-sm leading-relaxed font-ibm">
                This metric reflects the architecture's ability to move beyond isolated outputs toward comprehensive analytical and execution-driven processes — achieving coherence across 25 interconnected reasoning layers simultaneously.
              </p>
              <div className="mt-6 flex items-center gap-2">
                <div className="flex gap-1">
                  {Array.from({ length: 25 }, (_, i) => (
                    <div key={i} className="w-1.5 h-6 rounded-full" style={{ background: `rgba(0, 180, 255, ${0.2 + (i / 24) * 0.8})` }} />
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ delay: 0.15, duration: 0.6 }} className="card-glass p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#FF00A0]/8 blur-[40px]" />
              <div className="font-outfit font-black text-6xl text-gradient mb-4">@1007</div>
              <h2 className="font-outfit font-bold text-2xl text-slate-900 mb-4">Intelligence Index</h2>
              <p className="text-slate-600 text-base leading-relaxed font-ibm mb-4">
                A composite intelligence index derived from a multi-dimensional evaluation model spanning six critical performance domains.
              </p>
              <p className="text-slate-500 text-sm leading-relaxed font-ibm">
                The @1007 index provides a structured pathway toward the development of scalable, self-improving intelligence systems by measuring quality across contextual, decisional, learning, adaptive, robustness, and cross-domain dimensions.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="text-4xl font-outfit font-black text-gradient">1007</div>
                <div className="text-xs text-slate-500 font-ibm leading-tight">Composite<br />Intelligence<br />Score</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Six Metrics */}
      <section className="py-24 section-alt">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="chip-blue mb-3 inline-block">Evaluation Dimensions</span>
            <h2 className="font-outfit font-bold text-4xl sm:text-5xl text-slate-900 mb-4">
              Six Intelligence <span className="text-gradient">Dimensions</span>
            </h2>
            <p className="text-slate-500 text-base max-w-xl mx-auto font-ibm">
              The @1007 index measures performance across six critical domains, providing a holistic view of intelligence quality.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {metrics.map((metric, i) => (
              <CircleMetric key={metric.id} metric={metric} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Composite Index Display */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#00B4FF]/10 blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[#FF00A0]/8 blur-[80px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <motion.div {...fadeUp} transition={{ duration: 0.7 }}>
            <span className="text-slate-400 text-sm font-ibm uppercase tracking-widest mb-4 block">Composite Result</span>
            <div className="font-outfit font-black text-8xl sm:text-9xl text-gradient mb-4">@1007</div>
            <div className="text-white font-outfit font-bold text-2xl mb-6">D25 Intelligence Framework Score</div>
            <p className="text-slate-300 text-base leading-relaxed max-w-2xl mx-auto mb-8 font-ibm">
              The D25@1007 score represents MAH Quantum's benchmark target for the Quantum Brain architecture — a composite measure across all six intelligence dimensions, providing a structured pathway toward scalable, self-improving intelligent systems.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {metrics.map((m) => (
                <div key={m.id} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                  <div className="w-2 h-2 rounded-full" style={{ background: m.color }} />
                  <span className="text-white/70 text-xs font-ibm">{m.name.split(' ')[0]}: {m.score}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <h2 className="font-outfit font-bold text-4xl text-slate-900 mb-6">
              Ready to Deploy <span className="text-gradient">D25@1007</span> Intelligence?
            </h2>
            <Link to="/contact" data-testid="d25-contact-cta" className="btn-primary inline-flex items-center gap-2">
              Contact MAH Quantum <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
