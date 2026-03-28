import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Factory, Truck, Heart, Zap, Building2, CheckCircle2 } from 'lucide-react';

const fadeUp = { initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const industries = [
  {
    id: 'manufacturing',
    icon: Factory,
    name: 'Manufacturing',
    tagline: 'Intelligent Production Systems',
    image: 'https://images.pexels.com/photos/3544567/pexels-photo-3544567.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1',
    color: '#00B4FF',
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
    color: '#7C3AED',
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
    color: '#EC4899',
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
    color: '#F59E0B',
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
    color: '#FF00A0',
    impact: '35% operational efficiency gain',
    useCases: ['Process Automation', 'Data Analytics', 'Decision Support Systems', 'IT Infrastructure Intelligence', 'Knowledge Management'],
    desc: 'Embedding AI as foundational operational infrastructure within enterprise environments to automate processes and enable intelligent decision-making.',
  },
];

export default function Industries() {
  return (
    <div className="bg-[#F8FAFC]">
      {/* Header */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] orb-blue pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="max-w-3xl">
            <span className="chip-blue mb-4 inline-block">Industries</span>
            <h1 className="font-outfit font-bold text-5xl sm:text-6xl text-slate-900 leading-tight mb-6">
              Intelligence <span className="text-gradient">Across Sectors</span>
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed font-ibm">
              MAH Quantum deploys intelligent systems across five core industries, addressing high-impact operational inefficiencies with production-ready AI solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Industry Cards */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="space-y-8">
            {industries.map((industry, i) => {
              const Icon = industry.icon;
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={industry.id}
                  {...fadeUp}
                  transition={{ delay: i * 0.1, duration: 0.7 }}
                  data-testid={`industry-card-${industry.id}`}
                  className="card-glass overflow-hidden group"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-2 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                    {/* Image */}
                    <div className={`relative h-64 lg:h-80 overflow-hidden ${!isEven ? 'lg:order-2' : ''}`}>
                      <img
                        src={industry.image}
                        alt={industry.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="industry-overlay absolute inset-0" />
                      {/* Impact badge */}
                      <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-semibold font-ibm flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00B4FF]" />
                        {industry.impact}
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`p-8 lg:p-10 flex flex-col justify-center ${!isEven ? 'lg:order-1' : ''}`}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${industry.color}15` }}>
                          <Icon size={20} style={{ color: industry.color }} />
                        </div>
                        <div>
                          <div className="text-xs font-semibold font-ibm" style={{ color: industry.color }}>{industry.tagline}</div>
                          <h2 className="font-outfit font-bold text-2xl text-slate-900">{industry.name}</h2>
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed mb-6 font-ibm">{industry.desc}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {industry.useCases.map((uc) => (
                          <div key={uc} className="flex items-center gap-2">
                            <CheckCircle2 size={14} style={{ color: industry.color, flexShrink: 0 }} />
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

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <h2 className="font-outfit font-bold text-4xl text-slate-900 mb-4">
              Deploy AI in <span className="text-gradient">Your Industry</span>
            </h2>
            <p className="text-slate-500 text-base mb-8 font-ibm">
              MAH Quantum designs custom intelligent systems that embed directly into your operational workflows.
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
