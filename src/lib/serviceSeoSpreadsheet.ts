type Lang = 'en' | 'ar';

type LocalizedText = {
  en: string;
  ar: string;
};

type LocalizedList = {
  en: string[];
  ar: string[];
};

export type ServiceSeoCluster = {
  id:
    | 'visual-identity'
    | 'social-media'
    | 'content-creation'
    | 'ecommerce'
    | 'consulting'
    | 'photography'
    | 'ad-campaigns'
    | 'app-development'
    | 'seo';
  adGroupName: LocalizedText;
  intent: LocalizedList;
  keywords: LocalizedList;
  headlines: LocalizedList;
  description: LocalizedText;
};

export const serviceSeoClusters: ServiceSeoCluster[] = [
  {
    id: 'visual-identity',
    adGroupName: {
      ar: 'تصميم الهوية البصرية',
      en: 'Visual Identity Design',
    },
    intent: {
      ar: ['براند جديد', 'تصميم لوجو وهوية', 'تطوير الهوية الحالية'],
      en: ['Launch a new brand', 'Design logo and identity', 'Refresh the current identity'],
    },
    keywords: {
      ar: ['تصميم هوية بصرية', 'تصميم لوجو وهوية', 'شركة تصميم هوية تجارية', 'تصميم براند كامل', 'تصميم شعار احترافي'],
      en: ['branding design agency', 'logo and identity design', 'full brand identity design'],
    },
    headlines: {
      ar: ['صمم هوية تميز علامتك', 'هوية بصرية تعكس قوة علامتك', 'تصميم لوجو وهوية احترافية', 'نبني هوية تترك انطباع قوي'],
      en: ['Design a brand identity that stands out', 'Visual identity that reflects your brand power', 'Professional logo and identity design'],
    },
    description: {
      ar: 'نبتكر هوية بصرية متكاملة تعكس شخصية علامتك وتترك أثرًا قويًا لدى جمهورك.',
      en: 'We build a complete visual identity that reflects your brand character and creates a lasting impression.',
    },
  },
  {
    id: 'social-media',
    adGroupName: {
      ar: 'إدارة وسائل التواصل الاجتماعي',
      en: 'Social Media Management',
    },
    intent: {
      ar: ['إدارة حساباته', 'زيادة التفاعل', 'بناء حضور قوي'],
      en: ['Manage brand accounts', 'Increase engagement', 'Build a strong social presence'],
    },
    keywords: {
      ar: ['إدارة حسابات السوشيال ميديا', 'شركة إدارة سوشيال ميديا', 'إدارة صفحات الشركات', 'إدارة انستقرام وX'],
      en: ['social media management', 'social media management agency'],
    },
    headlines: {
      ar: ['إدارة احترافية لحساباتك', 'خلي علامتك حاضرة بقوة', 'محتوى وتفاعل حقيقي لجمهورك'],
      en: ['Professional management for your accounts', 'Keep your brand visible with consistency', 'Content and engagement that build real audience trust'],
    },
    description: {
      ar: 'ندير حساباتك على السوشيال ميديا باستراتيجية محتوى وتفاعل يعزز حضور علامتك ويقربك من جمهورك.',
      en: 'We manage your social channels with a clear content and engagement strategy that strengthens brand presence.',
    },
  },
  {
    id: 'content-creation',
    adGroupName: {
      ar: 'إنشاء المحتوى',
      en: 'Content Creation',
    },
    intent: {
      ar: ['شركات محتاجة محتوى يجذب العملاء'],
      en: ['Companies need content that attracts customers'],
    },
    keywords: {
      ar: ['كتابة محتوى تسويقي', 'إنشاء محتوى سوشيال ميديا', 'شركة صناعة محتوى', 'كتابة كابشن تسويقي'],
      en: ['content creation services', 'marketing content writing'],
    },
    headlines: {
      ar: ['محتوى يجذب الانتباه', 'نصنع محتوى يعبر عنك', 'محتوى احترافي يعزز حضورك'],
      en: ['Content that captures attention', 'We create content that represents your brand', 'Professional content that strengthens your presence'],
    },
    description: {
      ar: 'نصنع محتوى بصري ونصي يعكس شخصية علامتك ويجذب العملاء للتفاعل معك.',
      en: 'We produce visual and written content that reflects your brand and drives audience interaction.',
    },
  },
  {
    id: 'ecommerce',
    adGroupName: {
      ar: 'إنشاء وإدارة المواقع والمتاجر الإلكترونية',
      en: 'Website & E-commerce Development',
    },
    intent: {
      ar: ['موقع لشركته', 'متجر إلكتروني', 'تطوير موقعه'],
      en: ['Build a corporate website', 'Launch an online store', 'Upgrade an existing website'],
    },
    keywords: {
      ar: ['تصميم مواقع شركات', 'إنشاء متجر إلكتروني', 'شركة تصميم مواقع', 'تصميم متجر احترافي'],
      en: ['ecommerce website development', 'corporate website design agency'],
    },
    headlines: {
      ar: ['موقع احترافي يعزز عملك', 'متجر إلكتروني يضاعف مبيعاتك', 'تصميم مواقع بتجربة مستخدم مميزة'],
      en: ['A professional website that elevates your business', 'An online store built to grow sales', 'Web design with a strong user experience'],
    },
    description: {
      ar: 'نصمم مواقع ومتاجر إلكترونية احترافية توفر تجربة مستخدم سلسة وتزيد من فرص المبيعات.',
      en: 'We design professional websites and e-commerce stores with smooth UX and stronger conversion opportunities.',
    },
  },
  {
    id: 'consulting',
    adGroupName: {
      ar: 'خدمة استشارات',
      en: 'Marketing Consulting',
    },
    intent: {
      ar: ['شركات محتاجة استراتيجية تسويق'],
      en: ['Businesses that need a stronger marketing strategy'],
    },
    keywords: {
      ar: ['استشارات تسويقية', 'استراتيجية تسويق', 'تطوير خطة تسويقية'],
      en: ['marketing consulting', 'marketing strategy consulting'],
    },
    headlines: {
      ar: ['قرارات تسويقية أذكى', 'استشارات تدفع نمو عملك', 'استراتيجية تسويق واضحة'],
      en: ['Smarter marketing decisions', 'Consulting that supports business growth', 'Clear marketing strategy planning'],
    },
    description: {
      ar: 'نقدم استشارات تسويقية مبنية على التحليل والبيانات لدعم نمو علامتك واتخاذ قرارات صحيحة.',
      en: 'We provide data-backed marketing consulting to support growth and stronger decision-making.',
    },
  },
  {
    id: 'photography',
    adGroupName: {
      ar: 'إنتاج وتصوير الفوتوغرافي والفيديو',
      en: 'Photography & Video Production',
    },
    intent: {
      ar: ['تصوير منتجات', 'فيديوهات تسويقية'],
      en: ['Professional product photography', 'Marketing video production'],
    },
    keywords: {
      ar: ['تصوير منتجات احترافي', 'شركة إنتاج فيديو', 'تصوير فوتوغرافي للشركات'],
      en: ['video production agency', 'commercial photography service'],
    },
    headlines: {
      ar: ['محتوى بصري يخطف الانتباه', 'تصوير احترافي لعلامتك', 'فيديوهات تبرز قوة منتجك'],
      en: ['Visual content that captures attention', 'Professional shooting for your brand', 'Videos that highlight product strength'],
    },
    description: {
      ar: 'نقدم إنتاج وتصوير احترافي للفيديو والصور يعكس جودة علامتك ويجذب الانتباه.',
      en: 'We produce high-quality photos and videos that reflect your brand quality and attract attention.',
    },
  },
  {
    id: 'ad-campaigns',
    adGroupName: {
      ar: 'إدارة الحملات الإعلانية',
      en: 'Ad Campaign Management',
    },
    intent: {
      ar: ['إعلانات ممولة', 'زيادة المبيعات'],
      en: ['Run paid ads campaigns', 'Increase sales through performance ads'],
    },
    keywords: {
      ar: ['إدارة الحملات الإعلانية', 'إعلانات جوجل', 'إعلانات السوشيال ميديا'],
      en: ['paid ads management', 'google ads management', 'social media ads management'],
    },
    headlines: {
      ar: ['حملات إعلانية تحقق نتائج', 'إعلانات تزيد مبيعاتك', 'إدارة احترافية للإعلانات'],
      en: ['Campaigns built for measurable results', 'Ads that help increase sales', 'Professional ad management for growth'],
    },
    description: {
      ar: 'نصمم وننفذ حملات إعلانية مدروسة تحقق أعلى عائد على الاستثمار.',
      en: 'We design and execute performance campaigns focused on maximizing return on investment.',
    },
  },
  {
    id: 'app-development',
    adGroupName: {
      ar: 'إنشاء التطبيقات',
      en: 'Mobile App Development',
    },
    intent: {
      ar: ['عميل عايز تطبيق لشركته'],
      en: ['Build a mobile app for business operations'],
    },
    keywords: {
      ar: ['تصميم تطبيقات', 'تطوير تطبيقات الجوال', 'شركة تطوير تطبيقات'],
      en: ['mobile app development', 'app development company'],
    },
    headlines: {
      ar: ['تطبيق ذكي لعملك', 'تطوير تطبيقات باحتراف', 'تجربة مستخدم سلسة'],
      en: ['A smart app for your business', 'Professional mobile app development', 'User experience designed for retention'],
    },
    description: {
      ar: 'نطور تطبيقات ذكية توفر تجربة استخدام سهلة وتساعد في نمو أعمالك.',
      en: 'We develop smart mobile apps with smooth user experience to support business growth.',
    },
  },
  {
    id: 'seo',
    adGroupName: {
      ar: 'تحسين محركات البحث (SEO)',
      en: 'Search Engine Optimization (SEO)',
    },
    intent: {
      ar: ['عميل عايز يظهر في جوجل'],
      en: ['Rank higher and get discovered on Google'],
    },
    keywords: {
      ar: ['تحسين محركات البحث', 'خدمات SEO', 'شركة سيو', 'تصدر نتائج جوجل'],
      en: ['seo services', 'seo agency', 'rank on google'],
    },
    headlines: {
      ar: ['تصدر نتائج البحث', 'زيادة زيارات موقعك', 'استراتيجيات SEO فعالة'],
      en: ['Rank higher in search results', 'Increase qualified website traffic', 'Effective SEO strategies for long-term growth'],
    },
    description: {
      ar: 'نساعدك في رفع ظهور موقعك في نتائج البحث وجذب عملاء جدد عبر استراتيجيات SEO فعالة.',
      en: 'We improve your search visibility and attract new customers through sustainable SEO strategies.',
    },
  },
];

const dedupe = (values: string[]) => Array.from(new Set(values));

export const getSpreadsheetSeoKeywords = (lang: Lang) =>
  dedupe(serviceSeoClusters.flatMap((cluster) => cluster.keywords[lang]));

export const getSpreadsheetSeoHeadlines = (lang: Lang) =>
  dedupe(serviceSeoClusters.flatMap((cluster) => cluster.headlines[lang]));
