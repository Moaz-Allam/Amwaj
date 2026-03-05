import Header from '@/components/Header';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import ServicesMarquee from '@/components/ServicesMarquee';
import { useLanguage } from '@/contexts/LanguageContext';
import { serviceCatalog } from '@/lib/servicesCatalog';

const ServicesPageContent = () => {
  const { lang, isRTL } = useLanguage();

  const pageCopy =
    lang === 'ar'
      ? {
          label: 'الخدمات',
          title: 'خدمات متكاملة تغطي كل مراحل النمو الرقمي.',
          description:
            'من الهوية وصناعة المحتوى إلى الإعلان، تحسين محركات البحث، وتطوير التطبيقات — فريق واحد يدير المنظومة كاملة.',
        }
      : {
          label: 'Services',
          title: 'Full-scope services built for digital growth.',
          description:
            'From identity and content to advertising, SEO, and app development, one team handles the full execution cycle.',
        };

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
              {serviceCatalog.map((service) => (
                <article
                  key={service.id}
                  className="overflow-hidden border border-white/10 bg-[linear-gradient(160deg,rgba(7,19,36,0.88)_0%,rgba(8,28,49,0.66)_60%,rgba(16,56,87,0.45)_100%)] transition-colors hover:border-white/20"
                >
                  <div className="relative h-[240px] sm:h-[290px] border-b border-white/10 bg-[radial-gradient(circle_at_65%_36%,rgba(13,127,184,0.2)_0%,rgba(0,0,0,0)_70%)]">
                    <img src={service.image} alt={service.title[lang]} className="w-full h-full object-contain scale-[1.9] sm:scale-[2.12]" loading="lazy" />
                  </div>

                  <div className="p-5 sm:p-6">
                    <p className="text-primary text-[13px] uppercase tracking-[0.12em]">{service.number}</p>
                    <p className={`mt-1 text-white/65 text-[12px] uppercase tracking-[0.08em] ${isRTL ? 'leading-[1.7]' : 'leading-[1.5]'}`}>{service.label[lang]}</p>
                    <h2 className={`mt-3 text-white text-[25px] sm:text-[30px] font-semibold tracking-[-0.02em] ${isRTL ? 'leading-[1.32]' : 'leading-[1.02]'}`}>
                      {service.title[lang]}
                    </h2>
                    <p className={`mt-3 text-white/78 text-[14px] sm:text-[15px] ${isRTL ? 'leading-[1.8]' : 'leading-[1.5]'}`}>
                      {service.description[lang]}
                    </p>
                  </div>
                </article>
              ))}
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
