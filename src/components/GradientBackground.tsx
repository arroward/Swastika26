'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const FluidShader = {
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    varying vec2 vUv;

    // Simplex 2D noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      // Slow moving noise
      float noiseVal = snoise(vUv * 2.5 + uTime * 0.15);
      float noiseVal2 = snoise(vUv * 5.0 - uTime * 0.1);
      
      float mixFactor = (noiseVal + noiseVal2 + 2.0) / 4.0;
      
      // Interpolate between the 3 colors
      vec3 color = mix(uColor3, uColor2, smoothstep(0.2, 0.6, mixFactor));
      color = mix(color, uColor1, smoothstep(0.6, 1.0, mixFactor));
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
};

function GradientMesh() {
    const mesh = useRef<THREE.Mesh>(null);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        // Red Theme Colors
        uColor1: { value: new THREE.Color("#ef4444") }, // Bright Red
        uColor2: { value: new THREE.Color("#7f1d1d") }, // Dark Red
        uColor3: { value: new THREE.Color("#0f0f0f") }, // Deep Black/Red
    }), []);

    useFrame((state) => {
        if (mesh.current) {
            const material = mesh.current.material as THREE.ShaderMaterial;
            material.uniforms.uTime.value = state.clock.getElapsedTime();
        }
    });

    return (
        <mesh ref={mesh} scale={[20, 20, 1]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                vertexShader={FluidShader.vertexShader}
                fragmentShader={FluidShader.fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    );
}

export default function GradientBackground() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <GradientMesh />
            </Canvas>
        </div>
    );
}
