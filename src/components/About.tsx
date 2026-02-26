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

  const minOpacity = 0.08;
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

    gsap.set(card, {
      opacity: localProgress,
    });
  });
};

const About = () => {
  const { t, isRTL, lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const aboutContentRef = useRef<HTMLDivElement>(null);
  const servicesContentRef = useRef<HTMLDivElement>(null);
  const servicesCardsRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);

  const aboutTitle = t('about.title');
  const aboutDesc = t('about.desc');
  const servicesTitle = t('services.title');
  const servicesDesc = t('services.desc');

  const titleWords = useMemo(() => aboutTitle.trim().split(/\s+/), [aboutTitle]);
  const descWords = useMemo(() => aboutDesc.trim().split(/\s+/), [aboutDesc]);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const titleEl = titleRef.current;
    const descEl = descRef.current;
    const aboutContentEl = aboutContentRef.current;
    const servicesContentEl = servicesContentRef.current;
    const servicesCardsEl = servicesCardsRef.current;
    const ballEl = ballRef.current;

    if (!sectionEl || !titleEl || !descEl || !aboutContentEl || !servicesContentEl || !servicesCardsEl || !ballEl) return;

    const titleWordEls = Array.from(titleEl.querySelectorAll<HTMLElement>('[data-about-word="title"]'));
    const descWordEls = Array.from(descEl.querySelectorAll<HTMLElement>('[data-about-word="desc"]'));
    const aboutWords = [...titleWordEls, ...descWordEls];
    const serviceCardEls = Array.from(servicesCardsEl.querySelectorAll<HTMLElement>('[data-service-card]'));

    if (!aboutWords.length || !serviceCardEls.length) return;

    gsap.set(aboutWords, { opacity: 0.08 });
    gsap.set(aboutContentEl, { opacity: 1, pointerEvents: 'auto' });
    gsap.set(sectionEl, { backgroundColor: '#ffffff' });
    gsap.set(ballEl, { scale: 0.08, y: 0, transformOrigin: '50% 50%' });

    gsap.set(servicesContentEl, { opacity: 0, pointerEvents: 'none' });
    gsap.set(serviceCardEls, { opacity: 0 });

    let ballTargetY = 0;
    const updateBallTargetY = () => {
      const sectionRect = sectionEl.getBoundingClientRect();
      const cardsRect = servicesCardsEl.getBoundingClientRect();
      ballTargetY = cardsRect.top + cardsRect.height / 2 - (sectionRect.top + sectionRect.height / 2);
    };

    updateBallTargetY();
    window.addEventListener('resize', updateBallTargetY);
    ScrollTrigger.addEventListener('refresh', updateBallTargetY);

    const trigger = ScrollTrigger.create({
      trigger: sectionEl,
      start: 'top top',
      end: '+=420%',
      scrub: true,
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        const aboutRevealProgress = gsap.utils.clamp(0, 1, progress / 0.34);
        const titleProgress = gsap.utils.clamp(0, 1, aboutRevealProgress / 0.5);
        const descProgress = gsap.utils.clamp(0, 1, (aboutRevealProgress - 0.2) / 0.8);
        const aboutFadeProgress = gsap.utils.clamp(0, 1, (progress - 0.36) / 0.12);
        const backgroundProgress = gsap.utils.clamp(0, 1, (progress - 0.34) / 0.18);
        const ballAlignProgress = gsap.utils.clamp(0, 1, (progress - 0.6) / 0.22);

        const servicesVisibility = progress >= 0.58 ? 1 : 0;
        const servicesProgress = gsap.utils.clamp(0, 1, (progress - 0.66) / 0.34);
        const servicesCardsProgress = gsap.utils.clamp(0, 1, (servicesProgress - 0.34) / 0.56);

        const colorChannel = Math.round((1 - backgroundProgress) * 255);
        const ballScale = 0.08 + 0.92 * aboutRevealProgress;

        revealWordsByProgress(titleWordEls, titleProgress);
        revealWordsByProgress(descWordEls, descProgress);
        gsap.set(aboutContentEl, {
          opacity: 1 - aboutFadeProgress,
          pointerEvents: aboutFadeProgress > 0.95 ? 'none' : 'auto',
        });

        gsap.set(sectionEl, { backgroundColor: `rgb(${colorChannel}, ${colorChannel}, ${colorChannel})` });
        gsap.set(ballEl, {
          scale: ballScale,
          y: ballTargetY * ballAlignProgress,
        });

        gsap.set(servicesContentEl, {
          opacity: servicesVisibility,
          pointerEvents: servicesVisibility > 0.95 ? 'auto' : 'none',
        });
        revealCardsByProgress(serviceCardEls, servicesCardsProgress);
      },
    });

    return () => {
      window.removeEventListener('resize', updateBallTargetY);
      ScrollTrigger.removeEventListener('refresh', updateBallTargetY);
      trigger.kill();
      gsap.set(aboutWords, { clearProps: 'opacity' });
      gsap.set(aboutContentEl, { clearProps: 'opacity,pointerEvents' });
      gsap.set(sectionEl, { clearProps: 'backgroundColor' });
      gsap.set(ballEl, { clearProps: 'transform' });
      gsap.set(servicesContentEl, { clearProps: 'opacity,pointerEvents' });
      gsap.set(serviceCardEls, { clearProps: 'opacity,transform' });
    };
  }, [lang]);

  return (
    <section id="about" ref={sectionRef} className="bg-white text-black h-screen relative z-20 overflow-hidden flex items-center">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
        <div ref={ballRef} className="relative h-[clamp(130px,19vw,320px)] w-[clamp(130px,19vw,320px)] will-change-transform">
          <PerlinBlob className="h-full w-full" />
        </div>
      </div>

      <div ref={aboutContentRef} className="container-main w-full relative z-20">
        <div className="flex flex-col gap-8 sm:gap-12">
          <div>
            <span className="text-primary font-medium tracking-wide text-[16px]">{t('about.label')}</span>
          </div>

          <div dir="ltr" className="about-text-split grid grid-cols-1 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-10 lg:gap-16 items-start">
            <div className="max-w-4xl">
              <h2
                ref={titleRef}
                dir={isRTL ? 'rtl' : 'ltr'}
                className="about-text-side about-text-left text-[30px] md:text-[36px] font-semibold leading-[1.08] tracking-[-0.02em]"
              >
                {titleWords.map((word, index) => (
                  <span key={`about-title-${lang}-${index}`} data-about-word="title" className="inline-block will-change-[opacity]">
                    {word}
                    {index < titleWords.length - 1 ? '\u00A0' : ''}
                  </span>
                ))}
              </h2>
            </div>

            <div className="max-w-xl lg:justify-self-end pt-1 sm:pt-2">
              <p
                ref={descRef}
                dir={isRTL ? 'rtl' : 'ltr'}
                className="about-text-side about-text-right text-black/75 text-[16px] leading-[1.45] font-normal"
              >
                {descWords.map((word, index) => (
                  <span key={`about-desc-${lang}-${index}`} data-about-word="desc" className="inline-block will-change-[opacity]">
                    {word}
                    {index < descWords.length - 1 ? '\u00A0' : ''}
                  </span>
                ))}
              </p>
            </div>
          </div>

          <div>
            <a href="#services" className="inline-flex items-center gap-2 text-[16px] font-medium hover:text-primary transition-colors">
              {t('about.link')} <ChevronRight size={18} className={isRTL ? 'rotate-180' : ''} />
            </a>
          </div>
        </div>
      </div>

      <div id="services" ref={servicesContentRef} className="absolute inset-0 z-40 flex items-center">
        <div className="container-main w-full">
          <div className="flex flex-col items-center text-center gap-3 mb-8 sm:mb-10">
            <span className="text-primary font-medium tracking-wide text-[16px]">{t('services.label')}</span>
            <h2 className="text-white text-[30px] md:text-[36px] font-semibold leading-[1.08] tracking-[-0.02em] max-w-4xl">{servicesTitle}</h2>
            <p className="max-w-4xl text-white/75 text-[14px] sm:text-[16px] leading-[1.45]">{servicesDesc}</p>
          </div>

          <div ref={servicesCardsRef} className="grid md:grid-cols-2 gap-3 sm:gap-4 lg:gap-5 relative max-w-[1160px] mx-auto">
            {services.map((service, index) => (
              <article
                key={service.num}
                data-service-card
                className="group relative z-10 overflow-hidden rounded-xl border border-white/10 h-[210px] sm:h-[255px] lg:h-[300px] px-5 sm:px-6 py-5 sm:py-6 flex flex-col bg-[linear-gradient(135deg,rgba(5,18,34,0.86)_0%,rgba(10,36,62,0.62)_65%,rgba(17,60,96,0.46)_100%)] backdrop-blur-[2px] transition-all duration-300 hover:border-white/20"
              >
                <div
                  className={`absolute inset-y-0 w-[43%] min-w-[170px] flex items-center justify-center opacity-95 group-hover:scale-[1.02] transition-all duration-300 pointer-events-none ${isRTL ? 'left-[1%]' : 'right-[1%]'}`}
                >
                  <img src={serviceImages[index]} alt={t(service.titleKey)} className="w-full h-[78%] object-contain" loading="lazy" />
                </div>

                <div className="relative z-10">
                  <span className="text-[34px] sm:text-[40px] font-medium leading-none text-white/95 tracking-tight">{service.num}</span>
                </div>

                <div className={`relative z-10 mt-auto ${isRTL ? 'text-right pl-[44%]' : 'text-left pr-[44%]'}`}>
                  <h3 className="text-[24px] sm:text-[30px] leading-[0.98] font-semibold mb-2 tracking-[-0.02em] text-white">
                    {t(service.titleKey)}
                  </h3>
                  <p className="max-w-[34ch] text-white/85 text-[14px] sm:text-[15px] leading-[1.28] line-clamp-3">
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
