import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';
import GradientBlinds from './GradientBlinds';
import gsap from 'gsap';

const Hero = () => {
  const { t, isRTL } = useLanguage();
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
    <section id="hero" ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden bg-black">
      <GradientBlinds
        className="absolute inset-0 w-full h-full opacity-85"
        gradientColors={['#5DC2FDCF',]}
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

      <div className="container-main relative z-40 pt-20 h-screen flex flex-col justify-center pointer-events-none">
        <div
          dir={isRTL ? 'rtl' : 'ltr'}
          className={`flex flex-col gap-5 w-full lg:w-[82%] ${isRTL ? 'ml-auto items-end text-right' : 'mr-auto items-start text-left'}`}
        >
          <h1
            data-gsap="hero"
            className={`w-full text-4xl sm:text-6xl lg:text-8xl font-bold leading-[1.15] tracking-tighter text-white ${isRTL ? 'text-right' : 'text-left'}`}
          >
            {t('hero.title')}
          </h1>

          <p
            data-gsap="hero"
            className={`w-full text-sm sm:text-base lg:text-lg text-white/75 leading-relaxed max-w-xl ${isRTL ? 'ml-auto text-right' : 'mr-auto text-left'}`}
          >
            {t('hero.subtitle')}
          </p>

          <a
            data-gsap="hero"
            href="/contact"
            className={`pointer-events-auto inline-flex bg-white text-black px-6 py-3 text-[17px] font-medium transition-colors hover:bg-white/90 ${isRTL ? 'ml-auto' : 'mr-auto'}`}
          >
            {t('cta.button')}
          </a>
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
