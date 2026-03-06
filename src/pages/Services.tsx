import { useMemo } from 'react';
import Header from '@/components/Header';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import ServicesMarquee from '@/components/ServicesMarquee';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSeo } from '@/hooks/useSeo';
import { serviceCatalog } from '@/lib/servicesCatalog';
import { getSpreadsheetSeoKeywords, serviceSeoClusters } from '@/lib/serviceSeoSpreadsheet';

type ServiceSeoClusterId = (typeof serviceSeoClusters)[number]['id'];

const ServicesPageContent = () => {
  const { lang, isRTL } = useLanguage();

  const seoClusterMap = useMemo(
    () => new Map(serviceSeoClusters.map((cluster) => [cluster.id, cluster])),
    []
  );

  const spreadsheetKeywords = useMemo(() => getSpreadsheetSeoKeywords(lang), [lang]);

  const pageCopy =
    lang === 'ar'
      ? {
          label: 'الخدمات',
          title: 'خدمات متكاملة تغطي كل مراحل النمو الرقمي.',
          description:
            'من تصميم الهوية البصرية إلى إدارة السوشيال، إنشاء المحتوى، تطوير المواقع والمتاجر، الحملات الإعلانية، تحسين محركات البحث، والاستشارات والتطبيقات.',
        }
      : {
          label: 'Services',
          title: 'Full-scope services built for digital growth.',
          description:
            'From visual identity and social media to content, websites, paid ads, SEO, consulting, media production, and app development.',
        };

  const seoKeywords = useMemo(() => {
    const baseKeywords =
      lang === 'ar'
        ? ['خدمات تسويق رقمي', 'وكالة تسويق في السعودية', 'شركة تسويق بالرياض']
        : ['digital marketing services saudi arabia', 'riyadh marketing agency', 'growth marketing services'];

    return [...baseKeywords, ...spreadsheetKeywords.slice(0, 24)].join(', ');
  }, [lang, spreadsheetKeywords]);

  const servicesStructuredData = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: lang === 'ar' ? 'خدمات أمواج الرائدة' : 'Amwaj Al-Raeda Services',
      numberOfItems: serviceCatalog.length,
      itemListElement: serviceCatalog.map((service, index) => {
        const cluster = seoClusterMap.get(service.id as ServiceSeoClusterId);
        const serviceName = cluster?.adGroupName[lang] || service.title[lang];
        const serviceDescription = cluster?.description[lang] || service.description[lang];

        return {
          '@type': 'ListItem',
          position: index + 1,
          url: `https://amwajalraeda.com/services#${service.id}`,
          item: {
            '@type': 'Service',
            name: serviceName,
            alternateName: service.title[lang],
            description: serviceDescription,
            serviceType: serviceName,
            areaServed: 'Saudi Arabia',
            provider: {
              '@type': 'MarketingAgency',
              name: 'Amwaj Al-Raeda',
              url: 'https://amwajalraeda.com',
            },
            keywords: cluster?.keywords[lang].join(', '),
          },
        };
      }),
    }),
    [lang, seoClusterMap]
  );

  useSeo({
    lang,
    path: '/services',
    title:
      lang === 'ar'
        ? 'خدمات أمواج الرائدة | الهوية، السوشيال ميديا، المحتوى، المواقع، الحملات وSEO'
        : 'Amwaj Al-Raeda Services | Branding, Social Media, SEO, Web & App Development',
    description:
      lang === 'ar'
        ? 'استكشف خدمات أمواج الرائدة المبنية على نية البحث: تصميم الهوية البصرية، إدارة وسائل التواصل الاجتماعي، إنشاء المحتوى، تطوير المواقع والمتاجر، الحملات الإعلانية، والاستشارات وخدمات SEO.'
        : 'Explore intent-driven services from Amwaj Al-Raeda: visual identity, social media management, content creation, web and e-commerce development, paid campaigns, consulting, and SEO.',
    keywords: seoKeywords,
    image: '/brand/amwaj-logo-primary.png',
    imageAlt: lang === 'ar' ? 'خدمات أمواج الرائدة للنمو الرقمي' : 'Amwaj Al-Raeda digital growth services',
    structuredData: servicesStructuredData,
  });

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={`${isRTL ? 'font-cairo' : 'font-sans'} min-h-screen overflow-x-hidden bg-black text-white`}>
      <Header fixedOnTop />

      <main className="relative bg-black">
        <section id="services" className="pt-[124px] md:pt-[146px] pb-12 sm:pb-16 border-b border-white/10">
          <div className="container-main">
            <span className="text-primary font-medium tracking-wide text-[16px]">{pageCopy.label}</span>
            <h1 className={`mt-4 text-[30px] sm:text-[40px] md:text-[56px] font-semibold tracking-[-0.03em] text-balance ${isRTL ? 'leading-[1.35]' : 'leading-[1.02]'}`}>
              {pageCopy.title}
            </h1>
            <p className={`mt-5 max-w-3xl text-white/75 text-[15px] sm:text-[18px] ${isRTL ? 'leading-[1.8]' : 'leading-[1.45]'}`}>
              {pageCopy.description}
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="container-main">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {serviceCatalog.map((service) => {
                const cluster = seoClusterMap.get(service.id as ServiceSeoClusterId);

                return (
                  <article
                    key={service.id}
                    id={service.id}
                    className="group relative overflow-hidden border border-white/10 bg-[linear-gradient(160deg,rgba(7,19,36,0.88)_0%,rgba(8,28,49,0.66)_60%,rgba(16,56,87,0.45)_100%)] transition-colors hover:border-white/20"
                  >
                    <div className="relative h-[240px] sm:h-[290px] border-b border-white/10 bg-[radial-gradient(circle_at_65%_36%,rgba(13,127,184,0.2)_0%,rgba(0,0,0,0)_70%)]">
                      <div className="pointer-events-none absolute inset-0">
                        <div
                          className="absolute left-1/2 top-[52%] h-[66%] w-[66%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-45 blur-[54px] transition-all duration-500 group-hover:opacity-90 group-hover:scale-[1.15]"
                          style={{
                            background:
                              'radial-gradient(circle at center, rgba(104,229,255,0.62) 0%, rgba(17,116,156,0.48) 42%, rgba(5,13,24,0) 78%)',
                          }}
                        />
                        <div
                          className="absolute left-1/2 top-[50%] h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-[20px] transition-all duration-500 group-hover:opacity-100 group-hover:scale-[1.22]"
                          style={{
                            background:
                              'radial-gradient(circle at center, rgba(210,247,255,0.92) 0%, rgba(74,206,244,0.58) 38%, rgba(0,0,0,0) 72%)',
                          }}
                        />
                      </div>

                      <img
                        src={service.image}
                        alt={service.title[lang]}
                        className="relative z-10 w-full h-full object-contain scale-[1.9] sm:scale-[2.12] transition-[transform,filter] duration-500 drop-shadow-[0_18px_28px_rgba(0,0,0,0.5)] group-hover:scale-[2.02] sm:group-hover:scale-[2.26] group-hover:drop-shadow-[0_22px_36px_rgba(94,215,255,0.36)]"
                        loading="lazy"
                      />
                    </div>

                    <div className="p-5 sm:p-6">
                      <p className="text-primary text-[13px] uppercase tracking-[0.12em]">{service.number}</p>
                      <p className={`mt-1 text-white/65 text-[12px] uppercase tracking-[0.08em] ${isRTL ? 'leading-[1.7]' : 'leading-[1.5]'}`}>{service.label[lang]}</p>
                      <h2 className={`mt-3 text-white text-[25px] sm:text-[30px] font-semibold tracking-[-0.02em] ${isRTL ? 'leading-[1.32]' : 'leading-[1.02]'}`}>
                        {service.title[lang]}
                      </h2>
                      <p className={`mt-3 text-white/78 text-[14px] sm:text-[15px] ${isRTL ? 'leading-[1.8]' : 'leading-[1.5]'}`}>
                        {cluster?.description[lang] || service.description[lang]}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <ServicesMarquee itemHref="/contact#contact-form" linkPurpose="contact" />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

const Services = () => <ServicesPageContent />;

export default Services;
