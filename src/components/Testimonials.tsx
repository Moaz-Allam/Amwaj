import { useLanguage } from '@/contexts/LanguageContext';
import { useGsapReveal } from '@/hooks/useGsapReveal';
import LogoLoop from './LogoLoop';

const testimonials = [
  {
    quote: { en: 'Strategic market positioning and performance-driven campaigns that transform your brand\'s visibility into measurable market impact.', ar: 'تموضع استراتيجي قوي في السوق وحملات تسويقية قائمة على الأداء تحوّل ظهور علامتك إلى تأثير ملموس.' },
    name: { en: 'Strategic Positioning', ar: 'التموضع الاستراتيجي' },
    role: { en: 'Market Impact', ar: 'التأثير في السوق' },
  },
  {
    quote: { en: 'Data-backed decision making and brand systems built for expansion, ensuring every move is informed and scalable.', ar: 'قرارات مبنية على تحليل البيانات وبناء أنظمة علامة تجارية قابلة للنمو والتوسع.' },
    name: { en: 'Data-Driven Growth', ar: 'نمو قائم على البيانات' },
    role: { en: 'Scalable Systems', ar: 'أنظمة قابلة للتوسع' },
  },
  {
    quote: { en: 'Continuous optimization and measurable ROI — we build structured marketing systems designed to generate consistent, trackable progress.', ar: 'تحسين مستمر ورفع العائد على الاستثمار — نبني أنظمة تسويقية منظمة تضمن تقدمًا مستمرًا يمكن قياسه.' },
    name: { en: 'Continuous Optimization', ar: 'التحسين المستمر' },
    role: { en: 'Measurable ROI', ar: 'عائد قابل للقياس' },
  },
];

const clientNames = [
  { en: 'SEO', ar: 'تهيئة محركات البحث' },
  { en: 'SOCIAL MEDIA', ar: 'وسائل التواصل الاجتماعي' },
  { en: 'E-COMMERCE', ar: 'التجارة الإلكترونية' },
  { en: 'CONTENT CREATION', ar: 'صناعة المحتوى' },
  { en: 'CONSULTING', ar: 'الاستشارات' },
  { en: 'APP DEVELOPMENT', ar: 'تطوير التطبيقات' },
  { en: 'ADS', ar: 'الإعلانات' },
  { en: 'BRANDING', ar: 'الهوية التجارية' },
];

const Testimonials = () => {
  const { t, lang } = useLanguage();
  const ref = useGsapReveal<HTMLElement>('[data-gsap="reveal"]', { stagger: 0.12 });
  const clientLogos = clientNames.map((item) => {
    const label = item[lang];
    return {
      node: <span className="text-white/70 text-[14px] sm:text-[15px] tracking-[0.08em] font-medium hover:text-primary transition-colors">{label}</span>,
      title: label,
    };
  });

  return (
    <section ref={ref} className="relative overflow-hidden bg-transparent py-20 sm:py-24">
      <div className="container-main relative z-10">
        <div className="text-center mb-12 sm:mb-14" data-gsap="reveal">
          <span className="text-primary font-medium tracking-wide text-[16px]">{t('testimonials.label')}</span>
          <h2 className="text-[30px] md:text-[36px] font-semibold leading-[1.08] tracking-[-0.02em] mt-4 text-foreground">{t('testimonials.title')}</h2>
          <p className="text-white/78 text-[16px] leading-[1.45] mt-3">{t('testimonials.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-12 sm:mb-16">
          {testimonials.map((item, i) => (
            <div key={item.name[lang]} className="rounded-sm border border-white/10 bg-[linear-gradient(180deg,rgba(8,13,22,0.72)_0%,rgba(5,8,14,0.92)_100%)] p-6 flex flex-col min-h-[240px]" data-gsap="reveal">
              <p className="text-white/86 text-[16px] leading-[1.5] flex-1 mb-8">{item.quote[lang]}</p>
              <div>
                <p className="text-[16px] font-medium text-foreground">{item.name[lang]}</p>
                <p className="text-[13px] text-white/60 mt-1">{item.role[lang]}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative left-1/2 -translate-x-1/2 w-screen pt-6 sm:pt-8" data-gsap="reveal">
          <div className="absolute top-0 left-0 w-full h-px bg-white/10" />
          <LogoLoop
            logos={clientLogos}
            speed={58}
            direction={lang === 'ar' ? 'right' : 'left'}
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
