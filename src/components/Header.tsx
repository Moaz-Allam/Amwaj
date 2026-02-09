import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import AkisLogo from './AkisLogo';
import { useLanguage } from '@/contexts/LanguageContext';

const Header = () => {
  const { lang, toggleLang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center backdrop-blur-xl bg-background/60 border-b border-border">
      <div className="container-main flex w-full items-center justify-between">
        <AkisLogo />
        
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="px-3 py-1.5 text-xs font-semibold rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
          >
            {lang === 'en' ? 'عربي' : 'EN'}
          </button>

          <a
            href="#contact"
            className="hidden sm:inline-flex items-center rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-[0_0_0_4px_hsl(200,80%,34%,0.18)]"
          >
            {t('nav.contact')}
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-[72px] left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border p-6 sm:hidden animate-fade-in">
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="block w-full text-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
          >
            {t('nav.contact')}
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
