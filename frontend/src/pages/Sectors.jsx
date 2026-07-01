import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Factory, Truck, Heart, Zap, Building2, CheckCircle2 } from 'lucide-react';

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' } };

const INK = '#0B0F19';
const BLUE = '#0B5FFF';
const LINE = '#E4E7EC';

const sectors = [
  {
    id: 'manufacturing',
    icon: Factory,
    name: 'Manufacturing',
    tagline: 'Intelligent Production Systems',
    image: 'https://images.pexels.com/photos/3544567/pexels-photo-3544567.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1',
    impact: '30% reduction in downtime',
    useCases: ['Predictive Maintenance', 'Quality Control Automation', 'Production Optimization', 'Supply Chain Intelligence', 'Energy Efficiency Monitoring'],
    desc: 'Deploying AI-driven quality control, predictive maintenance, and production optimization systems that reduce downtime and improve throughput.',
  },
  {
    id: 'logistics',
    icon: Truck,
    name: 'Logistics & Supply Chain',
    tagline: 'Adaptive Supply Intelligence',
    image: 'https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1',
    impact: '25% cost reduction',
    useCases: ['Route Optimization', 'Demand Forecasting', 'Inventory Management', 'Fleet Intelligence', 'Last-Mile Efficiency'],
    desc: 'Optimizing logistics networks through intelligent route planning, demand forecasting, and real-time inventory management systems.',
  },
  {
    id: 'healthcare',
    icon: Heart,
    name: 'Healthcare Operations',
    tagline: 'Precision Healthcare Intelligence',
    image: 'https://images.pexels.com/photos/5206922/pexels-photo-5206922.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1',
    impact: '40% efficiency improvement',
    useCases: ['Patient Flow Optimization', 'Resource Allocation', 'Diagnostic Support', 'Clinical Workflow Automation', 'Outcomes Prediction'],
    desc: 'Improving healthcare operational efficiency through intelligent patient flow management, resource allocation, and clinical decision support.',
  },
  {
    id: 'energy',
    icon: Zap,
    name: 'Energy',
    tagline: 'Intelligent Energy Infrastructure',
    image: 'https://images.pexels.com/photos/9799753/pexels-photo-9799753.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1',
    impact: '20% energy savings',
    useCases: ['Grid Optimization', 'Predictive Maintenance', 'Energy Demand Forecasting', 'Renewable Integration', 'Consumption Analytics'],
    desc: 'Deploying intelligent systems for grid optimization, predictive maintenance, and energy consumption analytics across utility infrastructure.',
  },
  {
    id: 'enterprise',
    icon: Building2,
    name: 'Enterprise Infrastructure',
    tagline: 'Adaptive Enterprise Intelligence',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1',
    impact: '35% operational efficiency gain',
    useCases: ['Process Automation', 'Data Analytics', 'Decision Support Systems', 'IT Infrastructure Intelligence', 'Knowledge Management'],
    desc: 'Embedding AI as foundational operational infrastructure within enterprise environments to automate processes and enable intelligent decision-making.',
  },
];

export default function Sectors() {
  return (
    <div className="bg-white">
      <section className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <span className="font-mono text-xs tracking-[0.2em] uppercase mb-4 inline-block" style={{ color: BLUE }}>
              Sector Solutions
            </span>
            <h1 className="font-outfit font-bold text-4xl sm:text-5xl leading-tight mb-6" style={{ color: INK }}>
              Intelligence across sectors.
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed font-ibm max-w-2xl">
              MAH Quantum deploys the Quantum [-0-] Brain across five core sectors, addressing high-impact operational inefficiencies with production-ready AI systems.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="space-y-px" style={{ background: LINE }}>
            {sectors.map((s, i) => {
              const Icon = s.icon;
              const isEven = i % 2 === 0;
              return (
                <motion.div key={s.id} {...fadeUp} transition={{ delay: i * 0.08, duration: 0.6 }} data-testid={`sector-card-${s.id}`} className="bg-white">
                  <div className={`grid grid-cols-1 lg:grid-cols-2 ${isEven ? '' : ''}`}>
                    <div className={`relative h-64 lg:h-auto overflow-hidden ${!isEven ? 'lg:order-2' : ''}`}>
                      <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                      <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-white border font-mono text-xs font-semibold" style={{ borderColor: LINE, color: INK }}>
                        {s.impact}
                      </div>
                    </div>
                    <div className={`p-8 lg:p-12 flex flex-col justify-center ${!isEven ? 'lg:order-1' : ''}`}>
                      <div className="flex items-center gap-3 mb-5">
                        <Icon size={20} style={{ color: BLUE }} strokeWidth={1.5} />
                        <span className="font-mono text-xs uppercase tracking-widest" style={{ color: BLUE }}>{s.tagline}</span>
                      </div>
                      <h2 className="font-outfit font-bold text-2xl mb-4" style={{ color: INK }}>{s.name}</h2>
                      <p className="text-slate-600 text-sm leading-relaxed mb-6 font-ibm">{s.desc}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {s.useCases.map((uc) => (
                          <div key={uc} className="flex items-center gap-2">
                            <CheckCircle2 size={13} style={{ color: BLUE, flexShrink: 0 }} />
                            <span className="text-slate-600 text-xs font-ibm">{uc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 border-t" style={{ borderColor: LINE, background: '#F5F7FA' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <h2 className="font-outfit font-bold text-3xl mb-4" style={{ color: INK }}>Deploy AI in your sector.</h2>
            <p className="text-slate-500 text-base mb-8 font-ibm">MAH Quantum designs custom intelligent systems that embed directly into your operational workflows.</p>
            <Link
              to="/contact"
              data-testid="sectors-contact-cta"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white"
              style={{ background: INK }}
            >
              Get started <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
