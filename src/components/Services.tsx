import { useLanguage } from '@/contexts/LanguageContext';
import { useGsapReveal } from '@/hooks/useGsapReveal';
import { ChevronRight } from 'lucide-react';

const ServiceArtwork = ({ index }: { index: number }) => {
    const gradientId = `service-gradient-${index}`;

    if (index === 0) {
        return (
            <svg viewBox="0 0 240 180" className="w-full h-full">
                <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="hsl(195 96% 66%)" />
                        <stop offset="100%" stopColor="hsl(200 80% 34%)" />
                    </linearGradient>
                </defs>
                <rect x="0" y="0" width="118" height="88" rx="8" fill="none" stroke={`url(#${gradientId})`} strokeWidth="2" opacity="0.75" />
                <rect x="122" y="0" width="118" height="88" rx="8" fill="none" stroke={`url(#${gradientId})`} strokeWidth="2" opacity="0.75" />
                <rect x="0" y="92" width="118" height="88" rx="8" fill="none" stroke={`url(#${gradientId})`} strokeWidth="2" opacity="0.75" />
                <rect x="122" y="92" width="118" height="88" rx="8" fill="none" stroke={`url(#${gradientId})`} strokeWidth="2" opacity="0.75" />
                <path d="M0 88 C42 86 75 56 88 0" fill="none" stroke={`url(#${gradientId})`} strokeWidth="4" opacity="0.9" />
                <path d="M122 88 C160 84 202 54 214 0" fill="none" stroke={`url(#${gradientId})`} strokeWidth="4" opacity="0.9" />
                <path d="M0 176 C42 170 75 144 88 92" fill="none" stroke={`url(#${gradientId})`} strokeWidth="4" opacity="0.9" />
                <path d="M122 176 C160 170 202 142 214 92" fill="none" stroke={`url(#${gradientId})`} strokeWidth="4" opacity="0.9" />
            </svg>
        );
    }

    if (index === 1) {
        return (
            <svg viewBox="0 0 260 170" className="w-full h-full">
                <defs>
                    <radialGradient id={gradientId} cx="50%" cy="50%" r="60%">
                        <stop offset="0%" stopColor="hsl(194 95% 71%)" />
                        <stop offset="100%" stopColor="hsl(200 80% 34%)" />
                    </radialGradient>
                </defs>
                <circle cx="70" cy="84" r="58" fill={`url(#${gradientId})`} opacity="0.85" />
                <circle cx="146" cy="84" r="58" fill={`url(#${gradientId})`} opacity="0.85" />
                <circle cx="222" cy="84" r="58" fill={`url(#${gradientId})`} opacity="0.85" />
            </svg>
        );
    }

    if (index === 2) {
        return (
            <svg viewBox="0 0 180 180" className="w-full h-full">
                <defs>
                    <radialGradient id={gradientId} cx="50%" cy="50%" r="60%">
                        <stop offset="0%" stopColor="hsl(194 95% 71%)" />
                        <stop offset="100%" stopColor="hsl(200 80% 34%)" />
                    </radialGradient>
                </defs>
                <g transform="translate(90,90)">
                    {Array.from({ length: 12 }).map((_, item) => {
                        const angle = item * 30;
                        return <rect key={item} x="-5" y="-78" width="10" height="48" rx="4" fill={`url(#${gradientId})`} transform={`rotate(${angle})`} opacity="0.9" />;
                    })}
                    <circle r="26" fill={`url(#${gradientId})`} />
                </g>
            </svg>
        );
    }

    return (
        <svg viewBox="0 0 180 180" className="w-full h-full">
            <defs>
                <radialGradient id={gradientId} cx="50%" cy="50%" r="65%">
                    <stop offset="0%" stopColor="hsl(194 95% 71%)" />
                    <stop offset="100%" stopColor="hsl(200 80% 34%)" />
                </radialGradient>
            </defs>
            <path d="M18 18 C58 18 58 82 18 82 C2 82 2 18 18 18Z" fill={`url(#${gradientId})`} opacity="0.9" />
            <path d="M162 18 C122 18 122 82 162 82 C178 82 178 18 162 18Z" fill={`url(#${gradientId})`} opacity="0.9" />
            <path d="M18 162 C58 162 58 98 18 98 C2 98 2 162 18 162Z" fill={`url(#${gradientId})`} opacity="0.9" />
            <path d="M162 162 C122 162 122 98 162 98 C178 98 178 162 162 162Z" fill={`url(#${gradientId})`} opacity="0.9" />
        </svg>
    );
};

