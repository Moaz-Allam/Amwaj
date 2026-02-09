import { useLanguage } from '@/contexts/LanguageContext';
import { Quote } from 'lucide-react';
import { useGsapReveal } from '@/hooks/useGsapReveal';

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

const Testimonials = () => {
  const { t, lang } = useLanguage();
  const ref = useGsapReveal<HTMLElement>('[data-gsap="reveal"]', { stagger: 0.12 });

  return (
    <section ref={ref} className="section-padding">
      <div className="container-main">
        <div className="text-center mb-16" data-gsap="reveal">
          <span className="accent-label">{t('testimonials.label')}</span>
          <div className="accent-divider mx-auto" />
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground">{t('testimonials.title')}</h2>
          <p className="text-muted-foreground mt-3 text-sm">{t('testimonials.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <div key={i} className="glass-card p-8 flex flex-col" data-gsap="reveal">
              <Quote size={20} className="text-primary/40 mb-4" />
              <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">{item.quote[lang]}</p>
              <div>
                <p className="text-sm font-semibold text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.role[lang]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
