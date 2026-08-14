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

const DEFAULT_SITE_ORIGIN = 'https://www.amwajalraeda.com';
const DEFAULT_IMAGE_PATH = '/brand/amwaj-logo-primary.png';
const DEFAULT_LOGO_WIDTH = 662;
const DEFAULT_LOGO_HEIGHT = 513;
const SITE_NAME_EN = 'Amwaj Al-Raeda';
const SITE_NAME_AR = 'أمواج الرائدة';
const DEFAULT_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
const X_HANDLE = '@AmwajRaeda';

const SOCIAL_PROFILES = [
  'https://www.instagram.com/amwaj_alraeda?igsh=bnZ0ZWhoOHg5emN2',
  'https://x.com/AmwajRaeda',
  'https://www.tiktok.com/@amwaj_alraeda?_r=1&_t=ZS-94M2fDFnEO4',
];

const normalizePath = (path: string) => {
  if (!path) return '/';
  return path.startsWith('/') ? path : `/${path}`;
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
    const host = window.location.hostname.toLowerCase();
    const isLocalHost = host === 'localhost' || host === '127.0.0.1' || host === '::1';
    if (isLocalHost) {
      return window.location.origin;
    }
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

const setAlternates = (arHref: string, enHref: string) => {
  const oldAlternates = Array.from(
    document.head.querySelectorAll<HTMLLinkElement>(
      'link[data-seo-alternate="true"], link[rel="alternate"][hreflang], link[rel="alternate"][hrefLang]'
    )
  );
  oldAlternates.forEach((el) => el.remove());

  const alternates = [
    { hrefLang: 'ar', href: arHref },
    { hrefLang: 'en', href: enHref },
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

const buildGlobalSchemas = (origin: string, imageUrl: string): JsonLd[] => {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'MarketingAgency',
      '@id': `${origin}/#organization`,
      name: SITE_NAME_AR,
      alternateName: [SITE_NAME_EN, 'Amwaj Alraeda', 'امواج الرائدة', 'امواج الرايدة', 'امواج الرايده'],
      url: origin,
      image: imageUrl,
      logo: {
        '@type': 'ImageObject',
        url: imageUrl,
        width: DEFAULT_LOGO_WIDTH,
        height: DEFAULT_LOGO_HEIGHT,
      },
      email: 'info@amwajalraeda.com',
      telephone: '+966535800559',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Riyadh',
        addressCountry: 'SA',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Saudi Arabia',
      },
      availableLanguage: ['ar', 'en'],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+966535800559',
          contactType: 'customer support',
          areaServed: 'SA',
          availableLanguage: ['ar', 'en'],
        },
      ],
      sameAs: SOCIAL_PROFILES,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${origin}/#website`,
      url: origin,
      name: SITE_NAME_AR,
      alternateName: [SITE_NAME_EN, 'Amwaj Alraeda'],
      inLanguage: ['ar-SA', 'en-SA'],
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
  const arUrl = toAbsoluteUrl(pagePath, siteOrigin);
  const enUrlObject = new URL(pagePath, siteOrigin);
  enUrlObject.searchParams.set('lang', 'en');
  const enUrl = enUrlObject.toString();
  const canonicalUrl = lang === 'en' ? enUrl : arUrl;
  const imageUrl = toAbsoluteUrl(image, siteOrigin);
  const locale = lang === 'ar' ? 'ar_SA' : 'en_US';
  const languageTag = lang === 'ar' ? 'ar-SA' : 'en-SA';

  document.title = title;

  upsertMetaByName('description', description);
  upsertMetaByName(
    'keywords',
    keywords ||
      'Amwaj Al-Raeda, marketing agency Saudi Arabia, digital marketing Riyadh, website development Saudi Arabia, seo services, أمواج الرائدة, امواج الرائدة, امواج الرايدة, امواج الرايده, وكالة تسويق رقمي, تسويق رقمي الرياض, بناء مواقع, تصميم مواقع, تحسين محركات البحث'
  );
  upsertMetaByName('author', lang === 'ar' ? SITE_NAME_AR : SITE_NAME_EN);
  upsertMetaByName('language', languageTag);
  upsertMetaByName('geo.region', 'SA');
  upsertMetaByName('geo.placename', 'Riyadh');
  upsertMetaByName('robots', noindex ? 'noindex, nofollow, noarchive' : DEFAULT_ROBOTS);
  upsertMetaByName('googlebot', noindex ? 'noindex, nofollow, noarchive' : DEFAULT_ROBOTS);
  upsertMetaByName('referrer', 'strict-origin-when-cross-origin');
  upsertMetaByName('twitter:card', 'summary_large_image');
  upsertMetaByName('twitter:site', X_HANDLE);
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
  setAlternates(arUrl, enUrl);

  document.documentElement.lang = languageTag;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  if (document.body) {
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  const pageSchemas = !structuredData ? [] : Array.isArray(structuredData) ? structuredData : [structuredData];
  const pageSchema: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: title,
    description,
    inLanguage: languageTag,
    isPartOf: {
      '@id': `${siteOrigin}/#website`,
    },
    about: {
      '@id': `${siteOrigin}/#organization`,
    },
  };

  const allSchemas = noindex ? pageSchemas : [...buildGlobalSchemas(siteOrigin, imageUrl), pageSchema, ...pageSchemas];
  setStructuredData(allSchemas);
};
