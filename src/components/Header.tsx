import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import StaggeredMenu from './StaggeredMenu';
import AkisLogo from './AkisLogo';
import { useLanguage } from '@/contexts/LanguageContext';
import './StaggeredMenuWrapper.css';

interface HeaderProps {
  fixedOnTop?: boolean;
  transitionTarget?: boolean;
}

const Header = ({ fixedOnTop = false, transitionTarget = false }: HeaderProps) => {
  const { lang, setLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isAboutSection, setIsAboutSection] = useState(false);
  const lastScrollYRef = useRef(0);
  const isVisibleRef = useRef(true);
  const isAboutSectionRef = useRef(false);
  const tickingRef = useRef(false);

  useEffect(() => {
    if (!fixedOnTop) {
      isVisibleRef.current = true;
      isAboutSectionRef.current = false;
      setIsVisible(true);
      setIsAboutSection(false);
      return;
    }

    let rafId = 0;

    const getScrollY = () => Math.max(window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0, 0);

    const getHeaderAnchorY = () => (window.innerWidth >= 768 ? 92 : 74);

    const updateHeaderState = () => {
      const currentY = getScrollY();
      const delta = currentY - lastScrollYRef.current;
      const scrollingUp = delta < -1;
      const scrollingDown = delta > 1;
      const nearTop = currentY < 16;

      let shouldShow = isVisibleRef.current;
      if (nearTop || menuOpen || scrollingUp) {
        shouldShow = true;
      } else if (scrollingDown && currentY > 90) {
        shouldShow = false;
      }

      if (shouldShow !== isVisibleRef.current) {
        isVisibleRef.current = shouldShow;
        setIsVisible(shouldShow);
      }

      let nextIsAboutSection = false;
      if (transitionTarget) {
        const forcedTheme = document.documentElement.dataset.headerTheme;
        if (forcedTheme === 'light' || forcedTheme === 'dark') {
          nextIsAboutSection = forcedTheme === 'light';
        } else {
          const aboutEl = document.getElementById('about');
          if (aboutEl) {
            const rect = aboutEl.getBoundingClientRect();
            const anchorY = getHeaderAnchorY();
            nextIsAboutSection = rect.top <= anchorY && rect.bottom > anchorY;
          }
        }
      }

      if (nextIsAboutSection !== isAboutSectionRef.current) {
        isAboutSectionRef.current = nextIsAboutSection;
        setIsAboutSection(nextIsAboutSection);
      }

      lastScrollYRef.current = currentY;
      tickingRef.current = false;
    };

    const requestUpdate = () => {
      if (tickingRef.current) {
        return;
      }

      tickingRef.current = true;
      rafId = window.requestAnimationFrame(updateHeaderState);
    };

    lastScrollYRef.current = getScrollY();
    updateHeaderState();

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      tickingRef.current = false;
    };
  }, [fixedOnTop, menuOpen, transitionTarget]);

  const isLightTheme = transitionTarget && isAboutSection;
  const headerAppearanceClass = isLightTheme
    ? 'bg-white border-black/10'
    : 'bg-black border-white/10';
  const headerVisibilityClass = fixedOnTop
    ? isVisible || menuOpen
      ? 'translate-y-0'
      : '-translate-y-full pointer-events-none'
    : 'translate-y-0';
  const controlTextClass = isLightTheme ? 'text-black hover:text-black/65' : 'text-white hover:text-white/70';
  const menuLineClass = isLightTheme ? 'bg-black' : 'bg-white';
  const languageDropdownClass = isLightTheme
    ? 'min-w-[72px] bg-white border border-black/15 shadow-[0_8px_28px_rgba(15,23,42,0.14)]'
    : 'min-w-[72px] bg-black border border-white/15 shadow-[0_8px_28px_rgba(0,0,0,0.5)]';
  const languageActiveClass = isLightTheme ? 'text-primary bg-black/5' : 'text-primary bg-white/5';
  const languageInactiveClass = isLightTheme ? 'text-black hover:bg-black/5' : 'text-white hover:bg-white/10';
  const contactButtonClass = isLightTheme
    ? 'inline-flex items-center justify-center px-3 py-1.5 sm:px-5 sm:py-2 text-[12px] sm:text-sm font-medium text-white bg-black rounded-none hover:bg-black/90 transition-colors whitespace-nowrap'
    : 'inline-flex items-center justify-center px-3 py-1.5 sm:px-5 sm:py-2 text-[12px] sm:text-sm font-medium text-background bg-white rounded-none hover:bg-white/90 transition-colors whitespace-nowrap';

  const menuItems = [
    { label: t('nav.home') || 'Home', ariaLabel: 'Go to home page', link: '/#hero' },
    { label: t('nav.about') || 'About', ariaLabel: 'Learn about us', link: '/#about' },
    { label: t('nav.services') || 'Services', ariaLabel: 'View our services', link: '/#services' },
    { label: t('nav.projects') || 'Projects', ariaLabel: 'See our work', link: '/#projects' },
    { label: t('nav.contact') || 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
  ];

  const socialItems = [
    { label: 'Instagram', link: 'https://www.instagram.com/amwajraeda.ksa?igsh=MXBlaml1Y3oxcGFxaw==' },
    { label: 'X', link: 'https://x.com/AmwajRaeda' },
    { label: 'TikTok', link: 'https://www.tiktok.com/@amwaj.raeda.digit?_r=1&_t=ZS-944xDmnFVTu' }
  ];

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* Main Navigation Bar */}
      <header
        data-hero-header={transitionTarget ? 'true' : undefined}
        className={`${fixedOnTop ? 'fixed' : 'absolute'} top-0 left-0 right-0 z-50 border-b transition-transform duration-500 ease-out ${headerAppearanceClass} ${headerVisibilityClass} ${
          transitionTarget ? 'will-change-transform' : ''
        }`}
      >
        <div className="container-main">
          <nav className="flex items-center justify-between h-[74px] md:h-[92px]">
            {/* Logo */}
            <Link to="/" aria-label="Go to homepage" className="flex-shrink-0">
              <AkisLogo logoVariant={isLightTheme ? 'black' : 'white'} iconOnly={false} className="scale-[1.05] md:scale-[1.58] origin-left" />
            </Link>

            {/* Right Side: Menu Button, Language, Contact */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-6">
              {/* Hamburger Menu Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="hidden md:flex flex-col items-center justify-center w-10 h-10 gap-1.5 hover:opacity-70 transition-opacity relative z-[100]"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                <span className={`w-6 h-0.5 ${menuLineClass} rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-6 h-0.5 ${menuLineClass} rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-6 h-0.5 ${menuLineClass} rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </button>

              {/* Language Selector */}
              <div className="relative group">
                <button
                  type="button"
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${controlTextClass}`}
                  aria-label="Change language"
                >
                  <span>{lang === 'en' ? 'EN' : 'AR'}</span>
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <div className="pointer-events-none absolute top-full right-0 pt-2 opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto">
                  <div className={languageDropdownClass}>
                    <button
                      type="button"
                      onClick={() => setLanguage('en')}
                      className={`w-full px-3 py-2 text-left text-sm transition-colors ${lang === 'en' ? languageActiveClass : languageInactiveClass}`}
                    >
                      EN
                    </button>
                    <button
                      type="button"
                      onClick={() => setLanguage('ar')}
                      className={`w-full px-3 py-2 text-left text-sm transition-colors ${lang === 'ar' ? languageActiveClass : languageInactiveClass}`}
                    >
                      AR
                    </button>
                  </div>
                </div>
              </div>

              {/* Contact Button */}
              <a
                href="/contact"
                className={contactButtonClass}
              >
                {t('nav.contact')}
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Staggered Menu Overlay */}
      {/* Always render, control via isOpen prop */}
      <div className={`staggered-menu-container ${menuOpen ? 'menu-open' : ''}`}>
        {/* Backdrop - only show when open */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[85] animate-fade-in"
            onClick={handleMenuClose}
            aria-hidden="true"
          />
        )}

        <div className="relative z-[90]">
          <StaggeredMenu
            position="right"
            items={menuItems}
            socialItems={socialItems}
            displaySocials={true}
            displayItemNumbering={true}
            menuButtonColor="#ffffff"
            openMenuButtonColor="#000000"
            changeMenuColorOnOpen={true}
            colors={['#1a1a1a', '#000000']}
            accentColor="#0d7fb8"
            isFixed={false}
            isOpen={menuOpen}
            closeOnClickAway={false}
            onMenuClose={handleMenuClose}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
