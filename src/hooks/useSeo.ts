import { useEffect, useMemo } from 'react';
import { applySeo, SeoPayload } from '@/lib/seo';

export const useSeo = (payload: SeoPayload) => {
  const { description, image, imageAlt, keywords, lang, noindex, path, title, type, structuredData } = payload;
  const serializedStructuredData = useMemo(() => JSON.stringify(structuredData ?? null), [structuredData]);

  useEffect(() => {
    const parsedStructuredData =
      serializedStructuredData === 'null'
        ? undefined
        : (JSON.parse(serializedStructuredData) as SeoPayload['structuredData']);

    applySeo({
      description,
      image,
      imageAlt,
      keywords,
      lang,
      noindex,
      path,
      title,
      type,
      structuredData: parsedStructuredData,
    });
  }, [
    description,
    image,
    imageAlt,
    keywords,
    lang,
    noindex,
    path,
    title,
    type,
    serializedStructuredData,
  ]);
};
