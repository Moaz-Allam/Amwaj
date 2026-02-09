import React, { createContext, useContext, useState, useCallback } from 'react';

type Lang = 'en' | 'ar';

interface Translations {
  [key: string]: { en: string; ar: string };
}

const translations: Translations = {
  // Header
  'nav.contact': { en: 'Contact', ar: 'تواصل معنا' },
  
  // Hero
  'hero.title': { en: 'A brand that keeps up with your ambition.', ar: 'علامة تجارية تواكب طموحك.' },
  'hero.subtitle': { en: 'We craft digital experiences that elevate brands and drive meaningful growth through strategy, design, and technology.', ar: 'نصنع تجارب رقمية ترتقي بالعلامات التجارية وتحقق نمواً حقيقياً من خلال الاستراتيجية والتصميم والتكنولوجيا.' },
  'hero.scroll': { en: 'Scroll to explore', ar: 'مرر للاستكشاف' },

  // About
  'about.label': { en: 'About', ar: 'عن الاستوديو' },
  'about.title': { en: 'An approach built on one belief.', ar: 'منهج مبني على قناعة واحدة.' },
  'about.desc': { en: 'Every brand deserves a digital presence that reflects its true potential. We combine strategic thinking with meticulous design to create experiences that resonate deeply with your audience.', ar: 'كل علامة تجارية تستحق حضوراً رقمياً يعكس إمكاناتها الحقيقية. نجمع بين التفكير الاستراتيجي والتصميم الدقيق لخلق تجارب تتواصل بعمق مع جمهورك.' },

  // Services
  'services.label': { en: 'Services', ar: 'خدماتنا' },
  'services.title': { en: 'From strategy to launch.', ar: 'من الاستراتيجية حتى الإطلاق.' },
  'service.1.title': { en: 'Branding', ar: 'الهوية البصرية' },
  'service.1.desc': { en: 'Building distinctive brand identities that stand out and create lasting impressions.', ar: 'بناء هويات بصرية مميزة تبرز وتترك انطباعاً دائماً.' },
  'service.2.title': { en: 'Web Design', ar: 'تصميم المواقع' },
  'service.2.desc': { en: 'Crafting beautiful, intuitive interfaces that engage users and drive conversions.', ar: 'تصميم واجهات جميلة وبديهية تجذب المستخدمين وتحقق النتائج.' },
  'service.3.title': { en: 'Web Development', ar: 'تطوير المواقع' },
  'service.3.desc': { en: 'Building fast, scalable, and modern web applications with cutting-edge technology.', ar: 'بناء تطبيقات ويب سريعة وقابلة للتوسع بأحدث التقنيات.' },
  'service.4.title': { en: 'E-commerce', ar: 'التجارة الإلكترونية' },
  'service.4.desc': { en: 'Creating seamless online shopping experiences that maximize revenue and customer satisfaction.', ar: 'إنشاء تجارب تسوق إلكتروني سلسة تعزز الإيرادات ورضا العملاء.' },

  // Projects
  'projects.label': { en: 'Projects', ar: 'أعمالنا' },
  'projects.title': { en: 'Selected work', ar: 'أعمال مختارة' },
  'projects.desc': { en: 'A selection of our recent projects that showcase our expertise.', ar: 'مجموعة من أحدث مشاريعنا التي تعكس خبراتنا.' },
  'projects.cta.title': { en: 'Got a project in mind?', ar: 'لديك مشروع في بالك؟' },
  'projects.cta.button': { en: "Let's talk", ar: 'لنتحدث' },

  // Testimonials
  'testimonials.label': { en: 'Testimonials', ar: 'آراء العملاء' },
  'testimonials.title': { en: 'What our clients say', ar: 'ماذا يقول عملاؤنا' },
  'testimonials.subtitle': { en: 'Trusted by ambitious brands worldwide.', ar: 'موثوق من علامات تجارية طموحة حول العالم.' },

  // FAQ
  'faq.label': { en: 'FAQ', ar: 'الأسئلة الشائعة' },
  'faq.title': { en: 'Common questions', ar: 'أسئلة متكررة' },
  'faq.1.q': { en: 'What is your typical project timeline?', ar: 'ما هي المدة المعتادة للمشروع؟' },
  'faq.1.a': { en: 'Most projects take 4–8 weeks depending on scope and complexity. We provide a detailed timeline during our initial consultation.', ar: 'تستغرق معظم المشاريع من 4 إلى 8 أسابيع حسب النطاق والتعقيد. نقدم جدولاً زمنياً مفصلاً خلال الاستشارة الأولى.' },
  'faq.2.q': { en: 'Do you work with startups or established companies?', ar: 'هل تعملون مع الشركات الناشئة أم الراسخة؟' },
  'faq.2.a': { en: 'Both! We love working with ambitious brands at any stage. Our approach adapts to your unique needs and goals.', ar: 'كلاهما! نحب العمل مع العلامات التجارية الطموحة في أي مرحلة. يتكيف نهجنا مع احتياجاتك وأهدافك الفريدة.' },
  'faq.3.q': { en: 'What does your process look like?', ar: 'كيف تبدو عملية العمل لديكم؟' },
  'faq.3.a': { en: 'We follow a structured process: Discovery → Strategy → Design → Development → Launch. Each phase includes client feedback loops.', ar: 'نتبع عملية منظمة: الاكتشاف ← الاستراتيجية ← التصميم ← التطوير ← الإطلاق. تتضمن كل مرحلة حلقات تغذية راجعة.' },
  'faq.4.q': { en: 'Do you offer ongoing support?', ar: 'هل تقدمون دعماً مستمراً؟' },
  'faq.4.a': { en: 'Yes, we offer maintenance packages and ongoing support to ensure your brand continues to grow and evolve.', ar: 'نعم، نقدم حزم صيانة ودعم مستمر لضمان استمرار نمو وتطور علامتك التجارية.' },

  // CTA
  'cta.title': { en: 'Ready to have an image that matches your ambition?', ar: 'جاهز لصورة تعكس طموحك؟' },
  'cta.button': { en: 'Get started', ar: 'ابدأ الآن' },

  // Footer
  'footer.tagline': { en: 'You have a project idea? Let\'s talk about it!', ar: 'لديك فكرة مشروع؟ لنتحدث عنها!' },
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
