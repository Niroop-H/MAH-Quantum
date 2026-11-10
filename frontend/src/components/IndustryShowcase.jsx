import { useState } from 'react';
import { Activity, ArrowUpRight, Crosshair, Cpu, Gauge, RadioTower, Satellite, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import ModelViewer from './ModelViewer';

const disciplines = [
  { type: 'defense', number: '01', name: 'Defence systems', tag: 'SENSING · COMMUNICATIONS', summary: 'Radar infrastructure, resilient communications and mission-system engineering.', Icon: Shield },
  { type: 'silicon', number: '02', name: 'Silicon engineering', tag: 'WAFERS · MATERIALS', summary: 'Wafer-level structures, process visualisation and silicon technology.', Icon: Cpu },
  { type: 'semiconductor', number: '03', name: 'Semiconductors', tag: 'RTL · FPGA · VLSI', summary: 'Chip architecture, digital design, verification and semiconductor workflows.', Icon: Cpu },
  { type: 'smartgrid', number: '04', name: 'Smart grids', tag: 'ENERGY · CONTROL', summary: 'Grid telemetry, distributed assets and intelligent power infrastructure.', Icon: Zap },
  { type: 'aerospace', number: '05', name: 'Aerospace systems', tag: 'SATELLITES · TELEMETRY', summary: 'Satellite platforms, communications payloads and aerospace data systems.', Icon: Satellite },
];

const metrics = {
  compute: { label: 'Compute load', unit: '%', values: [28, 34, 31, 45, 42, 56, 49, 62, 58, 72, 66, 78] },
  energy: { label: 'Energy profile', unit: 'kW', values: [44, 42, 47, 43, 51, 49, 58, 54, 61, 57, 65, 63] },
  signal: { label: 'Signal integrity', unit: '%', values: [82, 84, 81, 88, 86, 91, 89, 94, 92, 96, 93, 98] },
};

function TelemetryChart() {
  const [metric, setMetric] = useState('compute');
  const values = metrics[metric].values;
  const points = values.map((v, i) => `${28 + i * 43},${148 - (v / 100) * 112}`).join(' ');
  const area = `28,148 ${points} 501,148`;
  return (
    <div className="telemetry-panel">
      <div className="telemetry-head">
        <div>
          <span className="showcase-eyebrow">SYSTEM TELEMETRY / DEMONSTRATION</span>
          <h3>Live engineering signals</h3>
          <p>Illustrative data visualisation — not live operational data.</p>
        </div>
        <Activity size={22} />
      </div>
      <div className="telemetry-tabs" role="tablist" aria-label="Telemetry metric">
        {Object.entries(metrics).map(([key, item]) => (
          <button key={key} type="button" role="tab" aria-selected={metric === key} className={metric === key ? 'active' : ''} onClick={() => setMetric(key)}>
            {item.label}
          </button>
        ))}
      </div>
      <div className="telemetry-chart">
        <div className="chart-axis-labels"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div>
        <svg viewBox="0 0 530 160" role="img" aria-label={metrics[metric].label + ' illustrative line chart'}>
          {[36, 64, 92, 120, 148].map(y => <line key={y} x1="28" y1={y} x2="501" y2={y} className="chart-gridline" />)}
          <polygon points={area} className="chart-area" />
          <polyline points={points} className="chart-line" />
          {values.map((v, i) => <circle key={i} cx={28 + i * 43} cy={148 - (v / 100) * 112} r="3.2" className="chart-point" />)}
        </svg>
      </div>
      <div className="telemetry-foot">
        <span><i /> {metrics[metric].label}</span>
        <strong>{values[values.length - 1]}{metrics[metric].unit}</strong>
        <span>12 sample intervals</span>
      </div>
    </div>
  );
}

export default function IndustryShowcase() {
  return (
    <section className="industry-showcase" id="engineering-models">
      <div className="container">
        <div className="showcase-heading">
          <div>
            <span className="showcase-eyebrow">ENGINEERING DOMAINS / 01—05</span>
            <h2>Explore the systems we engineer.</h2>
            <p>Five distinct technical domains. Rotate each model to inspect its structure.</p>
          </div>
          <span className="showcase-instruction"><Crosshair size={15} /> DRAG TO ROTATE · SCROLL TO ZOOM</span>
        </div>
        <div className="model-grid">
          {disciplines.map(({ type, number, name, tag, summary, Icon }) => (
            <article className="model-card" key={type}>
              <div className="model-card-top">
                <span>{number} / 05</span>
                <Icon size={18} />
              </div>
              <ModelViewer type={type} label={name} />
              <div className="model-card-copy">
                <span className="model-tag">{tag}</span>
                <h3>{name}</h3>
                <p>{summary}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="showcase-lower">
          <TelemetryChart />
          <div className="showcase-cta">
            <span className="showcase-eyebrow">FROM CONCEPT TO SYSTEM</span>
            <Gauge size={34} />
            <h3>Engineering needs more than a render.</h3>
            <p>Explore the technical architecture, validation approach and applied research behind our work.</p>
            <Link to="/architecture">Explore engineering architecture <ArrowUpRight size={16} /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
