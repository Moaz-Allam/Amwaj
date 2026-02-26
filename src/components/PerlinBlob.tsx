import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
uniform float u_time;
uniform float u_frequency;

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
  return mod289(((x * 34.0) + 10.0) * x);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

float pnoise(vec3 P, vec3 rep) {
  vec3 Pi0 = mod(floor(P), rep);
  vec3 Pi1 = mod(Pi0 + vec3(1.0), rep);
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P);
  vec3 Pf1 = Pf0 - vec3(1.0);
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);
  vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);
  vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);
  vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);
  vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);
  vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);
  vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);
  vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return 2.2 * n_xyz;
}

void main() {
  float noise = 3.0 * pnoise(position + u_time, vec3(10.0));
  float displacement = (u_frequency / 30.0) * (noise / 10.0);
  vec3 newPosition = position + normal * displacement;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;

const fragmentShader = `
uniform float u_red;
uniform float u_blue;
uniform float u_green;

void main() {
  gl_FragColor = vec4(vec3(u_red, u_green, u_blue), 1.0);
}
`;

type PerlinBlobProps = {
  className?: string;
};

const PerlinBlob = ({ className }: PerlinBlobProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(0, -2, 14);
    camera.lookAt(0, 0, 0);

    const uniforms = {
      u_time: { value: 0.0 },
      u_frequency: { value: 0.0 },
      u_red: { value: 0.07 },
      u_green: { value: 0.45 },
      u_blue: { value: 0.61 },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      wireframe: true,
    });

    const geometry = new THREE.IcosahedronGeometry(4, 6);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const canvas = renderer.domElement;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    const listener = new THREE.AudioListener();
    camera.add(listener);
    const sound = new THREE.Audio(listener);
    const analyser = new THREE.AudioAnalyser(sound, 32);
    const loader = new THREE.AudioLoader();

    let isAudioBufferReady = false;
    let shouldPlayAudio = false;

    const tryPlay = async () => {
      shouldPlayAudio = true;
      if (!isAudioBufferReady) {
        return;
      }

      if (listener.context.state === 'suspended') {
        await listener.context.resume();
      }

      if (!sound.isPlaying) {
        sound.play();
      }
    };

    const onUserGesture = () => {
      void tryPlay();
    };

    loader.load(
      '/track.wav',
      (buffer) => {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.9);
        isAudioBufferReady = true;

        if (shouldPlayAudio || (navigator as any).userActivation?.hasBeenActive) {
          void tryPlay();
        }
      },
      undefined,
      () => {
        console.warn('track.wav was not found. Add /public/track.wav for blob audio.');
      },
    );

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX = (event.clientX - centerX) / 100;
      mouseY = (event.clientY - centerY) / 100;
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('pointerdown', onUserGesture);
    window.addEventListener('touchstart', onUserGesture, { passive: true });
    window.addEventListener('keydown', onUserGesture);

    const timer = new THREE.Timer();
    timer.connect(document);
    let frameId = 0;

    const animate = (timestamp?: number) => {
      frameId = window.requestAnimationFrame(animate);
      timer.update(timestamp);

      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.5;
      camera.lookAt(scene.position);

      uniforms.u_time.value = timer.getElapsed();
      const averageFrequency = sound.isPlaying ? analyser.getAverageFrequency() : 0;
      const clampedFrequency = THREE.MathUtils.clamp(averageFrequency, 0, 85);
      uniforms.u_frequency.value = THREE.MathUtils.lerp(uniforms.u_frequency.value, clampedFrequency, 0.18);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('pointerdown', onUserGesture);
      window.removeEventListener('touchstart', onUserGesture);
      window.removeEventListener('keydown', onUserGesture);
      resizeObserver.disconnect();

      if (sound.isPlaying) {
        sound.stop();
      }

      timer.dispose();

      camera.remove(listener);
      geometry.dispose();
      material.dispose();
      renderer.dispose();

      if (canvas.parentElement === container) {
        container.removeChild(canvas);
      }
    };
  }, []);

  return <div ref={containerRef} className={className} />;
};

export default PerlinBlob;
