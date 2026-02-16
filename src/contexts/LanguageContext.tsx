import React, { createContext, useContext, useState, useCallback } from 'react';

type Lang = 'en' | 'ar';

interface Translations {
  [key: string]: { en: string; ar: string };
}

const translations: Translations = {
  // Header / Navigation
  'nav.home': { en: 'Home', ar: 'الرئيسية' },
  'nav.about': { en: 'About', ar: 'من نحن' },
  'nav.services': { en: 'Services', ar: 'الخدمات' },
  'nav.projects': { en: 'Strategy', ar: 'الاستراتيجية' },
  'nav.contact': { en: 'Let’s Work Together', ar: 'لنعمل معاً' },

  // Hero
  'hero.title': { en: 'Premium digital marketing for ambitious brands.', ar: 'تسويق رقمي احترافي للعلامات الطموحة.' },
  'hero.subtitle': { en: 'We help brands grow with clear strategy, smart execution, and measurable results in the Saudi market.', ar: 'نساعد العلامات على النمو عبر استراتيجية واضحة، وتنفيذ ذكي، ونتائج قابلة للقياس في السوق السعودي.' },
  'hero.scroll': { en: 'Scroll to explore', ar: 'مرر للاستكشاف' },

  // About
  'about.label': { en: 'About Our Company', ar: 'نبذة عن الشركة' },
  'about.title': { en: 'Strategic, clear, and built for growth.', ar: 'استراتيجية واضحة ومصممة للنمو.' },
  'about.desc': { en: 'Amwaj Al-Raeda is a Saudi digital marketing company delivering high-quality campaigns, stronger brand presence, and measurable business impact.', ar: 'أمواج الرائدة شركة تسويق رقمي سعودية تقدم حملات عالية الجودة، وحضوراً أقوى للعلامة، وأثراً تجارياً ملموساً.' },
  'about.link': { en: 'Read company profile', ar: 'عرض ملف الشركة' },

  // Services
  'services.label': { en: 'Services', ar: 'خدماتنا' },
  'services.title': { en: 'High-impact digital services.', ar: 'خدمات رقمية عالية التأثير.' },
  'services.link': { en: 'View all services', ar: 'عرض جميع الخدمات' },
  'service.1.title': { en: 'Visual Identity Design', ar: 'تصميم الهوية البصرية' },
  'service.1.desc': { en: 'A clear visual identity that elevates your brand.', ar: 'هوية بصرية واضحة ترتقي بعلامتك.' },
  'service.2.title': { en: 'Social Media Management', ar: 'إدارة وسائل التواصل الاجتماعي' },
  'service.2.desc': { en: 'Professional content, publishing, and audience growth.', ar: 'محتوى احترافي ونشر منظم ونمو للجمهور.' },
  'service.3.title': { en: 'Website & E-commerce Development', ar: 'تطوير المواقع والتجارة الإلكترونية' },
  'service.3.desc': { en: 'Fast, modern platforms built for conversion and scale.', ar: 'منصات سريعة وحديثة مصممة للتحويل والتوسع.' },
  'service.4.title': { en: 'Search Engine Optimization (SEO)', ar: 'تهيئة محركات البحث (SEO)' },
  'service.4.desc': { en: 'Better rankings, stronger visibility, and qualified traffic.', ar: 'ترتيب أفضل وظهور أقوى وزيارات مؤهلة.' },

  // Projects
  'projects.label': { en: 'Vision & Mission', ar: 'الرؤية والرسالة' },
  'projects.title': { en: 'Our strategy framework', ar: 'إطارنا الاستراتيجي' },
  'projects.desc': { en: 'A premium framework built on vision, mission, and measurable outcomes.', ar: 'إطار احترافي قائم على الرؤية والرسالة والنتائج القابلة للقياس.' },
  'projects.cta.title': { en: 'Ready to elevate your business digitally?', ar: 'هل أنت جاهز لرفع أعمالك رقمياً؟' },
  'projects.cta.button': { en: 'Book now', ar: 'احجز الآن' },
  'projects.link': { en: 'Explore our framework', ar: 'استكشف إطار العمل' },

  'projects.card.1.title': { en: 'Our Vision', ar: 'رؤيتنا' },
  'projects.card.1.desc': { en: 'To be a leading Saudi digital marketing partner delivering innovation, quality, and sustainable business growth.', ar: 'أن نكون شريكاً سعودياً رائداً في التسويق الرقمي يقدم الابتكار والجودة والنمو المستدام.' },
  'projects.card.1.tag.1': { en: 'Vision 2030', ar: 'رؤية 2030' },
  'projects.card.1.tag.2': { en: 'Sustainable Growth', ar: 'نمو مستدام' },

  'projects.card.2.title': { en: 'Our Mission', ar: 'رسالتنا' },
  'projects.card.2.desc': { en: 'Deliver integrated digital solutions through strategy, creative execution, and accurate analytics.', ar: 'تقديم حلول رقمية متكاملة عبر الاستراتيجية والتنفيذ الإبداعي والتحليلات الدقيقة.' },
  'projects.card.2.tag.1': { en: 'Strategy', ar: 'استراتيجية' },
  'projects.card.2.tag.2': { en: 'Execution', ar: 'تنفيذ' },
  'projects.card.2.tag.3': { en: 'Analytics', ar: 'تحليلات' },

  'projects.card.3.title': { en: 'Our Goal', ar: 'هدفنا' },
  'projects.card.3.desc': { en: 'Help clients grow faster, strengthen market position, and maximize campaign return with consistent quality.', ar: 'مساعدة العملاء على النمو الأسرع وتعزيز مكانتهم في السوق وتعظيم عائد الحملات بجودة ثابتة.' },
  'projects.card.3.tag.1': { en: 'Performance', ar: 'أداء' },
  'projects.card.3.tag.2': { en: 'ROI', ar: 'عائد الاستثمار' },
  'projects.card.3.tag.3': { en: 'Consistency', ar: 'استمرارية' },

  'projects.card.4.title': { en: 'Company Timeline', ar: 'الخط الزمني للشركة' },
  'projects.card.4.desc': { en: 'From launch to expansion, we continue to scale our capabilities, talent, and partnerships across Saudi Arabia.', ar: 'من الانطلاقة إلى التوسع، نواصل تطوير قدراتنا وكفاءاتنا وشراكاتنا عبر السعودية.' },
  'projects.card.4.tag.1': { en: 'Launch', ar: 'انطلاقة' },
  'projects.card.4.tag.2': { en: 'Expansion', ar: 'توسع' },
  'projects.card.4.tag.3': { en: 'Partnerships', ar: 'شراكات' },

  'projects.card.5.title': { en: 'Why Choose Us', ar: 'لماذا نحن' },
  'projects.card.5.desc': { en: 'We act as a long-term growth partner focused on quality, clarity, and high-impact execution.', ar: 'نعمل كشريك نمو طويل المدى يركز على الجودة والوضوح والتنفيذ عالي التأثير.' },
  'projects.card.5.tag.1': { en: 'Partner Mindset', ar: 'عقلية الشريك' },
  'projects.card.5.tag.2': { en: 'Premium Quality', ar: 'جودة عالية' },
  'projects.card.5.tag.3': { en: 'Long-Term Impact', ar: 'أثر طويل المدى' },

  // Testimonials
  'testimonials.label': { en: 'Why Choose Us', ar: 'لماذا تختارنا' },
  'testimonials.title': { en: 'A partner, not just a provider', ar: 'شريكك الحقيقي للنمو' },
  'testimonials.subtitle': { en: 'Quality execution, continuous analysis, and long-term impact.', ar: 'تنفيذ عالي الجودة، وتحليل مستمر، وأثر طويل المدى.' },

  // FAQ
  'faq.label': { en: 'FAQ', ar: 'الأسئلة الشائعة' },
  'faq.title': { en: 'Frequently asked questions', ar: 'الأسئلة المتكررة' },
  'faq.desc': { en: 'Can’t find what you are looking for? Contact us.', ar: 'لم تجد ما تبحث عنه؟ تواصل معنا.' },
  'faq.1.q': { en: 'Do you provide SEO as part of your services?', ar: 'هل تقدمون خدمة SEO ضمن خدماتكم؟' },
  'faq.1.a': { en: 'Yes. Search Engine Optimization is one of our core services, including technical SEO, content optimization, and continuous performance tracking.', ar: 'نعم، تهيئة محركات البحث من خدماتنا الأساسية وتشمل SEO التقني وتحسين المحتوى والمتابعة المستمرة للأداء.' },
  'faq.2.q': { en: 'Do you work with Saudi businesses only?', ar: 'هل تعملون فقط مع الشركات داخل السعودية؟' },
  'faq.2.a': { en: 'Our primary focus is the Saudi market, and we also support regional brands aiming for growth in Saudi Arabia.', ar: 'تركيزنا الأساسي على السوق السعودي، كما ندعم العلامات الإقليمية الراغبة في التوسع داخل السعودية.' },
  'faq.3.q': { en: 'What is your working process?', ar: 'كيف تتم آلية العمل لديكم؟' },
  'faq.3.a': { en: 'We start with analysis and strategic planning, then move to creative execution, campaign management, and optimization through detailed reporting.', ar: 'نبدأ بالتحليل والتخطيط الاستراتيجي، ثم التنفيذ الإبداعي، وإدارة الحملات، والتحسين عبر تقارير تفصيلية.' },
  'faq.4.q': { en: 'Can you manage complete digital campaigns?', ar: 'هل يمكنكم إدارة حملات رقمية متكاملة؟' },
  'faq.4.a': { en: 'Yes. We provide integrated campaign management across social media, content, websites, and paid channels to maximize ROI.', ar: 'نعم، نقدم إدارة حملات متكاملة عبر التواصل الاجتماعي والمحتوى والمواقع والقنوات المدفوعة لتعظيم العائد.' },
  'faq.5.q': { en: 'How do you measure performance?', ar: 'كيف تقيسون الأداء؟' },
  'faq.5.a': { en: 'Through regular performance reports and in-depth analytics focused on growth, conversion, and long-term sustainability.', ar: 'من خلال تقارير دورية وتحليلات معمقة تركز على النمو والتحويل والاستدامة طويلة المدى.' },
  'faq.6.q': { en: 'Do you offer visual identity design?', ar: 'هل تقدمون تصميم الهوية البصرية؟' },
  'faq.6.a': { en: 'Yes. We build visual identities that reflect your brand strength and support your digital expansion.', ar: 'نعم، نصمم هويات بصرية تعكس قوة علامتك وتدعم توسعك الرقمي.' },
  'faq.7.q': { en: 'Can you build websites and e-commerce stores?', ar: 'هل يمكنكم تطوير مواقع ومتاجر إلكترونية؟' },
  'faq.7.a': { en: 'Absolutely. We develop websites and e-commerce solutions with strong UX, performance, and scalability.', ar: 'بالتأكيد، نطور مواقع ومتاجر إلكترونية بتجربة مستخدم قوية وأداء عالٍ وقابلية للتوسع.' },
  'faq.8.q': { en: 'What makes Amwaj Al-Raeda different?', ar: 'ما الذي يميز أمواج الرائدة؟' },
  'faq.8.a': { en: 'We think like a partner, not just a service provider. Our model combines quality execution, continuous analysis, and measurable impact.', ar: 'نفكر كشريك حقيقي لا كمزود خدمة فقط. يجمع نموذجنا بين جودة التنفيذ والتحليل المستمر والأثر القابل للقياس.' },

  // CTA
  'cta.title': { en: 'Ready to elevate your business digitally?', ar: 'جاهز لرفع أعمالك رقمياً؟' },
  'cta.button': { en: 'Let’s work together', ar: 'لنعمل معاً' },

  // Footer
  'footer.tagline': { en: 'You have a project idea? Let’s talk about it!', ar: 'هل لديك فكرة مشروع؟ لنتحدث عنها!' },
  'footer.pages': { en: 'Pages', ar: 'الصفحات' },
  'footer.email': { en: 'Email', ar: 'البريد الإلكتروني' },
  'footer.address': { en: 'Address', ar: 'العنوان' },
  'footer.services': { en: 'Services', ar: 'الخدمات' },
  'footer.company': { en: 'Company', ar: 'الشركة' },
  'footer.legal': { en: 'Legal', ar: 'قانوني' },
  'footer.about': { en: 'About', ar: 'عنا' },
  'footer.careers': { en: 'Careers', ar: 'وظائف' },
  'footer.blog': { en: 'Blog', ar: 'المدونة' },
  'footer.privacy': { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
  'footer.terms': { en: 'Terms of Service', ar: 'شروط الخدمة' },
};

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>('en');

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  }, []);

  const t = useCallback((key: string) => {
    return translations[key]?.[lang] ?? key;
  }, [lang]);

  const isRTL = lang === 'ar';

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
