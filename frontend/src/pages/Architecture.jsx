import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity, ArrowDown, ArrowLeftRight, ArrowUpRight, Boxes, BrainCircuit,
  Cable, Check, ChevronDown, ChevronRight, CircuitBoard, Cloud, Code2,
  Cpu, Database, Eye, Fingerprint, GitBranch, Gauge, Layers3, Lock,
  Network, RadioTower, RefreshCw, Route, Satellite, Server, ShieldCheck,
  Signal, Workflow, Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ArchitectureCore from '../components/ArchitectureCore';

const layers = [
  {
    id: 'edge', index: 'L01', name: 'Physical & edge interface', subtitle: 'The boundary between physical assets and digital systems',
    icon: Eye, role: 'Acquire trustworthy signals from equipment, sensors, operators and external data sources.',
    components: ['Sensors & transducers', 'PLC / RTU / MCU gateways', 'Cameras & machine vision', 'FPGA data acquisition', 'Edge buffering', 'Device identity'],
    protocols: ['OPC UA', 'Modbus TCP', 'MQTT', 'CAN / CAN-FD', 'UART / SPI / I²C', 'REST adapters'],
    output: 'Timestamped, identified and quality-tagged observations',
  },
  {
    id: 'ingest', index: 'L02', name: 'Connectivity & data plane', subtitle: 'Transport, validation and event distribution',
    icon: Network, role: 'Move telemetry and application events through controlled, observable interfaces.',
    components: ['Protocol adapters', 'API gateway', 'Message broker', 'Schema registry', 'Stream processing', 'Dead-letter queues'],
    protocols: ['HTTPS / REST', 'WebSocket', 'gRPC', 'AMQP', 'Kafka-compatible events', 'Protobuf / JSON'],
    output: 'Validated event streams and normalized data contracts',
  },
  {
    id: 'data', index: 'L03', name: 'Data & knowledge fabric', subtitle: 'Structured state, context and traceable history',
    icon: Database, role: 'Persist operational state and connect events to assets, documents and domain knowledge.',
    components: ['Time-series storage', 'Relational records', 'Object / file storage', 'Vector retrieval', 'Knowledge graph', 'Metadata catalogue'],
    protocols: ['SQL', 'S3-compatible object APIs', 'Vector search', 'Graph queries', 'CDC pipelines', 'Data lineage'],
    output: 'Versioned context with provenance and retention controls',
  },
  {
    id: 'compute', index: 'L04', name: 'Compute & model plane', subtitle: 'Deterministic computation and specialised inference',
    icon: Cpu, role: 'Execute domain algorithms, simulations and validated model workloads.',
    components: ['CPU / GPU workloads', 'FPGA acceleration', 'Model serving', 'Physics / system models', 'Digital signal processing', 'Simulation workers'],
    protocols: ['ONNX Runtime', 'CUDA-enabled workloads', 'OpenCL / Vulkan compute', 'FMI / FMU', 'Python services', 'Container workloads'],
    output: 'Reproducible computations, model outputs and simulation results',
  },
  {
    id: 'intelligence', index: 'L05', name: 'Intelligence & decision services', subtitle: 'Interpretation, constraints and human-supervised decisions',
    icon: BrainCircuit, role: 'Combine rules, analytics and model-assisted reasoning into reviewable recommendations.',
    components: ['Rules engine', 'Anomaly detection', 'Planning & optimisation', 'Knowledge retrieval', 'Uncertainty estimation', 'Human approval gates'],
    protocols: ['Policy evaluation', 'Feature / model registry', 'Audit events', 'Decision APIs', 'Workflow orchestration', 'Feedback capture'],
    output: 'Evidence-linked recommendations with confidence and constraints',
  },
  {
    id: 'experience', index: 'L06', name: 'Application & visualisation plane', subtitle: 'Engineering tools, operators and decision interfaces',
    icon: Layers3, role: 'Present system state through role-aware interfaces and interactive engineering workspaces.',
    components: ['3D scene / digital representation', 'Engineering dashboards', 'Simulation workbench', 'Alert console', 'Reports & exports', 'Role-based workspace'],
    protocols: ['WebGL / WebGPU', 'WebSocket updates', 'REST APIs', 'OAuth / OIDC', 'Accessible UI patterns', 'Export interfaces'],
    output: 'Contextual views, operator workflows and traceable reports',
  },
  {
    id: 'governance', index: 'L07', name: 'Trust, security & governance', subtitle: 'Cross-cutting controls across every layer',
    icon: ShieldCheck, role: 'Apply identity, access, integrity, observability and change control end to end.',
    components: ['Identity & least privilege', 'Encryption in transit / at rest', 'Secrets management', 'Signed artefacts', 'Audit trails', 'Backup & recovery'],
    protocols: ['OIDC / SAML', 'mTLS', 'RBAC / ABAC', 'SBOM', 'Secure boot concepts', 'Centralised telemetry'],
    output: 'Auditable access, controlled changes and operational assurance',
  },
];

