import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ArchitectureCore() {
  const host = useRef(null);
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let renderer;
    let frame;
    let dragging = false;
    let px = 0;
    let py = 0;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x090b0f);
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 2.4, 8.5);
    const root = new THREE.Group();
    scene.add(root);
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    } catch {
      el.classList.add('architecture-core-fallback');
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    el.appendChild(renderer.domElement);
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));
    const key = new THREE.DirectionalLight(0xffffff, 2.1);
    key.position.set(4, 5, 4);
    scene.add(key);
    const pinkLight = new THREE.PointLight(0xff00a6, 24, 12);
    pinkLight.position.set(-3, 1, -2);
    scene.add(pinkLight);
    const limeLight = new THREE.PointLight(0xc8ff00, 15, 10);
    limeLight.position.set(2, -1, 3);
    scene.add(limeLight);

    const rings = [0.78, 1.15, 1.52, 1.9, 2.28];
    rings.forEach((radius, idx) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.018, 8, 120),
        new THREE.MeshStandardMaterial({
          color: idx % 2 ? 0xff00a6 : 0xc8ff00,
          metalness: 0.55,
          roughness: 0.3,
          transparent: true,
          opacity: 0.78 - idx * 0.08,
        })
      );
      ring.rotation.x = Math.PI / 2 + idx * 0.08;
      ring.rotation.y = idx * 0.16;
      ring.userData.orbit = idx;
      root.add(ring);
      const count = 8 + idx * 2;
      for (let n = 0; n < count; n++) {
        const a = (n / count) * Math.PI * 2;
        const node = new THREE.Mesh(
          new THREE.SphereGeometry(idx === 0 ? 0.075 : 0.045, 16, 16),
          new THREE.MeshStandardMaterial({
            color: n % 4 === 0 ? 0xff00a6 : 0xc8ff00,
            emissive: n % 4 === 0 ? 0x52002f : 0x263500,
            metalness: 0.4,
            roughness: 0.25,
          })
        );
        node.position.set(Math.cos(a) * radius, Math.sin(a) * radius * 0.12, Math.sin(a) * radius);
        root.add(node);
      }
    });

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.54, 2),
      new THREE.MeshStandardMaterial({ color: 0xbac2cc, metalness: 0.92, roughness: 0.18, emissive: 0x252b32 })
    );
    root.add(core);
    const inner = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.31, 1),
      new THREE.MeshStandardMaterial({ color: 0xff00a6, metalness: 0.4, roughness: 0.2, emissive: 0x55002f })
    );
    root.add(inner);
    const grid = new THREE.GridHelper(8, 32, 0x303640, 0x1d222a);
    grid.position.y = -1.55;
    scene.add(grid);

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
    const down = (e) => { dragging = true; px = e.clientX; py = e.clientY; };
    const move = (e) => {
      if (!dragging) return;
      root.rotation.y += (e.clientX - px) * 0.008;
      root.rotation.x += (e.clientY - py) * 0.006;
      px = e.clientX; py = e.clientY;
    };
    const up = () => { dragging = false; };
    renderer.domElement.addEventListener('pointerdown', down);
    renderer.domElement.addEventListener('pointermove', move);
    renderer.domElement.addEventListener('pointerup', up);
    renderer.domElement.addEventListener('pointercancel', up);
    const animate = () => {
      frame = requestAnimationFrame(animate);
      if (!dragging) root.rotation.y += 0.0018;
      core.rotation.x += 0.002;
      inner.rotation.y -= 0.003;
      renderer.render(scene, camera);
    };
    animate();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      renderer.domElement.removeEventListener('pointerdown', down);
      renderer.domElement.removeEventListener('pointermove', move);
      renderer.domElement.removeEventListener('pointerup', up);
      renderer.domElement.removeEventListener('pointercancel', up);
      scene.traverse((o) => {
        o.geometry?.dispose();
        if (Array.isArray(o.material)) o.material.forEach((m) => m.dispose());
        else o.material?.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);
  return <div ref={host} className="architecture-core-canvas" aria-label="Interactive 3D layered systems architecture. Drag to rotate." />;
}
