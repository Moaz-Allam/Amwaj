import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Plus, Minus } from 'lucide-react';
import { useGsapReveal } from '@/hooks/useGsapReveal';

const FAQSection = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useGsapReveal<HTMLElement>('[data-gsap="reveal"]', { stagger: 0.1 });

  const faqs = [
    { q: t('faq.1.q'), a: t('faq.1.a') },
    { q: t('faq.2.q'), a: t('faq.2.a') },
    { q: t('faq.3.q'), a: t('faq.3.a') },
    { q: t('faq.4.q'), a: t('faq.4.a') },
  ];

  return (
    <section ref={ref} className="section-padding">
      <div className="container-main">
        <div className="grid md:grid-cols-[1fr,2fr] gap-12 md:gap-20">
          <div data-gsap="reveal">
            <span className="accent-label">{t('faq.label')}</span>
            <div className="accent-divider" />
            <h2 className="text-3xl font-semibold text-foreground">{t('faq.title')}</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  data-gsap="reveal"
                  className={`rounded-xl border transition-all duration-200 ${isOpen
                      ? 'bg-primary/[0.06] border-primary/20 border-l-2 border-l-primary'
                      : 'border-border hover:border-muted-foreground/20'
                    }`}
                >
                  <button onClick={() => setOpenIndex(isOpen ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                    <span className="text-sm font-medium text-foreground pr-4">{faq.q}</span>
                    {isOpen ? <Minus size={16} className="text-primary shrink-0" /> : <Plus size={16} className="text-muted-foreground shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 animate-fade-in">
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
