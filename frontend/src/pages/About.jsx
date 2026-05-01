import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Target, Shield, Layers, Globe, Zap,
  User, FlaskConical, Monitor, Briefcase,
  Factory, Truck, HeartPulse, Building2
} from 'lucide-react';

const fadeUp = { initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const values = [
  { icon: Target, title: 'Mission', text: 'To enable organizations worldwide to transition from reactive processes to adaptive, autonomous, and continuously evolving operational systems.', color: '#00B4FF' },
  { icon: Globe, title: 'Vision', text: 'To establish a foundational intelligence layer for modern industries, where intelligent systems are embedded as core operational infrastructure.', color: '#8B5CF6' },
  { icon: Shield, title: 'Approach', text: 'AI is not an add-on feature but a foundational component embedded within enterprise systems, ensuring scalability, interoperability, and long-term adaptability.', color: '#FF00A0' },
];

const coreAreas = [
  { icon: Layers, title: 'AI System Architecture', desc: 'Designing and deploying production-ready AI systems that integrate with business workflows.' },
  { icon: Zap, title: 'Enterprise Infrastructure', desc: 'Backend infrastructure, distributed data pipelines, and API orchestration frameworks.' },
  { icon: Shield, title: 'Intelligent Operations', desc: 'Reducing operational losses, improving efficiency, and enabling data-driven decision-making.' },
  { icon: Globe, title: 'Scalable Deployment', desc: 'Model routing systems and deployment architectures for scalable, secure AI implementation.' },
];

const platforms = [
  { icon: Layers, title: 'MAH Quantum (Core Systems)', desc: 'Development of intelligent software systems and AI architectures.', color: '#00B4FF' },
  { icon: FlaskConical, title: 'MAH Quantum Research Institute', desc: 'Academic and professional research publication platform.', color: '#8B5CF6' },
  { icon: Monitor, title: 'MAH Quantum Workspace', desc: 'Internal and operational system environment for development and deployment.', color: '#00C9A7' },
  { icon: Briefcase, title: 'Quanta Industries', desc: 'Business and strategic collaboration division facilitating partnerships, enterprise discussions, and industry engagement.', color: '#FF00A0' },
];

const applications = [
  { icon: Factory, title: 'Manufacturing', desc: 'Process optimization and predictive intelligence for industrial workflows.', color: '#00B4FF' },
  { icon: Truck, title: 'Logistics', desc: 'Intelligent routing and operational efficiency across supply chains.', color: '#8B5CF6' },
  { icon: HeartPulse, title: 'Healthcare', desc: 'Data-driven decision systems for clinical and operational environments.', color: '#FF00A0' },
  { icon: Building2, title: 'Enterprise Systems', desc: 'Workflow automation and infrastructure intelligence for large-scale organizations.', color: '#00C9A7' },
];

export default function About() {
  return (
    <div className="bg-[#F8FAFC]">

      {/* Header */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] orb-blue pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="max-w-3xl">
            <span className="chip-blue mb-4 inline-block">About Us</span>
            <h1 className="font-outfit font-bold text-5xl sm:text-6xl text-slate-900 leading-tight mb-6">
              Intelligence as <span className="text-gradient">Infrastructure</span>
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed font-ibm">
              MAH Quantum is an advanced artificial intelligence and information technology company focused on engineering intelligent systems that operate seamlessly within real-world environments.
            </p>
            <p className="text-slate-500 text-base leading-relaxed font-ibm mt-4">
              Founded in 2023, with execution initiated on October 25, 2025, MAH Quantum is based in Bangalore Urban, Karnataka, India. The organization operates across multiple sectors including artificial intelligence, system architecture, enterprise infrastructure, and applied research.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission / Vision / Approach */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div key={v.title} {...fadeUp} transition={{ delay: i * 0.1, duration: 0.6 }} className="card-glass p-8">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${v.color}18` }}>
                    <Icon size={24} style={{ color: v.color }} />
                  </div>
                  <h3 className="font-outfit font-bold text-2xl text-slate-900 mb-3">{v.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-ibm">{v.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-24 section-alt">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp} transition={{ duration: 0.7 }}>
              <span className="chip-blue mb-4 inline-block">Founder</span>
              <h2 className="font-outfit font-bold text-4xl sm:text-5xl text-slate-900 mb-6">
                Built by <span className="text-gradient">Niroop H</span>
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-4 font-ibm">
                MAH Quantum was founded by Niroop H, a computer science engineer focused on building large-scale intelligent systems and advancing applied AI research.
              </p>
              <p className="text-slate-600 text-base leading-relaxed font-ibm">
                The initiative is driven by a long-term vision of transforming intelligence into a foundational infrastructure layer for real-world systems.
              </p>
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.2, duration: 0.7 }}>
              <div className="card-glass p-8 border-l-4 border-[#00B4FF]">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00B4FF]/20 to-[#8B5CF6]/15 flex items-center justify-center mb-6">
                  <User size={26} className="text-[#00B4FF]" />
                </div>
                <h4 className="font-outfit font-bold text-xl text-slate-900 mb-1">Niroop H</h4>
                <p className="text-[#00B4FF] text-sm font-ibm font-medium mb-4">Founder, MAH Quantum</p>
                <p className="text-slate-500 text-sm leading-relaxed font-ibm">
                  Computer science engineer specializing in large-scale intelligent systems, applied AI research, and transforming intelligence into a foundational infrastructure layer for modern industries.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div {...fadeUp} transition={{ duration: 0.7 }}>
              <h2 className="font-outfit font-bold text-4xl sm:text-5xl text-slate-900 mb-6">
                Our Work Lies at the <span className="text-gradient">Intersection</span>
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-6 font-ibm">
                Our work lies at the intersection of AI, system architecture, and enterprise infrastructure, where we design and deploy solutions that address high-impact operational inefficiencies across industries.
              </p>
              <p className="text-slate-600 text-base leading-relaxed mb-6 font-ibm">
                Rather than developing isolated tools, MAH Quantum delivers integrated intelligence systems that function as core operational layers within organizations, supporting complex workflows across diverse domains.
              </p>
              <p className="text-slate-600 text-base leading-relaxed font-ibm">
                In parallel, we are actively developing a large-scale AI environment and integrated tool ecosystem within the broader IT landscape, including backend infrastructure, distributed data pipelines, API orchestration frameworks, model routing systems, and deployment architectures.
              </p>
            </motion.div>

            {/* Core Areas Grid */}
            <motion.div {...fadeUp} transition={{ delay: 0.2, duration: 0.7 }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {coreAreas.map((area) => {
                const Icon = area.icon;
                return (
                  <div key={area.title} className="card-glass p-6">
                    <Icon size={20} className="text-[#00B4FF] mb-3" />
                    <h4 className="font-outfit font-semibold text-slate-900 text-base mb-2">{area.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed font-ibm">{area.desc}</p>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Platforms & Ecosystem */}
      <section className="py-24 section-alt">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="max-w-2xl mb-14">
            <span className="chip-blue mb-4 inline-block">Ecosystem</span>
            <h2 className="font-outfit font-bold text-4xl sm:text-5xl text-slate-900 mb-4">
              Platforms and <span className="text-gradient">Ecosystem</span>
            </h2>
            <p className="text-slate-500 text-base leading-relaxed font-ibm">
              MAH Quantum operates through an integrated ecosystem of platforms, forming a unified environment for research, development, business collaboration, and real-world implementation of intelligent systems.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {platforms.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.title} {...fadeUp} transition={{ delay: i * 0.1, duration: 0.6 }} className="card-glass p-6">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${p.color}18` }}>
                    <Icon size={20} style={{ color: p.color }} />
                  </div>
                  <h4 className="font-outfit font-semibold text-slate-900 text-sm mb-2 leading-snug">{p.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-ibm">{p.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="max-w-2xl mb-14">
            <span className="chip-blue mb-4 inline-block">Applications</span>
            <h2 className="font-outfit font-bold text-4xl sm:text-5xl text-slate-900 mb-4">
              Real-World <span className="text-gradient">Deployment</span>
            </h2>
            <p className="text-slate-500 text-base leading-relaxed font-ibm">
              MAH Quantum systems are designed for real-world deployment across industries, reducing inefficiencies, improving operational visibility, and enabling adaptive, data-driven decision-making.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {applications.map((app, i) => {
              const Icon = app.icon;
              return (
                <motion.div key={app.title} {...fadeUp} transition={{ delay: i * 0.1, duration: 0.6 }} className="card-glass p-6">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${app.color}18` }}>
                    <Icon size={20} style={{ color: app.color }} />
                  </div>
                  <h4 className="font-outfit font-semibold text-slate-900 text-base mb-2">{app.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-ibm">{app.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Zero-State Core */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#00B4FF]/10 blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[#FF00A0]/8 blur-[80px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div {...fadeUp} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#00B4FF]/20 to-[#FF00A0]/15 border border-white/10 mb-8 shadow-[0_0_40px_rgba(0,180,255,0.2)]">
                <span className="font-outfit font-bold text-2xl text-gradient">[-0-]</span>
              </div>
              <h2 className="font-outfit font-bold text-4xl sm:text-5xl text-white mb-6">
                The Zero-State Core
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-6 font-ibm">
                A domain-agnostic intelligence foundation denoted by the notation [-0-]. This core represents a configurable intelligence base that can be deployed across multiple industries without structural modification.
              </p>
              <p className="text-slate-400 text-base leading-relaxed font-ibm">
                By decoupling core intelligence from domain-specific constraints, the architecture ensures scalability, interoperability, and long-term adaptability across sectors including manufacturing, logistics, healthcare, energy, and enterprise infrastructure.
              </p>
              <div className="mt-8">
                <Link to="/architecture" data-testid="about-architecture-cta" className="btn-primary inline-flex items-center gap-2">
                  Explore Architecture <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
