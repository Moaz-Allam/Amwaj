import { FormEvent, useMemo, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';

const needOptionKeys = ['branding', 'socialMedia', 'seo', 'webDevelopment', 'other'] as const;
type NeedOption = (typeof needOptionKeys)[number];

const ContactPageContent = () => {
  const { lang, isRTL } = useLanguage();
  const navigate = useNavigate();
  const [projectType, setProjectType] = useState<'new' | 'other'>('new');
  const [budget, setBudget] = useState<'yes' | 'no'>('no');
  const [selectedNeeds, setSelectedNeeds] = useState<NeedOption[]>(['branding']);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const [formOpenedAt, setFormOpenedAt] = useState(() => Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'validation' | 'spam'>('idle');
  const web3FormsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '';

  const labels = useMemo(
    () => ({
      title: lang === 'ar' ? 'لنصنع فصل النمو القادم لعلامتك.' : 'Let us build your next growth chapter.',
      sectionTitle: lang === 'ar' ? 'شاركنا تفاصيلك' : 'Tell us more',
      sectionBody:
        lang === 'ar'
          ? 'املأ النموذج وسيتواصل معك فريق أمواج الرائدة لمناقشة الأهداف، القنوات، وخطة التنفيذ المناسبة لنشاطك.'
          : 'Share your goals and our team at Amwaj Al-Raeda will get back with a clear digital plan tailored to your business.',
      newProject: lang === 'ar' ? 'مشروع جديد' : 'New Project',
      other: lang === 'ar' ? 'أخرى' : 'Other',
      iNeed: lang === 'ar' ? 'أحتاج إلى:' : 'I need:',
      budget: lang === 'ar' ? 'هل لديك ميزانية محددة؟' : 'Do you have a budget in mind?',
      yes: lang === 'ar' ? 'نعم' : 'Yes',
      no: lang === 'ar' ? 'لا' : 'No',
      projectPrompt: lang === 'ar' ? 'حدثنا عن مشروعك' : 'Tell us about your project',
      projectHint: lang === 'ar' ? 'اكتب نبذة مختصرة عن أهدافك والجمهور المستهدف والنتيجة المتوقعة.' : 'Share your objectives, target audience, and expected outcomes in a few lines.',
      projectPlaceholder: lang === 'ar' ? 'يرجى وصف المشروع' : 'Please describe your project',
      fullName: lang === 'ar' ? 'الاسم الكامل' : 'Full name',
      emailAddress: lang === 'ar' ? 'البريد الإلكتروني' : 'Email address',
      phoneNumber: lang === 'ar' ? 'رقم الهاتف' : 'Phone number',
      companyName: lang === 'ar' ? 'اسم الشركة' : 'Company name',
      yourNamePlaceholder: lang === 'ar' ? 'اكتب اسمك' : 'Enter your name',
      yourEmailPlaceholder: lang === 'ar' ? 'name@company.com' : 'name@company.com',
      yourPhonePlaceholder: lang === 'ar' ? '+966 5X XXX XXXX' : '+966 5X XXX XXXX',
      yourCompanyPlaceholder: lang === 'ar' ? 'اسم شركتك (اختياري)' : 'Your company (optional)',
      next: lang === 'ar' ? 'إرسال الطلب' : 'Submit request',
      sending: lang === 'ar' ? 'جارٍ الإرسال...' : 'Sending...',
      required: lang === 'ar' ? 'يرجى تعبئة الحقول المطلوبة' : 'Please complete all required fields',
      setupRequired: lang === 'ar' ? 'أضف مفتاح Web3Forms في متغير البيئة VITE_WEB3FORMS_ACCESS_KEY لتفعيل الإرسال.' : 'Add your Web3Forms access key in VITE_WEB3FORMS_ACCESS_KEY to enable submissions.',
      submitSuccess: lang === 'ar' ? 'تم إرسال طلبك بنجاح. سنعود إليك قريباً.' : 'Your request was sent successfully. We will contact you soon.',
      submitError: lang === 'ar' ? 'حدث خطأ أثناء الإرسال. حاول مرة أخرى أو راسلنا عبر البريد.' : 'Could not send your request. Please try again or email us directly.',
      submitValidation: lang === 'ar' ? 'يرجى إدخال رقم هاتف صحيح بصيغة دولية.' : 'Please enter a valid phone number in international format.',
      submitSpam: lang === 'ar' ? 'تعذر إرسال الطلب. يرجى المحاولة مرة أخرى.' : 'Could not submit this request. Please try again.',
      email: 'hello@amwaj.sa',
      phone: '+966 55 000 0000',
      address: ['Amwaj Al-Raeda', 'Riyadh', 'Saudi Arabia'],
      needsOptions: {
        branding: lang === 'ar' ? 'الهوية البصرية' : 'Visual Identity',
        socialMedia: lang === 'ar' ? 'إدارة السوشيال ميديا' : 'Social Media Management',
        seo: lang === 'ar' ? 'تهيئة محركات البحث' : 'Search Engine Optimization',
        webDevelopment: lang === 'ar' ? 'تطوير موقع / متجر' : 'Website & E-commerce Development',
        other: lang === 'ar' ? 'خدمة أخرى' : 'Other Service',
      },
    }),
    [lang]
  );

  const toggleNeed = (option: NeedOption) => {
    setSelectedNeeds((prev) => (prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (website.trim()) {
      return;
    }

    const elapsed = Date.now() - formOpenedAt;
    if (elapsed < 4000) {
      setSubmitStatus('spam');
      return;
    }

    const digitsOnly = clientPhone.replace(/\D/g, '');
    const validPhoneShape = /^\+?[0-9()\-\s]{8,20}$/.test(clientPhone.trim());
    if (!validPhoneShape || digitsOnly.length < 8 || digitsOnly.length > 15) {
      setSubmitStatus('validation');
      return;
    }

    if (!web3FormsAccessKey) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: web3FormsAccessKey,
          subject: 'New Contact Request - Amwaj Al-Raeda',
          from_name: fullName,
          fullName,
          email,
          phone: clientPhone,
          company,
          projectType,
          budget,
          needs: selectedNeeds.map((need) => labels.needsOptions[need]).join(', '),
          message: projectDetails,
          botcheck: '',
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error('Request failed');
      }

      setSubmitStatus('success');
      setFullName('');
      setEmail('');
      setClientPhone('');
      setCompany('');
      setProjectType('new');
      setBudget('no');
      setSelectedNeeds(['branding']);
      setProjectDetails('');
      setWebsite('');
      setFormOpenedAt(Date.now());
      window.setTimeout(() => {
        navigate('/contact/thank-you');
      }, 850);
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={`${isRTL ? 'font-cairo' : 'font-sans'} min-h-screen overflow-x-hidden bg-black text-white`}>
      <Header />

      <main>
        <section className="relative pt-[112px] md:pt-[132px] overflow-hidden">
          <div className="container-main relative z-10 min-h-[520px] flex items-center">
            <h1 className="text-[56px] md:text-[82px] leading-[0.95] tracking-[-0.03em] font-semibold max-w-[760px]">{labels.title}</h1>
          </div>
        </section>

        <section id="contact-form" className="py-16 md:py-20 border-t border-white/10">
          <div className="container-main">
            <div className="grid lg:grid-cols-[340px,minmax(0,1fr)] gap-14 lg:gap-20">
              <aside className="space-y-10 text-[24px] md:text-[28px] leading-[1.35]">
                <div>
                  <p className="text-primary text-[14px] mb-1">Email</p>
                  <a href={`mailto:${labels.email}`} className="hover:text-primary transition-colors">{labels.email}</a>
                </div>
                <div>
                  <p className="text-primary text-[14px] mb-1">Phone</p>
                  <a href="tel:+966550000000" className="hover:text-primary transition-colors">{labels.phone}</a>
                </div>
                <div>
                  <p className="text-primary text-[14px] mb-1">Address</p>
                  <p>{labels.address[0]}</p>
                  <p>{labels.address[1]}</p>
                  <p>{labels.address[2]}</p>
                </div>
              </aside>

            <form onSubmit={handleSubmit} className="max-w-[880px]">
              <h2 className="text-[72px] md:text-[84px] tracking-[-0.03em] leading-none font-semibold">{labels.sectionTitle}</h2>
              <p className="text-white/65 text-[20px] md:text-[24px] leading-[1.4] mt-6 max-w-[820px]">{labels.sectionBody}</p>

              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
                className="hidden"
                aria-hidden="true"
              />

              <div className="grid sm:grid-cols-2 gap-4 mt-10">
                <div className="space-y-2">
                  <label className="text-[16px] text-primary">{labels.fullName}</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder={labels.yourNamePlaceholder}
                    required
                    className="w-full bg-transparent border border-white/30 px-4 py-3 text-[18px] placeholder:text-white/45 focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[16px] text-primary">{labels.emailAddress}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder={labels.yourEmailPlaceholder}
                    required
                    className="w-full bg-transparent border border-white/30 px-4 py-3 text-[18px] placeholder:text-white/45 focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[16px] text-primary">{labels.phoneNumber}</label>
                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={(event) => setClientPhone(event.target.value)}
                    placeholder={labels.yourPhonePlaceholder}
                    required
                    className="w-full bg-transparent border border-white/30 px-4 py-3 text-[18px] placeholder:text-white/45 focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                  <label className="text-[16px] text-primary">{labels.companyName}</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                    placeholder={labels.yourCompanyPlaceholder}
                    className="w-full bg-transparent border border-white/30 px-4 py-3 text-[18px] placeholder:text-white/45 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="mt-10 inline-flex border border-white/20 rounded-sm overflow-hidden">
                <button
                  type="button"
                  onClick={() => setProjectType('new')}
                  className={`px-10 py-4 text-[22px] leading-none transition-colors ${projectType === 'new' ? 'bg-primary text-primary-foreground' : 'bg-transparent text-white/70 hover:text-white'}`}
                >
                    {labels.newProject}
                </button>
                <button
                  type="button"
                  onClick={() => setProjectType('other')}
                  className={`px-10 py-4 text-[22px] leading-none transition-colors ${projectType === 'other' ? 'bg-primary text-primary-foreground' : 'bg-transparent text-white/70 hover:text-white'}`}
                >
                    {labels.other}
                  </button>
                </div>

                <div className="mt-8 w-full">
                  <div className="relative h-[2px] bg-white/25">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary" />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary/65" />
                    <span className="absolute right-0 top-1/2 translate-y-[-50%] w-3 h-3 rounded-full bg-primary/65" />
                  </div>
                </div>

                <div className="mt-12">
                  <p className="text-[30px] mb-4">{labels.iNeed}</p>
                  <div className="flex flex-wrap gap-3">
                    {needOptionKeys.map((option) => {
                      const active = selectedNeeds.includes(option);
                      return (
                      <button
                        type="button"
                        key={option}
                        onClick={() => toggleNeed(option)}
                        className={`px-5 py-3 border text-[20px] md:text-[24px] leading-none transition-colors ${active ? 'border-primary text-white bg-primary/15' : 'border-white/30 text-white/55 hover:text-white hover:border-primary/65'}`}
                        >
                          {labels.needsOptions[option]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-10">
                  <p className="text-[30px] mb-4">{labels.budget}</p>
                  <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setBudget('yes')}
                    className={`px-6 py-3 border text-[24px] leading-none transition-colors ${budget === 'yes' ? 'border-primary text-white bg-primary/15' : 'border-white/30 text-white/55 hover:text-white hover:border-primary/65'}`}
                  >
                      {labels.yes}
                    </button>
                  <button
                    type="button"
                    onClick={() => setBudget('no')}
                    className={`px-6 py-3 border text-[24px] leading-none transition-colors ${budget === 'no' ? 'border-primary text-white bg-primary/15' : 'border-white/55 text-white hover:border-primary/65'}`}
                  >
                      {labels.no}
                    </button>
                  </div>
                </div>

                <div className="mt-10">
                  <label className="block text-primary text-[30px] mb-1">{labels.projectPrompt}</label>
                  <p className="text-[24px] text-white/45 mb-6">{labels.projectHint}</p>
                  <textarea
                    value={projectDetails}
                    onChange={(event) => setProjectDetails(event.target.value)}
                    rows={3}
                  placeholder={labels.projectPlaceholder}
                  required
                  className="w-full bg-transparent border-b border-primary/45 pb-3 text-[24px] placeholder:text-primary placeholder:opacity-80 focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="mt-14 flex items-center justify-between gap-6">
                <p className={`text-[16px] md:text-[18px] ${submitStatus === 'success' ? 'text-primary' : submitStatus === 'error' ? 'text-red-400' : 'text-white/75'}`}>
                  {submitStatus === 'success'
                    ? labels.submitSuccess
                    : submitStatus === 'validation'
                      ? labels.submitValidation
                      : submitStatus === 'spam'
                        ? labels.submitSpam
                        : submitStatus === 'error'
                          ? (!web3FormsAccessKey ? labels.setupRequired : labels.submitError)
                          : labels.required}
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting || !web3FormsAccessKey}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 text-[22px] font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? labels.sending : labels.next}
                  <ChevronRight size={20} className={isRTL ? 'rotate-180' : ''} />
                </button>
              </div>
            </form>
          </div>
        </div>
        </section>

        <section className="pt-4 pb-16">
          <div className="container-main">
            <div className="h-[340px] md:h-[480px] border border-white/10 overflow-hidden grayscale contrast-110 brightness-110">
              <iframe
                title="Amwaj Al-Raeda map"
                src="https://www.google.com/maps?q=Riyadh%2C%20Saudi%20Arabia&output=embed"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const Contact = () => (
  <LanguageProvider>
    <ContactPageContent />
  </LanguageProvider>
);

export default Contact;
