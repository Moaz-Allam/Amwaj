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
                <About />
                <Services />
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
