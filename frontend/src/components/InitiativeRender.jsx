import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function makeMaterial(color, metalness = 0.7, roughness = 0.28) {
  return new THREE.MeshStandardMaterial({ color, metalness, roughness });
}

export default function InitiativeRender({ type }) {
  const host = useRef(null);
  useEffect(() => {
    const el = host.current;
    if (!el) return undefined;
    let renderer;
    let frame = 0;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#090c11');
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(5.2, 3.2, 7.4);
    camera.lookAt(0, 0.15, 0);
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'low-power' });
    } catch {
      el.classList.add('initiative-render-fallback');
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    el.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xbac8d8, 0x141820, 1.65));
    const key = new THREE.DirectionalLight(0xffffff, 3.2); key.position.set(4, 8, 5); scene.add(key);
    const rim = new THREE.PointLight(0xff00a6, 22, 12); rim.position.set(-4, 2, -3); scene.add(rim);
    const fill = new THREE.PointLight(0xc8ff00, 12, 10); fill.position.set(3, -1, 4); scene.add(fill);

    const root = new THREE.Group(); scene.add(root);
    const titanium = makeMaterial('#89939e', .92, .2);
    const steel = makeMaterial('#424d59', .9, .24);
    const graphite = makeMaterial('#111820', .82, .28);
    const ceramic = makeMaterial('#c5cbd1', .35, .3);
    const gold = makeMaterial('#b18b55', .82, .22);
    const pink = new THREE.MeshStandardMaterial({ color:'#ff00a6', emissive:'#78004b', emissiveIntensity:1.1, metalness:.5, roughness:.2 });
    const lime = new THREE.MeshStandardMaterial({ color:'#c8ff00', emissive:'#344900', emissiveIntensity:.8, metalness:.4, roughness:.24 });
    const glass = new THREE.MeshPhysicalMaterial({ color:'#263747', metalness:.55, roughness:.1, transmission:.18, transparent:true, opacity:.88, clearcoat:1 });
    const add = (geometry, material, position, rotation) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...position);
      if (rotation) mesh.rotation.set(...rotation);
      root.add(mesh); return mesh;
    };
    const box = (size, material, position, rotation) => add(new THREE.BoxGeometry(...size), material, position, rotation);
    const cylinder = (r1,r2,h,material,pos,segments=48) => add(new THREE.CylinderGeometry(r1,r2,h,segments),material,pos);
    const torus = (r,t,material,pos,rotation=[Math.PI/2,0,0]) => add(new THREE.TorusGeometry(r,t,12,128),material,pos,rotation);
    const line = (points, material) => {
      const geometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p))), 64, .012, 8, false);
      add(geometry, material, [0,0,0]);
    };
    const boltRing = (radius, count, y, material) => {
      for(let i=0;i<count;i++){
        const a=i/count*Math.PI*2;
        cylinder(.035,.035,.025,material,[Math.cos(a)*radius,y,Math.sin(a)*radius],12);
      }
    };

    // Q0B: precision cognitive-compute instrument with machined rings and glass memory stacks.
    if(type==='brain'){
      cylinder(1.18,1.18,.22,graphite,[0,-.68,0],96);
      torus(1.12,.045,titanium,[0,-.53,0]);
      boltRing(1.02,32,-.54,gold);
      for(let i=0;i<8;i++){
        const a=i*Math.PI/4;
        const pod=box([.34,.54,.3],i%2?steel:graphite,[Math.cos(a)*.77,.02,Math.sin(a)*.77],[0,-a,0]);
        box([.22,.035,.22],i%2?pink:lime,[Math.cos(a)*.77,.31,Math.sin(a)*.77]);
        for(let k=0;k<5;k++) box([.018,.012,.22],gold,[Math.cos(a)*.77-.1+k*.05,.03,Math.sin(a)*.77]);
      }
      const brainCore=add(new THREE.IcosahedronGeometry(.57,4),glass,[0,.16,0]);
      const wire=new THREE.Mesh(new THREE.IcosahedronGeometry(.59,3),new THREE.MeshBasicMaterial({color:0xff00a6,wireframe:true,transparent:true,opacity:.32}));
      wire.position.copy(brainCore.position); root.add(wire);
      for(let i=0;i<24;i++){
        const a=i*2.399;
        const y=-.35+(i/23)*1.05;
        const r=.52*Math.sqrt(1-Math.pow((y-.17)/.65,2));
        const node=add(new THREE.SphereGeometry(.025,12,12),i%3?lime:pink,[Math.cos(a)*r,y,Math.sin(a)*r]);
      }
      for(let i=0;i<4;i++) torus(.7+i*.12,.012,i%2?pink:lime,[0,.15,0],[Math.PI/2+i*.3,0,i*.4]);
    }
    // D25: stacked silicon compute package, substrate, interposer and dense pin field.
    if(type==='layers'){
      box([2.7,.18,2.1],graphite,[0,-.52,0]);
      box([2.48,.12,1.9],gold,[0,-.37,0]);
      for(let x=-10;x<=10;x++)for(let z=-7;z<=7;z++) box([.035,.13,.035],gold,[x*.115,-.66,z*.12]);
      box([2.1,.13,1.55],steel,[0,-.23,0]);
      for(let i=0;i<4;i++){
        box([1.65-i*.13,.12,1.18-i*.1],i%2?graphite:steel,[0,-.1+i*.22,0]);
        box([1.42-i*.12,.025,.96-i*.09],i%2?pink:lime,[0,-.025+i*.22,0]);
      }
      box([.92,.22,.82],ceramic,[0,.65,0]);
      box([.78,.08,.68],graphite,[0,.8,0]);
      for(let x=-3;x<=3;x++)for(let z=-2;z<=2;z++) box([.07,.07,.07],x%2?gold:titanium,[x*.105,.86,z*.105]);
      for(let i=0;i<18;i++) box([.025,.03,1.3],i%4===0?pink:gold,[-.85+i*.1,.01,0]);
      torus(1.35,.018,lime,[0,-.27,0]);
    }
    // ScorpioX: high-detail autonomous aerial vehicle silhouette with rotors and camera gimbal.
    if(type==='scorpio'){
      const body=box([1.05,.25,.65],graphite,[0,0,0],[0,0,0]);
      box([.72,.09,.48],steel,[0,.16,0]);
      box([.34,.06,.32],titanium,[0,.23,0]);
      for(const s of [-1,1])for(const z of [-1,1]){
        const arm=box([1.25,.11,.12],titanium,[s*.75,.02,z*.72],[0,-s*z*.38,0]);
        const x=s*1.25, zz=z*1.2;
        cylinder(.16,.19,.16,graphite,[x,.08,zz],32);
        torus(.63,.018,titanium,[x,.18,zz],[0,0,0]);
        torus(.58,.009,pink,[x,.19,zz],[0,0,0]);
        for(let k=0;k<3;k++) box([.36,.018,.035],ceramic,[x,.2,zz],[0,k*Math.PI/3,0]);
        cylinder(.07,.07,.1,gold,[x,.16,zz],24);
      }
      const gimbal=cylinder(.2,.16,.24,steel,[0,-.22,.22],32);
      const lens=add(new THREE.SphereGeometry(.16,32,24),glass,[0,-.36,.22]);
      torus(.17,.025,titanium,[0,-.36,.22]);
      for(let i=0;i<12;i++) box([.06,.02,.025],gold,[-.48+i*.087,.145,-.22]);
      box([.24,.04,.12],pink,[0,.28,-.1]);
    }
    // ASURA intelligence: rugged sensor mast, phased-array faces and hardened compute cabinet.
    if(type==='asura'){
      box([1.55,1.35,1.05],graphite,[0,-.12,0]);
      box([1.42,.06,.95],steel,[0,.58,0]);
      for(let i=0;i<4;i++) box([.025,.72,.78],gold,[-.58+i*.39,-.1,.54]);
      for(let i=0;i<3;i++) box([1.25,.035,.025],pink,[0,.3-i*.22,.56]);
      box([.9,.06,.08],lime,[0,-.5,.58]);
      cylinder(.16,.16,.38,titanium,[0,.82,0]);
      box([.16,.95,.16],steel,[0,1.45,0]);
      const panel=box([.9,.72,.08],ceramic,[0,1.92,0],[.22,0,0]);
      for(let x=-3;x<=3;x++)for(let y=-2;y<=2;y++) cylinder(.025,.025,.02,pink,[x*.115,1.92+y*.115,.06],12);
      torus(.55,.025,lime,[0,1.92,0],[0,0,0]);
      for(let i=0;i<6;i++) box([.12,.04,.08],titanium,[-.55+i*.22,-.82,.35]);
      box([.38,.1,.3],steel,[0,-.88,0]);
    }
    // ASURA systems: hardened field rack, shock mounts, cooling and modular payload bays.
    if(type==='defence'){
      box([2.0,1.55,1.35],graphite,[0,0,0]);
      for(let x of [-.86,.86])for(let z of [-.55,.55]){
        cylinder(.12,.12,1.82,gold,[x,0,z],20);
        torus(.14,.025,titanium,[x,.55,z],[0,0,0]);
        torus(.14,.025,titanium,[x,-.55,z],[0,0,0]);
      }
      box([1.65,.12,1.05],steel,[0,.82,0]);
      box([1.45,.08,.9],titanium,[0,.92,0]);
      for(let i=0;i<10;i++) box([.07,.48,.035],steel,[-.65+i*.145,.05,.69]);
      for(let i=0;i<5;i++) cylinder(.08,.08,.035,pink,[-.48+i*.24,-.4,.7],24);
      box([.7,.55,.08],graphite,[0,-.1,.72]);
      for(let i=0;i<8;i++) box([.04,.4,.025],gold,[-.28+i*.08,-.1,.78]);
      for(let i=0;i<4;i++) box([.28,.1,.35],steel,[-.55+i*.36,-.82,0]);
    }
    // Quantum D2: aerospace quad platform with composite arms, motors, landing gear and optical payload.
    if(type==='drone'){
      box([.9,.2,.68],graphite,[0,0,0]);
      box([.58,.07,.44],ceramic,[0,.13,0]);
      for(const s of [-1,1])for(const z of [-1,1]){
        box([1.25,.085,.09],steel,[s*.75,.02,z*.72],[0,-s*z*.4,0]);
        const x=s*1.23, zz=z*1.18;
        cylinder(.19,.22,.2,graphite,[x,.08,zz],40);
        torus(.64,.014,titanium,[x,.22,zz],[0,0,0]);
        torus(.61,.009,lime,[x,.225,zz],[0,0,0]);
        for(let k=0;k<2;k++) box([.54,.012,.055],ceramic,[x,.23,zz],[0,k*Math.PI/2,0]);
        cylinder(.075,.075,.12,gold,[x,.2,zz],24);
        for(let k=0;k<4;k++) box([.035,.16,.035],titanium,[x,.02+k*.01,zz]);
      }
      for(let s of [-1,1]){
        box([.06,.5,.06],titanium,[s*.34,-.29,.15]);
        box([.56,.06,.08],steel,[s*.34,-.54,.15]);
      }
      cylinder(.19,.15,.2,steel,[0,-.2,.28],32);
      add(new THREE.SphereGeometry(.16,32,24),glass,[0,-.36,.28]);
      torus(.17,.02,pink,[0,-.36,.28]);
      box([.3,.06,.24],pink,[0,.18,-.1]);
    }

    // Fine fasteners, etched edge strips and a studio ground plane complete the product-render language.
    const ground=add(new THREE.CircleGeometry(3.2,96),new THREE.MeshStandardMaterial({color:'#0d1117',metalness:.25,roughness:.72}),[0,-1.02,0],[-Math.PI/2,0,0]);
    const halo=torus(2.35,.008,new THREE.MeshBasicMaterial({color:0x596574,transparent:true,opacity:.55}),[0,-.99,0],[0,0,0]);
    const resize=()=>{const w=Math.max(el.clientWidth,1),h=Math.max(el.clientHeight,1);renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();};
    const observer=new ResizeObserver(resize);observer.observe(el);resize();
    const animate=()=>{frame=requestAnimationFrame(animate);root.rotation.y+=.0018;renderer.render(scene,camera);};
    animate();
    return ()=>{cancelAnimationFrame(frame);observer.disconnect();scene.traverse(o=>{o.geometry?.dispose();if(Array.isArray(o.material))o.material.forEach(m=>m.dispose());else o.material?.dispose();});renderer.dispose();renderer.domElement.remove();};
  },[type]);
  return <div className="initiative-render" ref={host} role="img" aria-label={`Detailed 3D engineering visualisation: ${type}`} />;
}
