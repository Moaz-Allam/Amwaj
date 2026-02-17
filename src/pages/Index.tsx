import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const PageContent = () => {
    const { isRTL, lang } = useLanguage();

    return (
        <div dir={isRTL ? 'rtl' : 'ltr'} className={`${isRTL ? 'font-cairo' : 'font-sans'} overflow-x-hidden [&_.container-main]:px-4 sm:[&_.container-main]:px-0`}>
            <Header />
            <main>
                <Hero />
                <section className="relative bg-black overflow-visible">
                    <div className="pointer-events-none absolute left-1/2 top-[62%] -translate-x-1/2 -translate-y-1/2 z-0">
                        <div className="relative w-[66vw] h-[66vw] min-w-[560px] min-h-[560px] max-w-[860px] max-h-[860px]">
                            <div
                                className="absolute inset-[8%] rounded-full blur-[74px] opacity-85 mix-blend-screen"
                                style={{
                                    background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.74) 0%, hsl(var(--primary) / 0.22) 58%, transparent 86%)',
                                }}
                            />
                            <div
                                className="absolute inset-[22%] rounded-full blur-[58px] opacity-96 mix-blend-screen"
                                style={{
                                    background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.84) 0%, hsl(var(--primary) / 0.3) 58%, transparent 88%)',
                                }}
                            />
                            <div
                                className="absolute inset-[18%] blur-[92px] animate-[pulse_4.4s_ease-in-out_infinite] opacity-100 mix-blend-screen"
                                style={{
                                    background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.88) 0%, hsl(var(--primary) / 0.34) 58%, transparent 86%)',
                                }}
                            />
                            <div
                                className="absolute inset-[35%] blur-[62px] animate-[pulse_4.4s_ease-in-out_infinite] opacity-88 mix-blend-screen"
                                style={{
                                    background: 'radial-gradient(circle at center, hsl(194 100% 88% / 0.9) 0%, hsl(var(--primary) / 0.34) 58%, transparent 88%)',
                                }}
                            />
                        </div>
                    </div>

                    <div className="relative z-10">
                        <About />
                        <Services />
                    </div>
                </section>
                <section className="relative bg-black overflow-visible">
                    <div className="relative z-10">
                        <Testimonials />
                        <FAQSection />
                        <CTASection />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

const Index = () => <PageContent />;

export default Index;
