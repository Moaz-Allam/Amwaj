import { useLanguage } from '@/contexts/LanguageContext';
import { useGsapReveal } from '@/hooks/useGsapReveal';
import ImageTrail from './ImageTrail';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';
import project4 from '@/assets/project-4.jpg';
import project5 from '@/assets/project-5.jpg';
import heroWaves from '@/assets/hero-waves.jpg';

const ctaTrailItems = [
  project1,
  project2,
  project3,
  project4,
  project5,
  heroWaves,
  project2,
  project4,
];

const CTASection = () => {
  const { t } = useLanguage();
  const ref = useGsapReveal<HTMLElement>('[data-gsap="reveal"]', { y: 30, duration: 1 });

  return (
    <section ref={ref} id="contact" className="relative bg-transparent py-20 sm:py-24 overflow-hidden">
      <div className="container-main relative z-10">
        <div className="relative overflow-hidden border border-white/10 rounded-sm min-h-[320px] sm:min-h-[350px] px-5 py-12 sm:py-16 flex flex-col items-center justify-center text-center bg-[linear-gradient(180deg,rgba(7,11,19,0.82)_0%,rgba(4,8,15,0.96)_100%)]">
          <div className="absolute inset-0 z-[2] opacity-85">
            <ImageTrail items={ctaTrailItems} variant={1} />
          </div>

          <div className="absolute inset-0 z-[1] pointer-events-none bg-[linear-gradient(180deg,rgba(4,8,15,0.24)_0%,rgba(4,8,15,0.54)_90%)]" />
          <div className="absolute inset-x-[-8%] bottom-[-54%] z-[1] h-[120%] rotate-[-7deg] blur-[58px] opacity-80 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.3)_0%,rgba(14,116,144,0.14)_45%,transparent_78%)]" />

          <h2 data-gsap="reveal" className="relative z-10 text-[30px] md:text-[36px] font-semibold text-foreground max-w-[680px] mx-auto leading-[1.08] tracking-[-0.02em] mb-6 text-balance">
            {t('cta.title')}
          </h2>
          <a
            data-gsap="reveal"
            href="/contact"
            className="relative z-10 inline-flex bg-white text-black px-4 py-2 text-[16px] font-medium transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            {t('cta.button')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
