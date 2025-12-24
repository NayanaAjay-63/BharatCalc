import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Static Pages
import CalculatorsPage from "./pages/CalculatorsPage";
import SearchPage from "./pages/SearchPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";
import DisclaimerPage from "./pages/DisclaimerPage";
import ProfilePage from "./pages/ProfilePage";

// Auth Pages
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";

// Calculator Components
import { CalculatorLayout } from "./components/shared/CalculatorLayout";
import { SimpleCalculator } from "./components/calculators/basic/SimpleCalculator";
import { PercentageCalculator } from "./components/calculators/basic/PercentageCalculator";
import { DiscountCalculator } from "./components/calculators/basic/DiscountCalculator";
import { AverageCalculator } from "./components/calculators/basic/AverageCalculator";
import { RandomNumberGenerator } from "./components/calculators/basic/RandomNumberGenerator";
import { EMICalculator } from "./components/calculators/finance/EMICalculator";
import { GSTCalculator } from "./components/calculators/finance/GSTCalculator";
import { SIPCalculator } from "./components/calculators/finance/SIPCalculator";
import { CompoundInterestCalculator } from "./components/calculators/finance/CompoundInterestCalculator";
import { SimpleInterestCalculator } from "./components/calculators/finance/SimpleInterestCalculator";
import { BMICalculator } from "./components/calculators/health/BMICalculator";
import { BMRCalculator } from "./components/calculators/health/BMRCalculator";
import { AgeCalculator } from "./components/calculators/datetime/AgeCalculator";
import { DaysBetweenCalculator } from "./components/calculators/datetime/DaysBetweenCalculator";
import { LengthConverter } from "./components/calculators/converters/LengthConverter";
import { WeightConverter } from "./components/calculators/converters/WeightConverter";
import { TemperatureConverter } from "./components/calculators/converters/TemperatureConverter";
import { PinCodeLookup } from "./components/utilities/PinCodeLookup";
import { IFSCLookup } from "./components/utilities/IFSCLookup";

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
            <Route path="/calculators" element={<CalculatorsPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            
            {/* Basic Calculators */}
            <Route path="/calculators/basic/simple" element={<CalculatorLayout title="Simple Calculator" description="Basic arithmetic operations" category="Basic"><SimpleCalculator /></CalculatorLayout>} />
            <Route path="/calculators/basic/percentage" element={<CalculatorLayout title="Percentage Calculator" description="Calculate percentages easily" category="Basic"><PercentageCalculator /></CalculatorLayout>} />
            <Route path="/calculators/basic/discount" element={<CalculatorLayout title="Discount Calculator" description="Find discounted prices" category="Basic"><DiscountCalculator /></CalculatorLayout>} />
            <Route path="/calculators/basic/average" element={<CalculatorLayout title="Average Calculator" description="Calculate mean, median, mode" category="Basic"><AverageCalculator /></CalculatorLayout>} />
            <Route path="/calculators/basic/random" element={<CalculatorLayout title="Random Number Generator" description="Generate random numbers" category="Basic"><RandomNumberGenerator /></CalculatorLayout>} />
            
            {/* Finance Calculators */}
            <Route path="/calculators/finance/emi" element={<CalculatorLayout title="EMI Calculator" description="Calculate loan EMIs" category="Finance"><EMICalculator /></CalculatorLayout>} />
            <Route path="/calculators/finance/gst" element={<CalculatorLayout title="GST Calculator" description="Calculate GST amounts" category="Finance"><GSTCalculator /></CalculatorLayout>} />
            <Route path="/calculators/finance/sip" element={<CalculatorLayout title="SIP Calculator" description="Plan SIP investments" category="Finance"><SIPCalculator /></CalculatorLayout>} />
            <Route path="/calculators/finance/compound-interest" element={<CalculatorLayout title="Compound Interest Calculator" description="Calculate compound interest" category="Finance"><CompoundInterestCalculator /></CalculatorLayout>} />
            <Route path="/calculators/finance/simple-interest" element={<CalculatorLayout title="Simple Interest Calculator" description="Calculate simple interest" category="Finance"><SimpleInterestCalculator /></CalculatorLayout>} />
            
            {/* Health Calculators */}
            <Route path="/calculators/health/bmi" element={<CalculatorLayout title="BMI Calculator" description="Calculate Body Mass Index" category="Health"><BMICalculator /></CalculatorLayout>} />
            <Route path="/calculators/health/bmr" element={<CalculatorLayout title="BMR Calculator" description="Calculate Basal Metabolic Rate" category="Health"><BMRCalculator /></CalculatorLayout>} />
            
            {/* DateTime Calculators */}
            <Route path="/calculators/datetime/age" element={<CalculatorLayout title="Age Calculator" description="Calculate exact age from DOB" category="Date & Time"><AgeCalculator /></CalculatorLayout>} />
            <Route path="/calculators/datetime/days-between" element={<CalculatorLayout title="Days Between Dates" description="Count days between dates" category="Date & Time"><DaysBetweenCalculator /></CalculatorLayout>} />
            
            {/* Unit Converters */}
            <Route path="/calculators/units/length" element={<CalculatorLayout title="Length Converter" description="Convert length units" category="Converters"><LengthConverter /></CalculatorLayout>} />
            <Route path="/calculators/units/weight" element={<CalculatorLayout title="Weight Converter" description="Convert weight units" category="Converters"><WeightConverter /></CalculatorLayout>} />
            <Route path="/calculators/units/temperature" element={<CalculatorLayout title="Temperature Converter" description="Convert temperature units" category="Converters"><TemperatureConverter /></CalculatorLayout>} />
            
            {/* API Utilities */}
            <Route path="/calculators/api/pin-lookup" element={<CalculatorLayout title="PIN Code Lookup" description="Get details for Indian PIN codes" category="API Utilities"><PinCodeLookup /></CalculatorLayout>} />
            <Route path="/calculators/api/ifsc-lookup" element={<CalculatorLayout title="IFSC Code Lookup" description="Get bank details from IFSC" category="API Utilities"><IFSCLookup /></CalculatorLayout>} />
            
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
