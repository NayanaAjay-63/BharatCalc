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


// Calculator Components
import { CalculatorLayout } from "./components/shared/CalculatorLayout";
import { SimpleCalculator } from "./components/calculators/basic/SimpleCalculator";
import { PercentageCalculator } from "./components/calculators/basic/PercentageCalculator";
import { DiscountCalculator } from "./components/calculators/basic/DiscountCalculator";
import { AverageCalculator } from "./components/calculators/basic/AverageCalculator";
import { RandomNumberGenerator } from "./components/calculators/basic/RandomNumberGenerator";
import { FractionCalculator } from "./components/calculators/basic/FractionCalculator";
import { EMICalculator } from "./components/calculators/finance/EMICalculator";
import { GSTCalculator } from "./components/calculators/finance/GSTCalculator";
import { SIPCalculator } from "./components/calculators/finance/SIPCalculator";
import { CompoundInterestCalculator } from "./components/calculators/finance/CompoundInterestCalculator";
import { SimpleInterestCalculator } from "./components/calculators/finance/SimpleInterestCalculator";
import { BMICalculator } from "./components/calculators/health/BMICalculator";
import { BMRCalculator } from "./components/calculators/health/BMRCalculator";
import { IdealWeightCalculator } from "./components/calculators/health/IdealWeightCalculator";
import { CalorieCalculator } from "./components/calculators/health/CalorieCalculator";
import { BodyFatCalculator } from "./components/calculators/health/BodyFatCalculator";
import { AgeCalculator } from "./components/calculators/datetime/AgeCalculator";
import { DaysBetweenCalculator } from "./components/calculators/datetime/DaysBetweenCalculator";
import { AddSubtractDaysCalculator } from "./components/calculators/datetime/AddSubtractDaysCalculator";
import { TimeDurationCalculator } from "./components/calculators/datetime/TimeDurationCalculator";
import { LengthConverter } from "./components/calculators/converters/LengthConverter";
import { WeightConverter } from "./components/calculators/converters/WeightConverter";
import { TemperatureConverter } from "./components/calculators/converters/TemperatureConverter";
import { DataUnitsConverter } from "./components/calculators/converters/DataUnitsConverter";
import { AreaConverter } from "./components/calculators/converters/AreaConverter";
import { VolumeConverter } from "./components/calculators/converters/VolumeConverter";
import { SpeedConverter } from "./components/calculators/converters/SpeedConverter";
import { PinCodeLookup } from "./components/utilities/PinCodeLookup";
import { IFSCLookup } from "./components/utilities/IFSCLookup";
import { AreaToPincodeLookup } from "./components/utilities/AreaToPincodeLookup";
import { QRCodeGenerator } from "./components/tools/QRCodeGenerator";
import { PasswordGenerator } from "./components/tools/PasswordGenerator";
import TermsPage from "./pages/TermsPage";

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
            <Route path="/calculators/basic/fraction" element={<CalculatorLayout title="Fraction Calculator" description="Add, subtract, multiply fractions" category="Basic"><FractionCalculator /></CalculatorLayout>} />

            {/* Finance Calculators */}
            <Route path="/calculators/finance/emi" element={<CalculatorLayout title="EMI Calculator" description="Calculate loan EMIs" category="Finance"><EMICalculator /></CalculatorLayout>} />
            <Route path="/calculators/finance/gst" element={<CalculatorLayout title="GST Calculator" description="Calculate GST amounts" category="Finance"><GSTCalculator /></CalculatorLayout>} />
            <Route path="/calculators/finance/sip" element={<CalculatorLayout title="SIP Calculator" description="Plan SIP investments" category="Finance"><SIPCalculator /></CalculatorLayout>} />
            <Route path="/calculators/finance/compound-interest" element={<CalculatorLayout title="Compound Interest Calculator" description="Calculate compound interest" category="Finance"><CompoundInterestCalculator /></CalculatorLayout>} />
            <Route path="/calculators/finance/simple-interest" element={<CalculatorLayout title="Simple Interest Calculator" description="Calculate simple interest" category="Finance"><SimpleInterestCalculator /></CalculatorLayout>} />

            {/* Health Calculators */}
            <Route path="/calculators/health/bmi" element={<CalculatorLayout title="BMI Calculator" description="Calculate Body Mass Index" category="Health"><BMICalculator /></CalculatorLayout>} />
            <Route path="/calculators/health/bmr" element={<CalculatorLayout title="BMR Calculator" description="Calculate Basal Metabolic Rate" category="Health"><BMRCalculator /></CalculatorLayout>} />
            <Route path="/calculators/health/ideal-weight" element={<CalculatorLayout title="Ideal Weight Calculator" description="Find your ideal weight" category="Health"><IdealWeightCalculator /></CalculatorLayout>} />
            <Route path="/calculators/health/calories" element={<CalculatorLayout title="Calorie Calculator" description="Daily calorie needs" category="Health"><CalorieCalculator /></CalculatorLayout>} />
            <Route path="/calculators/health/body-fat" element={<CalculatorLayout title="Body Fat Calculator" description="Estimate body fat percentage" category="Health"><BodyFatCalculator /></CalculatorLayout>} />

            {/* DateTime Calculators */}
            <Route path="/calculators/datetime/age" element={<CalculatorLayout title="Age Calculator" description="Calculate exact age from DOB" category="Date & Time"><AgeCalculator /></CalculatorLayout>} />
            <Route path="/calculators/datetime/days-between" element={<CalculatorLayout title="Days Between Dates" description="Count days between dates" category="Date & Time"><DaysBetweenCalculator /></CalculatorLayout>} />
            <Route path="/calculators/datetime/add-days" element={<CalculatorLayout title="Add/Subtract Days" description="Add or subtract days from a date" category="Date & Time"><AddSubtractDaysCalculator /></CalculatorLayout>} />
            <Route path="/calculators/datetime/time-duration" element={<CalculatorLayout title="Time Duration Calculator" description="Calculate time duration" category="Date & Time"><TimeDurationCalculator /></CalculatorLayout>} />

            {/* Unit Converters */}
            <Route path="/calculators/units/length" element={<CalculatorLayout title="Length Converter" description="Convert length units" category="Converters"><LengthConverter /></CalculatorLayout>} />
            <Route path="/calculators/units/weight" element={<CalculatorLayout title="Weight Converter" description="Convert weight units" category="Converters"><WeightConverter /></CalculatorLayout>} />
            <Route path="/calculators/units/temperature" element={<CalculatorLayout title="Temperature Converter" description="Convert temperature units" category="Converters"><TemperatureConverter /></CalculatorLayout>} />
            <Route path="/calculators/units/data" element={<CalculatorLayout title="Data Units Converter" description="Convert digital storage units" category="Converters"><DataUnitsConverter /></CalculatorLayout>} />
            <Route path="/calculators/units/area" element={<CalculatorLayout title="Area Converter" description="Convert area units" category="Converters"><AreaConverter /></CalculatorLayout>} />
            <Route path="/calculators/units/volume" element={<CalculatorLayout title="Volume Converter" description="Convert volume units" category="Converters"><VolumeConverter /></CalculatorLayout>} />
            <Route path="/calculators/units/speed" element={<CalculatorLayout title="Speed Converter" description="Convert speed units" category="Converters"><SpeedConverter /></CalculatorLayout>} />

            {/* API Utilities */}
            <Route path="/calculators/api/pin-lookup" element={<CalculatorLayout title="PIN Code Lookup" description="Get details for Indian PIN codes" category="API Utilities"><PinCodeLookup /></CalculatorLayout>} />
            <Route path="/calculators/api/ifsc-lookup" element={<CalculatorLayout title="IFSC Code Lookup" description="Get bank details from IFSC" category="API Utilities"><IFSCLookup /></CalculatorLayout>} />
            <Route path="/calculators/api/area-to-pin" element={<CalculatorLayout title="Area to PIN Code Finder" description="Find Indian PIN codes by area, locality or city" category="API Utilities"><AreaToPincodeLookup /></CalculatorLayout>} />

            {/* Misc Tools */}
            <Route path="/tools/QRCodeGenerator" element={<CalculatorLayout title="QR Code Generator" description="Generate QR codes instantly" category="Tools"><QRCodeGenerator /></CalculatorLayout>} />
            <Route path="/tools/PasswordGenerator" element={<CalculatorLayout title="Password Generator" description="Generate secure passwords" category="Tools"><PasswordGenerator /></CalculatorLayout>} />
            <Route path="/terms" element={<TermsPage />} />


            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
