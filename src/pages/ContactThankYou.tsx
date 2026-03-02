import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';

const ContactThankYouContent = () => {
  const { isRTL, lang } = useLanguage();

  const labels = {
    title: lang === 'ar' ? 'تم استلام طلبك بنجاح.' : 'Your request has been received.',
    description:
      lang === 'ar'
        ? 'شكراً لتواصلك مع أمواج الرائدة. سيقوم فريقنا بمراجعة التفاصيل والرد عليك خلال وقت قصير.'
        : 'Thanks for contacting Amwaj Al-Raeda. Our team will review your details and get back to you shortly.',
    home: lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home',
    contact: lang === 'ar' ? 'إرسال طلب آخر' : 'Send another request',
  };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={`${isRTL ? 'font-cairo' : 'font-sans'} min-h-screen overflow-x-hidden bg-black text-white`}>
      <Header />
      <main className="pt-[112px] md:pt-[132px] pb-16">
        <section className="container-main">
          <div className="max-w-3xl border border-white/10 bg-white/[0.02] p-8 md:p-12">
            <p className="text-primary text-sm tracking-wide uppercase">Amwaj Al-Raeda</p>
            <h1 className="mt-4 text-[40px] md:text-[56px] leading-[1.05] tracking-[-0.02em] font-semibold">{labels.title}</h1>
            <p className="mt-6 text-white/70 text-[18px] md:text-[22px] leading-[1.45]">{labels.description}</p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/" className="inline-flex items-center justify-center bg-primary text-primary-foreground px-6 py-3 text-[16px] font-medium hover:bg-primary/90 transition-colors">
                {labels.home}
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center border border-white/30 text-white px-6 py-3 text-[16px] font-medium hover:border-primary hover:text-primary transition-colors">
                {labels.contact}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const ContactThankYou = () => (
  <LanguageProvider>
    <ContactThankYouContent />
  </LanguageProvider>
);

export default ContactThankYou;
