import AkisLogo from './AkisLogo';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGsapReveal } from '@/hooks/useGsapReveal';
import { ChevronRight } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();
  const ref = useGsapReveal<HTMLElement>('[data-gsap="reveal"]', { y: 30, stagger: 0.08 });

  const columns = [
    { title: t('footer.services'), links: [t('service.1.title'), t('service.2.title'), t('service.3.title'), t('service.4.title')] },
    { title: t('footer.company'), links: [t('footer.about'), t('footer.careers'), t('footer.blog')] },
    { title: t('footer.legal'), links: [t('footer.privacy'), t('footer.terms')] },
  ];

  return (
    <footer ref={ref} className="relative bg-black border-t border-white/10 pt-14 sm:pt-16 pb-10 sm:pb-12 overflow-x-clip">
      <div className="container-main">
        <div className="grid md:grid-cols-[1.35fr,1fr,1fr,1fr] gap-10 sm:gap-12 mb-14">
          <div data-gsap="reveal">
            <p className="text-foreground text-[34px] sm:text-[42px] leading-[1.02] font-semibold tracking-[-0.02em] max-w-[360px]">{t('footer.tagline')}</p>
            <a href="#contact" className="inline-flex items-center gap-2 mt-5 bg-white text-black px-4 py-2 text-[16px] font-medium hover:bg-primary hover:text-primary-foreground transition-colors">
              {t('cta.button')} <ChevronRight size={14} />
            </a>
          </div>
          {columns.map((col) => (
            <div key={col.title} data-gsap="reveal">
              <h4 className="text-[13px] font-medium text-primary mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}><a href="#" className="text-[16px] text-white/78 hover:text-primary transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="relative pt-10" data-gsap="reveal">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-px bg-white/10" />
          <div className="flex items-center justify-center gap-3 sm:gap-5">
            <span className="text-[58px] sm:text-[92px] md:text-[122px] lg:text-[150px] font-bold leading-none tracking-[-0.04em] text-foreground select-none">AKIS</span>
            <AkisLogo iconOnly className="scale-[1.2] sm:scale-[1.7] md:scale-[2.1]" />
            <span className="text-[58px] sm:text-[92px] md:text-[122px] lg:text-[150px] font-bold leading-none tracking-[-0.04em] text-foreground select-none">STUDIO</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8 text-[13px] text-white/55">
            <span>2026 © All rights reserved</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-primary transition-colors">Instagram</a>
              <a href="#" className="hover:text-primary transition-colors">Terms and conditions</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy policy</a>
              <a href="#" className="hover:text-primary transition-colors">Cookies Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
