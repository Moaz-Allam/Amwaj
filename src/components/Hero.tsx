import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';
import GradientBlinds from './GradientBlinds';
import gsap from 'gsap';

const Hero = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* GradientBlinds background */}
      <div className="absolute inset-0">
        <GradientBlinds
          className="w-full h-full"
          gradientColors={['#070A10', '#11689b', '#333366', '#070A10']}
          angle={25}
          noise={0.25}
          blindCount={14}
          blindMinWidth={50}
          spotlightRadius={0.6}
          spotlightSoftness={1.2}
          spotlightOpacity={0.8}
          mouseDampening={0.15}
          distortAmount={1.5}
          shineDirection="left"
          mixBlendMode="normal"
        />
        <div className="absolute inset-0 bg-background/50" />
      </div>

      {/* Glow accents */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[100px]" />

      <div className="container-main relative z-10 pt-24">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16">
          <h1
            data-gsap="hero"
            className="text-4xl sm:text-5xl lg:text-[64px] font-bold leading-[1.05] tracking-tight max-w-[16ch] text-foreground"
          >
            {t('hero.title')}
          </h1>
          <p
            data-gsap="hero"
            className="text-base lg:text-lg text-muted-foreground max-w-[34ch] leading-relaxed"
          >
            {t('hero.subtitle')}
          </p>
        </div>
      </div>

      {/* Scroll hint */}
      <div data-gsap="hero" className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-xs tracking-widest uppercase">{t('hero.scroll')}</span>
        <ChevronDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;
