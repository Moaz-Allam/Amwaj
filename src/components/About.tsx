import { useEffect, useMemo, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import serviceOneImage from '@/assets/service-one.png';
import serviceTwoImage from '@/assets/service-two.png';
import serviceThreeImage from '@/assets/service-three.png';
import serviceFourImage from '@/assets/service-four.png';
import PerlinBlob from '@/components/PerlinBlob';

gsap.registerPlugin(ScrollTrigger);

const serviceImages = [serviceOneImage, serviceTwoImage, serviceThreeImage, serviceFourImage] as const;

const services = [
  { num: '01', titleKey: 'service.1.title', descKey: 'service.1.desc' },
  { num: '02', titleKey: 'service.2.title', descKey: 'service.2.desc' },
  { num: '03', titleKey: 'service.3.title', descKey: 'service.3.desc' },
  { num: '04', titleKey: 'service.4.title', descKey: 'service.4.desc' },
] as const;

const revealWordsByProgress = (words: HTMLElement[], progress: number) => {
  if (!words.length) return;

  const minOpacity = 0.12;
  const total = words.length;

  words.forEach((word, index) => {
    const start = index / total;
    const end = (index + 1) / total;

    let opacity = minOpacity;
    if (progress >= end) {
      opacity = 1;
    } else if (progress >= start) {
      const localProgress = (progress - start) / (end - start);
      opacity = minOpacity + localProgress * (1 - minOpacity);
    }

    gsap.set(word, { opacity });
  });
};

const revealCardsByProgress = (cards: HTMLElement[], progress: number) => {
  if (!cards.length) return;

  const total = cards.length;

  cards.forEach((card, index) => {
    const start = index / total;
    const end = (index + 1) / total;
    const localProgress = gsap.utils.clamp(0, 1, (progress - start) / (end - start));

    gsap.set(card, { opacity: localProgress });
  });
};

const About = () => {
  const { t, isRTL, lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const aboutContentRef = useRef<HTMLDivElement>(null);
  const servicesContentRef = useRef<HTMLDivElement>(null);
  const servicesCardsRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const servicesGlowRef = useRef<HTMLDivElement>(null);

  const aboutHeading =
    lang === 'ar'
      ? 'نبني علامات جريئة تحول الانتباه إلى نمو مستدام.'
      : 'We build bold brands that convert attention into growth.';
  const titleWords = useMemo(() => aboutHeading.trim().split(/\s+/), [aboutHeading]);
  const setHeaderTheme = (theme: 'light' | 'dark') => {
    document.documentElement.dataset.headerTheme = theme;
  };

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (!isDesktop) return;

    const sectionEl = sectionRef.current;
    const titleEl = titleRef.current;
    const aboutContentEl = aboutContentRef.current;
    const servicesContentEl = servicesContentRef.current;
    const servicesCardsEl = servicesCardsRef.current;
    const blobEl = blobRef.current;
    const servicesGlowEl = servicesGlowRef.current;

    if (!sectionEl || !titleEl || !aboutContentEl || !servicesContentEl || !servicesCardsEl || !blobEl || !servicesGlowEl) return;

    const titleWordEls = Array.from(titleEl.querySelectorAll<HTMLElement>('[data-about-word]'));
    const serviceCardEls = Array.from(servicesCardsEl.querySelectorAll<HTMLElement>('[data-service-card]'));

    if (!titleWordEls.length || !serviceCardEls.length) return;

    setHeaderTheme('dark');
    gsap.set(titleWordEls, { opacity: 0.12 });
    gsap.set(aboutContentEl, { opacity: 1, pointerEvents: 'auto' });
    gsap.set(sectionEl, { backgroundColor: '#ffffff' });
    gsap.set(blobEl, { scale: 1, y: 0, transformOrigin: '50% 50%' });
    gsap.set(servicesGlowEl, { opacity: 0, scale: 0.72, transformOrigin: '50% 50%' });
    gsap.set(servicesContentEl, { opacity: 0, pointerEvents: 'none' });
    gsap.set(serviceCardEls, { opacity: 0 });

    let blobTargetY = 0;
    const updateBlobTargetY = () => {
      const sectionRect = sectionEl.getBoundingClientRect();
      const cardsRect = servicesCardsEl.getBoundingClientRect();
      blobTargetY = cardsRect.top + cardsRect.height / 2 - (sectionRect.top + sectionRect.height / 2);
    };

    updateBlobTargetY();
    window.addEventListener('resize', updateBlobTargetY);
    ScrollTrigger.addEventListener('refresh', updateBlobTargetY);

    const trigger = ScrollTrigger.create({
      trigger: sectionEl,
      start: 'top top',
      end: '+=420%',
      scrub: true,
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const headingProgress = gsap.utils.clamp(0, 1, progress / 0.3);
        const aboutFadeProgress = gsap.utils.clamp(0, 1, (progress - 0.36) / 0.14);
        const backgroundProgress = gsap.utils.clamp(0, 1, (progress - 0.34) / 0.2);
        const blobAlignProgress = gsap.utils.clamp(0, 1, (progress - 0.6) / 0.22);

        const servicesVisibility = progress >= 0.58 ? 1 : 0;
        const servicesCardsProgress = gsap.utils.clamp(0, 1, (progress - 0.66) / 0.34);
        const servicesLightProgress = gsap.utils.clamp(0, 1, (progress - 0.56) / 0.22);

        const colorChannel = Math.round((1 - backgroundProgress) * 255);
        const lightHeader = progress < 0.42;

        revealWordsByProgress(titleWordEls, headingProgress);
        setHeaderTheme(lightHeader ? 'light' : 'dark');

        gsap.set(aboutContentEl, {
          opacity: 1 - aboutFadeProgress,
          pointerEvents: aboutFadeProgress > 0.95 ? 'none' : 'auto',
        });

        gsap.set(sectionEl, { backgroundColor: `rgb(${colorChannel}, ${colorChannel}, ${colorChannel})` });
        gsap.set(blobEl, {
          scale: 1,
          y: blobTargetY * blobAlignProgress,
        });
        gsap.set(servicesGlowEl, {
          opacity: servicesLightProgress,
          scale: 0.72 + 0.34 * servicesLightProgress,
        });
        gsap.set(servicesContentEl, {
          opacity: servicesVisibility,
          pointerEvents: servicesVisibility > 0.95 ? 'auto' : 'none',
        });

        revealCardsByProgress(serviceCardEls, servicesCardsProgress);
      },
    });

    return () => {
      window.removeEventListener('resize', updateBlobTargetY);
      ScrollTrigger.removeEventListener('refresh', updateBlobTargetY);
      trigger.kill();
      setHeaderTheme('dark');
      gsap.set(titleWordEls, { clearProps: 'opacity' });
      gsap.set(aboutContentEl, { clearProps: 'opacity,pointerEvents' });
      gsap.set(sectionEl, { clearProps: 'backgroundColor' });
      gsap.set(blobEl, { clearProps: 'transform' });
      gsap.set(servicesGlowEl, { clearProps: 'opacity,transform' });
      gsap.set(servicesContentEl, { clearProps: 'opacity,pointerEvents' });
      gsap.set(serviceCardEls, { clearProps: 'opacity,transform' });
    };
  }, [lang]);

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (isDesktop) {
      return;
    }

    const introEl = aboutContentRef.current;
    if (!introEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const isIntroVisible = entries.some((entry) => entry.isIntersecting && entry.intersectionRatio > 0.4);
        setHeaderTheme(isIntroVisible ? 'light' : 'dark');
      },
      {
        threshold: [0, 0.4, 0.65],
      }
    );

    observer.observe(introEl);

    return () => {
      observer.disconnect();
      setHeaderTheme('dark');
    };
  }, [lang]);

  return (
    <section id="about" ref={sectionRef} className="bg-white text-black min-h-screen lg:h-screen relative z-20 overflow-visible lg:overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
        <div ref={blobRef} className="relative h-[clamp(130px,19vw,320px)] w-[clamp(130px,19vw,320px)] will-change-transform">
          <div
            ref={servicesGlowRef}
            className="absolute -inset-[44%] rounded-full opacity-0 blur-[92px] mix-blend-screen will-change-[opacity,transform]"
            style={{
              background:
                'radial-gradient(circle at center, rgb(255 255 255 / 0.95) 0%, hsl(var(--primary) / 0.82) 34%, hsl(var(--secondary) / 0.5) 54%, transparent 72%)',
            }}
          />
          <PerlinBlob className="h-full w-full" />
        </div>
      </div>

      <div ref={aboutContentRef} className="container-main relative z-20 h-screen flex items-center justify-center">
        <div className="flex flex-col items-center text-center gap-6 max-w-5xl">
          <span className="text-primary font-semibold tracking-[0.3em] text-[12px] sm:text-[13px] uppercase">
            {lang === 'ar' ? 'من نحن' : 'WHO WE ARE'}
          </span>

          <h2
            ref={titleRef}
            dir={isRTL ? 'rtl' : 'ltr'}
            className="text-[clamp(2.6rem,7.2vw,6.2rem)] font-black uppercase leading-[0.9] tracking-[-0.045em]"
          >
            {titleWords.map((word, index) => (
              <span key={`about-title-${lang}-${index}`} data-about-word className="inline-block will-change-[opacity]">
                {word}
                {index < titleWords.length - 1 ? '\u00A0' : ''}
              </span>
            ))}
          </h2>

          <a
            href="#services"
            className="inline-flex items-center gap-2 border border-black/20 px-6 py-3 text-[15px] sm:text-[16px] font-semibold uppercase tracking-[0.09em] transition-colors hover:border-primary hover:text-primary"
          >
            {t('about.link')}
            <ChevronRight size={18} className={isRTL ? 'rotate-180' : ''} />
          </a>
        </div>
      </div>

      <div id="services" ref={servicesContentRef} className="relative z-40 w-full mt-14 sm:mt-16 mb-10 sm:mb-12 py-12 sm:py-14 bg-black lg:bg-transparent lg:py-0 lg:mt-0 lg:mb-0 lg:absolute lg:inset-0 flex items-start lg:items-center">
        <div className="container-main w-full">
          <div className="flex flex-col items-center text-center gap-3 mb-8 sm:mb-10">
            <span className="text-primary font-medium tracking-wide text-[16px]">{t('services.label')}</span>
            <h2 className="text-white text-[27px] sm:text-[30px] md:text-[36px] font-semibold leading-[1.08] tracking-[-0.02em] max-w-4xl">
              {t('services.title')}
            </h2>
            <p className="max-w-4xl text-white/75 text-[14px] sm:text-[16px] leading-[1.45]">{t('services.desc')}</p>
          </div>

          <div ref={servicesCardsRef} className="grid md:grid-cols-2 gap-3 sm:gap-4 lg:gap-5 relative max-w-[1160px] mx-auto">
            {services.map((service, index) => (
              <article
                key={service.num}
                data-service-card
                className="group relative z-10 overflow-hidden rounded-xl border border-white/10 h-[248px] sm:h-[255px] lg:h-[300px] px-4 sm:px-6 py-5 sm:py-6 flex flex-col bg-[linear-gradient(135deg,rgba(5,18,34,0.86)_0%,rgba(10,36,62,0.62)_65%,rgba(17,60,96,0.46)_100%)] backdrop-blur-[2px] transition-all duration-300 hover:border-white/20"
              >
                <div
                  className={`absolute inset-y-0 w-[40%] min-w-[132px] sm:w-[43%] sm:min-w-[170px] flex items-center justify-center opacity-95 group-hover:scale-[1.02] transition-all duration-300 pointer-events-none ${isRTL ? 'left-[1%]' : 'right-[1%]'}`}
                >
                  <img src={serviceImages[index]} alt={t(service.titleKey)} className="w-full h-[72%] sm:h-[78%] object-contain" loading="lazy" />
                </div>

                <div className="relative z-10">
                  <span className="text-[30px] sm:text-[40px] font-medium leading-none text-white/95 tracking-tight">{service.num}</span>
                </div>

                <div className={`relative z-10 mt-auto ${isRTL ? 'text-right pl-[42%] sm:pl-[44%]' : 'text-left pr-[42%] sm:pr-[44%]'}`}>
                  <h3 className="text-[20px] sm:text-[30px] leading-[1.02] sm:leading-[0.98] font-semibold mb-2 tracking-[-0.02em] text-white">
                    {t(service.titleKey)}
                  </h3>
                  <p className="max-w-[34ch] text-white/85 text-[14px] sm:text-[15px] leading-[1.3] line-clamp-3">
                    {t(service.descKey)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
