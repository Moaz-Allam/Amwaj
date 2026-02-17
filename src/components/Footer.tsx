import { useLanguage } from '@/contexts/LanguageContext';
import { useGsapReveal } from '@/hooks/useGsapReveal';
import { ChevronRight } from 'lucide-react';

const Footer = () => {
  const { t, isRTL } = useLanguage();
  const ref = useGsapReveal<HTMLElement>('[data-gsap="reveal"]', { y: 30, stagger: 0.08 });

  const pageLinks = [
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  return (
    <footer ref={ref} className="relative bg-black border-t border-white/10 pt-14 sm:pt-16 pb-8 sm:pb-10 overflow-x-clip">
      <div className="container-main">
        <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-10 sm:gap-12 mb-10 sm:mb-12">
          <div data-gsap="reveal" className="max-w-[560px]">
            <p className="text-foreground text-[36px] leading-[1.02] font-semibold tracking-[-0.02em] max-w-[560px]">
              {t('footer.tagline')}
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 mt-7 bg-white text-black px-5 py-2.5 text-[16px] font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {t('cta.button')} <ChevronRight size={14} className={isRTL ? 'rotate-180' : ''} />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 xl:gap-12 xl:min-w-[640px]">
            <div data-gsap="reveal">
              <h4 className="text-[14px] leading-none font-medium text-primary mb-4">{t('footer.pages')}</h4>
              <ul className="space-y-2.5">
                {pageLinks.map((link) => (
                  <li key={link.label}><a href={link.href} className="text-[16px] leading-[1.25] text-white hover:text-primary transition-colors">{link.label}</a></li>
                ))}
              </ul>
            </div>

            <div data-gsap="reveal">
              <h4 className="text-[14px] leading-none font-medium text-primary mb-4">{t('footer.email')}</h4>
              <a href="mailto:hello@amwaj.sa" className="text-[16px] leading-[1.25] text-white hover:text-primary transition-colors break-words">
                hello@amwaj.sa
              </a>
            </div>

            <div data-gsap="reveal">
              <h4 className="text-[14px] leading-none font-medium text-primary mb-4">{t('footer.address')}</h4>
              <p className="text-[16px] leading-[1.25] text-white">
                Riyadh
                <br />
                Saudi Arabia
              </p>
            </div>
          </div>
        </div>

        <div className="relative pt-8" data-gsap="reveal">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-px bg-white/10" />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 text-[13px] text-white/55">
            <span>2026 © Amwaj Al-Raeda. All rights reserved.</span>

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <a href="#" className="hover:text-primary transition-colors">
                LinkedIn
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Instagram
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms and conditions
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Privacy policy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Cookies Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
