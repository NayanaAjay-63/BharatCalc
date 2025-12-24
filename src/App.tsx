import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Calculator Pages
import SimpleCalculatorPage from "./pages/calculators/SimpleCalculatorPage";
import PercentageCalculatorPage from "./pages/calculators/PercentageCalculatorPage";
import EMICalculatorPage from "./pages/calculators/EMICalculatorPage";
import BMICalculatorPage from "./pages/calculators/BMICalculatorPage";
import AgeCalculatorPage from "./pages/calculators/AgeCalculatorPage";
import LengthConverterPage from "./pages/calculators/LengthConverterPage";
import GSTCalculatorPage from "./pages/calculators/GSTCalculatorPage";
import SIPCalculatorPage from "./pages/calculators/SIPCalculatorPage";
import DiscountCalculatorPage from "./pages/calculators/DiscountCalculatorPage";

// Utility Pages
import PinCodeLookupPage from "./pages/utilities/PinCodeLookupPage";
import IFSCLookupPage from "./pages/utilities/IFSCLookupPage";

// Auth Pages
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Basic Calculators */}
            <Route path="/calculator/simple" element={<SimpleCalculatorPage />} />
            <Route path="/calculator/percentage" element={<PercentageCalculatorPage />} />
            <Route path="/calculator/discount" element={<DiscountCalculatorPage />} />
            
            {/* Finance Calculators */}
            <Route path="/calculator/emi" element={<EMICalculatorPage />} />
            <Route path="/calculator/gst" element={<GSTCalculatorPage />} />
            <Route path="/calculator/sip" element={<SIPCalculatorPage />} />
            
            {/* Health Calculators */}
            <Route path="/calculator/bmi" element={<BMICalculatorPage />} />
            
            {/* Date/Time Calculators */}
            <Route path="/calculator/age" element={<AgeCalculatorPage />} />
            
            {/* Converters */}
            <Route path="/converter/length" element={<LengthConverterPage />} />
            
            {/* Utilities */}
            <Route path="/utility/pin-lookup" element={<PinCodeLookupPage />} />
            <Route path="/utility/ifsc-lookup" element={<IFSCLookupPage />} />
            
            {/* Auth */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
