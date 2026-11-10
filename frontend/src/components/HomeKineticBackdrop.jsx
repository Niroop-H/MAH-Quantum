import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uPointer;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    mat2 rotate = mat2(0.80, -0.60, 0.60, 0.80);
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p = rotate * p * 2.03 + 11.7;
      amplitude *= 0.5;
    }
    return value;
  }

  float ribbon(float x, float center, float width, float softness) {
    float d = abs(x - center);
    return 1.0 - smoothstep(width, width + softness, d);
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);
    float t = uTime;
    vec2 pointer = uPointer * 0.12;

    // Slow, large-scale fluid distortion. No particles, grids or mesh silhouettes.
    float warpA = fbm(p * 1.45 + vec2(t * 0.035, -t * 0.022));
    float warpB = fbm(p * 2.1 - vec2(t * 0.026, t * 0.031) + 4.0);
    vec2 flow = vec2(warpA - 0.5, warpB - 0.5);
    vec2 q = p + flow * 0.72 + pointer;

    float bend1 = sin(q.x * 1.42 + t * 0.22 + fbm(q * 1.3) * 2.2) * 0.30;
    float bend2 = sin(q.x * 2.05 - t * 0.16 + fbm(q * 2.0 + 8.0) * 1.6) * 0.19;
    float bend3 = cos(q.x * 0.82 + t * 0.12 + fbm(q * 1.1 + 15.0) * 2.0) * 0.36;

    float field1 = q.y - bend1 - 0.17;
    float field2 = q.y - bend2 + 0.31;
    float field3 = q.y - bend3 - 0.02;

    float silk1 = ribbon(field1, 0.0, 0.027, 0.13);
    float silk2 = ribbon(field2, 0.0, 0.018, 0.10);
    float silk3 = ribbon(field3, 0.0, 0.012, 0.075);

    // Fine specular ridges make each flowing band feel like folded liquid metal.
    float ridge1 = exp(-abs(field1) * 95.0) * (0.35 + 0.65 * sin(field1 * 180.0 + t * 1.7));
    float ridge2 = exp(-abs(field2) * 125.0);
    float ridge3 = exp(-abs(field3) * 155.0);

    float turbulence = fbm(q * 3.0 + vec2(t * 0.05, -t * 0.07));
    float flowMask = smoothstep(0.22, 0.88, turbulence);
    vec3 base = vec3(0.018, 0.022, 0.030);
    vec3 pink = vec3(1.0, 0.015, 0.43);
    vec3 lime = vec3(0.73, 1.0, 0.015);
    vec3 silver = vec3(0.66, 0.72, 0.82);

    float pinkBand = silk1 * (0.45 + 0.55 * flowMask);
    float limeBand = silk2 * (0.30 + 0.70 * (1.0 - flowMask));
    float silverBand = silk3 * 0.48;

    vec3 color = base;
    color += pink * pinkBand * 0.48;
    color += lime * limeBand * 0.23;
    color += silver * silverBand * 0.30;
    color += pink * ridge1 * 0.18;
    color += lime * ridge2 * 0.15;
    color += silver * ridge3 * 0.22;

    // Broad, soft illumination blooms drift behind the flowing silk.
    float bloomPink = exp(-length((q - vec2(0.36, 0.04)) * vec2(0.8, 1.35)) * 2.8);
    float bloomLime = exp(-length((q - vec2(-0.58, -0.12)) * vec2(0.7, 1.1)) * 3.4);
    color += pink * bloomPink * (0.035 + 0.025 * sin(t * 0.22));
    color += lime * bloomLime * (0.018 + 0.012 * cos(t * 0.18));

    // Atmospheric vignette preserves readable contrast for the foreground content.
    float vignette = 1.0 - smoothstep(0.18, 1.45, length(p * vec2(0.78, 1.12)));
    color *= 0.62 + vignette * 0.55;
    color = pow(max(color, 0.0), vec3(0.92));
    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function HomeKineticBackdrop() {
  const host = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const element = host.current;
    if (!element) return undefined;

    let renderer;
    let animationFrame = 0;
    let visible = !document.hidden;
    let pointer = new THREE.Vector2(0, 0);
    let targetPointer = new THREE.Vector2(0, 0);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: false,
        powerPreference: 'high-performance',
        stencil: false,
        depth: false,
      });
    } catch {
      element.classList.add('home-kinetic-fallback');
      return undefined;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(element.clientWidth, element.clientHeight, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    element.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(element.clientWidth, element.clientHeight) },
      uPointer: { value: new THREE.Vector2(0, 0) },
    };
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      depthWrite: false,
      depthTest: false,
    });
    const surface = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(surface);

    const resize = () => {
      const width = Math.max(element.clientWidth, 1);
      const height = Math.max(element.clientHeight, 1);
      renderer.setSize(width, height, false);
      uniforms.uResolution.value.set(width * renderer.getPixelRatio(), height * renderer.getPixelRatio());
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    resize();

    const onPointerMove = (event) => {
      const bounds = element.getBoundingClientRect();
      targetPointer.set(
        ((event.clientX - bounds.left) / bounds.width - 0.5) * 2,
        ((event.clientY - bounds.top) / bounds.height - 0.5) * -2
      );
    };
    const onPointerLeave = () => targetPointer.set(0, 0);
    const onVisibility = () => { visible = !document.hidden; };
    element.addEventListener('pointermove', onPointerMove, { passive: true });
    element.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibility);

    const renderFrame = (timestamp) => {
      animationFrame = requestAnimationFrame(renderFrame);
      if (!visible || document.hidden) return;
      pointer.lerp(targetPointer, 0.025);
      uniforms.uPointer.value.copy(pointer);
      uniforms.uTime.value = timestamp * 0.00018;
      renderer.render(scene, camera);
    };

    if (!paused && !reducedMotion) animationFrame = requestAnimationFrame(renderFrame);
    else renderer.render(scene, camera);

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      element.removeEventListener('pointermove', onPointerMove);
      element.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      surface.geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [paused]);

  return (
    <>
      <div ref={host} className="home-kinetic-backdrop" aria-hidden="true" />
      <button
        type="button"
        className="home-motion-toggle"
        onClick={() => setPaused((value) => !value)}
        aria-pressed={paused}
        aria-label={paused ? 'Resume animated background' : 'Pause animated background'}
      >
        <span className={paused ? 'motion-indicator paused' : 'motion-indicator'} />
        {paused ? 'RESUME MOTION' : 'PAUSE MOTION'}
      </button>
    </>
  );
}
