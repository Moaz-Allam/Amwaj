import { useLanguage } from '@/contexts/LanguageContext';
import { useGsapReveal } from '@/hooks/useGsapReveal';

const CTASection = () => {
  const { t } = useLanguage();
  const ref = useGsapReveal<HTMLElement>('[data-gsap="reveal"]', { y: 30, duration: 1 });

  return (
    <section ref={ref} id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 wave-glow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[100px]" />

      <div className="container-main relative z-10 text-center">
        <h2 data-gsap="reveal" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground max-w-2xl mx-auto leading-tight mb-8 text-balance">
          {t('cta.title')}
        </h2>
        <a
          data-gsap="reveal"
          href="#contact"
          className="inline-flex rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:shadow-[0_0_30px_hsl(200,80%,34%,0.3)] hover:bg-gradient-to-r hover:from-primary hover:to-secondary"
        >
          {t('cta.button')}
        </a>
      </div>
    </section>
  );
};

export default CTASection;
