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
      en: 'Logo and full visual identity design built to define your brand and keep every touchpoint consistent.',
      ar: 'تصميم لوجو وهوية بصرية متكاملة تساعدك على بناء براند جديد أو تطوير الهوية الحالية.',
    },
  },
  {
    id: 'content-creation',
    number: '02',
    image: '/services/content-creation.png',
    label: { en: 'Brand & Content', ar: 'الهوية والمحتوى' },
    title: { en: 'Content Creation', ar: 'إنشاء المحتوى' },
    description: {
      en: 'Content creation services including marketing copy, scripts, and social media content aligned with your brand voice.',
      ar: 'كتابة محتوى تسويقي وكابشنات وإنشاء محتوى سوشيال ميديا يجذب العملاء للتفاعل مع علامتك.',
    },
  },
  {
    id: 'social-media',
    number: '03',
    image: '/services/social-media-management.png',
    label: { en: 'Social & Ads', ar: 'التواصل والإعلانات' },
    title: { en: 'Social Media Management', ar: 'إدارة وسائل التواصل الاجتماعي' },
    description: {
      en: 'Social media management for business pages with content planning, publishing, and daily audience engagement.',
      ar: 'إدارة حسابات السوشيال ميديا وصفحات الشركات مع خطة محتوى وتفاعل يومي لبناء حضور قوي.',
    },
  },
  {
    id: 'ad-campaigns',
    number: '04',
    image: '/services/ad-campaign-management.png',
    label: { en: 'Social & Ads', ar: 'التواصل والإعلانات' },
    title: { en: 'Ad Campaign Management', ar: 'إدارة الحملات الإعلانية' },
    description: {
      en: 'Paid ads management across Google and social platforms focused on sales growth and measurable ROI.',
      ar: 'إدارة الحملات الإعلانية وإعلانات جوجل وإعلانات السوشيال ميديا لزيادة المبيعات وتحقيق نتائج واضحة.',
    },
  },
  {
    id: 'ecommerce',
    number: '05',
    image: '/services/ecommerce-management.png',
    label: { en: 'Web & SEO', ar: 'الويب وتحسين محركات البحث' },
    title: { en: 'Website & E-commerce Development', ar: 'إنشاء وإدارة المواقع والمتاجر الإلكترونية' },
    description: {
      en: 'Corporate website design and e-commerce website development optimized for UX, conversion, and long-term growth.',
      ar: 'تصميم مواقع شركات وإنشاء متجر إلكتروني احترافي مع تجربة مستخدم سلسة وفرص مبيعات أعلى.',
    },
  },
  {
    id: 'seo',
    number: '06',
    image: '/services/seo.png',
    label: { en: 'Web & SEO', ar: 'الويب وتحسين محركات البحث' },
    title: { en: 'Search Engine Optimization (SEO)', ar: 'تحسين محركات البحث (SEO)' },
    description: {
      en: 'SEO services covering technical optimization, keyword strategy, and continuous performance tracking to rank on Google.',
      ar: 'خدمات SEO تشمل التحسين التقني وبناء استراتيجية كلمات مفتاحية لمساعدتك على تصدر نتائج جوجل.',
    },
  },
  {
    id: 'consulting',
    number: '07',
    image: '/services/consulting.png',
    label: { en: 'Consulting', ar: 'الاستشارات' },
    title: { en: 'Marketing Consulting', ar: 'خدمة استشارات تسويقية' },
    description: {
      en: 'Marketing consulting for strategy planning, positioning, and data-informed growth decisions.',
      ar: 'استشارات تسويقية مبنية على البيانات لتطوير خطة تسويقية واتخاذ قرارات أكثر ذكاءً.',
    },
  },
  {
    id: 'photography',
    number: '08',
    image: '/services/photography.png',
    label: { en: 'Media', ar: 'الإنتاج' },
    title: { en: 'Photography & Video Production', ar: 'إنتاج وتصوير الفوتوغرافي والفيديو' },
    description: {
      en: 'Professional product photography and video production for campaigns, social media, and brand storytelling.',
      ar: 'تصوير منتجات احترافي وإنتاج فيديوهات تسويقية تعكس جودة العلامة وتخطف الانتباه.',
    },
  },
  {
    id: 'app-development',
    number: '09',
    image: '/services/app-development.png',
    label: { en: 'Apps', ar: 'التطبيقات' },
    title: { en: 'Mobile App Development', ar: 'إنشاء التطبيقات' },
    description: {
      en: 'Mobile app development focused on usability, performance, and scalability for growing businesses.',
      ar: 'تصميم وتطوير تطبيقات الجوال بتجربة استخدام سلسة تساعد شركتك على النمو.',
    },
  },
];
