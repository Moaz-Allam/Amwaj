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
    if (!locomotiveRef.current) {
      return;
    }

    locomotiveRef.current.scrollTo(0, { immediate: true, force: true });
    locomotiveRef.current.resize();
  }, [location.pathname]);

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
