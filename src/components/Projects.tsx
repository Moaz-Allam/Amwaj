import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';
import project4 from '@/assets/project-4.jpg';

gsap.registerPlugin(ScrollTrigger);

type ProjectCard = {
  id: string;
  color: string;
  index: string;
  titleKey: string;
  descKey: string;
  tagKey: string;
  gallery: string[];
  quote: {
    en: string;
    ar: string;
  };
  person: {
    en: string;
    ar: string;
  };
  role: {
    en: string;
    ar: string;
  };
  avatar: {
    en: string;
    ar: string;
  };
};

const cardsData: ProjectCard[] = [
  {
    id: 'card-1',
    color: '#3d2fa9',
    index: '01',
    titleKey: 'projects.card.1.title',
    descKey: 'projects.card.1.desc',
    tagKey: 'projects.card.1.tag.1',
    gallery: [project1, project2, project3, project4],
    quote: {
      en: 'Working with Amwaj has been an absolute pleasure. Their team is generous, detail-focused, and deeply collaborative.',
      ar: 'العمل مع أمواج كان تجربة ممتازة؛ فريق متعاون، كريم في الدعم، ودقيق جدًا في التفاصيل.',
    },
    person: { en: 'Noura Alotaibi', ar: 'نورة العتيبي' },
    role: { en: 'Marketing Director', ar: 'مديرة التسويق' },
    avatar: { en: 'NA', ar: 'نع' },
  },
  {
    id: 'card-2',
    color: '#ff7722',
    index: '02',
    titleKey: 'projects.card.2.title',
    descKey: 'projects.card.2.desc',
    tagKey: 'projects.card.2.tag.1',
    gallery: [project2, project3, project4, project1],
    quote: {
      en: 'The process was clear from day one. Every deliverable was tied to measurable growth goals and real business outcomes.',
      ar: 'المنهجية كانت واضحة منذ البداية، وكل مخرج كان مرتبطًا بأهداف نمو قابلة للقياس ونتائج حقيقية.',
    },
    person: { en: 'Fahad Almalki', ar: 'فهد المالكي' },
    role: { en: 'Founder', ar: 'المؤسس' },
    avatar: { en: 'FA', ar: 'فم' },
  },
  {
    id: 'card-3',
    color: '#ff3d33',
    index: '03',
    titleKey: 'projects.card.3.title',
    descKey: 'projects.card.3.desc',
    tagKey: 'projects.card.3.tag.1',
    gallery: [project3, project4, project1, project2],
    quote: {
      en: 'Execution moved fast without sacrificing quality. Creative and technical teams worked as one synchronized unit.',
      ar: 'التنفيذ كان سريعًا دون المساس بالجودة، وتكامل الفريق الإبداعي والتقني بشكل متناغم.',
    },
    person: { en: 'Rayan Alshehri', ar: 'ريان الشهري' },
    role: { en: 'Brand Lead', ar: 'قائد العلامة' },
    avatar: { en: 'RA', ar: 'رش' },
  },
  {
    id: 'card-4',
    color: '#785f47',
    index: '04',
    titleKey: 'projects.card.4.title',
    descKey: 'projects.card.4.desc',
    tagKey: 'projects.card.4.tag.1',
    gallery: [project4, project1, project2, project3],
    quote: {
      en: 'Reporting was consistently transparent and useful. We always knew what to improve next and why it mattered.',
      ar: 'التقارير كانت شفافة ومفيدة باستمرار، وكنا نعرف دائمًا ما الذي يجب تحسينه ولماذا.',
    },
    person: { en: 'Maha Alharbi', ar: 'مها الحربي' },
    role: { en: 'Growth Manager', ar: 'مديرة النمو' },
    avatar: { en: 'MA', ar: 'مح' },
  },
];

