import { useLanguage } from '@/contexts/LanguageContext';
import { useGsapReveal } from '@/hooks/useGsapReveal';

const About = () => {
  const { t } = useLanguage();
  const ref = useGsapReveal<HTMLElement>();

  return (
    <section ref={ref} className="section-padding">
      <div className="container-main">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          <div data-gsap="reveal">
            <span className="accent-label">{t('about.label')}</span>
            <div className="accent-divider" />
            <h2 className="text-3xl sm:text-4xl font-semibold leading-tight text-foreground">
              {t('about.title')}
            </h2>
          </div>
          <div className="flex items-end" data-gsap="reveal">
            <p className="text-muted-foreground text-base leading-relaxed lg:text-lg">
              {t('about.desc')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
