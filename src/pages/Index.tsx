import { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSeo } from '@/hooks/useSeo';
import { getSpreadsheetSeoHeadlines, getSpreadsheetSeoKeywords, serviceSeoClusters } from '@/lib/serviceSeoSpreadsheet';
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

    const spreadsheetKeywords = useMemo(() => getSpreadsheetSeoKeywords(lang).slice(0, 24), [lang]);
    const spreadsheetHeadlines = useMemo(() => getSpreadsheetSeoHeadlines(lang).slice(0, 5), [lang]);

    const seoCopy =
        lang === 'ar'
            ? {
                title: 'أمواج الرائدة | وكالة نمو وتسويق رقمي في السعودية',
                description:
                    'أمواج الرائدة وكالة تسويق رقمي سعودية تقدم تصميم الهوية البصرية، إدارة وسائل التواصل الاجتماعي، إنشاء المحتوى، تطوير المواقع والمتاجر، إدارة الحملات، وتحسين محركات البحث لنتائج نمو قابلة للقياس.',
                keywords: ['أمواج الرائدة', 'تسويق رقمي', 'وكالة تسويق في السعودية', ...spreadsheetKeywords].join(', '),
                imageAlt: 'أمواج الرائدة - وكالة تسويق رقمي في الرياض',
            }
            : {
                title: 'Amwaj Al-Raeda | Saudi Digital Marketing & Growth Agency',
                description:
                    'Amwaj Al-Raeda is a Saudi digital marketing agency for branding, social media management, content creation, web development, paid campaigns, and SEO built for measurable growth.',
                keywords: ['Amwaj Al-Raeda', 'Saudi digital marketing agency', 'growth marketing', ...spreadsheetKeywords].join(', '),
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

    const servicesStructuredData = useMemo(
        () => ({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: lang === 'ar' ? 'خدمات أمواج الرائدة حسب نية البحث' : 'Amwaj services by search intent',
            numberOfItems: serviceSeoClusters.length,
            itemListElement: serviceSeoClusters.map((cluster, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                    '@type': 'Service',
                    name: cluster.adGroupName[lang],
                    description: cluster.description[lang],
                    slogan: cluster.headlines[lang][0],
                    areaServed: 'Saudi Arabia',
                    keywords: cluster.keywords[lang].join(', '),
                    provider: {
                        '@type': 'MarketingAgency',
                        name: 'Amwaj Al-Raeda',
                        url: 'https://amwajalraeda.com',
                    },
                },
            })),
        }),
        [lang]
    );

    const combinedStructuredData = useMemo(
        () => [faqStructuredData, servicesStructuredData],
        [faqStructuredData, servicesStructuredData]
    );

    const enrichedDescription =
        lang === 'ar'
            ? `${seoCopy.description} ${spreadsheetHeadlines.join('، ')}.`
            : `${seoCopy.description} ${spreadsheetHeadlines.join(', ')}.`;

    useSeo({
        lang,
        path: '/',
        title: seoCopy.title,
        description: enrichedDescription,
        keywords: seoCopy.keywords,
        image: '/brand/amwaj-logo-primary.png',
        imageAlt: seoCopy.imageAlt,
        structuredData: combinedStructuredData,
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
