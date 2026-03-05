import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import FAQSection from '@/components/FAQSection';
import ServicesMarquee from '@/components/ServicesMarquee';
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
                    <div aria-hidden="true" className="h-44 sm:h-32 lg:h-[45vh] bg-black" />
                    <Projects />
                    <FAQSection />
                    <div aria-hidden="true" className="h-32 sm:h-0 bg-black" />
                    <ServicesMarquee />
                    <div aria-hidden="true" className="h-28 sm:h-0 bg-black" />
                    <CTASection />
                </div>
            </main>
            <Footer />
        </div>
    );
};

const Index = () => <PageContent />;

export default Index;
