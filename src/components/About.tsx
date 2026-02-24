import { useEffect, useMemo, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import serviceOneImage from '@/assets/service-one.png';
import serviceTwoImage from '@/assets/service-two.png';
import serviceThreeImage from '@/assets/service-three.png';
import serviceFourImage from '@/assets/service-four.png';

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
      y: 72 * (1 - localProgress),
      scale: 0.94 + localProgress * 0.06,
    });
  });
};

const About = () => {
  const { t, isRTL, lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const servicesTitleRef = useRef<HTMLHeadingElement>(null);
  const servicesDescRef = useRef<HTMLParagraphElement>(null);
  const aboutContentRef = useRef<HTMLDivElement>(null);
  const servicesContentRef = useRef<HTMLDivElement>(null);
  const servicesHeadingRef = useRef<HTMLDivElement>(null);
  const servicesCardsRef = useRef<HTMLDivElement>(null);
  const servicesLinkRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const lightPointRef = useRef<HTMLDivElement>(null);

  const aboutTitle = t('about.title');
  const aboutDesc = t('about.desc');
  const servicesTitle = t('services.title');
  const servicesDesc = t('services.desc');

  const titleWords = useMemo(() => aboutTitle.trim().split(/\s+/), [aboutTitle]);
  const descWords = useMemo(() => aboutDesc.trim().split(/\s+/), [aboutDesc]);
  const servicesTitleWords = useMemo(() => servicesTitle.trim().split(/\s+/), [servicesTitle]);
  const servicesDescWords = useMemo(() => servicesDesc.trim().split(/\s+/), [servicesDesc]);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const titleEl = titleRef.current;
    const descEl = descRef.current;
    const servicesTitleEl = servicesTitleRef.current;
    const servicesDescEl = servicesDescRef.current;
    const aboutContentEl = aboutContentRef.current;
    const servicesContentEl = servicesContentRef.current;
    const servicesHeadingEl = servicesHeadingRef.current;
    const servicesCardsEl = servicesCardsRef.current;
    const servicesLinkEl = servicesLinkRef.current;
    const ballEl = ballRef.current;
    const lightPointEl = lightPointRef.current;

    if (!sectionEl || !titleEl || !descEl || !servicesTitleEl || !servicesDescEl || !aboutContentEl || !servicesContentEl || !servicesHeadingEl || !servicesCardsEl || !servicesLinkEl || !ballEl || !lightPointEl) return;

    const titleWordEls = Array.from(titleEl.querySelectorAll<HTMLElement>('[data-about-word="title"]'));
    const descWordEls = Array.from(descEl.querySelectorAll<HTMLElement>('[data-about-word="desc"]'));
    const aboutWords = [...titleWordEls, ...descWordEls];
    const servicesTitleWordEls = Array.from(servicesTitleEl.querySelectorAll<HTMLElement>('[data-service-word="title"]'));
    const servicesDescWordEls = Array.from(servicesDescEl.querySelectorAll<HTMLElement>('[data-service-word="desc"]'));
    const servicesWords = [...servicesTitleWordEls, ...servicesDescWordEls];
    const serviceCardEls = Array.from(servicesCardsEl.querySelectorAll<HTMLElement>('[data-service-card]'));

    if (!aboutWords.length || !servicesWords.length || !serviceCardEls.length) return;

    gsap.set(aboutWords, { opacity: 0.08 });
    gsap.set(aboutContentEl, { opacity: 1, pointerEvents: 'auto' });
    gsap.set(sectionEl, { backgroundColor: '#ffffff' });
    gsap.set(ballEl, { scale: 0.08, transformOrigin: '50% 50%' });
    gsap.set(lightPointEl, { opacity: 0.35, scale: 0.75, transformOrigin: '50% 50%' });

    gsap.set(servicesContentEl, { opacity: 0, pointerEvents: 'none' });
    gsap.set(servicesHeadingEl, { opacity: 0, y: 22 });
    gsap.set(servicesWords, { opacity: 0.08 });
    gsap.set(servicesLinkEl, { opacity: 0, y: 24 });
    gsap.set(serviceCardEls, { opacity: 0, y: 72, scale: 0.94, transformOrigin: '50% 50%' });

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
        const backgroundProgress = gsap.utils.clamp(0, 1, (progress - 0.46) / 0.14);
        const lightPointProgress = gsap.utils.clamp(0, 1, (progress - 0.44) / 0.26);

        const servicesVisibility = gsap.utils.clamp(0, 1, (progress - 0.56) / 0.08);
        const servicesProgress = gsap.utils.clamp(0, 1, (progress - 0.64) / 0.36);
        const servicesTitleProgress = gsap.utils.clamp(0, 1, servicesProgress / 0.38);
        const servicesDescProgress = gsap.utils.clamp(0, 1, (servicesProgress - 0.24) / 0.4);
        const servicesCardsProgress = gsap.utils.clamp(0, 1, (servicesProgress - 0.34) / 0.56);
        const servicesLinkProgress = gsap.utils.clamp(0, 1, (servicesProgress - 0.9) / 0.1);

        const colorChannel = Math.round((1 - backgroundProgress) * 255);

        revealWordsByProgress(titleWordEls, titleProgress);
        revealWordsByProgress(descWordEls, descProgress);
        gsap.set(aboutContentEl, {
          opacity: 1 - aboutFadeProgress,
          pointerEvents: aboutFadeProgress > 0.95 ? 'none' : 'auto',
        });

        gsap.set(sectionEl, { backgroundColor: `rgb(${colorChannel}, ${colorChannel}, ${colorChannel})` });
        gsap.set(ballEl, { scale: 0.08 + 0.92 * aboutRevealProgress });
        gsap.set(lightPointEl, {
          opacity: 0.35 + 0.65 * lightPointProgress,
          scale: 0.75 + 0.32 * lightPointProgress,
        });

        gsap.set(servicesContentEl, {
          opacity: servicesVisibility,
          pointerEvents: servicesVisibility > 0.95 ? 'auto' : 'none',
        });
        gsap.set(servicesHeadingEl, {
          opacity: servicesVisibility,
          y: 22 * (1 - servicesVisibility),
        });
        revealWordsByProgress(servicesTitleWordEls, servicesTitleProgress);
        revealWordsByProgress(servicesDescWordEls, servicesDescProgress);
        revealCardsByProgress(serviceCardEls, servicesCardsProgress);
        gsap.set(servicesLinkEl, {
          opacity: servicesLinkProgress,
          y: 24 * (1 - servicesLinkProgress),
        });
      },
    });

    return () => {
      trigger.kill();
      gsap.set(aboutWords, { clearProps: 'opacity' });
      gsap.set(aboutContentEl, { clearProps: 'opacity,pointerEvents' });
      gsap.set(sectionEl, { clearProps: 'backgroundColor' });
      gsap.set(ballEl, { clearProps: 'transform' });
      gsap.set(lightPointEl, { clearProps: 'opacity,transform' });
      gsap.set(servicesContentEl, { clearProps: 'opacity,pointerEvents' });
      gsap.set(servicesHeadingEl, { clearProps: 'opacity,transform' });
      gsap.set(servicesWords, { clearProps: 'opacity' });
      gsap.set(servicesLinkEl, { clearProps: 'opacity,transform' });
      gsap.set(serviceCardEls, { clearProps: 'opacity,transform' });
    };
  }, [lang]);

  return (
    <section id="about" ref={sectionRef} className="bg-white text-black h-screen relative z-20 overflow-hidden flex items-center">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
        <div ref={ballRef} className="relative h-[clamp(84px,14vw,250px)] w-[clamp(84px,14vw,250px)] will-change-transform">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(circle at 30% 30%, hsl(var(--primary) / 0.98) 0%, hsl(var(--primary) / 0.82) 36%, hsl(var(--secondary) / 0.82) 70%, hsl(var(--secondary) / 0.56) 100%)',
            }}
          />
          <div
            className="absolute -inset-[30%] rounded-full blur-[68px]"
            style={{
              background:
                'radial-gradient(circle at center, hsl(var(--primary) / 0.42) 0%, hsl(var(--secondary) / 0.24) 58%, transparent 82%)',
            }}
          />
          <div
            className="absolute left-[34%] top-[19%] h-[18%] w-[18%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[16px]"
            style={{ background: 'radial-gradient(circle at center, hsl(199 100% 83% / 0.78) 0%, transparent 78%)' }}
          />
          <div
            ref={lightPointRef}
            className="absolute left-[34%] top-[19%] h-[11%] w-[11%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(197_100%_89%)] shadow-[0_0_0_6px_hsl(199_100%_82%_/_0.22),0_0_32px_hsl(199_100%_72%_/_0.88)] will-change-transform"
          />
          <div className="absolute left-[22%] top-[18%] h-[24%] w-[24%] rounded-full bg-white/35 blur-sm" />
        </div>
      </div>

      <div ref={aboutContentRef} className="container-main w-full relative z-20">
        <div className="flex flex-col gap-8 sm:gap-12">
          <div>
            <span className="text-primary font-medium tracking-wide text-[16px]">{t('about.label')}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-10 lg:gap-16 items-start">
            <div className="max-w-4xl">
              <h2 ref={titleRef} className="text-[30px] md:text-[36px] font-semibold leading-[1.08] tracking-[-0.02em]">
                {titleWords.map((word, index) => (
                  <span key={`about-title-${lang}-${index}`} data-about-word="title" className="inline-block will-change-[opacity]">
                    {word}
                    {index < titleWords.length - 1 ? '\u00A0' : ''}
                  </span>
                ))}
              </h2>
            </div>

            <div className="max-w-xl lg:justify-self-end pt-1 sm:pt-2">
              <p ref={descRef} className="text-black/75 text-[16px] leading-[1.45] font-normal">
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
          <div ref={servicesHeadingRef} className="flex flex-col items-center text-center gap-3 mb-8 sm:mb-10">
            <span className="text-primary font-medium tracking-wide text-[16px]">{t('services.label')}</span>
            <h2 ref={servicesTitleRef} className="text-white text-[30px] md:text-[36px] font-semibold leading-[1.08] tracking-[-0.02em] max-w-4xl">
              {servicesTitleWords.map((word, index) => (
                <span key={`services-title-${lang}-${index}`} data-service-word="title" className="inline-block will-change-[opacity]">
                  {word}
                  {index < servicesTitleWords.length - 1 ? '\u00A0' : ''}
                </span>
              ))}
            </h2>
            <p ref={servicesDescRef} className="max-w-4xl text-white/75 text-[14px] sm:text-[16px] leading-[1.45]">
              {servicesDescWords.map((word, index) => (
                <span key={`services-desc-${lang}-${index}`} data-service-word="desc" className="inline-block will-change-[opacity]">
                  {word}
                  {index < servicesDescWords.length - 1 ? '\u00A0' : ''}
                </span>
              ))}
            </p>
          </div>

          <div ref={servicesCardsRef} className="grid md:grid-cols-2 gap-3 sm:gap-4 lg:gap-5 relative max-w-[1160px] mx-auto">
            {services.map((service, index) => (
              <article
                key={service.num}
                data-service-card
                className="group relative z-10 overflow-hidden rounded-xl border border-white/10 h-[184px] sm:h-[210px] lg:h-[230px] px-4 sm:px-5 py-4 sm:py-5 flex flex-col justify-between bg-[linear-gradient(135deg,rgba(5,18,34,0.86)_0%,rgba(10,36,62,0.62)_65%,rgba(17,60,96,0.46)_100%)] backdrop-blur-[2px] transition-all duration-300 hover:border-white/20"
              >
                <div className={`absolute top-1/2 -translate-y-1/2 w-[58%] h-[70%] min-w-[150px] opacity-95 group-hover:scale-[1.03] transition-all duration-300 ${isRTL ? 'left-[-11%]' : 'right-[-11%]'}`}>
                  <img src={serviceImages[index]} alt={t(service.titleKey)} className="w-full h-full object-contain" loading="lazy" />
                </div>

                <div className="flex justify-between items-start w-full relative z-10">
                  <span className="text-[26px] sm:text-[30px] font-medium text-white/95 tracking-tight">{service.num}</span>
                </div>

                <div className="relative z-10 mt-auto max-w-[74%] sm:max-w-[64%]">
                  <h3 className="text-[24px] sm:text-[30px] leading-[0.98] font-semibold mb-2 tracking-[-0.02em] text-white">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-white/85 text-[14px] sm:text-[15px] leading-[1.25] line-clamp-2 sm:line-clamp-3">
                    {t(service.descKey)}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div ref={servicesLinkRef} className="mt-8 sm:mt-10 text-center">
            <a href="#" className="inline-flex items-center gap-2 text-[16px] font-medium text-white hover:text-primary transition-colors">
              {t('services.link')} <ChevronRight size={18} className={isRTL ? 'rotate-180' : ''} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
