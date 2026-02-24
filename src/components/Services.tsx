import { useEffect, useRef } from 'react';
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

const Services = () => {
  const { t, isRTL, lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const headingEl = headingRef.current;
    const cardsEl = cardsRef.current;
    const linkEl = linkRef.current;
    const glowEl = glowRef.current;

    if (!sectionEl || !headingEl || !cardsEl || !linkEl || !glowEl) return;

    const cardEls = Array.from(cardsEl.querySelectorAll<HTMLElement>('[data-service-card]'));
    if (!cardEls.length) return;

    gsap.set(headingEl, { opacity: 0, y: 30 });
    gsap.set(linkEl, { opacity: 0, y: 26 });
    gsap.set(cardEls, { opacity: 0, y: 72, scale: 0.94 });
    gsap.set(glowEl, { opacity: 0.74, scale: 0.9, transformOrigin: '50% 50%' });

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top top',
          end: '+=260%',
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(headingEl, { opacity: 1, y: 0, duration: 0.34, ease: 'none' }, 0.04);
      tl.to(glowEl, { opacity: 1, scale: 1, duration: 0.9, ease: 'none' }, 0.02);

      cardEls.forEach((cardEl, index) => {
        tl.to(cardEl, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'none' }, 0.3 + index * 0.2);
      });

      tl.to(linkEl, { opacity: 1, y: 0, duration: 0.24, ease: 'none' }, 1.2);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    mm.add('(max-width: 1023px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top 80%',
          end: 'bottom 55%',
          scrub: true,
        },
      });

      tl.to(headingEl, { opacity: 1, y: 0, duration: 0.35, ease: 'none' }, 0);
      tl.to(glowEl, { opacity: 1, scale: 1, duration: 0.55, ease: 'none' }, 0.02);
      tl.to(cardEls, { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.2, ease: 'none' }, 0.16);
      tl.to(linkEl, { opacity: 1, y: 0, duration: 0.25, ease: 'none' }, 0.94);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    return () => {
      mm.revert();
      gsap.set([headingEl, linkEl, glowEl, ...cardEls], { clearProps: 'opacity,transform' });
    };
  }, [lang]);

  return (
    <section id="services" ref={sectionRef} className="bg-black text-white min-h-screen py-14 sm:py-16 relative z-20 overflow-hidden flex items-center">
      <div className="container-main w-full relative z-10">
        <div ref={headingRef} className="flex flex-col items-center text-center gap-4 mb-10 sm:mb-14 lg:mb-16">
          <span className="text-primary font-medium tracking-wide text-[16px]">{t('services.label')}</span>
          <h2 className="text-[30px] md:text-[36px] font-semibold leading-[1.08] tracking-[-0.02em] max-w-4xl">
            {t('services.title')}
          </h2>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 gap-4 md:gap-5 lg:gap-6 relative max-w-[1160px] mx-auto">
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
            <div ref={glowRef} className="relative w-[86vw] h-[86vw] min-w-[520px] min-h-[520px] max-w-[980px] max-h-[980px]">
              <div className="absolute left-1/2 top-1/2 h-[clamp(84px,14vw,250px)] w-[clamp(84px,14vw,250px)] -translate-x-1/2 -translate-y-1/2">
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
                <div className="absolute left-[22%] top-[18%] h-[24%] w-[24%] rounded-full bg-white/35 blur-sm" />
              </div>

              <div
                className="absolute inset-[8%] rounded-full blur-[74px] opacity-85 mix-blend-screen"
                style={{
                  background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.74) 0%, hsl(var(--primary) / 0.22) 58%, transparent 86%)',
                }}
              />
              <div
                className="absolute inset-[22%] rounded-full blur-[58px] opacity-96 mix-blend-screen"
                style={{
                  background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.84) 0%, hsl(var(--primary) / 0.3) 58%, transparent 88%)',
                }}
              />
              <div
                className="absolute inset-[18%] blur-[92px] animate-[pulse_4.4s_ease-in-out_infinite] opacity-100 mix-blend-screen"
                style={{
                  background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.88) 0%, hsl(var(--primary) / 0.34) 58%, transparent 86%)',
                }}
              />
              <div
                className="absolute inset-[35%] blur-[62px] animate-[pulse_4.4s_ease-in-out_infinite] opacity-88 mix-blend-screen"
                style={{
                  background: 'radial-gradient(circle at center, hsl(194 100% 88% / 0.9) 0%, hsl(var(--primary) / 0.34) 58%, transparent 88%)',
                }}
              />
            </div>
          </div>

          {services.map((service, i) => (
            <article
              key={service.num}
              data-service-card
              className="group relative z-20 overflow-hidden rounded-xl border border-white/10 h-[248px] sm:h-[276px] lg:h-[300px] px-4 sm:px-6 py-5 sm:py-6 flex flex-col justify-between bg-[linear-gradient(135deg,rgba(5,18,34,0.86)_0%,rgba(10,36,62,0.62)_65%,rgba(17,60,96,0.46)_100%)] backdrop-blur-[2px] transition-all duration-300 hover:border-white/20"
            >
              <div className={`absolute top-1/2 -translate-y-1/2 w-[58%] h-[70%] min-w-[184px] opacity-95 group-hover:scale-[1.03] transition-all duration-300 ${isRTL ? 'left-[-11%]' : 'right-[-11%]'}`}>
                <img
                  src={serviceImages[i]}
                  alt={t(service.titleKey)}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>

              <div className="flex justify-between items-start w-full relative z-10">
                <span className="text-[32px] sm:text-[34px] font-medium text-white/95 tracking-tight">{service.num}</span>
              </div>

              <div className="relative z-10 mt-auto max-w-[74%] sm:max-w-[60%]">
                <h3 className="text-[32px] sm:text-[40px] leading-[0.98] font-semibold mb-3 tracking-[-0.02em] text-white">{t(service.titleKey)}</h3>
                <p className="text-white/85 text-[16px] leading-[1.25] line-clamp-3">{t(service.descKey)}</p>
              </div>
            </article>
          ))}
        </div>

        <div ref={linkRef} className="mt-10 sm:mt-14 text-center">
          <a href="#" className="inline-flex items-center gap-2 text-[16px] font-medium hover:text-primary transition-colors">
            {t('services.link')} <ChevronRight size={18} className={isRTL ? 'rotate-180' : ''} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
