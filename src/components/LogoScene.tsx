"use client";

import { Center, Float, PresentationControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const MODEL = "/models/logo.glb";

/** 3-step gradient for a cartoon (toon) shading look */
function useToonGradient() {
  return useMemo(() => {
    const tex = new THREE.DataTexture(new Uint8Array([200, 240, 255]), 3, 1, THREE.RedFormat);
    tex.minFilter = THREE.NearestFilter;
    tex.magFilter = THREE.NearestFilter;
    tex.needsUpdate = true;
    return tex;
  }, []);
}

function Logo({ reducedMotion }: { reducedMotion: boolean }) {
  const { scene } = useGLTF(MODEL, false, true);
  const gradientMap = useToonGradient();
  const group = useRef<THREE.Group>(null);
  const spin = useRef(0); // remaining spin (radians) after a click
  const [hovered, setHovered] = useState(false);

  // The model has two meshes: the logo body and a separate outline tube.
  const model = useMemo(() => {
    const clone = scene.clone(true);
    const body = new THREE.MeshToonMaterial({ color: "#ffffff", gradientMap });
    const outline = new THREE.MeshBasicMaterial({ color: "#010109" });
    clone.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.material = obj.name.toLowerCase().includes("vert") ? outline : body;
      }
    });
    return clone;
  }, [scene, gradientMap]);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [hovered]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    // Lean gently towards the pointer
    const targetX = reducedMotion ? 0 : -state.pointer.y * 0.25;
    const targetY = reducedMotion ? 0 : state.pointer.x * 0.35;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 4, delta);
    // Click spin: rotate until the extra turn is consumed
    if (spin.current > 0) {
      const step = Math.min(spin.current, delta * Math.max(3, spin.current * 4));
      spin.current -= step;
      g.rotation.y += step;
    } else {
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y % (Math.PI * 2), targetY, 4, delta);
    }
    const s = THREE.MathUtils.damp(g.scale.x, hovered ? 1.06 : 1, 8, delta);
    g.scale.setScalar(s);
  });

  return (
    <group
      ref={group}
      onClick={(e) => {
        e.stopPropagation();
        spin.current += Math.PI * 2;
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <Center>
        <primitive object={model} />
      </Center>
    </group>
  );
}

useGLTF.preload(MODEL, false, true);

export default function LogoScene() {
  const wrapper = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);

    // Stop rendering while the hero is off screen
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    if (wrapper.current) observer.observe(wrapper.current);
    return () => {
      mq.removeEventListener("change", update);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={wrapper} className="absolute inset-0">
      <Canvas
        frameloop={inView ? "always" : "never"}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 17], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        // Let vertical swipes scroll the page on touch screens
        style={{ touchAction: "pan-y" }}
      >
        <ambientLight intensity={1.6} />
        <directionalLight position={[4, 6, 8]} intensity={2.2} />
        <directionalLight position={[-6, -2, -4]} intensity={0.6} color="#c8bbea" />
        <PresentationControls
          global={false}
          cursor
          snap
          speed={1.4}
          polar={[-0.4, 0.4]}
          azimuth={[-Math.PI / 1.5, Math.PI / 1.5]}
        >
          <Float
            speed={reducedMotion ? 0 : 2}
            rotationIntensity={reducedMotion ? 0 : 0.4}
            floatIntensity={reducedMotion ? 0 : 1.2}
          >
            <Logo reducedMotion={reducedMotion} />
          </Float>
        </PresentationControls>
      </Canvas>
    </div>
  );
}