const domains = [
  { id: 'defence', name: 'Defence & mission systems', icon: ShieldCheck, path: 'Sensor / radar feeds → edge fusion → track data → decision support → operator review', stack: ['Sensor fusion', 'Low-latency edge processing', 'Resilient communications', 'Geospatial context', 'Human-authorised response'], note: 'Illustrative non-weaponised systems architecture for sensing, communications and decision support.' },
  { id: 'silicon', name: 'Silicon & semiconductor', icon: CircuitBoard, path: 'RTL / design data → EDA toolchain → verification → implementation → sign-off evidence', stack: ['RTL design & lint', 'Simulation and assertions', 'Formal property checks', 'Synthesis / timing analysis', 'PDK-aware implementation flows'], note: 'Engineering workflow reference; actual process nodes and foundry rules depend on licensed PDKs and tool availability.' },
  { id: 'smartgrid', name: 'Smart grid & energy', icon: Zap, path: 'Meters / IEDs → substation gateway → SCADA / historian → analytics → operator dispatch', stack: ['IEC 61850 concepts', 'SCADA / EMS integration', 'Time-series analytics', 'Load and asset forecasting', 'Grid event auditability'], note: 'Supervisory and decision-support architecture. Protection and switching actions remain under authorised utility controls.' },
  { id: 'aerospace', name: 'Aerospace & space systems', icon: Satellite, path: 'Payload sensors → onboard data handling → comms link → ground segment → mission analytics', stack: ['Telemetry / telecommand separation', 'Onboard processing', 'Ground station interfaces', 'Time synchronisation', 'Fault detection & health monitoring'], note: 'Conceptual mission-data architecture, not a flight-qualified design or certified avionics stack.' },
];

const flowNodes = [
  { n: '01', title: 'Physical world', desc: 'Sensors · devices · assets', icon: RadioTower },
  { n: '02', title: 'Edge & transport', desc: 'Gateways · protocols · events', icon: Cable },
  { n: '03', title: 'Data fabric', desc: 'State · history · knowledge', icon: Database },
  { n: '04', title: 'Compute & models', desc: 'Algorithms · simulation · inference', icon: Cpu },
  { n: '05', title: 'Decision services', desc: 'Rules · planning · review', icon: BrainCircuit },
  { n: '06', title: 'Applications', desc: 'Visualisation · workflows · reports', icon: Workflow },
];

