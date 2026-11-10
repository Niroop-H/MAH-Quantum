import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const palette = {
  black: 0x08090b,
  lime: 0xc8ff00,
  pink: 0xff00a6,
  metal: 0x9aa0a8,
  darkMetal: 0x303640,
};

function material(color, metalness = 0.65, roughness = 0.32) {
  return new THREE.MeshStandardMaterial({ color, metalness, roughness });
}

function box(group, size, position, mat, rotation = [0, 0, 0]) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), mat);
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  group.add(mesh);
  return mesh;
}

function cylinder(group, radiusTop, radiusBottom, height, position, mat, segments = 32) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments), mat);
  mesh.position.set(...position);
  group.add(mesh);
  return mesh;
}

function line(group, points, color = palette.lime, opacity = 0.7) {
  const geometry = new THREE.BufferGeometry().setFromPoints(points.map((p) => new THREE.Vector3(...p)));
  const mesh = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color, transparent: true, opacity }));
  group.add(mesh);
  return mesh;
}

function buildDefense(group, mats) {
  cylinder(group, 0.8, 0.95, 0.22, [0, -0.9, 0], mats.dark);
  cylinder(group, 0.17, 0.23, 1.45, [0, -0.05, 0], mats.metal);
  cylinder(group, 0.36, 0.36, 0.12, [0, 0.72, 0], mats.pink);
  const panel = box(group, [1.45, 0.82, 0.08], [0, 1.08, 0], mats.dark, [-0.28, 0, -0.18]);
  panel.material = mats.dark;
  for (let i = -3; i <= 3; i++) {
    line(group, [[i * 0.18, 0.72, 0.06], [i * 0.18, 1.42, 0.06]], palette.lime, 0.55);
  }
  for (let i = 0; i < 5; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.26 + i * 0.16, 0.008, 6, 48), new THREE.MeshBasicMaterial({ color: i % 2 ? palette.pink : palette.lime, transparent: true, opacity: 0.55 }));
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -0.65 + i * 0.035;
    group.add(ring);
  }
  line(group, [[0, 1.5, 0], [0.85, 1.95, 0], [1.35, 1.95, 0]], palette.pink, 0.9);
}

function buildSilicon(group, mats) {
  cylinder(group, 1.38, 1.38, 0.12, [0, -0.65, 0], mats.dark, 80);
  const wafer = cylinder(group, 1.32, 1.32, 0.12, [0, -0.52, 0], mats.metal, 80);
  wafer.material = new THREE.MeshStandardMaterial({ color: 0x68717d, metalness: 0.9, roughness: 0.18 });
  const top = new THREE.Mesh(new THREE.CircleGeometry(1.29, 80), new THREE.MeshStandardMaterial({ color: 0x252b34, metalness: 0.7, roughness: 0.2, side: THREE.DoubleSide }));
  top.rotation.x = -Math.PI / 2;
  top.position.y = -0.45;
  group.add(top);
  for (let i = -5; i <= 5; i++) {
    line(group, [[i * 0.21, -0.435, -1.1], [i * 0.21, -0.435, 1.1]], palette.lime, 0.24);
    line(group, [[-1.1, -0.434, i * 0.21], [1.1, -0.434, i * 0.21]], palette.pink, 0.2);
  }
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const die = box(group, [0.23, 0.035, 0.23], [Math.cos(a) * 0.72, -0.39, Math.sin(a) * 0.72], i % 3 === 0 ? mats.pink : mats.lime);
    die.rotation.y = a;
  }
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.35, 0.018, 8, 80), mats.pink);
  ring.rotation.x = Math.PI / 2;
  ring.position.y = -0.42;
  group.add(ring);
}

function buildChip(group, mats) {
  box(group, [1.7, 0.28, 1.7], [0, -0.2, 0], mats.dark);
  box(group, [1.38, 0.16, 1.38], [0, 0.02, 0], mats.metal);
  box(group, [0.92, 0.1, 0.92], [0, 0.15, 0], mats.pink);
  box(group, [0.72, 0.07, 0.72], [0, 0.23, 0], mats.dark);
  for (let i = -4; i <= 4; i++) {
    const p = i * 0.17;
    box(group, [0.08, 0.12, 0.22], [p, -0.08, 0.98], mats.lime);
    box(group, [0.08, 0.12, 0.22], [p, -0.08, -0.98], mats.lime);
    box(group, [0.22, 0.12, 0.08], [0.98, -0.08, p], mats.pink);
    box(group, [0.22, 0.12, 0.08], [-0.98, -0.08, p], mats.pink);
  }
  for (let i = -2; i <= 2; i++) {
    line(group, [[i * 0.13, 0.29, -0.3], [i * 0.13, 0.29, 0.3]], palette.lime, 0.7);
  }
}

function buildGrid(group, mats) {
  const towers = [[-1.25, -0.2, -0.5], [0, -0.2, 0.2], [1.25, -0.2, -0.45]];
  towers.forEach(([x, y, z], index) => {
    cylinder(group, 0.055, 0.08, 1.75, [x, y + 0.85, z], mats.metal, 8);
    box(group, [0.9, 0.06, 0.08], [x, y + 1.42, z], mats.dark, [0, 0, index === 1 ? 0.05 : -0.05]);
    for (let k = -1; k <= 1; k++) {
      line(group, [[x + k * 0.26, y + 1.38, z], [x + k * 0.26, y + 1.2, z]], palette.pink, 0.8);
    }
  });
  for (let i = 0; i < 2; i++) {
    const x1 = towers[i][0], x2 = towers[i + 1][0];
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(x1, 1.4, towers[i][2]),
      new THREE.Vector3((x1 + x2) / 2, 0.8, (towers[i][2] + towers[i + 1][2]) / 2),
      new THREE.Vector3(x2, 1.4, towers[i + 1][2]),
    ]);
    group.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 32, 0.012, 6, false), mats.lime));
  }
  box(group, [0.75, 0.45, 0.58], [0, -0.15, 0.95], mats.dark);
  for (let i = 0; i < 4; i++) {
    const node = new THREE.Mesh(new THREE.SphereGeometry(0.075, 16, 16), i % 2 ? mats.pink : mats.lime);
    node.position.set(-0.22 + i * 0.15, 0.12, 1.26);
    group.add(node);
  }
  line(group, [[-1.4, -0.8, 0.7], [0, -0.8, 0.7], [1.4, -0.8, 0.7]], palette.pink, 0.8);
}

