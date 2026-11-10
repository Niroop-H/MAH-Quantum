import { Link } from 'react-router-dom';
import IndustryShowcase from '../components/IndustryShowcase';
import HomeKineticBackdrop from '../components/HomeKineticBackdrop';
import {
  ArrowUpRight,
  ChevronRight,
  Cpu,
  Database,
  Globe2,
  Mail,
  Network,
  ShieldCheck,
  Sigma,
  Workflow,
} from 'lucide-react';

const capabilities = [
  {
    number: '01',
    title: 'Intelligent Systems',
    text: 'Design and engineering of intelligent software systems for operational environments, with an emphasis on reliability, data discipline and controlled deployment.',
    icon: Network,
  },
  {
    number: '02',
    title: 'Semiconductor Engineering',
    text: 'Programs spanning digital design, FPGA development, verification, research infrastructure and university-industry semiconductor initiatives.',
    icon: Cpu,
  },
  {
    number: '03',
    title: 'Applied Research',
    text: 'Structured research programs that turn technical questions into documented experiments, prototypes, datasets and reproducible engineering work.',
    icon: Sigma,
  },
];

const sectors = [
  'Advanced Computing',
  'Semiconductors',
  'Enterprise Systems',
  'Research & Education',
  'Industrial Technology',
];

const credentials = [
  ['SAM.gov', 'Active registration · Federal Assistance Awards Only'],
  ['MSME', 'Government-registered enterprise in India'],
  ['Research', 'MAH Quantum™ Research Institute'],
  ['International', 'Technology and research ecosystem participation'],
];

