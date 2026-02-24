import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const PageContent = () => {
    const { isRTL } = useLanguage();

    return (
        <div dir={isRTL ? 'rtl' : 'ltr'} className={`${isRTL ? 'font-cairo' : 'font-sans'} overflow-x-hidden [&_.container-main]:px-4 sm:[&_.container-main]:px-0`}>
            <Header />
            <main>
                <Hero />
                <section className="relative bg-black overflow-visible">
                    <div className="relative z-10">
                        <About />
                    </div>
                </section>
                <section className="relative bg-black overflow-visible">
                    <div className="relative z-10">
                        <Projects />
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
