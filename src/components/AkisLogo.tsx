import { forwardRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface AkisLogoProps {
  className?: string;
  iconOnly?: boolean;
}

const AkisLogo = forwardRef<HTMLDivElement, AkisLogoProps>(({ className = '', iconOnly = false }, ref) => (
  <LogoContent ref={ref} className={className} iconOnly={iconOnly} />
));

const LogoContent = forwardRef<HTMLDivElement, AkisLogoProps>(({ className = '', iconOnly = false }, ref) => {
  const { isRTL } = useLanguage();

  return (
    <div ref={ref} className={`inline-flex items-center gap-2 md:gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'} ${className}`}>
      <img src="/brand/amwaj-logo-primary.png" alt="Amwaj Logo" className="w-18 h-12" />
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
