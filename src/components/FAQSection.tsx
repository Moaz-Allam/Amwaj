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
    { q: t('faq.5.q'), a: t('faq.5.a') },
    { q: t('faq.6.q'), a: t('faq.6.a') },
    { q: t('faq.7.q'), a: t('faq.7.a') },
    { q: t('faq.8.q'), a: t('faq.8.a') },
  ];

  return (
    <section ref={ref} className="relative bg-transparent py-20 sm:py-24">
      <div className="container-main">
        <div className="grid md:grid-cols-[1fr,2fr] gap-10 md:gap-16">
          <div data-gsap="reveal">
            <span className="text-primary font-medium tracking-wide text-[16px]">{t('faq.label')}</span>
            <h2 className="text-[30px] md:text-[36px] font-semibold leading-[1.08] tracking-[-0.02em] mt-4 text-foreground">{t('faq.title')}</h2>
            <p className="text-[16px] text-white/78 leading-[1.45] mt-3">{t('faq.desc')}</p>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  data-gsap="reveal"
                  className={`border-b border-white/20 transition-colors duration-200 ${isOpen ? 'border-primary/60' : 'hover:border-white/35'}`}
                >
                  <button onClick={() => setOpenIndex(isOpen ? null : i)} className="w-full flex items-center justify-between py-4 text-left gap-5">
                    <span className="text-[16px] font-normal text-foreground pr-4">{faq.q}</span>
                    {isOpen ? <Minus size={16} className="text-primary shrink-0" /> : <Plus size={16} className="text-white/60 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="pb-4 animate-fade-in">
                      <p className="text-white/75 text-[16px] leading-[1.5]">{faq.a}</p>
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
