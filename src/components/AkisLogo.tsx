import { forwardRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface AkisLogoProps {
  className?: string;
  iconOnly?: boolean;
  logoVariant?: 'white' | 'black';
}

const AkisLogo = forwardRef<HTMLDivElement, AkisLogoProps>(({ className = '', iconOnly = false, logoVariant = 'white' }, ref) => (
  <LogoContent ref={ref} className={className} iconOnly={iconOnly} logoVariant={logoVariant} />
));

const LogoContent = forwardRef<HTMLDivElement, AkisLogoProps>(({ className = '', iconOnly = false, logoVariant = 'white' }, ref) => {
  const { isRTL } = useLanguage();
  const logoSrc = logoVariant === 'black' ? '/brand/amwaj-logo-black.png' : '/brand/amwaj-logo-white.png';
  const logoClass = logoVariant === 'black' ? 'w-18 h-12 brightness-0' : 'w-18 h-12';

  return (
    <div ref={ref} className={`inline-flex items-center gap-2 md:gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'} ${className}`}>
      <img src={logoSrc} alt="Amwaj Logo" className={logoClass} />
      {/* {!iconOnly && (
        <span
          className="text-[28px] md:text-[34px] leading-none text-foreground whitespace-nowrap"
          style={{ fontFamily: 'Georgia, Times New Roman, serif' }}
        >
          {isRTL ? 'أمواج رائدة' : 'Amwaj aRaeda'}
        </span>
      )} */}
    </div>
  );
});

LogoContent.displayName = 'LogoContent';

AkisLogo.displayName = 'AkisLogo';

export default AkisLogo;
