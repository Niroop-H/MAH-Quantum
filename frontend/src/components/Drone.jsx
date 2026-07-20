import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Autonomous inspection drone — the hero's signature visual.
 * Represents edge perception feeding the Quantum [-0-] Brain below it.
 * Pure SVG (no external assets), CSS-driven rotor spin, framer-motion
 * idle float + pointer-reactive parallax tilt.
 */
export default function Drone({ className = '' }) {
  const wrapRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 16, mass: 0.4 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 16, mass: 0.4 });
  const shiftX = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 90, damping: 20 });

  const handleMove = (e) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`relative select-none ${className}`}
      style={{ perspective: 1400 }}
      data-testid="hero-drone"
    >
      {/* ambient underglow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(0,180,255,0.28), rgba(255,0,160,0.08) 55%, transparent 75%)' }}
      />

      <motion.div
        style={{ rotateX, rotateY, x: shiftX, transformStyle: 'preserve-3d' }}
        animate={{ y: [0, -16, 0], rotate: [0, 1.3, 0, -1.3, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 640 480" className="w-full h-auto overflow-visible" role="img" aria-label="Autonomous inspection drone — MAH Quantum edge intelligence">
          <defs>
            <linearGradient id="dr-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="55%" stopColor="#EEF2F7" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
            <linearGradient id="dr-canopy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EAF6FF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#00B4FF" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id="dr-arm" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
            <radialGradient id="dr-hub" cx="35%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="100%" stopColor="#64748B" />
            </radialGradient>
            <radialGradient id="dr-blur" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
              <stop offset="55%" stopColor="#8FD8FF" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#8FD8FF" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="dr-lens" cx="35%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="70%" stopColor="#0B0F19" />
              <stop offset="100%" stopColor="#000000" />
            </radialGradient>
            <linearGradient id="dr-beam" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00B4FF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#00B4FF" stopOpacity="0" />
            </linearGradient>
            <filter id="dr-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* scan beam + reticle */}
          <polygon points="320,278 258,430 382,430" fill="url(#dr-beam)">
            <animate attributeName="opacity" values="0.15;0.45;0.15" dur="3.2s" repeatCount="indefinite" />
          </polygon>
          <g style={{ transformOrigin: '320px 428px' }}>
            <circle cx="320" cy="428" r="24" fill="none" stroke="#00B4FF" strokeWidth="1.4" strokeDasharray="4 6" opacity="0.6">
              <animateTransform attributeName="transform" type="rotate" from="0 320 428" to="360 320 428" dur="14s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* arms */}
          <line x1="320" y1="212" x2="172" y2="128" stroke="url(#dr-arm)" strokeWidth="15" strokeLinecap="round" />
          <line x1="320" y1="212" x2="468" y2="128" stroke="url(#dr-arm)" strokeWidth="15" strokeLinecap="round" />
          <line x1="320" y1="222" x2="172" y2="300" stroke="url(#dr-arm)" strokeWidth="15" strokeLinecap="round" />
          <line x1="320" y1="222" x2="468" y2="300" stroke="url(#dr-arm)" strokeWidth="15" strokeLinecap="round" />

          {/* rotors: blur disc, hub, spinning blade cross */}
          {[
            { cx: 172, cy: 128, dir: 'normal' },
            { cx: 468, cy: 128, dir: 'reverse' },
            { cx: 172, cy: 300, dir: 'reverse' },
            { cx: 468, cy: 300, dir: 'normal' },
          ].map((r, i) => (
            <g key={i}>
              <ellipse cx={r.cx} cy={r.cy} rx="52" ry="17" fill="url(#dr-blur)" />
              <circle cx={r.cx} cy={r.cy} r="9" fill="url(#dr-hub)" stroke="#475569" strokeWidth="0.75" />
              <g style={{ transformOrigin: `${r.cx}px ${r.cy}px` }}>
                <line x1={r.cx - 46} y1={r.cy} x2={r.cx + 46} y2={r.cy} stroke="#FFFFFF" strokeWidth="2.5" opacity="0.55" strokeLinecap="round" />
                <line x1={r.cx} y1={r.cy - 14} x2={r.cx} y2={r.cy + 14} stroke="#00B4FF" strokeWidth="2.5" opacity="0.4" strokeLinecap="round" />
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from={r.dir === 'normal' ? `0 ${r.cx} ${r.cy}` : `360 ${r.cx} ${r.cy}`}
                  to={r.dir === 'normal' ? `360 ${r.cx} ${r.cy}` : `0 ${r.cx} ${r.cy}`}
                  dur="0.13s"
                  repeatCount="indefinite"
                />
              </g>
            </g>
          ))}

          {/* landing skids */}
          <path d="M266,244 Q320,258 374,244" stroke="#CBD5E1" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.85" />

          {/* body */}
          <rect x="255" y="182" width="130" height="54" rx="26" fill="url(#dr-body)" stroke="#E2E8F0" strokeWidth="1" />
          <ellipse cx="320" cy="179" rx="40" ry="19" fill="url(#dr-canopy)" stroke="rgba(255,255,255,0.85)" strokeWidth="1" />
          <path d="M298,175 Q320,164 342,175" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.65" fill="none" />
          <text x="320" y="215" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="11" fontWeight="700" fill="#0B0F19" opacity="0.5">[-0-]</text>

          {/* antenna */}
          <line x1="300" y1="185" x2="286" y2="156" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
          <circle cx="286" cy="156" r="3" fill="#00B4FF" />
          <line x1="340" y1="185" x2="354" y2="156" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
          <circle cx="354" cy="156" r="3" fill="#FF00A0" />

          {/* nav / beacon lights */}
          <circle cx="172" cy="118" r="4" fill="#22C55E" filter="url(#dr-glow)">
            <animate attributeName="opacity" values="1;0.2;1" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="468" cy="118" r="4" fill="#EF4444" filter="url(#dr-glow)">
            <animate attributeName="opacity" values="1;0.2;1" dur="1.8s" begin="0.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="320" cy="232" r="4.5" fill="#00B4FF" filter="url(#dr-glow)">
            <animate attributeName="opacity" values="0.35;1;0.35" dur="1.4s" repeatCount="indefinite" />
          </circle>

          {/* camera gimbal */}
          <rect x="311" y="238" width="18" height="12" rx="4" fill="url(#dr-hub)" />
          <circle cx="320" cy="272" r="15" fill="none" stroke="#CBD5E1" strokeWidth="3" />
          <circle cx="320" cy="272" r="10" fill="url(#dr-lens)" />
          <circle cx="320" cy="272" r="12.5" fill="none" stroke="#00B4FF" strokeWidth="1" opacity="0.55" />
          <circle cx="316" cy="268" r="2.1" fill="#FFFFFF" opacity="0.85" />
        </svg>
      </motion.div>

      {/* contact shadow */}
      <motion.div
        aria-hidden="true"
        animate={{ scaleX: [1, 0.86, 1], opacity: [0.22, 0.12, 0.22] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="mx-auto -mt-2 h-5 w-2/3 rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(15,23,42,0.4), transparent 75%)' }}
      />
    </div>
  );
}
