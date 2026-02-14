import { useLanguage, LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const PageContent = () => {
    const { isRTL, lang } = useLanguage();

    return (
        <div dir={isRTL ? 'rtl' : 'ltr'} className={`${isRTL ? 'font-cairo' : 'font-sans'} overflow-x-hidden`}>
            <Header />
            <main>
                <Hero />
                <section className="relative bg-black overflow-visible">
                    <div className="pointer-events-none absolute left-1/2 top-[66%] -translate-x-1/2 -translate-y-1/2 z-0">
                        <div className="relative w-[76vw] h-[76vw] min-w-[560px] min-h-[560px] max-w-[980px] max-h-[980px] rotate-45">
                            <div
                                className="absolute inset-0 blur-[84px] opacity-90"
                                style={{
                                    background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.36) 0%, hsl(var(--primary) / 0.14) 44%, transparent 72%)',
                                }}
                            />
                            <div
                                className="absolute inset-[16%] blur-[62px] animate-[pulse_4.4s_ease-in-out_infinite] opacity-95 mix-blend-screen"
                                style={{
                                    background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.72) 0%, hsl(var(--primary) / 0.2) 58%, transparent 82%)',
                                }}
                            />
                            <div
                                className="absolute inset-[34%] blur-[46px] animate-[pulse_4.4s_ease-in-out_infinite] opacity-70 mix-blend-screen"
                                style={{
                                    background: 'radial-gradient(circle at center, hsl(194 100% 88% / 0.85) 0%, hsl(var(--primary) / 0.24) 58%, transparent 86%)',
                                }}
                            />
                        </div>
                    </div>

                    <div className="relative z-10">
                        <About />
                        <Services />
                    </div>
                </section>
                <Projects />
                <Testimonials />
                <FAQSection />
                <CTASection />
            </main>
            <Footer />
        </div>
    );
};

const Index = () => (
    <LanguageProvider>
        <PageContent />
    </LanguageProvider>
);

export default Index;
