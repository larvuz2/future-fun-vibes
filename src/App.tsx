import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import GameDetails from "./pages/GameDetails";
import GamePlay from "./pages/GamePlay";
import HowItWorks from "./pages/HowItWorks";
import Upload from "./pages/Upload";
import Community from "./pages/Community";
import Documentation from "./pages/Documentation";
import Admin from "./pages/Admin";
import DocsAdmin from "./pages/DocsAdmin";

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/game/:id" element={<GameDetails />} />
          <Route path="/game/:id/play" element={<GamePlay />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/community" element={<Community />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/docs-admin" element={<DocsAdmin />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;