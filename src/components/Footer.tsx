import AkisLogo from './AkisLogo';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGsapReveal } from '@/hooks/useGsapReveal';

const Footer = () => {
  const { t } = useLanguage();
  const ref = useGsapReveal<HTMLElement>('[data-gsap="reveal"]', { y: 30, stagger: 0.08 });

  const columns = [
    { title: t('footer.services'), links: [t('service.1.title'), t('service.2.title'), t('service.3.title'), t('service.4.title')] },
    { title: t('footer.company'), links: [t('footer.about'), t('footer.careers'), t('footer.blog')] },
    { title: t('footer.legal'), links: [t('footer.privacy'), t('footer.terms')] },
  ];

  return (
    <footer ref={ref} className="border-t border-border section-padding">
      <div className="container-main">
        <div className="grid md:grid-cols-[1.5fr,1fr,1fr,1fr] gap-12 mb-16">
          <div data-gsap="reveal">
            <AkisLogo className="mb-4" />
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">{t('footer.tagline')}</p>
          </div>
          {columns.map((col) => (
            <div key={col.title} data-gsap="reveal">
              <h4 className="text-sm font-semibold text-foreground mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border pt-10" data-gsap="reveal">
          <div className="text-center">
            <span className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground/10 select-none">AKIS STUDIO</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
