import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ArchitectureCore() {
  const host = useRef(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return undefined;
    let renderer;
    let frame = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x090b0f);
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(5.9, 4.6, 7.4);
    camera.lookAt(0, 0, 0);

    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    } catch {
      el.classList.add('architecture-core-fallback');
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    el.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 1.35));
    const key = new THREE.DirectionalLight(0xffffff, 2.5);
    key.position.set(5, 8, 6);
    scene.add(key);
    const rim = new THREE.PointLight(0xff00a6, 25, 14);
    rim.position.set(-4, 2, -3);
    scene.add(rim);
    const edge = new THREE.PointLight(0xc8ff00, 15, 12);
    edge.position.set(3, -2, 4);
    scene.add(edge);

    const assembly = new THREE.Group();
    scene.add(assembly);
    const metal = new THREE.MeshStandardMaterial({ color: 0x737e8d, metalness: 0.86, roughness: 0.25 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x202833, metalness: 0.78, roughness: 0.3 });
    const glass = new THREE.MeshStandardMaterial({ color: 0x313b49, metalness: 0.72, roughness: 0.2, transparent: true, opacity: 0.9 });
    const pink = new THREE.MeshStandardMaterial({ color: 0xff00a6, emissive: 0x47002e, metalness: 0.5, roughness: 0.25 });
    const lime = new THREE.MeshStandardMaterial({ color: 0xc8ff00, emissive: 0x263900, metalness: 0.35, roughness: 0.28 });
    const white = new THREE.MeshStandardMaterial({ color: 0xd7dce4, metalness: 0.9, roughness: 0.2 });

    const makeBox = (parent, size, pos, mat, bevel = false) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), mat);
      mesh.position.set(...pos);
      parent.add(mesh);
      if (bevel) {
        const edges = new THREE.LineSegments(
          new THREE.EdgesGeometry(mesh.geometry),
          new THREE.LineBasicMaterial({ color: 0x7b8795, transparent: true, opacity: 0.38 })
        );
        mesh.add(edges);
      }
      return mesh;
    };
    const makeTrace = (parent, pts, color = 0xc8ff00, opacity = 0.7) => {
      const geometry = new THREE.BufferGeometry().setFromPoints(pts.map(p => new THREE.Vector3(...p)));
      const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color, transparent: true, opacity }));
      parent.add(line);
      return line;
    };

    const layers = [
      { y: -1.55, width: 3.55, depth: 2.45, name: 'EDGE', material: dark },
      { y: -1.02, width: 3.2, depth: 2.2, name: 'DATA', material: glass },
      { y: -0.49, width: 2.95, depth: 1.98, name: 'COMPUTE', material: dark },
      { y: 0.04, width: 2.7, depth: 1.78, name: 'INTELLIGENCE', material: glass },
      { y: 0.57, width: 2.45, depth: 1.58, name: 'APPLICATION', material: dark },
    ];

    layers.forEach((layer, index) => {
      const slab = new THREE.Group();
      slab.position.y = layer.y;
      assembly.add(slab);
      makeBox(slab, [layer.width, 0.16, layer.depth], [0, 0, 0], layer.material, true);
      makeBox(slab, [layer.width - 0.22, 0.025, layer.depth - 0.22], [0, 0.095, 0], dark);
      const accent = index % 2 ? pink : lime;
      const rail = makeBox(slab, [layer.width - 0.25, 0.035, 0.035], [0, 0.12, layer.depth / 2 - 0.12], accent);
      rail.material = accent;
      for (let i = -3; i <= 3; i++) {
        const x = i * 0.34;
        makeBox(slab, [0.13, 0.07, 0.13], [x, 0.17, 0], i % 3 === 0 ? pink : metal);
      }
      for (let side of [-1, 1]) {
        for (let i = 0; i < 3; i++) {
          const z = (i - 1) * 0.34;
          makeTrace(slab, [[side * (layer.width / 2 - 0.12), 0.13, z], [side * 0.72, 0.13, z], [side * 0.58, 0.13, z + 0.14]], accent, 0.58);
        }
      }
      // Distinct modules on each plane: acquisition ports, storage, compute arrays, AI accelerator and application modules.
      if (index === 0) {
        for (let i = -2; i <= 2; i++) {
          makeBox(slab, [0.28, 0.23, 0.28], [i * 0.55, 0.22, -0.55], metal);
          makeBox(slab, [0.08, 0.08, 0.08], [i * 0.55, 0.36, -0.55], lime);
        }
      } else if (index === 1) {
        for (let i = 0; i < 4; i++) {
          makeBox(slab, [0.48, 0.18, 0.58], [-0.78 + (i % 2) * 1.02, 0.22, -0.35 + Math.floor(i / 2) * 0.72], i === 0 ? pink : metal, true);
        }
      } else if (index === 2) {
        for (let x = -2; x <= 2; x++) for (let z = -1; z <= 1; z++) {
          makeBox(slab, [0.24, 0.16, 0.24], [x * 0.31, 0.2, z * 0.31], (x + z) % 3 === 0 ? lime : white);
        }
      } else if (index === 3) {
        makeBox(slab, [0.92, 0.24, 0.78], [0, 0.23, 0], pink, true);
        for (let i = -2; i <= 2; i++) {
          makeTrace(slab, [[i * 0.17, 0.36, -0.6], [i * 0.17, 0.36, 0.6]], lime, 0.7);
        }
      } else {
        for (let i = 0; i < 3; i++) {
          makeBox(slab, [0.55, 0.18, 0.5], [-0.72 + i * 0.72, 0.22, 0], i === 1 ? pink : metal, true);
        }
      }
    });

    // Vertical interconnects make the exploded planes read as one engineered assembly.
    for (let x of [-1.28, 1.28]) {
      for (let z of [-0.78, 0.78]) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 2.35, 12), metal);
        post.position.set(x, -0.47, z);
        assembly.add(post);
        const collar = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.014, 6, 24), pink);
        collar.position.set(x, -0.47, z);
        collar.rotation.x = Math.PI / 2;
        assembly.add(collar);
      }
    }

    // Signal pulses move along the exposed interconnect spine.
    const pulses = [];
    for (let i = 0; i < 9; i++) {
      const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), i % 2 ? lime : pink);
      pulse.position.set(i % 2 ? 1.28 : -1.28, -1.65 + (i / 8) * 2.65, i % 3 === 0 ? 0.78 : -0.78);
      assembly.add(pulse);
      pulses.push(pulse);
    }

    const floor = new THREE.GridHelper(9, 36, 0x303743, 0x1b2028);
    floor.position.y = -2.05;
    scene.add(floor);

    const resize = () => {
      const width = Math.max(el.clientWidth, 1);
      const height = Math.max(el.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(el);
    resize();

    const down = e => { dragging = true; lastX = e.clientX; lastY = e.clientY; };
    const move = e => {
      if (!dragging) return;
      assembly.rotation.y += (e.clientX - lastX) * 0.008;
      assembly.rotation.x += (e.clientY - lastY) * 0.005;
      lastX = e.clientX; lastY = e.clientY;
    };
    const up = () => { dragging = false; };
    renderer.domElement.addEventListener('pointerdown', down);
    renderer.domElement.addEventListener('pointermove', move);
    renderer.domElement.addEventListener('pointerup', up);
    renderer.domElement.addEventListener('pointercancel', up);

    const animate = () => {
      frame = requestAnimationFrame(animate);
      if (!dragging) assembly.rotation.y += 0.0012;
      pulses.forEach((pulse, i) => {
        const t = (Date.now() * 0.00035 + i * 0.17) % 1;
        pulse.position.y = -1.65 + t * 2.65;
      });
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
      scene.traverse(object => {
        object.geometry?.dispose();
        if (Array.isArray(object.material)) object.material.forEach(m => m.dispose());
        else object.material?.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={host} className="architecture-core-canvas" aria-label="Interactive 3D exploded systems stack with data, compute and application planes. Drag to rotate." />;
}