const Projects = () => {
  const { t, lang, isRTL } = useLanguage();
  const stickyRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const stickyEl = stickyRef.current;
    if (!stickyEl) return;

    const cards = Array.from(stickyEl.querySelectorAll<HTMLElement>('[data-project-card]'));
    if (!cards.length) return;

    const totalCards = cards.length;
    const segmentSize = 1 / totalCards;
    const cardYOffset = 5;
    const cardScaleStep = 0.075;

    cards.forEach((card, index) => {
      gsap.set(card, {
        xPercent: -50,
        yPercent: -50 + index * cardYOffset,
        scale: 1 - index * cardScaleStep,
      });
    });

    const trigger = ScrollTrigger.create({
      trigger: stickyEl,
      start: 'top top',
      end: () => `+=${window.innerHeight * 8}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const activeIndex = Math.min(Math.floor(progress / segmentSize), totalCards - 1);
        const segProgress = (progress - activeIndex * segmentSize) / segmentSize;

        cards.forEach((card, index) => {
          if (index < activeIndex) {
            gsap.set(card, { yPercent: -250, rotationX: 35 });
          } else if (index === activeIndex) {
            gsap.set(card, {
              yPercent: gsap.utils.interpolate(-50, -200, segProgress),
              rotationX: gsap.utils.interpolate(0, 35, segProgress),
              scale: 1,
            });
          } else {
            const behindIndex = index - activeIndex;
            const currentYOffset = (behindIndex - segProgress) * cardYOffset;
            const currentScale = 1 - (behindIndex - segProgress) * cardScaleStep;

            gsap.set(card, {
              yPercent: -50 + currentYOffset,
              rotationX: 0,
              scale: currentScale,
            });
          }
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [lang]);

  return (
    <section id="projects" className="relative z-20 bg-black pt-14 sm:pt-20 pb-20 sm:pb-24">
      <div className="container-main mb-10 sm:mb-14">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 sm:gap-6">
          <div>
            <span className="text-primary font-medium tracking-wide text-[16px]">{t('projects.label')}</span>
            <h2 className="mt-4 text-[30px] md:text-[36px] font-semibold leading-[1.08] tracking-[-0.02em] text-foreground">
              {t('projects.title')}
            </h2>
          </div>

          <p className={`text-white/78 text-[16px] leading-[1.45] max-w-[470px] ${isRTL ? 'md:text-left' : 'md:text-right'}`}>
            {t('projects.desc')}
          </p>
        </div>
      </div>

      <div className="container-main">
        <section ref={stickyRef} className="relative w-full h-[100svh] overflow-hidden bg-black [perspective:850px]">
          {cardsData.map((card, index) => (
            <article
              key={card.id}
              id={card.id}
              data-project-card
              className="absolute top-1/2 left-1/2 w-full h-[88%] rounded-2xl border border-white/15 text-white [transform-origin:center_bottom] will-change-transform overflow-hidden"
              style={{ backgroundColor: card.color, zIndex: cardsData.length + 1 - index }}
            >
              <div className="relative z-10 h-full flex flex-col px-4 sm:px-8 lg:px-10 pt-4 sm:pt-6 pb-4 sm:pb-6">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 items-start">
                  <div className="max-w-[980px]">
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-xl bg-white text-black px-3 sm:px-4 py-2 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.08em] hover:bg-white/90 transition-colors"
                    >
                      {t('projects.link')}
                      <span className={isRTL ? 'rotate-180' : ''}>{'->'}</span>
                    </a>

                    <h3 className="mt-4 text-white text-[clamp(2.1rem,6vw,5.7rem)] font-semibold leading-[0.93] tracking-[-0.025em]">
                      {t(card.titleKey)}
                    </h3>

                    <p className="mt-4 max-w-[940px] text-white/76 text-[16px] sm:text-[20px] lg:text-[32px] leading-[1.2]">
                      {t(card.descKey)}
                    </p>
                  </div>

                  <span className="text-white/45 text-[30px] sm:text-[48px] lg:text-[54px] leading-none tracking-tight font-medium">
                    ({card.index})
                  </span>
                </div>

                <div className="mt-auto grid grid-cols-1 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.3fr)] gap-6 lg:gap-8 items-end">
                  <div className="max-w-[450px]">
                    <p className="text-white text-[20px] sm:text-[28px] leading-[1.1] font-semibold tracking-[-0.01em]">
                      {card.quote[lang]}
                    </p>

                    <div className="mt-5 flex items-center gap-3">
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-white/40 bg-white/18 flex items-center justify-center text-white text-[11px] sm:text-[13px] font-bold tracking-wide">
                        {card.avatar[lang]}
                      </div>

                      <div>
                        <p className="text-white text-[17px] sm:text-[20px] font-semibold leading-none">{card.person[lang]}</p>
                        <p className="text-white/70 text-[12px] sm:text-[14px] mt-1">{card.role[lang]}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    {card.gallery.map((image, imageIndex) => (
                      <div key={`${card.id}-gallery-${imageIndex}`} className="relative h-[120px] sm:h-[170px] rounded-2xl overflow-hidden border border-white/20 bg-black/20">
                        <img src={image} alt={t(card.tagKey)} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </section>
  );
};

export default Projects;