function buildAerospace(group, mats) {
  box(group, [0.68, 0.55, 0.55], [0, 0, 0], mats.metal);
  box(group, [1.25, 0.045, 0.62], [-1.05, 0, 0], mats.dark);
  box(group, [1.25, 0.045, 0.62], [1.05, 0, 0], mats.dark);
  for (let side of [-1, 1]) {
    for (let i = 0; i < 5; i++) {
      line(group, [[side * (0.5 + i * 0.22), 0.03, -0.28], [side * (0.5 + i * 0.22), 0.03, 0.28]], palette.lime, 0.5);
    }
  }
  cylinder(group, 0.035, 0.035, 1.15, [0, 0.78, 0], mats.metal, 12);
  const dish = new THREE.Mesh(new THREE.SphereGeometry(0.42, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), mats.pink);
  dish.position.set(0, 1.3, 0);
  dish.rotation.x = -Math.PI / 2;
  group.add(dish);
  line(group, [[0, 0, 0], [0, -0.95, 0], [0.28, -1.2, 0]], palette.lime, 0.9);
  const earthRing = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.008, 4, 80), new THREE.MeshBasicMaterial({ color: palette.pink, transparent: true, opacity: 0.35 }));
  earthRing.rotation.x = Math.PI / 2.7;
  earthRing.rotation.y = 0.3;
  group.add(earthRing);
}

const builders = {
  defense: buildDefense,
  silicon: buildSilicon,
  semiconductor: buildChip,
  smartgrid: buildGrid,
  aerospace: buildAerospace,
};

export default function ModelViewer({ type, label }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    let renderer;
    let frame = 0;
    let observer;
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let zoom = 5.6;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(palette.black);
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(3.1, 2.4, zoom);
    camera.lookAt(0, 0, 0);

    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    } catch (error) {
      mount.classList.add('model-viewer-fallback');
      return undefined;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.domElement.setAttribute('aria-label', label + ' interactive 3D model. Drag to rotate and scroll to zoom.');
    renderer.domElement.setAttribute('role', 'img');
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 1.5));
    const key = new THREE.DirectionalLight(0xffffff, 2.6);
    key.position.set(4, 6, 5);
    scene.add(key);
    const rim = new THREE.PointLight(palette.pink, 18, 12);
    rim.position.set(-3, 1, -2);
    scene.add(rim);
    const limeLight = new THREE.PointLight(palette.lime, 12, 10);
    limeLight.position.set(2, -1, 4);
    scene.add(limeLight);

    const mats = {
      lime: material(palette.lime, 0.55, 0.28),
      pink: material(palette.pink, 0.45, 0.3),
      metal: material(palette.metal, 0.82, 0.24),
      dark: material(palette.darkMetal, 0.8, 0.3),
    };
    const model = new THREE.Group();
    builders[type]?.(model, mats);
    scene.add(model);

    const floor = new THREE.GridHelper(8, 24, 0x343a43, 0x20252d);
    floor.position.y = -1.12;
    scene.add(floor);

    const resize = () => {
      const width = Math.max(mount.clientWidth, 1);
      const height = Math.max(mount.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    observer = new ResizeObserver(resize);
    observer.observe(mount);
    resize();

    const down = (event) => {
      isDragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      renderer.domElement.setPointerCapture?.(event.pointerId);
    };
    const move = (event) => {
      if (!isDragging) return;
      model.rotation.y += (event.clientX - lastX) * 0.009;
      model.rotation.x += (event.clientY - lastY) * 0.006;
      lastX = event.clientX;
      lastY = event.clientY;
    };
    const up = () => { isDragging = false; };
    const wheel = (event) => {
      event.preventDefault();
      zoom = THREE.MathUtils.clamp(zoom + event.deltaY * 0.004, 3.6, 8);
      camera.position.setLength(zoom);
    };
    renderer.domElement.addEventListener('pointerdown', down);
    renderer.domElement.addEventListener('pointermove', move);
    renderer.domElement.addEventListener('pointerup', up);
    renderer.domElement.addEventListener('pointercancel', up);
    renderer.domElement.addEventListener('wheel', wheel, { passive: false });

    const animate = () => {
      frame = requestAnimationFrame(animate);
      if (!isDragging) model.rotation.y += 0.0025;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      renderer.domElement.removeEventListener('pointerdown', down);
      renderer.domElement.removeEventListener('pointermove', move);
      renderer.domElement.removeEventListener('pointerup', up);
      renderer.domElement.removeEventListener('pointercancel', up);
      renderer.domElement.removeEventListener('wheel', wheel);
      scene.traverse((object) => {
        object.geometry?.dispose();
        if (Array.isArray(object.material)) object.material.forEach((m) => m.dispose());
        else object.material?.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [type, label]);

  return <div className="model-viewer" ref={mountRef} />;
}
