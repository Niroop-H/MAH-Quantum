import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Linkedin, Twitter } from 'lucide-react';

const fadeUp = { initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const team = [
  {
    id: 'ceo',
    initials: 'MA',
    name: 'M. Al-Hassan',
    role: 'Founder & CEO',
    dept: 'Leadership',
    bio: 'Visionary leader with 15+ years in enterprise AI and distributed systems. Architected the Zero-State Core framework and leads MAH Quantum\'s strategic direction.',
    gradient: 'from-[#00B4FF] to-[#0070CC]',
    expertise: ['Strategic Vision', 'Enterprise AI', 'System Architecture'],
  },
  {
    id: 'cto',
    initials: 'RK',
    name: 'R. Kumar',
    role: 'Chief Technology Officer',
    dept: 'Technology',
    bio: 'Expert in large-scale AI architecture and cloud-native deployment. Leads the engineering of the Quantum Brain\'s core infrastructure and production systems.',
    gradient: 'from-[#7C3AED] to-[#4C1D95]',
    expertise: ['AI Architecture', 'Cloud Infrastructure', 'Production Systems'],
  },
  {
    id: 'research',
    initials: 'JC',
    name: 'Dr. J. Chen',
    role: 'Head of AI Research',
    dept: 'Research',
    bio: 'Specializing in multi-modal learning systems and cognitive architectures. Drives the D25@1007 benchmarking framework and reasoning engine development.',
    gradient: 'from-[#EC4899] to-[#BE185D]',
    expertise: ['Deep Learning', 'Cognitive Systems', 'D25@1007 Framework'],
  },
  {
    id: 'architect',
    initials: 'SA',
    name: 'S. Al-Ibrahim',
    role: 'Lead Systems Architect',
    dept: 'Engineering',
    bio: 'Core architect of the Quantum [-0-] Brain infrastructure layers. Specializes in distributed system design and high-performance AI pipeline engineering.',
    gradient: 'from-[#0EA5E9] to-[#0284C7]',
    expertise: ['Distributed Systems', 'Pipeline Engineering', 'AI Infrastructure'],
  },
  {
    id: 'bizdev',
    initials: 'MV',
    name: 'M. Voss',
    role: 'VP Business Development',
    dept: 'Business',
    bio: 'Drives strategic partnerships across manufacturing, healthcare, logistics, and energy sectors. 12+ years of enterprise technology sales and partnership experience.',
    gradient: 'from-[#F59E0B] to-[#D97706]',
    expertise: ['Enterprise Partnerships', 'Market Strategy', 'Industry Relations'],
  },
  {
    id: 'product',
    initials: 'AP',
    name: 'A. Patel',
    role: 'Product & Solutions Director',
    dept: 'Product',
    bio: 'Drives the integration of Quantum Brain solutions with enterprise workflows. Ensures every deployment translates directly into measurable operational outcomes.',
    gradient: 'from-[#10B981] to-[#059669]',
    expertise: ['Product Strategy', 'Solution Design', 'Enterprise Delivery'],
  },
];

const deptColors = {
  Leadership: { bg: 'bg-[#00B4FF]/10', text: 'text-[#0070CC]', border: 'border-[#00B4FF]/20' },
  Technology: { bg: 'bg-[#7C3AED]/10', text: 'text-[#7C3AED]', border: 'border-[#7C3AED]/20' },
  Research: { bg: 'bg-[#EC4899]/10', text: 'text-[#EC4899]', border: 'border-[#EC4899]/20' },
  Engineering: { bg: 'bg-[#0EA5E9]/10', text: 'text-[#0EA5E9]', border: 'border-[#0EA5E9]/20' },
  Business: { bg: 'bg-[#F59E0B]/10', text: 'text-[#D97706]', border: 'border-[#F59E0B]/20' },
  Product: { bg: 'bg-[#10B981]/10', text: 'text-[#059669]', border: 'border-[#10B981]/20' },
};

export default function Team() {
  return (
    <div className="bg-[#F8FAFC]">
      {/* Header */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] orb-blue pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] orb-pink pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <span className="chip-blue mb-4 inline-block">Our Team</span>
            <h1 className="font-outfit font-bold text-5xl sm:text-6xl text-slate-900 leading-tight mb-6">
              The Minds Behind <span className="text-gradient">MAH Quantum</span>
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed font-ibm">
              A multidisciplinary team of AI researchers, systems engineers, and enterprise strategists united by a mission to build the intelligence infrastructure of tomorrow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => {
              const dc = deptColors[member.dept];
              return (
                <motion.div
                  key={member.id}
                  {...fadeUp}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  data-testid={`team-member-${member.id}`}
                  className="card-glass p-8 flex flex-col"
                >
                  {/* Avatar */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center shadow-lg`}>
                      <span className="font-outfit font-bold text-xl text-white">{member.initials}</span>
                    </div>
                    <div className="flex gap-2">
                      <a href="#" data-testid={`team-linkedin-${member.id}`} className="p-2 rounded-lg bg-slate-100 hover:bg-[#00B4FF]/10 hover:text-[#00B4FF] transition-all duration-200 text-slate-500">
                        <Linkedin size={14} />
                      </a>
                      <a href="#" data-testid={`team-twitter-${member.id}`} className="p-2 rounded-lg bg-slate-100 hover:bg-[#00B4FF]/10 hover:text-[#00B4FF] transition-all duration-200 text-slate-500">
                        <Twitter size={14} />
                      </a>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="mb-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${dc.bg} ${dc.text} ${dc.border} mb-2 font-ibm`}>
                      {member.dept}
                    </span>
                    <h3 className="font-outfit font-bold text-xl text-slate-900">{member.name}</h3>
                    <p className="text-sm font-medium text-slate-500 font-ibm">{member.role}</p>
                  </div>

                  <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-5 font-ibm">{member.bio}</p>

                  {/* Expertise tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {member.expertise.map((exp) => (
                      <span key={exp} className="px-2.5 py-1 rounded-full text-xs bg-white/70 border border-slate-200 text-slate-600 font-ibm">
                        {exp}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-20 section-alt">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <h2 className="font-outfit font-bold text-4xl text-slate-900 mb-4">
              Join the <span className="text-gradient">Mission</span>
            </h2>
            <p className="text-slate-500 text-base mb-8 font-ibm">
              MAH Quantum is building the future of enterprise AI. We're always looking for exceptional engineers, researchers, and strategists.
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
