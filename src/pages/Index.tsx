import { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSeo } from '@/hooks/useSeo';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import FAQSection from '@/components/FAQSection';
import ServicesMarquee from '@/components/ServicesMarquee';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const PageContent = () => {
    const { isRTL, lang, t } = useLanguage();

    const seoCopy =
        lang === 'ar'
            ? {
                title: 'أمواج الرائدة | وكالة نمو وتسويق رقمي في السعودية',
                description:
                    'أمواج الرائدة وكالة تسويق رقمي سعودية تقدم إدارة الحملات، تحسين محركات البحث، تطوير المواقع والمتاجر، وبناء الهوية لنتائج نمو قابلة للقياس.',
                keywords:
                    'أمواج الرائدة, تسويق رقمي, وكالة تسويق في السعودية, تحسين محركات البحث, إدارة السوشيال ميديا, تطوير المواقع, بناء الهوية البصرية',
                imageAlt: 'أمواج الرائدة - وكالة تسويق رقمي في الرياض',
            }
            : {
                title: 'Amwaj Al-Raeda | Saudi Digital Marketing & Growth Agency',
                description:
                    'Amwaj Al-Raeda is a Saudi digital marketing agency for SEO, social media, branding, web development, and performance campaigns built for measurable growth.',
                keywords:
                    'Amwaj Al-Raeda, Saudi digital marketing agency, SEO Saudi Arabia, social media management, branding, website development, growth marketing',
                imageAlt: 'Amwaj Al-Raeda digital marketing agency in Riyadh',
            };

    const faqStructuredData = useMemo(
        () => ({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: Array.from({ length: 8 }, (_, index) => {
                const faqIndex = index + 1;

                return {
                    '@type': 'Question',
                    name: t(`faq.${faqIndex}.q`),
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: t(`faq.${faqIndex}.a`),
                    },
                };
            }),
        }),
        [t]
    );

    useSeo({
        lang,
        path: '/',
        title: seoCopy.title,
        description: seoCopy.description,
        keywords: seoCopy.keywords,
        image: '/brand/amwaj-logo-primary.png',
        imageAlt: seoCopy.imageAlt,
        structuredData: faqStructuredData,
    });

    return (
        <div dir={isRTL ? 'rtl' : 'ltr'} className={`${isRTL ? 'font-cairo' : 'font-sans'} overflow-x-hidden`}>
            <Header fixedOnTop transitionTarget />
            <main className="relative bg-black overflow-visible">
                <Hero />
                <div className="relative z-10">
                    <About />
                    <div aria-hidden="true" className="h-44 sm:h-32 lg:h-[45vh] bg-black" />
                    <Projects />
                    <div aria-hidden="true" className="h-44 sm:h-0 bg-black" />
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
