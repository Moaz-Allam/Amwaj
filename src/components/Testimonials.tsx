import { useLanguage } from '@/contexts/LanguageContext';
import { useGsapReveal } from '@/hooks/useGsapReveal';
import MagicBento from './MagicBento';
import LogoLoop from './LogoLoop';

type IconKind = 'brand' | 'social' | 'web' | 'consulting' | 'media' | 'apps';

const ServiceIcon = ({ kind }: { kind: IconKind }) => {
  switch (kind) {
    case 'brand':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path d="M8 15.5L15.5 8" />
          <path d="M13.8 7.7l2.5 2.5" />
          <path d="M7.5 16.5l2.8-.8-.9-1.9-.9-1.9-.9 4.6z" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'social':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
          <circle cx="6" cy="7" r="2" />
          <circle cx="18" cy="6" r="2" />
          <circle cx="12" cy="18" r="2" />
          <path d="M7.9 7.5l8.2-1" />
          <path d="M7.5 8.8l3.7 7" />
          <path d="M16.8 7.8L12.8 16" />
        </svg>
      );
    case 'web':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
          <rect x="3" y="4" width="14" height="11" rx="2" />
          <path d="M8 20h4" />
          <path d="M10 15v5" />
          <circle cx="18" cy="17" r="3" />
          <path d="M20.3 19.3L22 21" />
        </svg>
      );
    case 'consulting':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
          <path d="M4 20V9" />
          <path d="M10 20v-6" />
          <path d="M16 20v-9" />
          <path d="M22 20v-12" />
          <path d="M4 6l5 2 4-3 4 2 5-3" />
        </svg>
      );
    case 'media':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <circle cx="8" cy="10" r="1.4" />
          <path d="M11 9l5 3-5 3z" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'apps':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
          <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
          <path d="M10.2 5.8h3.6" />
          <circle cx="12" cy="18.2" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
};

const deliverables = [
  {
    icon: 'brand' as const,
    label: { en: 'Brand & Content', ar: 'الهوية والمحتوى' },
    title: { en: 'Visual Identity + Content Creation', ar: 'الهوية البصرية + صناعة المحتوى' },
    description: {
      en: 'Logo design, full visual identity, brand guidelines, copywriting, scripts, and campaign content.',
      ar: 'تصميم الشعار وهوية بصرية متكاملة ودليل العلامة، مع كتابة المحتوى والسكربتات ومحتوى الحملات.',
    },
  },
  {
    icon: 'social' as const,
    label: { en: 'Social & Ads', ar: 'التواصل والإعلانات' },
    title: { en: 'Social Media + Advertising', ar: 'إدارة التواصل + الإعلانات' },
    description: {
      en: 'Content calendars, platform management, engagement, and paid campaigns on Meta, Google, TikTok, and Snapchat.',
      ar: 'تقويم محتوى، إدارة المنصات والتفاعل، وحملات مدفوعة عبر ميتا وجوجل وتيك توك وسناب شات.',
    },
  },
  {
    icon: 'web' as const,
    label: { en: 'Web & SEO', ar: 'الويب والسيو' },
    title: { en: 'Websites, E-Commerce + SEO', ar: 'المواقع والمتاجر + SEO' },
    description: {
      en: 'Corporate websites and e-commerce stores with UX optimization, technical SEO, keyword strategy, and performance tracking.',
      ar: 'مواقع تعريفية ومتاجر إلكترونية مع تحسين تجربة المستخدم، وسيو تقني، واستراتيجية كلمات مفتاحية، وتتبع الأداء.',
    },
  },
  {
    icon: 'consulting' as const,
    label: { en: 'Consulting', ar: 'الاستشارات' },
    title: { en: 'Strategic Marketing Consulting', ar: 'الاستشارات التسويقية الاستراتيجية' },
    description: {
      en: 'Marketing strategy, brand positioning, growth planning, performance evaluation, and digital transformation advisory.',
      ar: 'استشارات استراتيجية، تموضع العلامة، خطط النمو، تقييم الأداء، وتوجيه التحول الرقمي.',
    },
  },
  {
    icon: 'media' as const,
    label: { en: 'Media', ar: 'الإنتاج' },
    title: { en: 'Media Production & Photography', ar: 'الإنتاج المرئي والتصوير' },
    description: {
      en: 'Product and corporate photography, ad videos, short-form content, and promotional campaign shoots.',
      ar: 'تصوير منتجات وشركات، فيديوهات إعلانية ومحتوى قصير، وتنفيذ جلسات الحملات الترويجية.',
    },
  },
  {
    icon: 'apps' as const,
    label: { en: 'Apps', ar: 'التطبيقات' },
    title: { en: 'Application Development', ar: 'تطوير التطبيقات' },
    description: {
      en: 'Mobile app design and development focused on usability, functionality, and long-term scalability.',
      ar: 'تصميم وتطوير تطبيقات الجوال بتركيز على سهولة الاستخدام والكفاءة وقابلية التوسع.',
    },
  },
];

const Testimonials = () => {
  const { t, lang } = useLanguage();
  const ref = useGsapReveal<HTMLElement>('[data-gsap="reveal"]', { stagger: 0.12 });
  const bentoCards = deliverables.map((item) => ({
    label: item.label[lang],
    title: item.title[lang],
    description: item.description[lang],
    icon: <ServiceIcon kind={item.icon} />,
  }));
  const clientLogos = deliverables.map((item) => {
    const label = item.label[lang];
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

        <div className="mb-12 sm:mb-16" data-gsap="reveal">
          <MagicBento
            cards={bentoCards}
            textAutoHide={false}
            enableStars
            enableSpotlight
            enableBorderGlow
            enableTilt={false}
            enableMagnetism={false}
            clickEffect
            spotlightRadius={380}
            particleCount={12}
            glowColor="17, 116, 156"
            disableAnimations={false}
          />
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
            ariaLabel="Service categories"
            className="opacity-95 px-0"
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
