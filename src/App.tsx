import { useEffect, useRef } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LocomotiveScroll from "locomotive-scroll";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import ContactThankYou from "./pages/ContactThankYou";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ScrollManager = () => {
  const location = useLocation();
  const locomotiveRef = useRef<LocomotiveScroll | null>(null);

  useEffect(() => {
    const locomotive = new LocomotiveScroll({
      lenisOptions: {
        lerp: 0.075,
        duration: 1.15,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.05,
      },
    });

    locomotiveRef.current = locomotive;

    return () => {
      locomotive.destroy();
      locomotiveRef.current = null;
    };
  }, []);

  useEffect(() => {
    const locomotive = locomotiveRef.current;
    if (!locomotive) {
      return;
    }

    const rafId = window.requestAnimationFrame(() => {
      const hash = location.hash.replace('#', '').trim();
      if (hash) {
        const targetEl = document.getElementById(decodeURIComponent(hash));
        if (targetEl) {
          locomotive.scrollTo(targetEl, { offset: -96, duration: 0, immediate: true, force: true });
          locomotive.resize();
          return;
        }
      }

      locomotive.scrollTo(0, { immediate: true, force: true });
      locomotive.resize();
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
