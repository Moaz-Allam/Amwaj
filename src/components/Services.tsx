import { useLanguage } from '@/contexts/LanguageContext';
import { useGsapReveal } from '@/hooks/useGsapReveal';
import { ChevronRight } from 'lucide-react';

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
        <section ref={ref} className="bg-black text-white py-24 sm:py-32 relative z-20">
            {/* Massive Point Light Source Background - Unconstrained */}
            {/* Using arbitrary large values to ensure it bleeds out significantly */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] min-w-[2000px] min-h-[2000px] pointer-events-none z-0 flex items-center justify-center">

                {/* Main Blue Flare - Background (Static Glow) */}
                <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.25)_0%,transparent_60%)] blur-[150px] opacity-100"></div>

                {/* Pulsing Core - Blue */}
                <div className="absolute w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.6)_0%,rgba(59,130,246,0.05)_60%,transparent_80%)] blur-[120px] animate-[pulse_3s_ease-in-out_infinite] opacity-90 mix-blend-screen"></div>

                {/* Intense White Heat Center - Pulsing */}
                <div className="absolute w-[25%] h-[25%] bg-white blur-[100px] animate-[pulse_3s_ease-in-out_infinite] opacity-50 mix-blend-overlay"></div>

            </div>

            <div className="container-main relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center text-center gap-4 mb-20" data-gsap="reveal">
                    <span className="text-[#3b82f6] font-medium tracking-wide uppercase text-[20px]">
                        {t('services.label')}
                    </span>
                    <h2 className="text-[32px] font-bold leading-tight tracking-tight">
                        {t('services.title')}
                    </h2>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 relative">
                    {services.map((service, i) => (
                        <div
                            key={i}
                            data-gsap="reveal"
                            className="group relative bg-black/20 backdrop-blur-sm border border-white/10 hover:border-[#3b82f6] transition-all duration-300 overflow-hidden h-[240px] flex flex-col justify-between p-8 rounded-sm hover:-translate-y-1 hover:shadow-[0_0_50px_-10px_rgba(59,130,246,0.4)]"
                        >
                            {/* Larger Crisp SVG Graphics - Right aligned */}
                            <div className="absolute right-[-10%] bottom-[-20%] w-64 h-64 opacity-20 group-hover:opacity-40 transition-all duration-500">
                                <svg viewBox="0 0 100 100" className="w-full h-full text-[#3b82f6] fill-none stroke-current" strokeWidth="0.5">
                                    {i === 0 && (
                                        <g transform="scale(1.5) translate(-15, -15)">
                                            <circle cx="50" cy="50" r="40" strokeOpacity="0.6" />
                                            <path d="M50 10 Q90 10 90 50 Q90 90 50 90 Q10 90 10 50 Q10 10 50 10" strokeOpacity="0.4" />
                                            <circle cx="50" cy="50" r="20" strokeOpacity="0.8" />
                                        </g>
                                    )}
                                    {i === 1 && (
                                        <g transform="scale(1.4) translate(-15, -15)">
                                            <rect x="10" y="10" width="80" height="80" rx="8" strokeOpacity="0.6" />
                                            <rect x="25" y="25" width="50" height="50" rx="4" strokeOpacity="0.4" />
                                            <line x1="10" y1="10" x2="25" y2="25" strokeOpacity="0.3" />
                                            <line x1="90" y1="10" x2="75" y2="25" strokeOpacity="0.3" />
                                            <line x1="10" y1="90" x2="25" y2="75" strokeOpacity="0.3" />
                                            <line x1="90" y1="90" x2="75" y2="75" strokeOpacity="0.3" />
                                        </g>
                                    )}
                                    {i === 2 && (
                                        <g transform="scale(1.5) translate(-15, -15)">
                                            <line x1="50" y1="0" x2="50" y2="100" strokeOpacity="0.5" />
                                            <line x1="0" y1="50" x2="100" y2="50" strokeOpacity="0.5" />
                                            <line x1="15" y1="15" x2="85" y2="85" strokeOpacity="0.3" />
                                            <line x1="85" y1="15" x2="15" y2="85" strokeOpacity="0.3" />
                                            <circle cx="50" cy="50" r="15" strokeOpacity="0.8" />
                                        </g>
                                    )}
                                    {i === 3 && (
                                        <g transform="scale(1.4) translate(-15, -15)">
                                            <circle cx="30" cy="30" r="18" strokeOpacity="0.6" />
                                            <circle cx="70" cy="30" r="18" strokeOpacity="0.6" />
                                            <circle cx="30" cy="70" r="18" strokeOpacity="0.6" />
                                            <circle cx="70" cy="70" r="18" strokeOpacity="0.6" />
                                            <path d="M30 30 L70 30 L70 70 L30 70 Z" strokeOpacity="0.3" />
                                        </g>
                                    )}
                                </svg>
                            </div>

                            {/* Content */}
                            <div className="flex justify-between items-start w-full relative z-10">
                                <span className="text-xs font-mono text-gray-500 group-hover:text-[#3b82f6] transition-colors">{service.num}</span>
                            </div>

                            <div className="relative z-10 mt-auto max-w-[85%]">
                                <h3 className="text-[24px] font-bold mb-3 tracking-tight group-hover:text-[#3b82f6] transition-colors">{t(service.titleKey)}</h3>
                                <p className="text-gray-400 text-[14px] leading-tight line-clamp-3 font-light">{t(service.descKey)}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Link */}
                <div className="mt-20 text-center" data-gsap="reveal">
                    <a href="#" className="inline-flex items-center gap-2 text-[16px] font-medium hover:text-[#3b82f6] transition-colors">
                        {t('services.link')} <ChevronRight size={18} />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Services;
