import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Server, CloudUpload, GitBranch, Plug, Zap, Eye, Activity, Shield, Database, Cpu, RefreshCw } from 'lucide-react';

const fadeUp = { initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const services = [
  {
    id: 'ai-integration',
    icon: Layers,
    name: 'Enterprise AI Integration',
    desc: 'Deploying production-ready AI systems that integrate directly into your existing business workflows — reducing operational losses and enabling intelligent automation.',
    tags: ['Workflow Integration', 'Business Process AI', 'Custom Deployment'],
    color: '#00B4FF',
  },
  {
    id: 'cognitive-architecture',
    icon: Cpu,
    name: 'Cognitive Architecture Design',
    desc: 'Custom Quantum [-0-] Brain implementations tailored for your specific domain, enabling deep reasoning, adaptive planning, and continuous learning capabilities.',
    tags: ['Custom AI Design', 'Multi-Layer Reasoning', 'Quantum Brain'],
    color: '#7C3AED',
  },
  {
    id: 'data-pipelines',
    icon: GitBranch,
    name: 'Data Pipeline Engineering',
    desc: 'Distributed data infrastructure and preprocessing systems designed for high-throughput, low-latency AI workloads at enterprise scale.',
    tags: ['Distributed Systems', 'ETL Pipelines', 'Real-Time Processing'],
    color: '#0EA5E9',
  },
  {
    id: 'api-orchestration',
    icon: Plug,
    name: 'API Orchestration Frameworks',
    desc: 'Model routing systems and API integration layers that enable seamless communication between AI components and enterprise systems.',
    tags: ['Model Routing', 'API Gateway', 'Microservices AI'],
    color: '#EC4899',
  },
  {
    id: 'deployment',
    icon: CloudUpload,
    name: 'Deployment Architecture',
    desc: 'Cloud-native, scalable, and secure deployment architectures ensuring your AI systems operate reliably at enterprise scale.',
    tags: ['Cloud-Native', 'Kubernetes', 'Secure Infrastructure'],
    color: '#FF00A0',
  },
  {
    id: 'learning-systems',
    icon: RefreshCw,
    name: 'Continuous Learning Systems',
    desc: 'Feedback loops, performance monitoring, and outcome-driven optimization systems that allow your AI to improve over time without manual intervention.',
    tags: ['Adaptive AI', 'Feedback Loops', 'Self-Improving'],
    color: '#06B6D4',
  },
  {
    id: 'iot-integration',
    icon: Activity,
    name: 'IoT & Sensor Integration',
    desc: 'Industrial sensor networks connected to AI systems for real-time data collection, anomaly detection, and predictive maintenance.',
    tags: ['Industrial IoT', 'Sensor Networks', 'Edge AI'],
    color: '#F59E0B',
  },
  {
    id: 'computer-vision',
    icon: Eye,
    name: 'Computer Vision Solutions',
    desc: 'Visual intelligence systems for manufacturing quality control, logistics tracking, security monitoring, and operational analytics.',
    tags: ['Visual AI', 'Quality Control', 'Object Detection'],
    color: '#10B981',
  },
];

const capabilities = [
  { label: 'Production-Ready Deployment', value: '100%' },
  { label: 'Enterprise Integration Support', value: 'Full-Stack' },
  { label: 'Industries Served', value: '5+' },
  { label: 'Architecture Depth', value: 'D25' },
];

export default function Services() {
  return (
    <div className="bg-[#F8FAFC]">
      {/* Header */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] orb-blue pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] orb-pink pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="max-w-3xl">
            <span className="chip-blue mb-4 inline-block">Solutions</span>
            <h1 className="font-outfit font-bold text-5xl sm:text-6xl text-slate-900 leading-tight mb-6">
              AI Solutions Built for <span className="text-gradient">Real Environments</span>
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed font-ibm">
              From architecture design to production deployment, MAH Quantum delivers end-to-end intelligent systems that embed as foundational operational infrastructure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Capability stats */}
      <section className="py-10 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((c, i) => (
              <motion.div key={c.label} {...fadeUp} transition={{ delay: i * 0.08, duration: 0.5 }} className="text-center">
                <div className="font-outfit font-bold text-3xl text-gradient mb-1">{c.value}</div>
                <div className="text-slate-500 text-sm font-ibm">{c.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="font-outfit font-bold text-4xl sm:text-5xl text-slate-900 mb-4">
              Our <span className="text-gradient">Service Portfolio</span>
            </h2>
            <p className="text-slate-500 text-base max-w-xl mx-auto font-ibm">
              Eight specialized service areas covering every dimension of enterprise AI implementation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  {...fadeUp}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  data-testid={`service-card-${service.id}`}
                  className="card-glass p-6 flex flex-col group"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300" style={{ background: `${service.color}15` }}>
                    <Icon size={22} style={{ color: service.color }} />
                  </div>
                  <h3 className="font-outfit font-semibold text-lg text-slate-900 mb-3 leading-tight">{service.name}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed flex-1 mb-4 font-ibm">{service.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {service.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full text-xs font-medium bg-white/70 border border-slate-200 text-slate-600 font-ibm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 section-alt">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="font-outfit font-bold text-4xl text-slate-900 mb-4">
              Our <span className="text-gradient">Delivery Process</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Discovery', desc: 'Deep analysis of operational workflows and inefficiencies to identify AI integration opportunities.' },
              { step: '02', title: 'Architecture', desc: 'Custom Quantum Brain configuration for your domain, including data pipeline and model design.' },
              { step: '03', title: 'Integration', desc: 'Seamless deployment within existing enterprise systems with minimal operational disruption.' },
              { step: '04', title: 'Evolution', desc: 'Continuous learning loops ensure the system improves and adapts over time autonomously.' },
            ].map((step, i) => (
              <motion.div key={step.step} {...fadeUp} transition={{ delay: i * 0.1, duration: 0.6 }} className="card-glass p-6">
                <div className="font-outfit font-black text-4xl text-gradient mb-4">{step.step}</div>
                <h3 className="font-outfit font-bold text-xl text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-ibm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-[#00B4FF]/10 blur-[100px]" />
          <div className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full bg-[#FF00A0]/8 blur-[80px]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <h2 className="font-outfit font-bold text-4xl text-white mb-4">
              Ready to Transform Your <span className="text-gradient">Operations?</span>
            </h2>
            <p className="text-slate-300 text-base mb-8 font-ibm">
              Discuss your specific requirements with our team and receive a custom AI architecture proposal.
            </p>
            <Link to="/contact" data-testid="services-contact-cta" className="btn-primary inline-flex items-center gap-2">
              Request a Consultation <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
