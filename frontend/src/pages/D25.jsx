import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight, ChevronRight, Shield, Cpu, BrainCircuit, RadioTower,
  Network, Satellite, Workflow, Layers3, FlaskConical, CircuitBoard,
  Globe2, Lock, Eye, Crosshair, Waves, Zap, Radar, ChevronDown,
} from 'lucide-react';

const initiatives = [
  {
    code: 'Q0B', name: 'Quantum[-0-]Brain', category: 'FRONTIER AI / COGNITIVE SYSTEMS',
    status: 'IN DEVELOPMENT', accent: 'pink', icon: BrainCircuit,
    summary: 'An exploratory intelligence architecture focused on complex reasoning, contextual synthesis and adaptive computational workflows.',
    focus: ['Cognitive architecture', 'Reasoning systems', 'Contextual intelligence', 'Experimental evaluation'],
    visual: 'brain',
  },
  {
    code: 'D25', name: 'D25@1007', category: 'INTELLIGENCE FRAMEWORK',
    status: 'RESEARCH FRAMEWORK', accent: 'lime', icon: Workflow,
    summary: 'An internal framework for structuring the evaluation and progression of advanced intelligence systems. Detailed methodology remains internal.',
    focus: ['Evaluation architecture', 'Capability measurement', 'System-level validation', 'Research governance'],
    visual: 'layers',
  },
  {
    code: 'SX-D2', name: 'ScorpioX D2', category: 'FRONTIER AI / AUTONOMOUS SYSTEMS',
    status: 'IN DEVELOPMENT', accent: 'pink', icon: Crosshair,
    summary: 'A developing frontier-AI initiative exploring perception, situational understanding and coordinated system intelligence.',
    focus: ['Perception research', 'Situational understanding', 'Multi-system coordination', 'Decision-support concepts'],
    visual: 'scorpio',
  },
  {
    code: 'ASURA-01', name: 'ASURA Defence Intelligence System', category: 'FRONTIER AI / DEFENCE INTELLIGENCE',
    status: 'IN DEVELOPMENT', accent: 'lime', icon: Shield,
    summary: 'An India-led research initiative exploring AI-enabled intelligence workflows, information fusion and analytical decision support for defence-oriented contexts.',
    focus: ['Information fusion', 'Intelligence analysis', 'Operational awareness', 'Human-supervised decision support'],
    visual: 'asura',
  },
  {
    code: 'ASURA-02', name: 'ASURA Defence Systems', category: 'DEFENCE SYSTEMS ENGINEERING',
    status: 'IN DEVELOPMENT', accent: 'pink', icon: Radar,
    summary: 'A separate systems-engineering programme exploring integrated sensing, resilient infrastructure and defence-oriented technology systems.',
    focus: ['Systems integration', 'Sensor and data interfaces', 'Resilient architecture', 'Engineering assurance'],
    visual: 'defence',
  },
  {
    code: 'QD2', name: 'Quantum D2 Drones', category: 'AEROSPACE / UNCREWED SYSTEMS',
    status: 'IN DEVELOPMENT', accent: 'lime', icon: Satellite,
    summary: 'An emerging unmanned-systems initiative exploring intelligent aerial platforms, onboard computation and connected mission systems.',
    focus: ['Aerial platform concepts', 'Onboard intelligence', 'Telemetry and control architecture', 'System integration'],
    visual: 'drone',
  },
];

const centres = [
  {
    code: 'Q-COE', name: 'Quantum Centre of Excellence', accent: 'pink',
    partners: ['IBM Quantum Classroom', 'MAH Quantum', 'Devashri S Quantum'],
    description: 'An institutional pathway for quantum computing education, experimentation and collaborative research.',
    capabilities: ['Quantum computing access and learning', 'Circuit design and simulation', 'Research-led experimentation', 'Institutional capacity building'],
    icon: Waves,
  },
  {
    code: 'S-COE', name: 'Semiconductor Centre of Excellence', accent: 'lime',
    partners: ['Intel Infrastructure', 'MAH Quantum Technologies', 'Devashri S Semiconductors'],
    description: 'A semiconductor engineering ecosystem focused on practical design workflows, verification and technology education.',
    capabilities: ['Digital design and FPGA workflows', 'RTL verification and simulation', 'Semiconductor design education', 'Research and industry engagement'],
    icon: CircuitBoard,
  },
];

