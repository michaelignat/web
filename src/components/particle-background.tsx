"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./theme/theme-provider";

const SHELLS = [
  {
    alphaDark: 0.24,
    alphaLight: 0.28,
    count: 7200,
    jitter: 0.4,
    radius: 2.95,
    seed: 0,
    size: 2.8,
    speed: 0.11,
  },
  {
    alphaDark: 0.16,
    alphaLight: 0.24,
    count: 2800,
    jitter: 1,
    radius: 4.35,
    seed: 1,
    size: 2.3,
    speed: -0.07,
  },
  {
    alphaDark: 0.42,
    alphaLight: 0.48,
    count: 1200,
    jitter: 0.18,
    radius: 3.22,
    seed: 2,
    size: 4.4,
    speed: 0.19,
  },
] as const;

const VERTEX_SHADER = `
attribute vec3 aPosition;
attribute float aPhase;
attribute float aSize;

uniform float uAlpha;
uniform float uAspect;
uniform float uDevicePixelRatio;
uniform float uIntro;
uniform mat3 uRotation;
uniform float uScale;

varying float vAlpha;
varying float vGlow;

void main() {
  vec3 position = uRotation * (aPosition * uScale * mix(0.74, 1.0, uIntro));
  float viewZ = position.z - 6.0;
  float perspective = max(0.001, -viewZ);
  float fov = 1.428148;

  gl_Position = vec4(
    (position.x * fov) / uAspect,
    position.y * fov,
    0.0,
    perspective
  );

  gl_PointSize = clamp(aSize * uDevicePixelRatio * (6.0 / perspective), 1.0, 8.0);
  vAlpha = uAlpha * smoothstep(0.0, 1.0, uIntro);
  vGlow = 0.82 + aPhase * 0.18;
}
`;

const FRAGMENT_SHADER = `
precision mediump float;

uniform vec3 uColor;

varying float vAlpha;
varying float vGlow;

void main() {
  vec2 point = gl_PointCoord - vec2(0.5);
  float distanceFromCenter = length(point) * 2.0;
  float alpha = smoothstep(1.0, 0.08, distanceFromCenter) * vAlpha * vGlow;

  if (alpha < 0.01) {
    discard;
  }

  gl_FragColor = vec4(uColor, alpha);
}
`;

type ParticleLayer = {
  alpha: number;
  buffer: WebGLBuffer;
  count: number;
  phase: number;
  speed: number;
};

export const MovingParticleSphere = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    return mountParticleRenderer(canvas, resolvedTheme === "light");
  }, [resolvedTheme]);

  return (
    <div className="pointer-events-none fixed inset-0 h-full w-full">
      <canvas className="block h-full w-full" ref={canvasRef} />
    </div>
  );
};

const mountParticleRenderer = (canvas: HTMLCanvasElement, isLight: boolean) => {
  const contextAttributes = {
    alpha: true,
    antialias: false,
    depth: false,
    failIfMajorPerformanceCaveat: false,
    powerPreference: "high-performance",
    premultipliedAlpha: false,
    preserveDrawingBuffer: false,
    stencil: false,
  } satisfies WebGLContextAttributes;
  const gl =
    (canvas.getContext(
      "webgl",
      contextAttributes,
    ) as WebGLRenderingContext | null) ??
    (canvas.getContext(
      "experimental-webgl",
      contextAttributes,
    ) as WebGLRenderingContext | null);

  if (!gl) {
    return;
  }

  const program = createProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER);

  if (!program) {
    return;
  }

  const attributes = {
    phase: gl.getAttribLocation(program, "aPhase"),
    position: gl.getAttribLocation(program, "aPosition"),
    size: gl.getAttribLocation(program, "aSize"),
  };
  const uniforms = {
    alpha: gl.getUniformLocation(program, "uAlpha"),
    aspect: gl.getUniformLocation(program, "uAspect"),
    color: gl.getUniformLocation(program, "uColor"),
    devicePixelRatio: gl.getUniformLocation(program, "uDevicePixelRatio"),
    intro: gl.getUniformLocation(program, "uIntro"),
    rotation: gl.getUniformLocation(program, "uRotation"),
    scale: gl.getUniformLocation(program, "uScale"),
  };
  const layers = createParticleLayers(gl, isLight);
  const rotationMatrix = new Float32Array(9);
  const stride = 5 * Float32Array.BYTES_PER_ELEMENT;
  let animationFrame = 0;
  let intro = 0;
  let lastTime = performance.now();
  let disposed = false;

  if (layers.length === 0) {
    gl.deleteProgram(program);
    return;
  }

  gl.useProgram(program);
  gl.disable(gl.DEPTH_TEST);
  gl.enable(gl.BLEND);
  gl.blendEquation(gl.FUNC_ADD);
  gl.blendFunc(gl.SRC_ALPHA, isLight ? gl.ONE_MINUS_SRC_ALPHA : gl.ONE);
  gl.clearColor(0, 0, 0, 0);
  gl.uniform1f(uniforms.devicePixelRatio, 1);
  setUniformColor(gl, uniforms.color, isLight);

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }

    gl.uniform1f(uniforms.aspect, width / height);
  };
  const observer = new ResizeObserver(resize);
  const render = (now: number) => {
    if (disposed) {
      return;
    }

    const delta = Math.min(0.05, (now - lastTime) / 1000);
    const time = now / 1000;
    lastTime = now;
    intro = damp(intro, 1, 2.8, delta);

    resize();
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(uniforms.intro, intro);

    for (const layer of layers) {
      const scale = 1 + Math.sin(time * 0.34 + layer.phase) * 0.012;
      setRotationMatrix(
        rotationMatrix,
        time * layer.speed + layer.phase,
        Math.sin(time * 0.08 + layer.phase) * 0.065,
        Math.cos(time * 0.06 + layer.phase) * 0.038,
      );

      gl.bindBuffer(gl.ARRAY_BUFFER, layer.buffer);
      enableAttribute(gl, attributes.position, 3, stride, 0);
      enableAttribute(gl, attributes.phase, 1, stride, 3);
      enableAttribute(gl, attributes.size, 1, stride, 4);
      gl.uniform1f(uniforms.alpha, layer.alpha);
      gl.uniform1f(uniforms.scale, scale);
      gl.uniformMatrix3fv(uniforms.rotation, false, rotationMatrix);
      gl.drawArrays(gl.POINTS, 0, layer.count);
    }

    animationFrame = requestAnimationFrame(render);
  };
  const handleContextLost = (event: Event) => {
    event.preventDefault();
    disposed = true;
    cancelAnimationFrame(animationFrame);
  };

  observer.observe(canvas);
  resize();
  animationFrame = requestAnimationFrame(render);
  canvas.addEventListener("webglcontextlost", handleContextLost);

  return () => {
    disposed = true;
    cancelAnimationFrame(animationFrame);
    observer.disconnect();
    canvas.removeEventListener("webglcontextlost", handleContextLost);

    for (const layer of layers) {
      gl.deleteBuffer(layer.buffer);
    }

    gl.deleteProgram(program);
  };
};

