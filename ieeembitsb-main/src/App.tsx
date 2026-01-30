import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "@/components/ScrollToTop";

import Index from "./pages/Index";
import About from "./pages/About";
import Execom from "./pages/Execom";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Achievements from "./pages/Achievements";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Hero from "./pages/Hero";


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
          <Route path="/about" element={<About />} />
          <Route path="/execom" element={<Execom />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Hero" element={<Hero />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