const projectVisuals = {
  brain: <><path d="M250 45 C190 45 160 90 174 132 C128 150 146 216 188 222 C192 270 252 282 278 246 C312 282 373 258 367 213 C412 187 393 127 352 121 C359 77 306 42 275 67Z"/><path d="M270 66V244 M210 92L270 128L334 91 M177 151L230 166L270 128L337 160L389 139 M190 215L238 201L270 244L322 207L370 220 M230 166L230 201 M337 160L322 207"/><circle cx="270" cy="128" r="7"/><circle cx="230" cy="166" r="5"/><circle cx="337" cy="160" r="5"/></>,
  layers: <><path d="M110 110L280 35L450 110L280 185Z"/><path d="M110 155L280 230L450 155 M110 200L280 275L450 200 M110 245L280 320L450 245"/><path d="M280 35V320"/></>,
  scorpio: <><path d="M280 70L330 110L365 175L335 235L280 265L225 235L195 175L230 110Z"/><path d="M230 110L150 80L110 115L185 150 M330 110L410 80L450 115L375 150 M225 235L160 275L110 250 M335 235L400 275L450 250 M280 70V25 M260 265L245 310 M300 265L315 310"/><circle cx="280" cy="175" r="36"/><circle cx="280" cy="175" r="9"/></>,
  asura: <><path d="M280 35L405 90V185C405 250 350 290 280 325C210 290 155 250 155 185V90Z"/><path d="M280 75L365 112V183C365 228 325 258 280 282C235 258 195 228 195 183V112Z"/><path d="M230 174L265 209L333 137"/><path d="M120 170H175 M385 170H440 M280 12V55"/></>,
  defence: <><path d="M280 40L410 95L390 220L280 300L170 220L150 95Z"/><path d="M280 75L365 112L350 205L280 260L210 205L195 112Z"/><circle cx="280" cy="166" r="45"/><path d="M280 110V222 M225 166H335 M240 126L320 206 M320 126L240 206"/></>,
  drone: <><path d="M280 160L235 130L165 80L135 95L205 165L165 230L190 245L260 195L350 245L375 230L340 165L425 95L395 80L325 130Z"/><path d="M135 95L90 55 M395 80L440 45 M165 230L115 280 M375 230L430 280"/><circle cx="90" cy="55" r="24"/><circle cx="440" cy="45" r="24"/><circle cx="115" cy="280" r="24"/><circle cx="430" cy="280" r="24"/><circle cx="280" cy="160" r="16"/></>,
};

