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
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden bg-black">
      <GradientBlinds
        className="absolute inset-0 w-full h-full opacity-85"
        gradientColors={['#5dc2fdff',]}
        angle={8}
        noise={0.45}
        blindCount={100}
        blindMinWidth={90}
        spotlightRadius={0.25}
        spotlightSoftness={1.15}
        spotlightOpacity={0.42}
        mouseDampening={0.6}
        distortAmount={22}
        shineDirection="left"
        mixBlendMode="normal"
      />

      <div className="container-main relative z-40 pt-24 h-screen flex flex-col justify-center pointer-events-none">
        <div className="flex flex-col gap-12 lg:gap-24 w-full">
          {/* Title Area - Left aligned, 70% width */}
          <h1
            data-gsap="hero"
            className="self-start text-left w-full lg:w-[70%] text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tighter text-white"
          >
            {t('hero.title')}
          </h1>

          {/* Subtitle Area - Right aligned, 70% width */}
          <div className="self-end w-full lg:w-[70%] flex justify-end">
            <p
              data-gsap="hero"
              className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-md text-right"
            >
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Fade transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none z-20" />

      {/* Scroll hint */}
      <div data-gsap="hero" className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground z-30">
        <span className="text-xs tracking-widest uppercase">{t('hero.scroll')}</span>
        <ChevronDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;
