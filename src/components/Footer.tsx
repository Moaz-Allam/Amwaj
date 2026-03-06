import { useLanguage } from '@/contexts/LanguageContext';
import { useGsapReveal } from '@/hooks/useGsapReveal';
import { ChevronRight, Instagram } from 'lucide-react';

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M17.64 3h3.1l-6.77 7.73L22 21h-6.38l-5-6.5L4.9 21H1.78l7.24-8.28L1.2 3H7.8l4.52 5.98L17.64 3Zm-1.12 16.08h1.72L6.86 4.84H5.01l11.51 14.24Z" />
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
    <path d="M14.2 3.2v8.14a3.95 3.95 0 1 1-2.93-3.84V5.62c1.05.79 2.26 1.2 3.67 1.25V3.2Z" fill="#25F4EE" />
    <path d="M13.32 3.2v8.14a3.95 3.95 0 1 1-2.93-3.84V5.62c1.05.79 2.26 1.2 3.67 1.25V3.2Z" fill="#FE2C55" />
    <path d="M13.74 2.9v8.08a3.56 3.56 0 1 1-2.64-3.45V5.06c.95.71 2.06 1.08 3.4 1.12V2.9h-.76Z" fill="currentColor" />
  </svg>
);

const Footer = () => {
  const { t, isRTL } = useLanguage();
  const ref = useGsapReveal<HTMLElement>('[data-gsap="reveal"]', { y: 30, stagger: 0.08 });

  const pageLinks = [
    { label: t('nav.about'), href: '/#about-intro' },
    { label: t('nav.services'), href: '/services' },
    { label: t('nav.projects'), href: '/#projects' },
    { label: t('nav.contact'), href: 'https://wa.me/966535800559' },
  ];

  const footerPhone = '+966 53 580 0559';

  const socialLinks = [
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/amwaj_alraeda?igsh=bnZ0ZWhoOHg5emN2',
      ariaLabel: isRTL ? 'تابعنا على إنستغرام' : 'Follow us on Instagram',
      chipClass:
        'border-transparent text-white bg-[linear-gradient(135deg,#833AB4_0%,#E1306C_45%,#F56040_74%,#FCAF45_100%)] shadow-[0_16px_34px_rgba(225,48,108,0.42)] hover:brightness-110',
      iconWrapClass: 'bg-black/20 text-white',
      icon: <Instagram size={18} strokeWidth={2.3} />,
    },
    {
      label: 'X',
      href: 'https://x.com/AmwajRaeda',
      ariaLabel: isRTL ? 'تابعنا على منصة إكس' : 'Follow us on X',
      chipClass: 'border-white/20 bg-[#090909] text-white shadow-[0_16px_34px_rgba(0,0,0,0.45)] hover:bg-[#141414]',
      iconWrapClass: 'bg-white/10 text-white',
      icon: <XIcon className="h-[17px] w-[17px]" />,
    },
    {
      label: 'TikTok',
      href: 'https://www.tiktok.com/@amwaj_alraeda?_r=1&_t=ZS-94M2fDFnEO4',
      ariaLabel: isRTL ? 'تابعنا على تيك توك' : 'Follow us on TikTok',
      chipClass:
        'border-[#25F4EE]/55 bg-[#0B0B0F] text-white shadow-[0_0_0_1px_rgba(254,44,85,0.45),0_16px_34px_rgba(0,0,0,0.45)] hover:border-[#25F4EE]/85',
      iconWrapClass: 'bg-[#111218] text-white',
      icon: <TikTokIcon className="h-[18px] w-[18px]" />,
    },
  ];

  return (
    <footer ref={ref} className="relative bg-black border-t border-white/10 pt-12 sm:pt-16 pb-8 sm:pb-10 overflow-x-clip">
      <div className="container-main">
        <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-10 sm:gap-12 mb-10 sm:mb-12">
          <div data-gsap="reveal" className="max-w-[560px]">
            <p className="text-foreground text-[30px] sm:text-[36px] leading-[1.05] sm:leading-[1.02] font-semibold tracking-[-0.02em] max-w-[560px]">
              {t('footer.tagline')}
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 mt-7 bg-white text-black px-5 py-2.5 text-[15px] sm:text-[16px] font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {t('cta.button')} <ChevronRight size={14} className={isRTL ? 'rotate-180' : ''} />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 xl:gap-12 xl:min-w-[720px]">
            <div data-gsap="reveal">
              <h4 className="text-[14px] leading-none font-medium text-primary mb-4">{t('footer.pages')}</h4>
              <ul className="space-y-2.5">
                {pageLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-[15px] sm:text-[16px] leading-[1.25] text-white hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div data-gsap="reveal">
              <h4 className="text-[14px] leading-none font-medium text-primary mb-4">{t('footer.email')}</h4>
              <a href="mailto:info@amwajalraeda.com" className="text-[15px] sm:text-[16px] leading-[1.25] text-white hover:text-primary transition-colors break-words">
                info@amwajalraeda.com
              </a>
            </div>

            <div data-gsap="reveal">
              <h4 className="text-[14px] leading-none font-medium text-primary mb-4">{t('footer.phone')}</h4>
              <a href="tel:+966535800559" className="text-[15px] sm:text-[16px] leading-[1.25] text-white hover:text-primary transition-colors">
                {footerPhone}
              </a>
            </div>

            <div data-gsap="reveal">
              <h4 className="text-[14px] leading-none font-medium text-primary mb-4">{t('footer.address')}</h4>
              <p className="text-[15px] sm:text-[16px] leading-[1.25] text-white">
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

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <span className="text-white/80 text-[13px] sm:text-[14px]">{t('footer.followUs')}</span>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[14px] font-semibold transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 ${social.chipClass}`}
                >
                  <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${social.iconWrapClass}`}>{social.icon}</span>
                  <span className="leading-none">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
