import { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { serviceCatalog } from '@/lib/servicesCatalog';
import LogoLoop from './LogoLoop';

interface ServicesMarqueeProps {
  itemHref?: string;
  linkPurpose?: 'services' | 'contact';
}

const ServicesMarquee = ({ itemHref = '/services', linkPurpose = 'services' }: ServicesMarqueeProps) => {
  const { lang } = useLanguage();

  const itemAriaLabel =
    linkPurpose === 'contact'
      ? lang === 'ar'
        ? 'انتقل إلى نموذج التواصل'
        : 'Go to contact form'
      : lang === 'ar'
      ? 'انتقل إلى صفحة الخدمات'
      : 'Go to services page';

  const logos = useMemo(
    () =>
      serviceCatalog.map((service) => {
        const title = service.title[lang];

        return {
          node: (
            <span
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
              className="text-white/70 text-[14px] sm:text-[15px] tracking-[0.08em] font-medium hover:text-primary transition-colors"
            >
              {title}
            </span>
          ),
          title,
          href: itemHref,
          ariaLabel: itemAriaLabel,
        };
      }),
    [itemAriaLabel, itemHref, lang]
  );

  return (
    <section className="relative left-1/2 -translate-x-1/2 w-screen py-6 sm:py-8">
      <div className="absolute top-0 left-0 w-full h-px bg-white/10" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-white/10" />

      <LogoLoop
        logos={logos}
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
    </section>
  );
};

export default ServicesMarquee;
