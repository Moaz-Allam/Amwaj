import { useEffect, useMemo, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGsapReveal } from '@/hooks/useGsapReveal';
import { ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

const About = () => {
  const { t, isRTL, lang } = useLanguage();
  const ref = useGsapReveal<HTMLElement>();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  const aboutTitle = t('about.title');
  const aboutDesc = t('about.desc');

  const titleWords = useMemo(() => aboutTitle.trim().split(/\s+/), [aboutTitle]);
  const descWords = useMemo(() => aboutDesc.trim().split(/\s+/), [aboutDesc]);

  useEffect(() => {
    const sectionEl = ref.current;
    const titleEl = titleRef.current;
    const descEl = descRef.current;

    if (!sectionEl || !titleEl || !descEl) return;

    const titleWordEls = Array.from(titleEl.querySelectorAll<HTMLElement>('[data-about-word="title"]'));
    const descWordEls = Array.from(descEl.querySelectorAll<HTMLElement>('[data-about-word="desc"]'));
    const allWords = [...titleWordEls, ...descWordEls];

    if (!allWords.length) return;

    gsap.set(allWords, { opacity: 0.08 });

    const titleTrigger = ScrollTrigger.create({
      trigger: sectionEl,
      start: 'top 82%',
      end: 'top 38%',
      scrub: true,
      onUpdate: (self) => revealWordsByProgress(titleWordEls, self.progress),
    });

    const descTrigger = ScrollTrigger.create({
      trigger: sectionEl,
      start: 'top 70%',
      end: 'bottom 45%',
      scrub: true,
      onUpdate: (self) => revealWordsByProgress(descWordEls, self.progress),
    });

    return () => {
      titleTrigger.kill();
      descTrigger.kill();
    };
  }, [lang, ref]);

  return (
    <section id="about" ref={ref} className="bg-white text-black h-screen pt-20 sm:pt-24 pb-6 sm:pb-10 relative z-20 overflow-visible">
      <div className="container-main relative z-20">
        <div className="flex flex-col gap-8 sm:gap-12" data-gsap="reveal">
          <div>
            <span className="text-primary font-medium tracking-wide text-[16px]">
              {t('about.label')}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-10 lg:gap-16 items-start">
            <div className="max-w-4xl">
              <h2 ref={titleRef} className="text-[30px] md:text-[36px] font-semibold leading-[1.08] tracking-[-0.02em]">
                {titleWords.map((word, index) => (
                  <span
                    key={`about-title-${lang}-${index}`}
                    data-about-word="title"
                    className="inline-block will-change-[opacity]"
                  >
                    {word}
                    {index < titleWords.length - 1 ? '\u00A0' : ''}
                  </span>
                ))}
              </h2>
            </div>

            <div className="max-w-xl lg:justify-self-end pt-1 sm:pt-2">
              <p ref={descRef} className="text-black/75 text-[16px] leading-[1.45] font-normal">
                {descWords.map((word, index) => (
                  <span
                    key={`about-desc-${lang}-${index}`}
                    data-about-word="desc"
                    className="inline-block will-change-[opacity]"
                  >
                    {word}
                    {index < descWords.length - 1 ? '\u00A0' : ''}
                  </span>
                ))}
              </p>
            </div>
          </div>

          <div>
            <a
              href="#studio"
              className="inline-flex items-center gap-2 text-[16px] font-medium hover:text-primary transition-colors"
            >
              {t('about.link')} <ChevronRight size={18} className={isRTL ? 'rotate-180' : ''} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
