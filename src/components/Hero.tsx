import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';
import GradientBlinds from './GradientBlinds';
import gsap from 'gsap';

const Hero = () => {
  const { t, lang } = useLanguage();
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
      <GradientBlinds
        className="absolute inset-0 w-full h-full"
        gradientColors={['#19193dff', '#5dc2fdff']}
        angle={9}
        noise={0.52}
        blindCount={100}
        blindMinWidth={100}
        spotlightRadius={0.28}
        spotlightSoftness={1.2}
        spotlightOpacity={0.5}
        mouseDampening={0.55}
        distortAmount={30}
        shineDirection="left"
        mixBlendMode="screen"
      />

      {/* Glow accents */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[100px]" />

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
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none z-20" />

      {/* Scroll hint */}
      <div data-gsap="hero" className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground z-30">
        <span className="text-xs tracking-widest uppercase">{t('hero.scroll')}</span>
        <ChevronDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;