const createParticleLayers = (
  gl: WebGLRenderingContext,
  isLight: boolean,
): ParticleLayer[] => {
  const layers: ParticleLayer[] = [];

  for (const shell of SHELLS) {
    const buffer = gl.createBuffer();

    if (!buffer) {
      continue;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, createShellVertices(shell), gl.STATIC_DRAW);
    layers.push({
      alpha: isLight ? shell.alphaLight : shell.alphaDark,
      buffer,
      count: shell.count,
      phase: shell.seed * 2.4,
      speed: shell.speed,
    });
  }

  return layers;
};

const createProgram = (
  gl: WebGLRenderingContext,
  vertexSource: string,
  fragmentSource: string,
) => {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

  if (!vertexShader || !fragmentShader) {
    if (vertexShader) {
      gl.deleteShader(vertexShader);
    }

    if (fragmentShader) {
      gl.deleteShader(fragmentShader);
    }

    return null;
  }

  const program = gl.createProgram();

  if (!program) {
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    return null;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }

  return program;
};

const createShader = (
  gl: WebGLRenderingContext,
  type: number,
  source: string,
) => {
  const shader = gl.createShader(type);

  if (!shader) {
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
};

const createShellVertices = (shell: (typeof SHELLS)[number]) => {
  const vertices = new Float32Array(shell.count * 5);
  const random = mulberry32(0x4d494749 + shell.seed * 0x9e3779b1);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  let vertexOffset = 0;

  for (let i = 0; i < shell.count; i++) {
    const y = 1 - (i / (shell.count - 1)) * 2;
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = i * goldenAngle + (random() - 0.5) * 0.08;
    const wave = Math.sin(i * 0.017 + shell.seed * 2.4) * 0.5 + 0.5;
    const shellRadius =
      shell.radius + (random() - 0.5) * shell.jitter + wave * 0.08;
    const sizeJitter = 0.84 + random() * 0.36;

    vertices[vertexOffset] = Math.cos(theta) * radiusAtY * shellRadius;
    vertices[vertexOffset + 1] =
      (y + (random() - 0.5) * 0.02) * shellRadius;
    vertices[vertexOffset + 2] = Math.sin(theta) * radiusAtY * shellRadius;
    vertices[vertexOffset + 3] = random();
    vertices[vertexOffset + 4] = shell.size * sizeJitter;
    vertexOffset += 5;
  }

  return vertices;
};

const enableAttribute = (
  gl: WebGLRenderingContext,
  location: number,
  size: number,
  stride: number,
  offset: number,
) => {
  if (location < 0) {
    return;
  }

  gl.enableVertexAttribArray(location);
  gl.vertexAttribPointer(
    location,
    size,
    gl.FLOAT,
    false,
    stride,
    offset * Float32Array.BYTES_PER_ELEMENT,
  );
};

const setUniformColor = (
  gl: WebGLRenderingContext,
  location: WebGLUniformLocation | null,
  isLight: boolean,
) => {
  if (!location) {
    return;
  }

  const value = isLight ? 0.02 : 1;
  gl.uniform3f(location, value, value, value);
};

const setRotationMatrix = (
  target: Float32Array,
  y: number,
  x: number,
  z: number,
) => {
  const sy = Math.sin(y);
  const cy = Math.cos(y);
  const sx = Math.sin(x);
  const cx = Math.cos(x);
  const sz = Math.sin(z);
  const cz = Math.cos(z);

  target[0] = cy * cz + sy * sx * sz;
  target[1] = -cy * sz + sy * sx * cz;
  target[2] = sy * cx;
  target[3] = cx * sz;
  target[4] = cx * cz;
  target[5] = -sx;
  target[6] = -sy * cz + cy * sx * sz;
  target[7] = sy * sz + cy * sx * cz;
  target[8] = cy * cx;
};

const damp = (current: number, target: number, lambda: number, delta: number) =>
  current + (target - current) * (1 - Math.exp(-lambda * delta));

const mulberry32 = (seed: number) => {
  let state = seed;

  return () => {
    state += 0x6d2b79f5;
    let next = state;
    next = Math.imul(next ^ (next >>> 15), next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
};