function TechnicalArt({ type, accent }) {
  return (
    <div className={`initiative-art art-${accent}`}>
      <div className="initiative-art-top"><span>MAH QUANTUM / SYSTEM STUDY</span><span>FIG. {type.toUpperCase()}</span></div>
      <svg viewBox="0 0 560 350" role="img" aria-label="Abstract technical illustration">
        <defs>
          <linearGradient id={`artStroke-${type}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={accent === 'pink' ? '#ff00a6' : '#c8ff00'}/>
            <stop offset="100%" stopColor="#d9e0e8"/>
          </linearGradient>
        </defs>
        <g className="art-blueprint-lines">
          <path d="M30 70H530 M30 140H530 M30 210H530 M30 280H530 M90 25V325 M190 25V325 M290 25V325 M390 25V325 M490 25V325"/>
        </g>
        <g className="art-drawing" stroke={`url(#artStroke-${type})`}>{projectVisuals[type]}</g>
        <g className="art-coordinate"><circle cx="280" cy="175" r="145"/><circle cx="280" cy="175" r="120"/><path d="M280 18V332 M40 175H520"/></g>
      </svg>
      <div className="initiative-art-bottom"><span>CONCEPTUAL VISUALISATION</span><span>DETAILS WITHHELD</span></div>
    </div>
  );
}

function InitiativeCard({ item, index }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = item.icon;
  return (
    <motion.article className={`initiative-card initiative-${item.accent}`} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .5, delay: (index % 3) * .07 }}>
      <TechnicalArt type={item.visual} accent={item.accent}/>
      <div className="initiative-card-body">
        <div className="initiative-meta"><span>{item.code}</span><span>{item.status}</span></div>
        <p className="initiative-category">{item.category}</p>
        <h3>{item.name}</h3>
        <p className="initiative-summary">{item.summary}</p>
        <button className="initiative-expand" onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>
          {expanded ? 'Close overview' : 'Explore focus areas'} <ChevronDown size={15} className={expanded ? 'is-open' : ''}/>
        </button>
        <AnimatePresence initial={false}>
          {expanded && <motion.div className="initiative-focus" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
            {item.focus.map((focus, i) => <div key={focus}><span>0{i + 1}</span>{focus}</div>)}
          </motion.div>}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

function CentreCard({ centre }) {
  const Icon = centre.icon;
  return (
    <article className={`coe-card coe-${centre.accent}`}>
      <div className="coe-card-head"><span>{centre.code} / INSTITUTIONAL PARTNERSHIP</span><Icon size={25}/></div>
      <h3>{centre.name}</h3>
      <p>{centre.description}</p>
      <div className="coe-partners">{centre.partners.map(partner => <span key={partner}>{partner}</span>)}</div>
      <div className="coe-capabilities">{centre.capabilities.map((cap, i) => <div key={cap}><span>0{i + 1}</span>{cap}</div>)}</div>
    </article>
  );
}

export default function D25() {
  return (
    <main className="portfolio-page">
      <section className="portfolio-hero">
        <div className="portfolio-hero-inner">
          <div className="portfolio-hero-copy">
            <span className="portfolio-eyebrow"><i/> MAH QUANTUM / PROJECTS & INITIATIVES</span>
            <h1>Engineering what<br/><em>comes next.</em></h1>
            <p>A portfolio of frontier intelligence research, defence-oriented systems, aerospace concepts and advanced technology programmes. Selected details are intentionally reserved.</p>
            <div className="portfolio-hero-links"><a href="#frontier-projects">Explore projects <ChevronRight size={16}/></a><a href="#centres-of-excellence">Centres of Excellence <ArrowUpRight size={15}/></a></div>
            <div className="portfolio-hero-stats"><span><b>06</b> FEATURED PROJECTS</span><span><b>02</b> CENTRES OF EXCELLENCE</span><span><b>01</b> INTERNATIONAL MISSION</span></div>
          </div>
          <div className="portfolio-hero-visual">
            <div className="portfolio-visual-header"><span>MQ / PROGRAMME LANDSCAPE</span><span>2026 — ONGOING</span></div>
            <div className="portfolio-orbit-map">
              <div className="portfolio-orbit orbit-a"/><div className="portfolio-orbit orbit-b"/><div className="portfolio-orbit orbit-c"/>
              <div className="portfolio-hub"><span>MQ</span><b>ENGINEERING<br/>ECOSYSTEM</b></div>
              {['AI','DEF','SEM','QNT','AERO','R&D'].map((label,i)=><div className={`portfolio-node node-${i}`} key={label}><i/>{label}</div>)}
            </div>
            <div className="portfolio-visual-footer"><span>RESEARCH / SYSTEMS / MISSIONS</span><span>INDIA · GLOBAL COLLABORATION</span></div>
          </div>
        </div>
      </section>

      <section className="portfolio-intro">
        <span className="portfolio-section-index">01 / FRONTIER PROJECTS</span>
        <div><h2>Distinct programmes.<br/><em>One engineering ambition.</em></h2><p>Our project portfolio spans advanced intelligence, defence systems and next-generation platforms. These are active development and research directions; public summaries are intentionally high-level.</p></div>
      </section>

      <section className="initiative-grid-section" id="frontier-projects">
        <div className="initiative-grid">{initiatives.map((item, index)=><InitiativeCard item={item} index={index} key={item.code}/>)}</div>
        <div className="portfolio-more"><span className="more-pulse"/><p>ADDITIONAL SYSTEMS AND RESEARCH PROGRAMMES ARE UNDER DEVELOPMENT</p><strong>More initiatives will be introduced as they mature.</strong></div>
      </section>

      <section className="portfolio-collaboration">
        <div className="collaboration-visual">
          <div className="collab-globe"><div/><div/><div/><span>GLOBAL<br/>COLLABORATION</span></div>
          <div className="collab-location loc-ca"><i/>CALIFORNIA</div><div className="collab-location loc-br"><i/>BRAZIL</div><div className="collab-location loc-tn"><i/>TUNISIA</div><div className="collab-location loc-kr"><i/>SOUTH KOREA</div><div className="collab-location loc-in"><i/>INDIA / LEAD</div>
        </div>
        <div className="collaboration-copy">
          <span className="portfolio-eyebrow"><i/> DISTRIBUTED RESEARCH COLLABORATION</span>
          <h2>India-led ambition.<br/><em>International perspectives.</em></h2>
          <p>Selected frontier AI initiatives are being developed through a distributed team with contributors across California, Brazil, Tunisia and South Korea, alongside the India-led programme.</p>
          <p className="collaboration-note">Geographic references describe team collaboration and do not imply government sponsorship, endorsement or institutional affiliation.</p>
        </div>
      </section>

      <section className="coe-section" id="centres-of-excellence">
        <div className="portfolio-section-heading">
          <span className="portfolio-section-index">02 / INSTITUTIONAL INFRASTRUCTURE</span>
          <h2>Centres of Excellence.<br/><em>Capability built with institutions.</em></h2>
          <p>Collaborative centres designed to bring specialised tools, structured learning and research pathways closer to university ecosystems.</p>
        </div>
        <div className="coe-grid">{centres.map(centre=><CentreCard key={centre.code} centre={centre}/>)}</div>
      </section>

      <section className="mission-section">
        <div className="mission-visual">
          <div className="mission-visual-head"><span>MQSI / INTERNATIONAL QUANTUM MISSION</span><span>GLOBAL RESEARCH NETWORK</span></div>
          <svg viewBox="0 0 620 360" role="img" aria-label="International quantum research collaboration map">
            <defs><radialGradient id="missionGlow"><stop stopColor="#ff00a6" stopOpacity=".35"/><stop offset="1" stopColor="#ff00a6" stopOpacity="0"/></radialGradient></defs>
            <ellipse cx="310" cy="180" rx="235" ry="82" fill="none" stroke="#424954" strokeDasharray="4 7"/>
            <ellipse cx="310" cy="180" rx="180" ry="125" fill="none" stroke="#424954" transform="rotate(-26 310 180)"/>
            <ellipse cx="310" cy="180" rx="180" ry="125" fill="none" stroke="#424954" transform="rotate(26 310 180)"/>
            <circle cx="310" cy="180" r="105" fill="url(#missionGlow)"/>
            <g fill="none" stroke="#c8ff00" strokeOpacity=".72" strokeWidth="1.5"><path d="M310 180L120 100L82 220 M310 180L485 85L540 180 M310 180L450 285L520 260 M310 180L160 290L82 220"/></g>
            <g fill="#ff00a6"><circle cx="120" cy="100" r="6"/><circle cx="485" cy="85" r="6"/><circle cx="450" cy="285" r="6"/></g>
            <g fill="#c8ff00"><circle cx="82" cy="220" r="6"/><circle cx="540" cy="180" r="6"/><circle cx="160" cy="290" r="6"/></g>
            <circle cx="310" cy="180" r="45" fill="#171b23" stroke="#ff00a6" strokeWidth="1.5"/><path d="M288 180H332 M310 158V202 M295 165L325 195 M325 165L295 195" stroke="#c8ff00" strokeWidth="2"/>
            <g fill="#aab2bd" fontSize="10" letterSpacing="1.5"><text x="70" y="78">INSTITUTIONS</text><text x="470" y="62">RESEARCH</text><text x="450" y="315">COLLABORATION</text><text x="72" y="250">QUANTUM ACCESS</text><text x="268" y="248">MQSI</text></g>
          </svg>
          <div className="mission-visual-foot"><span>01 / QUANTUM RESEARCH COMMUNITY</span><span>MQSIQUANTUM.MAHQUANTUM.TECH ↗</span></div>
        </div>
        <div className="mission-copy">
          <span className="portfolio-eyebrow"><i/> 03 / INTERNATIONAL MISSION</span>
          <h2>MQSI International<br/><em>Quantum Mission.</em></h2>
          <p>An international quantum research initiative connecting learners, institutions and research communities through collaborative quantum computing advancement.</p>
          <p className="mission-powered">LED BY MQSI ADVANCED RESEARCH COMMUNITY · POWERED BY MAH QUANTUM</p>
          <a href="https://mqsiquantum.mahquantum.tech/" target="_blank" rel="noopener noreferrer">Explore the mission <ArrowUpRight size={16}/></a>
        </div>
      </section>

      <section className="portfolio-closing">
        <span className="portfolio-eyebrow"><i/> THE WORK CONTINUES</span>
        <h2>Building beyond<br/><em>the visible horizon.</em></h2>
        <p>For institutional collaborations, research partnerships and project enquiries, connect with MAH Quantum.</p>
        <Link to="/contact">Discuss a collaboration <ArrowUpRight size={16}/></Link>
      </section>
    </main>
  );
}
