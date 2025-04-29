
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Settings from "./pages/Settings";
import History from "./pages/History";
import Gamification from "./pages/Gamification";
import NotFound from "./pages/NotFound";
import { GamificationProvider } from "./contexts/GamificationContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <GamificationProvider>
        <BrowserRouter>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/history" element={<History />} />
            <Route path="/gamification" element={<Gamification />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </GamificationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
