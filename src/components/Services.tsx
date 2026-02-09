import { useLanguage } from '@/contexts/LanguageContext';
import { Palette, Monitor, Code, ShoppingCart } from 'lucide-react';
import { useGsapReveal } from '@/hooks/useGsapReveal';

const icons = [Palette, Monitor, Code, ShoppingCart];

const Services = () => {
  const { t } = useLanguage();
  const ref = useGsapReveal<HTMLElement>('[data-gsap="reveal"]', { stagger: 0.1 });

  const services = [
    { num: '01', titleKey: 'service.1.title', descKey: 'service.1.desc' },
    { num: '02', titleKey: 'service.2.title', descKey: 'service.2.desc' },
    { num: '03', titleKey: 'service.3.title', descKey: 'service.3.desc' },
    { num: '04', titleKey: 'service.4.title', descKey: 'service.4.desc' },
  ];

  return (
    <section ref={ref} className="section-padding">
      <div className="container-main">
        <div className="text-center mb-16" data-gsap="reveal">
          <span className="accent-label">{t('services.label')}</span>
          <div className="accent-divider mx-auto" />
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground">{t('services.title')}</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {services.map((service, i) => {
            const Icon = icons[i];
            return (
              <div key={i} data-gsap="reveal" className="glass-card hover-lift p-8 group relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors blur-2xl" />
                <span className="text-sm font-mono text-muted-foreground">{service.num}</span>
                <div className="flex items-start justify-between mt-4 mb-3">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {t(service.titleKey)}
                  </h3>
                  <Icon size={28} className="text-primary/40 group-hover:text-primary/70 group-hover:scale-105 transition-all" />
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{t(service.descKey)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
