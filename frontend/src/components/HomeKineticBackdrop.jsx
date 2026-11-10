import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function HomeKineticBackdrop() {
  const host = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return undefined;

    let renderer;
    let raf = 0;
    let visible = true;
    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 80);
    camera.position.set(0.15, 1.05, 9.2);
    camera.lookAt(0.55, 0, 0);

    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      el.classList.add('home-kinetic-fallback');
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xcbd2dc, 0x10131a, 1.7));
    const key = new THREE.DirectionalLight(0xffffff, 3.2);
    key.position.set(-3, 6, 5);
    scene.add(key);
    const pinkRim = new THREE.PointLight(0xff00a6, 32, 13);
    pinkRim.position.set(-3, 1.5, -2);
    scene.add(pinkRim);
    const limeRim = new THREE.PointLight(0xc8ff00, 22, 12);
    limeRim.position.set(4, -1, 3);
    scene.add(limeRim);
    const topLight = new THREE.SpotLight(0xffffff, 38, 18, Math.PI / 7, 0.55, 1.2);
    topLight.position.set(1, 6, 4);
    topLight.target.position.set(1, 0, 0);
    scene.add(topLight, topLight.target);

    const rig = new THREE.Group();
    rig.position.set(1.25, 0.02, 0);
    scene.add(rig);

    const titanium = new THREE.MeshStandardMaterial({ color: 0x68717d, metalness: 0.92, roughness: 0.23 });
    const graphite = new THREE.MeshStandardMaterial({ color: 0x171d26, metalness: 0.84, roughness: 0.28 });
    const brightMetal = new THREE.MeshStandardMaterial({ color: 0xc4cbd3, metalness: 0.95, roughness: 0.17 });
    const pink = new THREE.MeshStandardMaterial({ color: 0xff00a6, emissive: 0x65003e, emissiveIntensity: 1.25, metalness: 0.55, roughness: 0.2 });
    const lime = new THREE.MeshStandardMaterial({ color: 0xc8ff00, emissive: 0x354900, emissiveIntensity: 0.85, metalness: 0.48, roughness: 0.24 });
    const glass = new THREE.MeshPhysicalMaterial({ color: 0x303b49, metalness: 0.65, roughness: 0.12, clearcoat: 1, clearcoatRoughness: 0.08, transparent: true, opacity: 0.88 });

    const outerRotor = new THREE.Group();
    const middleRotor = new THREE.Group();
    const iris = new THREE.Group();
    rig.add(outerRotor, middleRotor, iris);

    const addRing = (parent, radius, tube, material, rotation = [Math.PI / 2, 0, 0], arc = Math.PI * 2) => {
      const mesh = new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 16, 180, arc), material);
      mesh.rotation.set(...rotation);
      parent.add(mesh);
      return mesh;
    };

    // Large precision-machined outer bearing with segmented illuminated raceways.
    addRing(outerRotor, 2.72, 0.075, titanium);
    addRing(outerRotor, 2.58, 0.018, lime);
    addRing(outerRotor, 2.88, 0.018, graphite);
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const block = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.13, 0.2), i % 3 === 0 ? pink : brightMetal);
      block.position.set(Math.cos(angle) * 2.72, 0, Math.sin(angle) * 2.72);
      block.rotation.y = -angle;
      outerRotor.add(block);
      const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.035, 12), graphite);
      bolt.position.set(Math.cos(angle) * 2.72, 0.085, Math.sin(angle) * 2.72);
      outerRotor.add(bolt);
    }

    // Nested counter-rotating gyroscopic rings.
    addRing(middleRotor, 1.98, 0.055, brightMetal, [Math.PI / 2 + 0.26, 0.12, 0.08]);
    addRing(middleRotor, 1.82, 0.022, pink, [Math.PI / 2 + 0.26, 0.12, 0.08]);
    addRing(middleRotor, 1.46, 0.045, titanium, [Math.PI / 2 - 0.36, -0.16, 0.12]);
    addRing(middleRotor, 1.31, 0.016, lime, [Math.PI / 2 - 0.36, -0.16, 0.12]);

    // Twelve overlapping iris vanes create a mechanical aperture, not a particle effect.
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const vane = new THREE.Group();
      vane.rotation.y = angle;
      vane.position.set(Math.cos(angle) * 0.42, 0, Math.sin(angle) * 0.42);
      const plate = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.11, 1.25), i % 3 === 0 ? pink : graphite);
      plate.position.z = 0.58;
      plate.rotation.y = 0.18;
      vane.add(plate);
      const edge = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.035, 1.12), lime);
      edge.position.set(0.12, 0.07, 0.58);
      edge.rotation.y = 0.18;
      vane.add(edge);
      iris.add(vane);
    }

    // Central octagonal actuator housing with stacked machined collars.
    const housing = new THREE.Group();
    rig.add(housing);
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.76, 0.9, 0.32, 8), graphite);
    housing.add(base);
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.7, 0.16, 8), titanium);
    collar.position.y = 0.23;
    housing.add(collar);
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.57, 1), glass);
    core.position.y = 0.48;
    housing.add(core);
    const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.42, 0.09, 8), pink);
    crown.position.y = 0.91;
    housing.add(crown);
    addRing(housing, 0.98, 0.025, lime, [Math.PI / 2, 0, 0]);
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const piston = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.55, 12), brightMetal);
      piston.position.set(Math.cos(angle) * 1.05, 0.05, Math.sin(angle) * 1.05);
      piston.rotation.z = Math.cos(angle) * 0.16;
      piston.rotation.x = Math.sin(angle) * 0.16;
      rig.add(piston);
      const cap = new THREE.Mesh(new THREE.SphereGeometry(0.085, 12, 12), i % 2 ? lime : pink);
      cap.position.set(Math.cos(angle) * 1.05, 0.34, Math.sin(angle) * 1.05);
      rig.add(cap);
    }

    // Structural braces, fasteners and machined support rails.
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const brace = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.11, 1.08), titanium);
      brace.position.set(Math.cos(angle) * 2.15, 0, Math.sin(angle) * 2.15);
      brace.rotation.y = -angle;
      rig.add(brace);
    }

    const floor = new THREE.GridHelper(13, 52, 0x303844, 0x171d25);
    floor.position.set(1.1, -2.35, 0);
    rig.add(floor);
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(18, 12), new THREE.MeshBasicMaterial({ color: 0x080a0e, transparent: true, opacity: 0.45 }));
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(1.1, -2.38, 0);
    rig.add(ground);

    const resize = () => {
      const w = Math.max(el.clientWidth, 1);
      const h = Math.max(el.clientHeight, 1);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(el);
    resize();

    const onPointer = (event) => {
      const bounds = el.getBoundingClientRect();
      targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.32;
      targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.18;
    };
    const onLeave = () => { targetX = 0; targetY = 0; };
    const onVisibility = () => { visible = !document.hidden; };
    el.addEventListener('pointermove', onPointer, { passive: true });
    el.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);

    const renderStatic = () => renderer.render(scene, camera);
    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visible || document.hidden) return;
      pointerX += (targetX - pointerX) * 0.035;
      pointerY += (targetY - pointerY) * 0.035;
      outerRotor.rotation.y += 0.0017;
      middleRotor.rotation.y -= 0.0025;
      iris.rotation.y += 0.0011;
      iris.children.forEach((vane, i) => {
        vane.rotation.x = Math.sin(performance.now() * 0.00035 + i * 0.5) * 0.035;
      });
      core.rotation.y += 0.002;
      core.rotation.x = Math.sin(performance.now() * 0.00025) * 0.08;
      rig.rotation.y = pointerX;
      rig.rotation.x = pointerY;
      pinkRim.intensity = 28 + Math.sin(performance.now() * 0.00045) * 6;
      limeRim.intensity = 18 + Math.cos(performance.now() * 0.0004) * 4;
      renderer.render(scene, camera);
    };

    if (!paused && !reducedMotion) animate();
    else renderStatic();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      el.removeEventListener('pointermove', onPointer);
      el.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      scene.traverse((object) => {
        object.geometry?.dispose();
        if (Array.isArray(object.material)) object.material.forEach((m) => m.dispose());
        else object.material?.dispose();
      });
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
        aria-label={paused ? 'Play background motion' : 'Pause background motion'}
      >
        <span className={paused ? 'motion-indicator paused' : 'motion-indicator'} />
        {paused ? 'RESUME MOTION' : 'PAUSE MOTION'}
      </button>
    </>
  );
}
