import { useLanguage } from '@/contexts/LanguageContext';
import { useGsapReveal } from '@/hooks/useGsapReveal';
import LogoLoop from './LogoLoop';

const testimonials = [
  {
    quote: { en: 'AKIS Studio transformed our brand completely. The attention to detail and strategic approach exceeded all expectations.', ar: 'حوّل استوديو AKIS علامتنا التجارية بالكامل. الاهتمام بالتفاصيل والنهج الاستراتيجي فاق كل التوقعات.' },
    name: 'Sarah Mitchell',
    role: { en: 'CEO, VEGA Tech', ar: 'الرئيس التنفيذي، VEGA Tech' },
  },
  {
    quote: { en: 'Working with AKIS was a game-changer. They delivered a website that truly represents who we are and drives real results.', ar: 'العمل مع AKIS كان نقطة تحول. قدموا موقعاً يمثلنا حقاً ويحقق نتائج ملموسة.' },
    name: 'Marc Dubois',
    role: { en: 'Founder, Le Cenacle', ar: 'المؤسس، Le Cenacle' },
  },
  {
    quote: { en: 'Their design sensibility is unmatched. Every pixel has a purpose and the final product speaks for itself.', ar: 'حسهم التصميمي لا يُضاهى. كل بكسل له غرض والمنتج النهائي يتحدث عن نفسه.' },
    name: 'Léa Bernard',
    role: { en: 'CMO, Holea', ar: 'مديرة التسويق، Holea' },
  },
];

const clientNames = ['GLOBAL CORNER', 'SELWA', 'SYMETRIQX', 'FLOWLI', 'OXDOS', 'LE CENACLE', 'VARROA', 'HOLEA'];

const clientLogos = clientNames.map((name) => ({
  node: <span className="text-white/70 text-[14px] sm:text-[15px] tracking-[0.08em] font-medium hover:text-primary transition-colors">{name}</span>,
  title: name,
}));

const Testimonials = () => {
  const { t, lang } = useLanguage();
  const ref = useGsapReveal<HTMLElement>('[data-gsap="reveal"]', { stagger: 0.12 });

  return (
    <section ref={ref} className="relative overflow-hidden bg-transparent py-24 sm:py-28">
      <div className="container-main relative z-10">
        <div className="text-center mb-14 sm:mb-16" data-gsap="reveal">
          <span className="text-primary font-medium tracking-wide text-[16px]">{t('testimonials.label')}</span>
          <h2 className="text-[30px] md:text-[36px] font-semibold leading-[1.08] tracking-[-0.02em] mt-4 text-foreground">{t('testimonials.title')}</h2>
          <p className="text-white/78 text-[16px] leading-[1.45] mt-3">{t('testimonials.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-16 sm:mb-20">
          {testimonials.map((item, i) => (
            <div key={item.name} className="rounded-sm border border-white/10 bg-[linear-gradient(180deg,rgba(8,13,22,0.72)_0%,rgba(5,8,14,0.92)_100%)] p-7 flex flex-col min-h-[240px]" data-gsap="reveal">
              <p className="text-white/86 text-[16px] leading-[1.5] flex-1 mb-8">{item.quote[lang]}</p>
              <div>
                <p className="text-[16px] font-medium text-foreground">{item.name}</p>
                <p className="text-[13px] text-white/60 mt-1">{item.role[lang]}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative left-1/2 -translate-x-1/2 w-screen pt-8 sm:pt-10" data-gsap="reveal">
          <div className="absolute top-0 left-0 w-full h-px bg-white/10" />
          <LogoLoop
            logos={clientLogos}
            speed={58}
            direction="left"
            width="100vw"
            logoHeight={18}
            gap={62}
            hoverSpeed={58}
            scaleOnHover
            fadeOutColor="#000000"
            ariaLabel="Client brands"
            className="opacity-95 px-0"
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
