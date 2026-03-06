import { useEffect, useRef } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import type LocomotiveScroll from "locomotive-scroll";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import ContactThankYou from "./pages/ContactThankYou";
import Services from "./pages/Services";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean;
    effectiveType?: string;
  };
};

const ScrollManager = () => {
  const location = useLocation();
  const locomotiveRef = useRef<LocomotiveScroll | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const connection = (navigator as NavigatorWithConnection).connection;
    const isDataSaverEnabled = Boolean(connection?.saveData);
    const isSlowConnection = connection?.effectiveType ? /2g/.test(connection.effectiveType) : false;

    if (prefersReducedMotion || isDataSaverEnabled || isSlowConnection) {
      return;
    }

    let isCancelled = false;
    let instance: LocomotiveScroll | null = null;

    const initLocomotive = async () => {
      const { default: LocomotiveScrollClass } = await import('locomotive-scroll');
      if (isCancelled) {
        return;
      }

      instance = new LocomotiveScrollClass({
        lenisOptions: {
          lerp: 0.075,
          duration: 1.15,
          wheelMultiplier: 0.9,
          touchMultiplier: 1.05,
        },
      });

      locomotiveRef.current = instance;
    };

    void initLocomotive();

    return () => {
      isCancelled = true;
      instance?.destroy();
      locomotiveRef.current = null;
    };
  }, []);

  useEffect(() => {
    const locomotive = locomotiveRef.current;

    const rafId = window.requestAnimationFrame(() => {
      const hash = location.hash.replace('#', '').trim();
      if (hash) {
        const targetEl = document.getElementById(decodeURIComponent(hash));
        if (targetEl) {
          if (locomotive) {
            locomotive.scrollTo(targetEl, { offset: -96, duration: 0, immediate: true, force: true });
            locomotive.resize();
          } else {
            const targetTop = targetEl.getBoundingClientRect().top + window.scrollY - 96;
            window.scrollTo({ top: Math.max(0, targetTop), left: 0, behavior: 'auto' });
          }

          return;
        }
      }

      if (locomotive) {
        locomotive.scrollTo(0, { immediate: true, force: true });
        locomotive.resize();
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }
    });

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [location.pathname, location.hash]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <LanguageProvider>
          <ScrollManager />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/contact/thank-you" element={<ContactThankYou />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
