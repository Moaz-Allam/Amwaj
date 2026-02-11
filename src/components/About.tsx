import { useLanguage } from '@/contexts/LanguageContext';
import { useGsapReveal } from '@/hooks/useGsapReveal';
import { ChevronRight } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();
  const ref = useGsapReveal<HTMLElement>();

  return (
    <section ref={ref} className="bg-black text-white py-24 sm:py-32 relative z-10 overflow-hidden">
      <div className="container-main relative z-20">
        <div className="flex flex-col gap-12" data-gsap="reveal">

          {/* Container 1: Section Name */}
          <div>
            <span className="text-[#3b82f6] font-medium tracking-wide uppercase text-[20px]">
              {t('about.label')}
            </span>
          </div>

          {/* Container 2: Title & Description aligned horizontally */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-20">
            {/* Title Side */}
            <div className="max-w-2xl">
              <h2 className="text-[32px] font-bold leading-tight tracking-tight">
                {t('about.title')}
              </h2>
            </div>

            {/* Description Side */}
            <div className="lg:max-w-xl xl:max-w-2xl pt-2">
              <p className="text-gray-400 text-[14px] leading-relaxed font-light">
                {t('about.desc')}
              </p>
            </div>
          </div>

          {/* Container 3: Button */}
          <div>
            <a
              href="#studio"
              className="inline-flex items-center gap-2 text-[16px] font-medium hover:text-[#3b82f6] transition-colors"
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
