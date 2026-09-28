import { Link } from 'react-router-dom';
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
  ['Research', 'MAH Quantum Research Institute'],
  ['International', 'Technology and research ecosystem participation'],
];

export default function Home() {
  return (
    <div className="site-home">

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-rule" />

        <div className="container hero-grid">

          <div className="hero-copy">
            <p className="kicker">
              MAH QUANTUM · EST. 2023
            </p>

            <h1>
              Engineering systems for the{' '}
              <em>next</em> generation of technology.
            </h1>

            <p className="hero-lede">
              MAH Quantum develops intelligent systems, semiconductor
              initiatives and applied research programs built around
              disciplined engineering rather than presentation alone.
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
              Bengaluru, India · Research & Engineering
            </div>
          </div>

          <div
            className="hero-dossier"
            aria-label="MAH Quantum institutional profile"
          >
            <div className="dossier-top">
              <span>INSTITUTIONAL PROFILE</span>
              <span>2026 / 27</span>
            </div>

            <div className="dossier-mark">
              MQ
            </div>

            <div className="dossier-title">
              MAH QUANTUM
            </div>

            <p>
              Advanced technology, engineering and research.
            </p>

            <div className="dossier-lines">

              <div>
                <span>Entity</span>
                <strong>MAH Quantum</strong>
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
              MAH Quantum supports structured research, technical
              publication, semiconductor education and experimental
              systems development through its research and industry
              programs.
            </p>

            <Link
              className="text-link dark-link"
              to="/about"
            >
              Learn about MAH Quantum
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
              Contact MAH Quantum
              <Mail size={16} />
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}
