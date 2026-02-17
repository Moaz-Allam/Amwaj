import { useLanguage } from '@/contexts/LanguageContext';
import { useGsapReveal } from '@/hooks/useGsapReveal';
import { ChevronRight } from 'lucide-react';
import serviceOneImage from '@/assets/service-one.png';
import serviceTwoImage from '@/assets/service-two.png';
import serviceThreeImage from '@/assets/service-three.png';
import serviceFourImage from '@/assets/service-four.png';

const serviceImages = [serviceOneImage, serviceTwoImage, serviceThreeImage, serviceFourImage] as const;

const Services = () => {
    const { t, isRTL } = useLanguage();
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
                                className={`absolute top-[56%] -translate-y-1/2 w-[70%] h-[80%] blur-[44px] opacity-95 ${isRTL ? 'left-[-19%]' : 'right-[-19%]'}`}
                                style={{
                                    background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.64) 0%, hsl(var(--primary) / 0.2) 48%, transparent 82%)',
                                }}
                            />

                            <div className={`absolute top-1/2 -translate-y-1/2 w-[58%] h-[70%] min-w-[184px] opacity-95 group-hover:scale-[1.03] transition-all duration-300 group-hover:[filter:drop-shadow(0_0_18px_rgba(56,189,248,0.95))_drop-shadow(0_0_38px_rgba(14,165,233,0.7))] ${isRTL ? 'left-[-11%]' : 'right-[-11%]'}`}>
                                <img
                                    src={serviceImages[i]}
                                    alt={t(service.titleKey)}
                                    className="w-full h-full object-contain"
                                    loading="lazy"
                                />
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
                        {t('services.link')} <ChevronRight size={18} className={isRTL ? 'rotate-180' : ''} />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Services;
