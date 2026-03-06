import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSeo } from "@/hooks/useSeo";

const NotFound = () => {
  const location = useLocation();
  const { lang } = useLanguage();

  useSeo({
    lang,
    path: location.pathname || '/404',
    title: lang === 'ar' ? 'الصفحة غير موجودة | أمواج الرائدة' : 'Page Not Found | Amwaj Al-Raeda',
    description:
      lang === 'ar'
        ? 'الصفحة التي تبحث عنها غير متاحة حالياً. يمكنك العودة إلى الصفحة الرئيسية.'
        : 'The page you are looking for is not available. Return to the homepage to continue browsing.',
    noindex: true,
    image: '/brand/amwaj-logo-primary.png',
  });

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.warn("404 route visited:", location.pathname);
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
