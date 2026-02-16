import { useLanguage } from '@/contexts/LanguageContext';
import { useGsapReveal } from '@/hooks/useGsapReveal';
import { ChevronRight } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();
  const ref = useGsapReveal<HTMLElement>();

  return (
    <section id="about" ref={ref} className="bg-transparent text-white pt-20 sm:pt-24 pb-6 sm:pb-10 relative z-20 overflow-visible">
      <div className="container-main relative z-20">
        <div className="flex flex-col gap-8 sm:gap-12" data-gsap="reveal">
          <div>
            <span className="text-primary font-medium tracking-wide text-[16px]">
              {t('about.label')}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-10 lg:gap-16 items-start">
            <div className="max-w-4xl">
              <h2 className="text-[30px] md:text-[36px] font-semibold leading-[1.08] tracking-[-0.02em]">
                {t('about.title')}
              </h2>
            </div>

            <div className="max-w-xl lg:justify-self-end pt-1 sm:pt-2">
              <p className="text-white/85 text-[16px] leading-[1.45] font-normal">
                {t('about.desc')}
              </p>
            </div>
          </div>

          <div>
            <a
              href="#studio"
              className="inline-flex items-center gap-2 text-[16px] font-medium hover:text-primary transition-colors"
            >
              {t('about.link')} <ChevronRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
