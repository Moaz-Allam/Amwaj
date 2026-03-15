type SeoLang = 'en' | 'ar';

type JsonLd = Record<string, unknown>;

export type SeoPayload = {
  lang: SeoLang;
  path: string;
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  structuredData?: JsonLd | JsonLd[];
};

const DEFAULT_SITE_ORIGIN = 'https://amwajalraeda.com';
const DEFAULT_IMAGE_PATH = '/brand/amwaj-logo-primary.png';
const SITE_NAME_EN = 'Amwaj Al-Raeda';
const SITE_NAME_AR = 'أمواج الرائدة';
const DEFAULT_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

const SOCIAL_PROFILES = [
  'https://www.instagram.com/amwaj_alraeda?igsh=bnZ0ZWhoOHg5emN2',
  'https://x.com/AmwajRaeda',
  'https://www.tiktok.com/@amwaj_alraeda?_r=1&_t=ZS-94M2fDFnEO4',
];

const normalizePath = (path: string) => {
  if (!path) return '/';
  return path.startsWith('/') ? path : `/${path}`;
};

const toLocalizedUrl = (path: string, origin: string, lang: SeoLang) => {
  const url = new URL(path, origin);

  if (lang === 'en') {
    url.searchParams.set('lang', 'en');
  } else {
    url.searchParams.delete('lang');
  }

  return url.toString();
};

const getSiteOrigin = () => {
  const configured = import.meta.env.VITE_SITE_URL?.trim();
  if (configured) {
    try {
      return new URL(configured).origin;
    } catch {
      return DEFAULT_SITE_ORIGIN;
    }
  }

  if (typeof window !== 'undefined' && window.location.origin) {
    return window.location.origin;
  }

  return DEFAULT_SITE_ORIGIN;
};

const toAbsoluteUrl = (urlOrPath: string, origin: string) => {
  try {
    return new URL(urlOrPath, origin).toString();
  } catch {
    return `${origin}${DEFAULT_IMAGE_PATH}`;
  }
};

const upsertMetaByName = (name: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const upsertMetaByProperty = (property: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const upsertCanonical = (href: string) => {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
};

const setAlternates = (enHref: string, arHref: string) => {
  const oldAlternates = Array.from(
    document.head.querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang], link[data-seo-alternate="true"]')
  );
  oldAlternates.forEach((el) => el.remove());

  const alternates = [
    { hrefLang: 'en', href: enHref },
    { hrefLang: 'ar', href: arHref },
    { hrefLang: 'x-default', href: arHref },
  ];

  alternates.forEach(({ hrefLang, href }) => {
    const link = document.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('hreflang', hrefLang);
    link.setAttribute('href', href);
    link.setAttribute('data-seo-alternate', 'true');
    document.head.appendChild(link);
  });
};

const setStructuredData = (schemas: JsonLd[]) => {
  const existing = Array.from(document.head.querySelectorAll<HTMLScriptElement>('script[data-seo-jsonld="true"]'));
  existing.forEach((node) => node.remove());

  schemas.forEach((schema) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo-jsonld', 'true');
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  });
};

const buildGlobalSchemas = (origin: string, lang: SeoLang, imageUrl: string): JsonLd[] => {
  const websiteName = lang === 'ar' ? SITE_NAME_AR : SITE_NAME_EN;
  const organizationName = lang === 'ar' ? SITE_NAME_AR : SITE_NAME_EN;
  const organizationAlternates = lang === 'ar' ? [SITE_NAME_EN, 'امواج الرائدة', 'Amwaj Alraeda'] : [SITE_NAME_AR, 'Amwaj Alraeda', 'امواج الرائدة'];

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'MarketingAgency',
      '@id': `${origin}/#organization`,
      name: organizationName,
      alternateName: organizationAlternates,
      url: origin,
      image: imageUrl,
      logo: imageUrl,
      email: 'info@amwajalraeda.com',
      telephone: '+966535800559',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Riyadh',
        addressCountry: 'SA',
      },
      areaServed: [
        {
          '@type': 'Country',
          name: 'Saudi Arabia',
        },
        {
          '@type': 'Country',
          name: 'المملكة العربية السعودية',
        },
      ],
      availableLanguage: ['ar-SA', 'en-US'],
      sameAs: SOCIAL_PROFILES,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${origin}/#website`,
      url: origin,
      name: websiteName,
      inLanguage: lang === 'ar' ? 'ar-SA' : 'en-US',
      publisher: {
        '@id': `${origin}/#organization`,
      },
    },
  ];
};

export const applySeo = ({
  lang,
  path,
  title,
  description,
  keywords,
  image = DEFAULT_IMAGE_PATH,
  imageAlt,
  type = 'website',
  noindex = false,
  structuredData,
}: SeoPayload) => {
  if (typeof document === 'undefined') {
    return;
  }

  const siteOrigin = getSiteOrigin();
  const pagePath = normalizePath(path);
  const arUrl = toLocalizedUrl(pagePath, siteOrigin, 'ar');
  const enUrl = toLocalizedUrl(pagePath, siteOrigin, 'en');
  const canonicalUrl = lang === 'ar' ? arUrl : enUrl;
  const imageUrl = toAbsoluteUrl(image, siteOrigin);
  const locale = lang === 'ar' ? 'ar_SA' : 'en_US';

  document.title = title;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  upsertMetaByName('description', description);
  upsertMetaByName(
    'keywords',
    keywords ||
      'أمواج الرائدة, امواج الرائدة, تسويق رقمي, بناء مواقع, تصميم مواقع, تحسين محركات البحث, إدارة السوشيال ميديا, إنشاء محتوى, Amwaj Al-Raeda, Saudi digital marketing agency, SEO services, web development agency'
  );
  upsertMetaByName('author', lang === 'ar' ? SITE_NAME_AR : SITE_NAME_EN);
  upsertMetaByName('language', lang === 'ar' ? 'ar-SA' : 'en-US');
  upsertMetaByName('robots', noindex ? 'noindex, nofollow, noarchive' : DEFAULT_ROBOTS);
  upsertMetaByName('googlebot', noindex ? 'noindex, nofollow, noarchive' : DEFAULT_ROBOTS);
  upsertMetaByName('referrer', 'strict-origin-when-cross-origin');
  upsertMetaByName('twitter:card', 'summary_large_image');
  upsertMetaByName('twitter:title', title);
  upsertMetaByName('twitter:description', description);
  upsertMetaByName('twitter:image', imageUrl);

  upsertMetaByProperty('og:type', type);
  upsertMetaByProperty('og:title', title);
  upsertMetaByProperty('og:description', description);
  upsertMetaByProperty('og:url', canonicalUrl);
  upsertMetaByProperty('og:site_name', lang === 'ar' ? SITE_NAME_AR : SITE_NAME_EN);
  upsertMetaByProperty('og:locale', locale);
  upsertMetaByProperty('og:locale:alternate', lang === 'ar' ? 'en_US' : 'ar_SA');
  upsertMetaByProperty('og:image', imageUrl);
  upsertMetaByProperty('og:image:alt', imageAlt || title);

  upsertCanonical(canonicalUrl);
  setAlternates(enUrl, arUrl);

  const pageSchemas = !structuredData ? [] : Array.isArray(structuredData) ? structuredData : [structuredData];
  const allSchemas = noindex ? pageSchemas : [...buildGlobalSchemas(siteOrigin, lang, imageUrl), ...pageSchemas];
  setStructuredData(allSchemas);
};
