export type LocalizedCopy = {
  en: string;
  ar: string;
};

export type ServiceCatalogItem = {
  id: string;
  number: string;
  image: string;
  label: LocalizedCopy;
  title: LocalizedCopy;
  description: LocalizedCopy;
};

export const serviceCatalog: ServiceCatalogItem[] = [
  {
    id: 'visual-identity',
    number: '01',
    image: '/services/visual-identity.png',
    label: { en: 'Brand & Content', ar: 'الهوية والمحتوى' },
    title: { en: 'Visual Identity Design', ar: 'تصميم الهوية البصرية' },
    description: {
      en: 'Logo design, full visual identity, and complete brand guidelines.',
      ar: 'تصميم الشعار وبناء هوية بصرية متكاملة مع دليل استخدام كامل للعلامة.',
    },
  },
  {
    id: 'content-creation',
    number: '02',
    image: '/services/content-creation.png',
    label: { en: 'Brand & Content', ar: 'الهوية والمحتوى' },
    title: { en: 'Content Creation', ar: 'صناعة المحتوى' },
    description: {
      en: 'Copywriting, scripts, and campaign-ready content built for consistent brand voice.',
      ar: 'كتابة المحتوى والسكربتات وصناعة محتوى الحملات بما يحافظ على صوت العلامة.',
    },
  },
  {
    id: 'social-media',
    number: '03',
    image: '/services/social-media-management.png',
    label: { en: 'Social & Ads', ar: 'التواصل والإعلانات' },
    title: { en: 'Social Media Management', ar: 'إدارة التواصل الاجتماعي' },
    description: {
      en: 'Content calendars, platform management, and daily audience engagement.',
      ar: 'تقويم محتوى، إدارة المنصات، والتفاعل اليومي مع الجمهور.',
    },
  },
  {
    id: 'ad-campaigns',
    number: '04',
    image: '/services/ad-campaign-management.png',
    label: { en: 'Social & Ads', ar: 'التواصل والإعلانات' },
    title: { en: 'Ad Campaign Management', ar: 'إدارة الحملات الإعلانية' },
    description: {
      en: 'Paid campaigns across Meta, Google, TikTok, and Snapchat with performance focus.',
      ar: 'إدارة حملات مدفوعة عبر ميتا وجوجل وتيك توك وسناب شات مع تركيز على الأداء.',
    },
  },
  {
    id: 'ecommerce',
    number: '05',
    image: '/services/ecommerce-management.png',
    label: { en: 'Web & SEO', ar: 'الويب وتحسين محركات البحث' },
    title: { en: 'E-commerce Management', ar: 'إدارة المتاجر الإلكترونية' },
    description: {
      en: 'Corporate websites and e-commerce stores optimized for UX, conversion, and growth.',
      ar: 'تطوير وإدارة المواقع والمتاجر الإلكترونية مع تحسين تجربة المستخدم والتحويل.',
    },
  },
  {
    id: 'seo',
    number: '06',
    image: '/services/seo.png',
    label: { en: 'Web & SEO', ar: 'الويب وتحسين محركات البحث' },
    title: { en: 'Search Engine Optimization', ar: 'تحسين محركات البحث' },
    description: {
      en: 'Technical SEO, keyword strategy, and continuous performance tracking.',
      ar: 'تحسين محركات البحث تقنيًا، وبناء استراتيجية كلمات مفتاحية، ومتابعة مستمرة للأداء.',
    },
  },
  {
    id: 'consulting',
    number: '07',
    image: '/services/consulting.png',
    label: { en: 'Consulting', ar: 'الاستشارات' },
    title: { en: 'Strategic Marketing Consulting', ar: 'الاستشارات التسويقية الاستراتيجية' },
    description: {
      en: 'Marketing strategy, brand positioning, growth planning, and digital transformation advisory.',
      ar: 'استشارات استراتيجية، تموضع العلامة، خطط النمو، وتوجيه التحول الرقمي.',
    },
  },
  {
    id: 'photography',
    number: '08',
    image: '/services/photography.png',
    label: { en: 'Media', ar: 'الإنتاج' },
    title: { en: 'Photography & Media Production', ar: 'التصوير والإنتاج المرئي' },
    description: {
      en: 'Product and corporate photography, ad videos, and short-form campaign content.',
      ar: 'تصوير المنتجات والشركات، وإنتاج الفيديوهات الإعلانية والمحتوى القصير للحملات.',
    },
  },
  {
    id: 'app-development',
    number: '09',
    image: '/services/app-development.png',
    label: { en: 'Apps', ar: 'التطبيقات' },
    title: { en: 'Application Development', ar: 'تطوير التطبيقات' },
    description: {
      en: 'Mobile app design and development focused on usability and long-term scalability.',
      ar: 'تصميم وتطوير تطبيقات الجوال بتركيز على سهولة الاستخدام وقابلية التوسع.',
    },
  },
];
