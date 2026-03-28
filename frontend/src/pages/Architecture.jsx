import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Database, Cpu, Map, RefreshCw, Plus, Minus, ChevronRight } from 'lucide-react';

const fadeUp = { initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const layers = [
  {
    id: 1,
    icon: Eye,
    name: 'Perception Layer',
    shortDesc: 'Multimodal data ingestion & normalization',
    color: '#00B4FF',
    gradient: 'from-[#00B4FF]/10 to-[#00B4FF]/5',
    details: 'The Perception Layer is responsible for the ingestion and normalization of multimodal data streams, including visual inputs, natural language, and sensor-generated signals.',
    capabilities: ['Computer Vision Models', 'Natural Language Processing', 'IoT Data Interfaces', 'Sensor Signal Processing', 'Multimodal Fusion', 'Structured Representation'],
    function: 'Transforms unstructured inputs into structured representations suitable for downstream processing.',
  },
  {
    id: 2,
    icon: Database,
    name: 'Memory Layer',
    shortDesc: 'Transient & persistent knowledge storage',
    color: '#7C3AED',
    gradient: 'from-[#7C3AED]/10 to-[#7C3AED]/5',
    details: 'The Memory Layer provides both transient and persistent storage capabilities, enabling contextual awareness and long-term knowledge retention across interactions.',
    capabilities: ['Relational Databases', 'Vector-Based Storage', 'Contextual Profiling', 'Long-Term Retention', 'Experiential Data Accumulation', 'Interaction Continuity'],
    function: 'Facilitates accumulation of experiential data and enables continuity across interactions and workflows.',
  },
  {
    id: 3,
    icon: Cpu,
    name: 'Reasoning Engine',
    shortDesc: 'Core decision-making & multi-step inference',
    color: '#0EA5E9',
    gradient: 'from-[#0EA5E9]/10 to-[#FF00A0]/5',
    details: 'The Reasoning Engine serves as the core decision-making component. It performs multi-step inference, contextual analysis, and logical evaluation, enabling the system to interpret complex inputs.',
    capabilities: ['Multi-Step Inference', 'Contextual Analysis', 'Logical Evaluation', 'Goal-Aligned Output', 'Deterministic Reasoning', 'Probabilistic Reasoning'],
    function: 'Generates coherent, goal-aligned outputs by interpreting complex inputs across both deterministic and probabilistic paradigms.',
  },
  {
    id: 4,
    icon: Map,
    name: 'Planning Module',
    shortDesc: 'Execution strategy & task orchestration',
    color: '#EC4899',
    gradient: 'from-[#EC4899]/10 to-[#FF00A0]/5',
    details: 'The Planning Module translates inferred insights into structured execution strategies, bridging the gap between abstract intelligence and practical implementation.',
    capabilities: ['Task Decomposition', 'Resource Allocation', 'Tool Orchestration', 'Action Sequencing', 'Strategy Formulation', 'Execution Monitoring'],
    function: 'Bridges abstract intelligence and practical implementation through structured execution strategies.',
  },
  {
    id: 5,
    icon: RefreshCw,
    name: 'Learning Loop',
    shortDesc: 'Continuous improvement & adaptive evolution',
    color: '#FF00A0',
    gradient: 'from-[#FF00A0]/10 to-[#FF00A0]/5',
    details: 'The Learning Loop enables iterative system improvement through feedback integration, performance monitoring, and outcome-driven optimization.',
    capabilities: ['Feedback Integration', 'Performance Monitoring', 'Outcome Optimization', 'Adaptive Learning', 'Environment Adaptation', 'Constraint Adaptation'],
    function: 'Allows the architecture to evolve over time, adapting to changing environments, user behaviors, and operational constraints.',
  },
];

function LayerCard({ layer, index }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = layer.icon;

  return (
    <motion.div
      {...fadeUp}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      data-testid={`architecture-layer-${layer.id}`}
      className="card-glass overflow-hidden"
    >
      <div
        className="p-6 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
        role="button"
        aria-expanded={expanded}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${layer.color}18` }}>
              <Icon size={22} style={{ color: layer.color }} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold font-ibm" style={{ color: layer.color }}>LAYER {layer.id}</span>
              </div>
              <h3 className="font-outfit font-bold text-xl text-slate-900 leading-tight">{layer.name}</h3>
              <p className="text-slate-500 text-sm mt-1 font-ibm">{layer.shortDesc}</p>
            </div>
          </div>
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border border-slate-200 hover:border-[#00B4FF]/40 transition-colors"
            aria-label={expanded ? 'Collapse' : 'Expand'}
          >
            {expanded ? <Minus size={14} className="text-slate-500" /> : <Plus size={14} className="text-slate-500" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className={`px-6 pb-6 border-t border-white/60 pt-5 bg-gradient-to-br ${layer.gradient}`}>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 font-ibm">{layer.details}</p>
              <p className="text-slate-500 text-xs leading-relaxed mb-4 font-ibm italic">{layer.function}</p>
              <div className="flex flex-wrap gap-2">
                {layer.capabilities.map((cap) => (
                  <span key={cap} className="px-3 py-1 rounded-full text-xs font-medium bg-white/60 border border-white/80 text-slate-700 font-ibm">
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Architecture() {
  return (
    <div className="bg-[#F8FAFC]">
      {/* Header */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[500px] orb-blue pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] orb-pink pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="max-w-3xl">
            <span className="chip-blue mb-4 inline-block">Core Technology</span>
            <h1 className="font-outfit font-bold text-5xl sm:text-6xl text-slate-900 leading-tight mb-6">
              Quantum <span className="text-gradient">[-0-] Brain</span> Architecture
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed font-ibm">
              A modular, scalable cognitive architecture structured across five core functional layers — each representing a critical component of system-level intelligence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Zero-State Core visual */}
      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="relative rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-10 text-center overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
            <div className="absolute inset-0">
              <div className="absolute top-0 left-1/3 w-64 h-64 rounded-full bg-[#00B4FF]/10 blur-[80px]" />
              <div className="absolute bottom-0 right-1/3 w-56 h-56 rounded-full bg-[#FF00A0]/8 blur-[60px]" />
            </div>
            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#00B4FF]/20 to-[#FF00A0]/15 border border-white/15 mb-4 shadow-[0_0_30px_rgba(0,180,255,0.25)]">
                <span className="font-outfit font-bold text-xl text-gradient">[-0-]</span>
              </div>
              <h2 className="font-outfit font-bold text-3xl text-white mb-2">Zero-State Core</h2>
              <p className="text-slate-300 text-sm max-w-lg mx-auto font-ibm">
                The domain-agnostic intelligence foundation. All five layers operate through this core, enabling deployment across industries without structural modification.
              </p>

              {/* Layer indicators */}
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                {layers.map((l) => (
                  <span key={l.id} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/8 border border-white/10 text-xs text-white/80 font-ibm">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: l.color }} />
                    {l.name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Five Layers */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h2 className="font-outfit font-bold text-4xl text-slate-900 mb-3">
              Five <span className="text-gradient">Functional Layers</span>
            </h2>
            <p className="text-slate-500 text-base font-ibm">Click each layer to explore its capabilities and function within the architecture.</p>
          </motion.div>

          <div className="space-y-4">
            {layers.map((layer, i) => (
              <LayerCard key={layer.id} layer={layer} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Architecture diagram */}
      <section className="py-16 section-alt">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-10">
            <h2 className="font-outfit font-bold text-3xl text-slate-900 mb-3">
              Intelligence <span className="text-gradient">Flow Diagram</span>
            </h2>
            <p className="text-slate-500 text-sm font-ibm">How data flows through the Quantum Brain layers</p>
          </motion.div>
          <motion.div {...fadeUp} transition={{ delay: 0.2, duration: 0.6 }} className="card-glass p-8">
            <div className="flex flex-col items-center gap-3">
              {layers.map((layer, i) => {
                const Icon = layer.icon;
                return (
                  <div key={layer.id} className="flex flex-col items-center w-full">
                    <div className="flex items-center gap-4 w-full max-w-lg">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${layer.color}18` }}>
                        <Icon size={18} style={{ color: layer.color }} />
                      </div>
                      <div className="flex-1 h-10 rounded-lg flex items-center px-4 border" style={{ borderColor: `${layer.color}30`, background: `${layer.color}06` }}>
                        <span className="font-ibm text-sm font-medium text-slate-700">{layer.name}</span>
                      </div>
                      <span className="text-xs font-ibm text-slate-400 w-16 text-right">Layer {layer.id}</span>
                    </div>
                    {i < layers.length - 1 && (
                      <div className="w-px h-5 bg-gradient-to-b from-slate-300 to-slate-200 ml-5" />
                    )}
                  </div>
                );
              })}
              {/* Arrow to core */}
              <div className="w-px h-5 bg-gradient-to-b from-slate-300 to-[#00B4FF]" />
              <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00B4FF]/15 to-[#FF00A0]/10 border border-[#00B4FF]/25 shadow-[0_0_20px_rgba(0,180,255,0.1)]">
                <span className="font-outfit font-bold text-lg text-gradient">[-0-]</span>
                <span className="font-ibm text-sm font-medium text-slate-700">Zero-State Core — Unified Intelligence Output</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
