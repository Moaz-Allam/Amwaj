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
      <svg width="54" height="38" viewBox="0 0 120 84" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        <path d="M11 58C22 34 47 31 65 36C83 41 96 56 110 57C104 62 94 68 83 67C68 66 53 56 39 53C29 50 18 51 11 58Z" fill="#17689B" />
        <path d="M31 23C39 17 50 17 58 20C65 23 72 24 79 22C74 28 66 31 58 30C50 29 42 25 31 23Z" fill="#2C2E59" />
        <path d="M20 70C27 58 43 56 55 60C65 64 73 67 79 66C73 72 63 75 53 73C43 71 33 67 20 70Z" fill="#2C2E59" />
        <path d="M84 9C95 6 107 13 112 25C118 40 116 59 101 69C86 78 71 74 61 68C71 68 79 65 84 58C89 51 90 42 86 34C82 26 76 19 84 9Z" fill="#17689B" />
      </svg>

      {!iconOnly && (
        <span
          className="text-[28px] md:text-[34px] leading-none text-foreground whitespace-nowrap"
          style={{ fontFamily: 'Georgia, Times New Roman, serif' }}
        >
          {isRTL ? 'أمواج رائدة' : 'Amwaj aRaeda'}
        </span>
      )}
    </div>
  );
});

LogoContent.displayName = 'LogoContent';

AkisLogo.displayName = 'AkisLogo';

export default AkisLogo;
