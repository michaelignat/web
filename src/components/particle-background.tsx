"use client";

import { animated, useSpring } from "@react-spring/three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer, Noise } from "@react-three/postprocessing";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { createNoise3D } from "simplex-noise";
import {
  BufferAttribute,
  Color,
  type Points,
  type ShaderMaterial,
  Vector3,
} from "three";

export const MovingParticleSphere = () => (
  <div className="fixed inset-0 w-full h-full">
    <Canvas camera={{ position: [0, 0, 6], fov: 75 }}>
      <SceneContent />
    </Canvas>
  </div>
);

const SceneContent = () => {
  const { scene } = useThree();

  const { theme } = useTheme();
  const isLight = theme === "light";

  const sphereColor = isLight ? "#000000" : "#FFFFFF";

  useEffect(() => {
    const color = new Color(sphereColor);

    scene.traverse((object) => {
      if (object.type !== "Points") {
        return;
      }
      const material = (object as Points).material as ShaderMaterial;
      if (material.uniforms.color) {
        material.uniforms.color.value = color;
        material.uniformsNeedUpdate = true;
      }
    });
  }, [sphereColor, scene]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <EffectComposer>
        <Bloom
          intensity={0.05}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          height={300}
        />
        <Noise opacity={isLight ? 0.25 : 0.05} />
      </EffectComposer>

      <MorphingSphere
        sphereRadius={3}
        noiseStrength={0.25}
        opacity={isLight ? 0.25 : 0.1}
        colour={sphereColor}
      />
      <MorphingSphere
        sphereRadius={3.25}
        opacity={0.5}
        timeScale={0.15}
        particleCount={250}
        colour={sphereColor}
      />
      <MorphingSphere
        sphereRadius={3.25}
        opacity={isLight ? 0.25 : 0.05}
        timeScale={0.15}
        particleCount={10000}
        colour={sphereColor}
      />
      <MorphingSphere
        sphereRadius={5}
        opacity={isLight ? 0.25 : 0.025}
        timeScale={0.1}
        particleCount={10000}
        colour={sphereColor}
      />
    </>
  );
};

const vertexShader = `
  attribute float size;
  varying vec3 vPosition;
  void main() {
    vPosition = position;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform vec3 color;
  uniform float opacity;
  void main() {
    if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.475) discard;
    gl_FragColor = vec4(color, opacity);
  }
`;

// Reusable Vector3 instance to avoid creating new objects
const _vec3 = new Vector3();

type MorphingSphereProps = {
  sphereRadius: number;
  timeScale?: number;
  noiseStrength?: number;
  particleCount?: number;
  colour?: string;
  opacity?: number;
};

const MorphingSphere = ({
  sphereRadius,
  timeScale = 0.2,
  noiseStrength = 0.2,
  particleCount = 100000,
  colour = "#FFFFFF",
  opacity = 1,
}: MorphingSphereProps) => {
  const particlesRef = useRef<Points>(null);
  const timeRef = useRef(0);

  const noise3D = useMemo(() => createNoise3D(), []);

  const { scale } = useSpring({
    from: { scale: 0 },
    to: { scale: 1 },
    config: { mass: 1, tension: 120, friction: 50 },
  });

  useFrame(({ clock }) => {
    timeRef.current = clock.getElapsedTime() * timeScale;
    updateParticles(timeRef.current);
  });

  const shaderColour = useMemo(() => {
    const c = new Color(colour);
    return new Vector3(c.r, c.g, c.b);
  }, [colour]);

  const [particles, originalPositions, sizes] = useMemo(() => {
    const particlesArray = new Float32Array(particleCount * 3);
    const origPositions = new Float32Array(particleCount * 3);
    const sizesArray = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // generate random spherical coordinates
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = sphereRadius * (0.9 + Math.random() * 0.1);

      // convert spherical coordinates to cartesian
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      // set initial and original positions
      const index = i * 3;
      particlesArray[index] = origPositions[index] = x;
      particlesArray[index + 1] = origPositions[index + 1] = y;
      particlesArray[index + 2] = origPositions[index + 2] = z;
      sizesArray[i] = Math.random() * 0.01 + 0.002;
    }

    return [particlesArray, origPositions, sizesArray];
  }, []);

  // create buffer attributes for particle positions and sizes
  const attribute = useMemo(
    () => new BufferAttribute(particles, 3),
    [particles],
  );
  const sizeAttribute = useMemo(() => new BufferAttribute(sizes, 1), [sizes]);

  /**
   * updates particles positions based on noise
   */
  const updateParticles = useCallback((time: number) => {
    if (!particlesRef.current) {
      return;
    }

    const positions = particlesRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      const index = i * 3;
      const origX = originalPositions[index];
      const origY = originalPositions[index + 1];
      const origZ = originalPositions[index + 2];

      // generate noise value for this particle
      const noise = noise3D(origX + time, origY + time, origZ + time);
      const noiseDisplacement = noiseStrength * noise;

      // calculate new position based on noise
      const particlePos = _vec3
        .set(origX, origY, origZ)
        .normalize()
        .multiplyScalar(sphereRadius + noiseDisplacement);

      positions[index] = particlePos.x;
      positions[index + 1] = particlePos.y;
      positions[index + 2] = particlePos.z;
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  }, []);

  return (
    <animated.group scale={scale}>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" {...attribute} />
          <bufferAttribute attach="attributes-size" {...sizeAttribute} />
        </bufferGeometry>

        <shaderMaterial
          attach="material"
          args={[
            {
              uniforms: {
                color: { value: shaderColour },
                opacity: { value: opacity },
              },
              vertexShader,
              fragmentShader,
              transparent: true,
              depthWrite: false,
            },
          ]}
        />
      </points>
    </animated.group>
  );
};