const Services = () => {
    const { t } = useLanguage();
    const ref = useGsapReveal<HTMLElement>('[data-gsap="reveal"]', { stagger: 0.1 });

    const services = [
        { num: '01', titleKey: 'service.1.title', descKey: 'service.1.desc' },
        { num: '02', titleKey: 'service.2.title', descKey: 'service.2.desc' },
        { num: '03', titleKey: 'service.3.title', descKey: 'service.3.desc' },
        { num: '04', titleKey: 'service.4.title', descKey: 'service.4.desc' },
    ];

    return (
        <section id="services" ref={ref} className="bg-transparent text-white pt-14 sm:pt-16 pb-20 sm:pb-24 relative z-20 overflow-visible">

            <div className="container-main relative z-10">
                <div className="flex flex-col items-center text-center gap-4 mb-12 sm:mb-16" data-gsap="reveal">
                    <span className="text-primary font-medium tracking-wide text-[16px]">
                        {t('services.label')}
                    </span>
                    <h2 className="text-[30px] md:text-[36px] font-semibold leading-[1.08] tracking-[-0.02em]">
                        {t('services.title')}
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4 md:gap-5 lg:gap-6 relative max-w-[1160px] mx-auto" data-gsap="reveal">
                    {services.map((service, i) => (
                        <div
                            key={i}
                            className="group relative overflow-hidden rounded-xl border border-white/10 h-[248px] sm:h-[276px] lg:h-[300px] px-4 sm:px-6 py-5 sm:py-6 flex flex-col justify-between bg-[linear-gradient(135deg,rgba(5,18,34,0.86)_0%,rgba(10,36,62,0.62)_65%,rgba(17,60,96,0.46)_100%)] backdrop-blur-[2px] transition-all duration-300 hover:border-white/20"
                        >
                            <div
                                className="absolute right-[-19%] top-[56%] -translate-y-1/2 w-[70%] h-[80%] blur-[44px] opacity-95"
                                style={{
                                    background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.64) 0%, hsl(var(--primary) / 0.2) 48%, transparent 82%)',
                                }}
                            />

                            <div className="absolute right-[-11%] top-1/2 -translate-y-1/2 w-[56%] h-[66%] min-w-[184px] opacity-95 group-hover:scale-[1.03] transition-all duration-300 group-hover:[filter:drop-shadow(0_0_18px_rgba(56,189,248,0.95))_drop-shadow(0_0_38px_rgba(14,165,233,0.7))]">
                                <ServiceArtwork index={i} />
                            </div>

                            <div className="flex justify-between items-start w-full relative z-10">
                                <span className="text-[32px] sm:text-[34px] font-medium text-white/95 tracking-tight">{service.num}</span>
                            </div>

                            <div className="relative z-10 mt-auto max-w-[74%] sm:max-w-[60%]">
                                <h3 className="text-[32px] sm:text-[40px] leading-[0.98] font-semibold mb-3 tracking-[-0.02em] text-white">{t(service.titleKey)}</h3>
                                <p className="text-white/85 text-[16px] leading-[1.25] line-clamp-3">{t(service.descKey)}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 sm:mt-16 text-center" data-gsap="reveal">
                    <a href="#" className="inline-flex items-center gap-2 text-[16px] font-medium hover:text-primary transition-colors">
                        {t('services.link')} <ChevronRight size={18} />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Services;
