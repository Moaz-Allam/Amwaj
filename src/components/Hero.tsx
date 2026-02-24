import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';
import GradientBlinds from './GradientBlinds';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mesh, Program, Renderer, Triangle } from 'ogl';

gsap.registerPlugin(ScrollTrigger);

const transitionVertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const transitionFragmentShader = `
precision mediump float;

uniform float uProgress;
uniform vec2  uResolution;
uniform vec3  uColor;
uniform float uSpread;

varying vec2 vUv;

float hash(vec2 p) {
  vec3 p2 = vec3(p.xy, 1.0);
  return fract(sin(dot(p2, vec3(37.1, 61.7, 12.4))) * 3758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);

  f = f * f * (3.0 - 2.0 * f);

  float a = hash(i + vec2(0.0, 0.0));
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  return mix(
    mix(a, b, f.x),
    mix(c, d, f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  v += noise(p * 1.0) * 0.5;
  v += noise(p * 2.0) * 0.25;
  v += noise(p * 4.0) * 0.125;
  return v;
}

void main() {
  vec2 uv = vUv;

  float aspect = uResolution.x / uResolution.y;
  vec2 centeredUv = (uv - 0.5) * vec2(aspect, 1.0);

  float dissolveEdge = uv.y - uProgress * 1.2;
  float noiseValue = fbm(centeredUv * 15.0);
  float d = dissolveEdge + noiseValue * uSpread;

  float pixelSize = 1.0 / uResolution.y;
  float alpha = 1.0 - smoothstep(-pixelSize, pixelSize, d);

  gl_FragColor = vec4(uColor, alpha);
}
`;

const Hero = () => {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const transitionCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const targets = el.querySelectorAll('[data-gsap="hero"]');

    gsap.fromTo(
      targets,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.18, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  useEffect(() => {
    const heroEl = sectionRef.current;
    const canvasEl = transitionCanvasRef.current;
    const aboutEl = document.querySelector<HTMLElement>('#about');

    if (!heroEl || !canvasEl || !aboutEl) return;

    const renderer = new Renderer({
      canvas: canvasEl,
      alpha: true,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const uniforms = {
      uProgress: { value: 0 },
      uResolution: { value: [1, 1] as [number, number] },
      uColor: { value: [1, 1, 1] as [number, number, number] },
      uSpread: { value: 0.5 },
    };

    const program = new Program(gl, {
      vertex: transitionVertexShader,
      fragment: transitionFragmentShader,
      uniforms,
      transparent: true,
    });

    const mesh = new Mesh(gl, {
      geometry: new Triangle(gl),
      program,
    });

    const render = () => {
      renderer.render({ scene: mesh });
    };

    const resize = () => {
      const rect = heroEl.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height);
      uniforms.uResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight];
      render();
    };

    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(heroEl);

    const trigger = ScrollTrigger.create({
      trigger: heroEl,
      start: 'top top',
      endTrigger: aboutEl,
      end: 'top top',
      scrub: true,
      onUpdate: (self) => {
        const normalized = gsap.utils.clamp(0, 1, (self.progress - 0.08) / 0.92);
        uniforms.uProgress.value = normalized * 1.1;
        render();
      },
    });

    return () => {
      trigger.kill();
      observer.disconnect();
      canvasEl.width = 0;
      canvasEl.height = 0;
    };
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden bg-black">
      <GradientBlinds
        className="absolute inset-0 w-full h-full opacity-85"
        gradientColors={['#5DC2FDCF']}
        angle={8}
        noise={0.45}
        blindCount={100}
        blindMinWidth={90}
        spotlightRadius={0.25}
        spotlightSoftness={1.15}
        spotlightOpacity={0.42}
        mouseDampening={0.9}
        distortAmount={22}
        shineDirection="left"
        mixBlendMode="normal"
      />

      <canvas
        ref={transitionCanvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full pointer-events-none z-20"
      />

      <div className="container-main relative z-40 pt-20 h-screen flex flex-col justify-center pointer-events-none">
        <div
          dir={isRTL ? 'rtl' : 'ltr'}
          className="flex flex-col items-center text-center gap-5 w-full max-w-4xl mx-auto"
        >
          <h1
            data-gsap="hero"
            className="w-full text-4xl sm:text-6xl lg:text-8xl font-bold leading-[1.15] tracking-tighter text-white"
          >
            {t('hero.title')}
          </h1>

          <p
            data-gsap="hero"
            className="w-full text-sm sm:text-base lg:text-lg text-white/75 leading-relaxed max-w-2xl"
          >
            {t('hero.subtitle')}
          </p>

          <a
            data-gsap="hero"
            href="/contact"
            className="pointer-events-auto inline-flex bg-white text-black px-6 py-3 text-[17px] font-medium transition-colors hover:bg-white/90"
          >
            {t('hero.cta.primary')}
          </a>
        </div>
      </div>

      <div data-gsap="hero" className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground z-30">
        <span className="text-xs tracking-widest uppercase">{t('hero.scroll')}</span>
        <ChevronDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;
