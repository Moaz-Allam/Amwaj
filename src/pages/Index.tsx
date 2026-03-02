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
        <div dir={isRTL ? 'rtl' : 'ltr'} className={`${isRTL ? 'font-cairo' : 'font-sans'} overflow-x-hidden`}>
            <Header fixedOnTop transitionTarget />
            <main className="relative bg-black overflow-visible">
                <Hero />
                <div className="relative z-10">
                    <About />
                    <div aria-hidden="true" className="h-24 sm:h-32 bg-black" />
                    <Projects />
                    <Testimonials />
                    <FAQSection />
                    <CTASection />
                </div>
            </main>
            <Footer />
        </div>
    );
};

const Index = () => <PageContent />;

export default Index;
