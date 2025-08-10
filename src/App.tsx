import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Index from "./pages/Index";
import Marketplace from "./pages/Marketplace";
import Tokenize from "./pages/Tokenize";
import Dashboard from "./pages/Dashboard";
import IoTSim from "./pages/IoTSim";
import Voting from "./pages/Voting";
import NotFound from "./pages/NotFound";
import { AgroChainProvider } from "./state/AgroChainContext";
import { LocaleProvider } from "./state/LocaleContext";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AgroChainProvider>
          <LocaleProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/tokenize" element={<Tokenize />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/iot" element={<IoTSim />} />
                <Route path="/voting" element={<Voting />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </LocaleProvider>
        </AgroChainProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
