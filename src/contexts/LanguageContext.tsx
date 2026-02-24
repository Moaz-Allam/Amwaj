import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

type Lang = 'en' | 'ar';

interface Translations {
  [key: string]: { en: string; ar: string };
}

const translations: Translations = {
  // Header / Navigation
  'nav.home': { en: 'Home', ar: 'الرئيسية' },
  'nav.about': { en: 'About Us', ar: 'من نحن' },
  'nav.services': { en: 'Services', ar: 'خدماتنا' },
  'nav.projects': { en: 'Our Process', ar: 'آلية العمل' },
  'nav.contact': { en: 'Contact', ar: 'تواصل معنا' },

  // Hero
  'hero.title': { en: 'Drive Growth', ar: 'قُد النمو' },
  'hero.subtitle': { en: 'Strategy, media, and tracking built for real outcomes.', ar: 'استراتيجية، إعلام، وتتبع مبنية على نتائج حقيقية.' },
  'hero.cta.primary': { en: 'Request Session', ar: 'اطلب جلسة' },
  'hero.cta.secondary': { en: 'Explore Our Services', ar: 'استكشف خدماتنا' },
  'hero.scroll': { en: 'Scroll to explore', ar: 'مرر للاستكشاف' },

  // About
  'about.label': { en: 'Who We Are', ar: 'من نحن' },
  'about.title': { en: 'Amwaj Alraeda is a Saudi-based marketing and digital growth company built for businesses that aim higher.', ar: 'امواج الرائدة شركة سعودية متخصصة في بناء النمو الرقمي للعلامات التجارية التي تسعى للتميّز والريادة.' },
  'about.desc': { en: 'We don\'t execute campaigns in isolation — we design integrated growth ecosystems where branding, performance, content, and technology work together. Our focus is simple: measurable results, scalable strategies, and sustainable market impact.', ar: 'نحن لا ننفذ حملات منفصلة، بل نصمم منظومات متكاملة تجمع بين الاستراتيجية، والإبداع، والأداء، والتقنية ضمن إطار واحد يخدم أهداف العمل. تركيزنا واضح: نتائج قابلة للقياس، استراتيجيات قابلة للتوسع، وتأثير مستدام في السوق.' },
  'about.link': { en: 'Learn more about us', ar: 'اعرف المزيد عنا' },

  // Services
  'services.label': { en: 'Integrated Growth Services', ar: 'الخدمات' },
  'services.title': { en: 'Strategic, creative, and technical solutions for every stage of growth.', ar: 'حلول نمو متكاملة' },
  'services.desc': { en: 'Our services are not isolated tasks — they are interconnected systems built to strengthen brand positioning, enhance digital presence, and drive measurable business performance.', ar: 'نحن لا نقدم خدمات منفصلة، بل نصمم منظومة متكاملة تعمل بتناغم لتعزيز مكانة العلامة التجارية، وتحسين الأداء الرقمي، وتحقيق نتائج فعلية في السوق السعودي.' },
  'services.link': { en: 'View all services', ar: 'عرض جميع الخدمات' },
  'service.1.title': { en: 'Visual Identity Design', ar: 'تصميم الهوية البصرية' },
  'service.1.desc': { en: 'A powerful brand begins with a strong visual foundation. We design visual identities that communicate clarity, professionalism, and market authority.', ar: 'هوية تصنع الانطباع الأول وتبني الثقة. نطوّر هويات بصرية متكاملة تعكس احترافية العلامة، وتمنحها حضورًا مميزًا وثابتًا عبر جميع القنوات.' },
  'service.2.title': { en: 'Social Media Management', ar: 'إدارة وسائل التواصل الاجتماعي' },
  'service.2.desc': { en: 'Social media is not just about posting — it is about building influence, engagement, and brand trust.', ar: 'حضور رقمي منظم ومؤثر. نضع خطة محتوى واضحة، وندير الحسابات وفق استراتيجية مدروسة ترتكز على تحليل الجمهور وتحقيق أهداف العمل.' },
  'service.3.title': { en: 'Website & E-Commerce', ar: 'المواقع والمتاجر الإلكترونية' },
  'service.3.desc': { en: 'Your website is your digital headquarters. We design and manage professional websites and e-commerce stores built for performance and scalability.', ar: 'منصات رقمية تدعم النمو والمبيعات. نصمم ونطوّر مواقع احترافية ومتاجر إلكترونية تركز على تجربة المستخدم ورفع معدلات التحويل.' },
  'service.4.title': { en: 'Search Engine Optimization', ar: 'تحسين محركات البحث' },
  'service.4.desc': { en: 'Visibility without ranking is missed opportunity. We implement structured SEO strategies that improve search rankings and increase organic traffic.', ar: 'ظهور أقوى في نتائج البحث. نضع استراتيجية تحسين محركات بحث متكاملة لرفع ترتيب الموقع وزيادة الزيارات العضوية.' },

  // Projects / Our Process
  'projects.label': { en: 'Our Process', ar: 'آلية العمل' },
  'projects.title': { en: 'How we work', ar: 'كيف نعمل' },
  'projects.desc': { en: 'A structured methodology that ensures clarity and continuous results.', ar: 'هذه المنهجية تضمن وضوح الرؤية واستمرارية النتائج.' },
  'projects.cta.title': { en: 'Start your growth journey with Amwaj Alraeda', ar: 'ابدأ رحلة نمو علامتك التجارية اليوم' },
  'projects.cta.button': { en: 'Request a Strategy Session', ar: 'اطلب استشارة استراتيجية' },
  'projects.link': { en: 'Learn more about our process', ar: 'اعرف المزيد عن آلية العمل' },

  'projects.card.1.title': { en: 'Market Analysis', ar: 'تحليل وفهم السوق' },
  'projects.card.1.desc': { en: 'We begin with deep market research and competitive analysis to understand your position and opportunities.', ar: 'نبدأ بتحليل عميق للسوق والمنافسين لفهم موقعك والفرص المتاحة.' },
  'projects.card.1.tag.1': { en: 'Research', ar: 'بحث' },
  'projects.card.1.tag.2': { en: 'Analysis', ar: 'تحليل' },

  'projects.card.2.title': { en: 'Strategy Development', ar: 'تطوير الاستراتيجية' },
  'projects.card.2.desc': { en: 'We develop data-driven strategies tailored to your business model and growth objectives.', ar: 'نطوّر استراتيجيات مبنية على البيانات ومصممة لنموذج عملك وأهداف النمو.' },
  'projects.card.2.tag.1': { en: 'Strategy', ar: 'استراتيجية' },
  'projects.card.2.tag.2': { en: 'Planning', ar: 'تخطيط' },
  'projects.card.2.tag.3': { en: 'Data-Driven', ar: 'قائم على البيانات' },

  'projects.card.3.title': { en: 'Creative Execution', ar: 'التنفيذ الإبداعي والتقني' },
  'projects.card.3.desc': { en: 'Our team delivers high-quality creative and technical execution across all channels and touchpoints.', ar: 'فريقنا ينفذ بجودة عالية على المستوى الإبداعي والتقني عبر جميع القنوات.' },
  'projects.card.3.tag.1': { en: 'Creative', ar: 'إبداع' },
  'projects.card.3.tag.2': { en: 'Technical', ar: 'تقنية' },
  'projects.card.3.tag.3': { en: 'Quality', ar: 'جودة' },

  'projects.card.4.title': { en: 'Performance Monitoring', ar: 'متابعة الأداء' },
  'projects.card.4.desc': { en: 'We continuously track performance metrics and provide transparent reporting on all campaigns and initiatives.', ar: 'نتابع مؤشرات الأداء باستمرار ونقدم تقارير شفافة عن جميع الحملات والمبادرات.' },
  'projects.card.4.tag.1': { en: 'Tracking', ar: 'متابعة' },
  'projects.card.4.tag.2': { en: 'Reporting', ar: 'تقارير' },
  'projects.card.4.tag.3': { en: 'Transparency', ar: 'شفافية' },

  'projects.card.5.title': { en: 'Optimization & Scaling', ar: 'التحسين والتوسع' },
  'projects.card.5.desc': { en: 'We refine strategies based on real data, optimize for better ROI, and scale what works across new channels.', ar: 'نحسّن الاستراتيجيات بناءً على بيانات حقيقية، ونوسّع ما يحقق النتائج عبر قنوات جديدة.' },
  'projects.card.5.tag.1': { en: 'Optimization', ar: 'تحسين' },
  'projects.card.5.tag.2': { en: 'Scaling', ar: 'توسع' },
  'projects.card.5.tag.3': { en: 'ROI', ar: 'عائد الاستثمار' },

  // Testimonials / What We Deliver
  'testimonials.label': { en: 'What We Actually Deliver', ar: 'ماذا نقدم فعليًا' },
  'testimonials.title': { en: 'Growth without structure fades.', ar: 'النمو بدون هيكلة يختفي بسرعة.' },
  'testimonials.subtitle': { en: 'We build structured marketing systems designed to generate consistent, trackable progress.', ar: 'نحن نبني أنظمة تسويقية منظمة تضمن تقدمًا مستمرًا يمكن قياسه وتتبع نتائجه.' },

  // FAQ
  'faq.label': { en: 'FAQ', ar: 'الأسئلة الشائعة' },
  'faq.title': { en: 'Frequently asked questions', ar: 'الأسئلة المتكررة' },
  'faq.desc': { en: 'Can\'t find what you are looking for? Contact us.', ar: 'لم تجد ما تبحث عنه؟ تواصل معنا.' },
  'faq.1.q': { en: 'Do you provide SEO as part of your services?', ar: 'هل تقدمون خدمة SEO ضمن خدماتكم؟' },
  'faq.1.a': { en: 'Yes. We implement structured SEO strategies including technical optimization, keyword research, on-page optimization, content optimization, and performance tracking.', ar: 'نعم، نضع استراتيجية تحسين محركات بحث متكاملة تشمل التحسين التقني، تحليل الكلمات المفتاحية، تحسين الصفحات والمحتوى، ومتابعة الأداء.' },
  'faq.2.q': { en: 'Do you work with Saudi businesses only?', ar: 'هل تعملون فقط مع الشركات داخل السعودية؟' },
  'faq.2.a': { en: 'Our primary focus is the Saudi market. As Saudi Arabia accelerates its digital transformation, we aim to become a benchmark for strategic marketing excellence locally and regionally.', ar: 'تركيزنا الأساسي على السوق السعودي. مع تسارع التحول الرقمي في المملكة، نسعى لأن نكون مرجعًا في التميز التسويقي الاستراتيجي محليًا وإقليميًا.' },
  'faq.3.q': { en: 'What is your working process?', ar: 'كيف تتم آلية العمل لديكم؟' },
  'faq.3.a': { en: 'We follow a structured methodology: market analysis, strategy development, creative and technical execution, performance monitoring, and continuous optimization and scaling.', ar: 'نتبع منهجية منظمة: تحليل وفهم السوق، تطوير الاستراتيجية، التنفيذ الإبداعي والتقني، متابعة الأداء، والتحسين والتوسع.' },
  'faq.4.q': { en: 'Can you manage complete digital campaigns?', ar: 'هل يمكنكم إدارة حملات رقمية متكاملة؟' },
  'faq.4.a': { en: 'Yes. We design and manage targeted campaigns across Meta Ads, Google Ads, TikTok Ads, and Snapchat Ads, focused on maximizing return on investment.', ar: 'نعم، نصمم وندير حملات إعلانية مستهدفة عبر Meta Ads و Google Ads و TikTok Ads و Snapchat Ads، مع التركيز على تعظيم العائد على الاستثمار.' },
  'faq.5.q': { en: 'How do you measure performance?', ar: 'كيف تقيسون الأداء؟' },
  'faq.5.a': { en: 'Through continuous performance tracking, data-backed decision making, and regular reporting. Every strategy begins with deep analysis and ends with measurable performance.', ar: 'من خلال متابعة مستمرة للأداء، وقرارات مبنية على تحليل البيانات، وتقارير دورية. كل استراتيجية نطورها تبدأ بتحليل عميق وتنتهي بنتائج قابلة للقياس.' },
  'faq.6.q': { en: 'Do you offer visual identity design?', ar: 'هل تقدمون تصميم الهوية البصرية؟' },
  'faq.6.a': { en: 'Yes. We design visual identities including logo design, full visual identity systems, typography and color systems, brand guidelines, and visual assets for digital and print.', ar: 'نعم، نصمم هويات بصرية متكاملة تشمل تصميم الشعار، بناء نظام الهوية البصرية، اختيار الألوان والخطوط، دليل استخدام الهوية، وتطبيقات الهوية على المنصات الرقمية والمطبوعات.' },
  'faq.7.q': { en: 'Can you build websites and e-commerce stores?', ar: 'هل يمكنكم تطوير مواقع ومتاجر إلكترونية؟' },
  'faq.7.a': { en: 'Absolutely. We develop corporate websites, e-commerce stores, with UX/UI optimization, store management, product structuring, and technical maintenance.', ar: 'بالتأكيد، نصمم ونطوّر المواقع التعريفية والمتاجر الإلكترونية، مع تحسين تجربة المستخدم، وإدارة المنتجات، والصيانة والتحديثات الدورية.' },
  'faq.8.q': { en: 'What makes Amwaj Alraeda different?', ar: 'ما الذي يميز امواج الرائدة؟' },
  'faq.8.a': { en: 'We operate on three core principles: Clarity before creativity, Data before decisions, Impact before impressions. Every strategy begins with deep analysis and ends with measurable performance.', ar: 'نعمل وفق ثلاثة مبادئ أساسية: الوضوح قبل الإبداع، البيانات قبل القرار، الأثر قبل الظهور. كل استراتيجية نطورها تبدأ بتحليل عميق وتنتهي بنتائج قابلة للقياس.' },

  // CTA
  'cta.title': { en: 'Start your growth journey with Amwaj Alraeda', ar: 'ابدأ رحلة نمو علامتك التجارية اليوم' },
  'cta.button': { en: 'Request a Strategy Session', ar: 'اطلب استشارة استراتيجية' },

  // Footer
  'footer.tagline': { en: 'Start Your Growth Journey with Amwaj Alraeda', ar: 'ابدأ رحلة نمو علامتك التجارية اليوم' },
  'footer.pages': { en: 'Pages', ar: 'الصفحات' },
  'footer.email': { en: 'Email', ar: 'البريد الإلكتروني' },
  'footer.address': { en: 'Address', ar: 'العنوان' },
  'footer.services': { en: 'Services', ar: 'الخدمات' },
  'footer.company': { en: 'Company', ar: 'الشركة' },
  'footer.legal': { en: 'Legal', ar: 'قانوني' },
  'footer.about': { en: 'About Us', ar: 'من نحن' },
  'footer.careers': { en: 'Careers', ar: 'الوظائف' },
  'footer.blog': { en: 'Insights', ar: 'المقالات والرؤى' },
  'footer.privacy': { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
  'footer.terms': { en: 'Terms of Service', ar: 'شروط الخدمة' },
  'footer.followUs': { en: 'Follow Us', ar: 'تابعنا' },
};

interface LanguageContextType {
  lang: Lang;
  setLanguage: (nextLang: Lang) => void;
  toggleLang: () => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === 'undefined') {
      return 'en';
    }

    const savedLang = window.localStorage.getItem('amwaj_lang');
    return savedLang === 'ar' ? 'ar' : 'en';
  });

  const setLanguage = useCallback((nextLang: Lang) => {
    setLang(nextLang);
  }, []);

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  }, []);

  const t = useCallback((key: string) => {
    return translations[key]?.[lang] ?? key;
  }, [lang]);

  const isRTL = lang === 'ar';

  useEffect(() => {
    window.localStorage.setItem('amwaj_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [isRTL, lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLanguage, toggleLang, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