function LayerDetail({ layer, selected, onSelect }) {
  const Icon = layer.icon;
  const active = selected === layer.id;
  return (
    <button type="button" className={`architecture-layer-row ${active ? 'selected' : ''}`} onClick={() => onSelect(active ? null : layer.id)} aria-expanded={active}>
      <span className="architecture-layer-index">{layer.index}</span>
      <span className="architecture-layer-icon"><Icon size={19} /></span>
      <span className="architecture-layer-name"><strong>{layer.name}</strong><small>{layer.subtitle}</small></span>
      <ChevronDown className={active ? 'rotated' : ''} size={17} />
      <AnimatePresence initial={false}>
        {active && (
          <motion.span className="architecture-layer-expanded" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
            <span className="architecture-layer-role">{layer.role}</span>
            <span className="architecture-detail-grid">
              <span><b>COMPONENTS</b>{layer.components.map(x => <i key={x}>{x}</i>)}</span>
              <span><b>INTERFACES & TECHNOLOGIES</b>{layer.protocols.map(x => <i key={x}>{x}</i>)}</span>
            </span>
            <span className="architecture-layer-output"><Check size={14} /> {layer.output}</span>
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export default function Architecture() {
  const [selectedLayer, setSelectedLayer] = useState('compute');
  const [domain, setDomain] = useState('defence');
  const selectedDomain = domains.find(d => d.id === domain);
  const DomainIcon = selectedDomain.icon;

  return (
    <main className="architecture-page">
      <section className="architecture-hero">
        <div className="architecture-hero-grid">
          <div className="architecture-hero-copy">
            <span className="architecture-eyebrow"><span /> SYSTEMS ENGINEERING / REFERENCE ARCHITECTURE</span>
            <h1>From physical signals<br/>to <em>intelligent systems.</em></h1>
            <p>A modular architecture for connected, compute-intensive and safety-conscious engineering environments. Explore the layers, interfaces and domain-specific pathways.</p>
            <div className="architecture-hero-actions">
              <a href="#architecture-stack" className="architecture-primary-action">Explore the architecture <ChevronRight size={16}/></a>
              <a href="#domain-blueprints" className="architecture-secondary-action">View domain blueprints <ArrowUpRight size={15}/></a>
            </div>
            <div className="architecture-hero-meta"><span>07 ARCHITECTURE PLANES</span><span>06 DATA FLOW STAGES</span><span>04 DOMAIN BLUEPRINTS</span></div>
          </div>
          <div className="architecture-hero-visual">
            <div className="architecture-visual-label"><span>MQ / SYSTEMS MODEL</span><span>INTERACTIVE 3D</span></div>
            <ArchitectureCore />
            <div className="architecture-visual-caption"><span>CORE / 00</span><strong>Layered systems topology</strong><span>DRAG TO ROTATE</span></div>
          </div>
        </div>
      </section>

      <section className="architecture-principles">
        <div><span>01 / DESIGN PRINCIPLE</span><strong>Modular by boundary</strong><p>Each plane exposes explicit interfaces and can evolve independently.</p></div>
        <div><span>02 / DATA DISCIPLINE</span><strong>Traceable by design</strong><p>Events, models and decisions retain identity, context and provenance.</p></div>
        <div><span>03 / OPERATIONAL CONTROL</span><strong>Human-governed execution</strong><p>Critical actions require policy checks and authorised approval.</p></div>
      </section>

      <section className="architecture-flow-section">
        <div className="architecture-section-heading">
          <span className="architecture-eyebrow">01 — END-TO-END SYSTEM FLOW</span>
          <h2>One continuous engineering pipeline.</h2>
          <p>Data moves from physical acquisition to operator-facing applications. Governance and security apply across every stage.</p>
        </div>
        <div className="architecture-flow-track">
          {flowNodes.map((node, i) => {
            const Icon = node.icon;
            return <div className="architecture-flow-node" key={node.n}><span>{node.n}</span><Icon size={22}/><strong>{node.title}</strong><small>{node.desc}</small>{i < flowNodes.length - 1 && <ChevronRight className="flow-next" size={17}/>}</div>;
          })}
        </div>
        <div className="architecture-governance-rail"><ShieldCheck size={17}/><span>TRUST PLANE</span><p>Identity · encryption · policy · audit · observability · resilience</p><span>APPLIES ACROSS ALL LAYERS</span></div>
      </section>

      <section className="architecture-stack-section" id="architecture-stack">
        <div className="architecture-stack-intro">
          <div><span className="architecture-eyebrow">02 — TECHNICAL REFERENCE STACK</span><h2>Seven planes.<br/><em>One coherent system.</em></h2><p>Select any layer to inspect its role, building blocks, interfaces and expected outputs. This is a reference blueprint; deployed components depend on each project's requirements.</p></div>
          <div className="architecture-stack-summary"><span>STACK COMPOSITION</span><strong>07</strong><small>interoperable planes</small><div><i/><i/><i/><i/><i/><i/><i/></div><span>VERTICAL + CROSS-CUTTING CONTROLS</span></div>
        </div>
        <div className="architecture-layer-explorer">
          <div className="architecture-layer-spine"><span>APPLICATION SURFACE</span><div>{layers.slice(0, 6).reverse().map(l => <i key={l.id} />)}</div><span>PHYSICAL INTERFACE</span></div>
          <div className="architecture-layer-list">{layers.map(layer => <LayerDetail key={layer.id} layer={layer} selected={selectedLayer} onSelect={setSelectedLayer}/>)}</div>
        </div>
      </section>

      <section className="architecture-domain-section" id="domain-blueprints">
        <div className="architecture-section-heading">
          <span className="architecture-eyebrow">03 — DOMAIN BLUEPRINTS</span>
          <h2>Different industries.<br/><em>Different engineering constraints.</em></h2>
          <p>The same architectural discipline adapts to different physical systems, data rates, assurance needs and operational environments.</p>
        </div>
        <div className="architecture-domain-tabs" role="tablist" aria-label="Engineering domain">
          {domains.map(d => { const Icon = d.icon; return <button key={d.id} role="tab" aria-selected={domain === d.id} className={domain === d.id ? 'active' : ''} onClick={() => setDomain(d.id)}><Icon size={16}/>{d.name}</button>; })}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={domain} className="architecture-domain-blueprint" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .2 }}>
            <div className="domain-blueprint-main">
              <div className="domain-blueprint-icon"><DomainIcon size={28}/></div>
              <span className="architecture-eyebrow">REFERENCE FLOW / {selectedDomain.id.toUpperCase()}</span>
              <h3>{selectedDomain.name}</h3>
              <div className="domain-flow-line">{selectedDomain.path.split(' → ').map((part, i, arr) => <span key={part}>{part}{i < arr.length - 1 && <ChevronRight size={14}/>}</span>)}</div>
              <p>{selectedDomain.note}</p>
            </div>
            <div className="domain-blueprint-stack"><span>ENGINEERING BUILDING BLOCKS</span>{selectedDomain.stack.map((item, i) => <div key={item}><b>0{i + 1}</b>{item}<Check size={14}/></div>)}</div>
          </motion.div>
        </AnimatePresence>
      </section>

      <section className="architecture-assurance-section">
        <div className="architecture-assurance-heading"><span className="architecture-eyebrow">04 — ENGINEERING ASSURANCE</span><h2>Designed to be inspected.<br/><em>Not just demonstrated.</em></h2><p>Architecture quality depends on verifiable interfaces, predictable failure handling and evidence at each stage of the lifecycle.</p></div>
        <div className="architecture-assurance-grid">
          <article><Lock size={21}/><h3>Security boundaries</h3><p>Identity-aware access, least privilege, secrets handling and encryption.</p><span>IDENTITY / ACCESS / INTEGRITY</span></article>
          <article><Activity size={21}/><h3>Observability</h3><p>Structured logs, metrics, traces, health checks and event correlation.</p><span>LOGS / METRICS / TRACES</span></article>
          <article><RefreshCw size={21}/><h3>Resilience</h3><p>Timeouts, retries, back-pressure, buffering, graceful degradation and recovery.</p><span>FAULT / RECOVERY / CONTINUITY</span></article>
          <article><Fingerprint size={21}/><h3>Verification</h3><p>Interface contracts, test evidence, model validation and controlled releases.</p><span>TEST / VALIDATE / RELEASE</span></article>
        </div>
      </section>

      <section className="architecture-lifecycle">
        <div><span className="architecture-eyebrow">05 — DELIVERY LIFECYCLE</span><h2>From architecture<br/><em>to accountable deployment.</em></h2><p>Each stage produces engineering artefacts that can be reviewed before the next stage proceeds.</p></div>
        <div className="lifecycle-steps">{[['01','Discover','Requirements, constraints and system context'],['02','Architect','Boundaries, interfaces and threat model'],['03','Prototype','Proofs of concept and integration tests'],['04','Verify','Functional, performance and resilience evidence'],['05','Deploy','Controlled release, monitoring and change records']].map(([n,t,d],i)=><div key={n}><span>{n}</span><div><strong>{t}</strong><small>{d}</small></div>{i < 4 && <ChevronRight size={15}/>}</div>)}</div>
      </section>

      <section className="architecture-disclaimer"><Signal size={17}/><p><strong>Architecture note:</strong> This page presents a modular reference architecture and illustrative technology options. It does not claim that every listed component, protocol, certification or integration is currently implemented in a production MAH Quantum system. Actual deployment is scoped, validated and documented per project.</p></section>

      <section className="architecture-contact"><div><span className="architecture-eyebrow">SYSTEMS / RESEARCH / ENGINEERING</span><h2>Have a system to architect?</h2><p>Bring us the operating context, constraints and engineering challenge.</p></div><Link to="/contact">Discuss a project <ArrowUpRight size={16}/></Link></section>
    </main>
  );
}