export default function Home() {
  return (
    <div className="site-home">

      {/* HERO */}
      <section className="hero-section">
        <HomeKineticBackdrop />
        <div className="hero-atmosphere" aria-hidden="true" />
        <div className="hero-rule" />

        <div className="container hero-grid">

          <div className="hero-copy">
            <p className="kicker">
              ENGINEERING &amp; RESEARCH · BENGALURU, INDIA
            </p>

            <h1 className="hero-brand-title">
              MAH Quantum<sup className="brand-trademark">™</sup>
            </h1>

            <p className="hero-lede">
              Intelligent systems. Semiconductor engineering. Applied research.
            </p>

            <div className="hero-actions">
              <Link className="button button-dark" to="/contact">
                Start a conversation
                <ArrowUpRight size={17} />
              </Link>

              <Link className="text-link" to="/architecture">
                Explore the architecture
                <ChevronRight size={16} />
              </Link>
            </div>

            <div className="hero-note">
              <span className="status-mark" />
              Founded 2023 · Bengaluru, India
            </div>
          </div>

          <div
            className="hero-dossier"
            aria-label="MAH Quantum™ institutional profile"
          >
            <div className="dossier-top">
              <span>INSTITUTIONAL PROFILE</span>
              <span>2026 / 27</span>
            </div>

            <img className="dossier-mark" src="/logo.jpeg?v=20261110" alt="MAH Quantum™ emblem" />

            <div className="dossier-title">
              MAH QUANTUM<sup className="brand-trademark">™</sup>
            </div>

            <p>
              Advanced technology, engineering and research.
            </p>

            <div className="dossier-lines">

              <div>
                <span>Entity</span>
                <strong>MAH Quantum<sup className="brand-trademark">™</sup></strong>
              </div>

              <div>
                <span>Jurisdiction</span>
                <strong>India</strong>
              </div>

              <div>
                <span>Primary base</span>
                <strong>Bengaluru, Karnataka</strong>
              </div>

              <div>
                <span>Website</span>
                <strong>mahquantum.tech</strong>
              </div>

            </div>

            <div className="dossier-footer">
              <span>01 / 04</span>
              <span>COMPANY RECORD</span>
            </div>
          </div>

        </div>
      </section>


      {/* POSITION */}
      <section className="statement-section">
        <div className="container statement-grid">

          <p className="section-index">
            01 — POSITION
          </p>

          <div>
            <h2>
              Technology is only valuable when it can be{' '}
              <span>engineered, verified and put to work.</span>
            </h2>

            <p className="body-copy">
              Our work sits between research and deployment. We build
              the technical foundations, operating models and partnerships
              required to move ambitious ideas into accountable systems.
            </p>
          </div>

        </div>
      </section>


      {/* CAPABILITIES */}
      <section className="capabilities-section">
        <div className="container">

          <div className="section-heading">

            <div>
              <p className="section-index">
                02 — CAPABILITIES
              </p>

              <h2>
                Three areas. One engineering discipline.
              </h2>
            </div>

            <p>
              Focused programs instead of a catalogue of
              disconnected services.
            </p>

          </div>


          <div className="capability-list">

            {capabilities.map(
              ({ number, title, text, icon: Icon }) => (
                <article
                  className="capability-row"
                  key={number}
                >

                  <div className="capability-number">
                    {number}
                  </div>

                  <div className="capability-icon">
                    <Icon
                      size={23}
                      strokeWidth={1.6}
                    />
                  </div>

                  <div className="capability-content">

                    <h3>{title}</h3>

                    <p>{text}</p>

                  </div>

                  <ArrowUpRight
                    className="capability-arrow"
                    size={20}
                  />

                </article>
              )
            )}

          </div>

        </div>
      </section>


      {/* INSTITUTIONAL RECORD */}
      <section className="record-section">

        <div className="container">

          <div className="record-header">

            <div>

              <p className="section-index">
                03 — INSTITUTIONAL RECORD
              </p>

              <h2>
                Built to operate beyond a website.
              </h2>

            </div>

            <p>
              Selected registration and organizational records.
            </p>

          </div>


          <div className="record-grid">

            {credentials.map(
              ([label, text], index) => (

                <div
                  className="record-card"
                  key={label}
                >

                  <span className="record-no">
                    0{index + 1}
                  </span>

                  <h3>{label}</h3>

                  <p>{text}</p>


                  {label === 'SAM.gov' && (

                    <div className="record-detail">

                      <span>UNIQUE ENTITY ID</span>

                      <strong>
                        P2K2E5T4FE26
                      </strong>

                      <span>
                        ACTIVE · 28 SEP 2026
                      </span>

                    </div>

                  )}

                </div>

              )
            )}

          </div>

        </div>

      </section>


      {/* SYSTEMS */}
      <section className="architecture-section">

        <div className="container architecture-grid">

          <div>

            <p className="section-index">
              04 — SYSTEMS
            </p>

            <h2>
              From data to decision, with the engineering underneath.
            </h2>

            <p className="body-copy">
              Our systems work is organized around clear layers:
              data acquisition, computation, memory, reasoning,
              planning and controlled execution. The objective is
              not novelty for its own sake; it is a system that can
              be understood, tested and improved.
            </p>

            <Link
              className="button button-outline"
              to="/architecture"
            >
              View system architecture
              <ArrowUpRight size={16} />
            </Link>

          </div>


          <div className="system-diagram">

            <div className="diagram-label">
              REFERENCE SYSTEM / MQ-D25
            </div>

            {[
              ['01', 'DATA', Database],
              ['02', 'COMPUTE', Cpu],
              ['03', 'MEMORY', Workflow],
              ['04', 'REASONING', Sigma],
              ['05', 'EXECUTION', ShieldCheck],
            ].map(([no, name, Icon], i) => (

              <div
                className="diagram-step"
                key={no}
              >

                <span>{no}</span>

                <Icon
                  size={17}
                  strokeWidth={1.5}
                />

                <strong>{name}</strong>

                {i < 4 && <i />}

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* SECTORS */}
      <section className="sectors-section">

        <div className="container sectors-grid">

          <div>

            <p className="section-index">
              05 — SECTORS
            </p>

            <h2>
              Where engineering meets industry.
            </h2>

          </div>


          <div className="sector-list">

            {sectors.map((sector, index) => (

              <div
                className="sector-item"
                key={sector}
              >

                <span>
                  0{index + 1}
                </span>

                <strong>
                  {sector}
                </strong>

                <ChevronRight size={16} />

              </div>

            ))}

          </div>

        </div>

      </section>



      {/* MQSI QUANTUM MISSION */}
      <section className="mqsi-mission-section">
        <div className="container mqsi-mission-grid">
          <div className="mqsi-mission-copy">
            <p className="section-index">RESEARCH ECOSYSTEM / QUANTUM INITIATIVE</p>
            <div className="mqsi-kicker"><span /> MQSI ADVANCED RESEARCH COMMUNITY</div>
            <h2>Quantum research.<br/><em>Connected minds. Real progress.</em></h2>
            <p className="body-copy">
              Explore the MQSI Quantum Mission — a research community advancing quantum computing
              knowledge, collaborative experimentation and institutional research engagement.
            </p>
            <a className="mqsi-mission-link" href="https://mqsiquantum.mahquantum.tech/" target="_blank" rel="noopener noreferrer">
              Explore MQSI Quantum Mission <ArrowUpRight size={17}/>
            </a>
            <span className="mqsi-powered">LED BY MQSI ADVANCED RESEARCH COMMUNITY · POWERED BY MAH QUANTUM</span>
          </div>
          <div className="mqsi-mission-visual" aria-label="Quantum research network visualisation">
            <div className="mqsi-visual-top"><span>MQSI / QUANTUM RESEARCH NETWORK</span><span>RESEARCH ECOSYSTEM</span></div>
            <svg className="mqsi-network-art" viewBox="0 0 560 340" role="img" aria-label="Abstract quantum research network with connected institutions and compute nodes">
              <defs>
                <linearGradient id="mqsiTrace" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#c8ff00" stopOpacity=".8"/>
                  <stop offset="1" stopColor="#ff00a6" stopOpacity=".8"/>
                </linearGradient>
                <radialGradient id="mqsiCore">
                  <stop offset="0" stopColor="#ff00a6" stopOpacity=".45"/>
                  <stop offset="1" stopColor="#ff00a6" stopOpacity="0"/>
                </radialGradient>
              </defs>
              <circle cx="280" cy="164" r="126" fill="none" stroke="#303640" strokeDasharray="2 8"/>
              <circle cx="280" cy="164" r="94" fill="none" stroke="#303640"/>
              <circle cx="280" cy="164" r="67" fill="url(#mqsiCore)"/>
              <g fill="none" stroke="url(#mqsiTrace)" strokeWidth="1.5">
                <path d="M280 164 L280 48 L164 48 L112 100"/>
                <path d="M280 164 L408 164 L468 104"/>
                <path d="M280 164 L280 278 L392 278 L448 228"/>
                <path d="M280 164 L152 210 L96 264"/>
                <path d="M280 164 L196 94 L196 34"/>
                <path d="M280 164 L366 90 L366 40"/>
              </g>
              <g fill="#c8ff00">
                <circle cx="112" cy="100" r="5"/><circle cx="468" cy="104" r="5"/>
                <circle cx="448" cy="228" r="5"/><circle cx="96" cy="264" r="5"/>
                <circle cx="196" cy="34" r="4"/><circle cx="366" cy="40" r="4"/>
              </g>
              <g fill="#ff00a6">
                <circle cx="280" cy="48" r="5"/><circle cx="408" cy="164" r="5"/>
                <circle cx="392" cy="278" r="5"/><circle cx="152" cy="210" r="5"/>
              </g>
              <g transform="translate(280 164)">
                <rect x="-37" y="-37" width="74" height="74" rx="8" fill="#171b23" stroke="#c8ff00" strokeOpacity=".7"/>
                <rect x="-25" y="-25" width="50" height="50" rx="4" fill="#242b35" stroke="#ff00a6"/>
                <path d="M-16 -9 H16 M-16 0 H16 M-16 9 H16 M-9 -16 V16 M0 -16 V16 M9 -16 V16" stroke="#c8ff00" strokeOpacity=".65"/>
                <circle r="5" fill="#ff00a6"/>
              </g>
              <g fill="#8f98a4" fontSize="9" letterSpacing="1.5">
                <text x="62" y="85">INSTITUTIONS</text><text x="414" y="88">COLLABORATION</text>
                <text x="410" y="250">RESEARCH</text><text x="52" y="286">QUANTUM COMPUTE</text>
                <text x="230" y="18">KNOWLEDGE</text>
              </g>
            </svg>
            <div className="mqsi-visual-bottom"><span>01 / COLLABORATIVE RESEARCH</span><span>OPEN EXTERNAL PLATFORM ↗</span></div>
          </div>
        </div>
      </section>

      <IndustryShowcase />

      {/* RESEARCH */}
      <section className="research-section">

        <div className="container research-grid">

          <div className="research-stamp">

            <Globe2
              size={28}
              strokeWidth={1.4}
            />

            <span>
              RESEARCH
              <br />
              &amp; ENGINEERING
            </span>

          </div>


          <div>

            <p className="section-index">
              06 — RESEARCH
            </p>

            <h2>
              A research culture with an engineering finish line.
            </h2>

            <p className="body-copy">
              MAH Quantum™ supports structured research, technical
              publication, semiconductor education and experimental
              systems development through its research and industry
              programs.
            </p>

            <Link
              className="text-link dark-link"
              to="/about"
            >
              Learn about MAH Quantum™
              <ArrowUpRight size={16} />
            </Link>

          </div>

        </div>

      </section>


      {/* CONTACT */}
      <section className="contact-strip">

        <div className="container contact-grid">

          <div>

            <p className="section-index">
              07 — CONTACT
            </p>

            <h2>
              Have a technical problem worth solving?
            </h2>

          </div>


          <div className="contact-side">

            <p>
              Partnerships · Research · Engineering · Industry Programs
            </p>

            <Link
              className="button button-dark"
              to="/contact"
            >
              Contact MAH Quantum™
              <Mail size={16} />
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}
