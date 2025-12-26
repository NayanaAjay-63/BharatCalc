import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { CategorySection } from '@/components/shared/CategorySection';
import { CalculatorCard } from '@/components/shared/CalculatorCard';
import { AdPlaceholder } from '@/components/shared/AdPlaceholder';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Calculator,
  Percent,
  PiggyBank,
  Heart,
  Calendar,
  Ruler,
  Wrench,
  Search,
  ArrowRight,
  MapPin,
  Building2,
  Scale,
  Banknote,
  Activity,
  Clock,
  ArrowLeftRight,
  Zap,
  QrCode,
  Key,
  Divide,
  Thermometer,
  HardDrive,
} from 'lucide-react';

const categories = [
  {
    id: 'basic',
    title: 'Basic Calculators',
    description: 'Quick everyday math, done instantly.',
    icon: <Calculator className="w-6 h-6" />,
    calculators: [
      { title: 'Simple Calculator', description: 'Basic arithmetic operations', icon: <Calculator className="w-5 h-5" />, href: '/calculators/basic/simple' },
      { title: 'Percentage Calculator', description: 'Calculate percentages easily', icon: <Percent className="w-5 h-5" />, href: '/calculators/basic/percentage' },
      { title: 'Discount Calculator', description: 'Find discounted prices', icon: <Banknote className="w-5 h-5" />, href: '/calculators/basic/discount' },
      { title: 'Average Calculator', description: 'Calculate mean, median, mode', icon: <Scale className="w-5 h-5" />, href: '/calculators/basic/average' },
      { title: 'Fraction Calculator', description: 'Add, subtract, multiply fractions', icon: <Divide className="w-5 h-5" />, href: '/calculators/basic/fraction' },
      { title: 'Random Number Generator', description: 'Generate random numbers', icon: <Zap className="w-5 h-5" />, href: '/calculators/basic/random' },
    ],
  },
  {
    id: 'finance',
    title: 'Finance Calculators',
    description: 'Smart financial tools for planning and decisions.',
    icon: <PiggyBank className="w-6 h-6" />,
    calculators: [
      { title: 'EMI Calculator', description: 'Calculate loan EMIs instantly', icon: <Banknote className="w-5 h-5" />, href: '/calculators/finance/emi' },
      { title: 'GST Calculator', description: 'Calculate GST amounts', icon: <Percent className="w-5 h-5" />, href: '/calculators/finance/gst' },
      { title: 'SIP Calculator', description: 'Plan your SIP investments', icon: <PiggyBank className="w-5 h-5" />, href: '/calculators/finance/sip' },
      { title: 'Compound Interest', description: 'Calculate compound interest', icon: <Calculator className="w-5 h-5" />, href: '/calculators/finance/compound-interest' },
      { title: 'Simple Interest', description: 'Calculate simple interest', icon: <Calculator className="w-5 h-5" />, href: '/calculators/finance/simple-interest' },
    ],
  },
  {
    id: 'health',
    title: 'Health Calculators',
    description: 'Health calculations made simple.',
    icon: <Heart className="w-6 h-6" />,
    calculators: [
      { title: 'BMI Calculator', description: 'Calculate Body Mass Index', icon: <Activity className="w-5 h-5" />, href: '/calculators/health/bmi' },
      { title: 'BMR Calculator', description: 'Calculate Basal Metabolic Rate', icon: <Zap className="w-5 h-5" />, href: '/calculators/health/bmr' },
      { title: 'Calorie Calculator', description: 'Daily calorie needs', icon: <Heart className="w-5 h-5" />, href: '/calculators/health/calories' },
      { title: 'Ideal Weight', description: 'Find your ideal weight', icon: <Scale className="w-5 h-5" />, href: '/calculators/health/ideal-weight' },
      { title: 'Body Fat Calculator', description: 'Estimate body fat percentage', icon: <Activity className="w-5 h-5" />, href: '/calculators/health/body-fat' },
    ],
  },
  {
    id: 'datetime',
    title: 'Date & Time Calculators',
    description: 'Precise time and date utilities.',
    icon: <Calendar className="w-6 h-6" />,
    calculators: [
      { title: 'Age Calculator', description: 'Calculate exact age from DOB', icon: <Calendar className="w-5 h-5" />, href: '/calculators/datetime/age' },
      { title: 'Days Between Dates', description: 'Count days between two dates', icon: <Clock className="w-5 h-5" />, href: '/calculators/datetime/days-between' },
      { title: 'Add/Subtract Days', description: 'Add or subtract days from a date', icon: <Calendar className="w-5 h-5" />, href: '/calculators/datetime/add-days' },
      { title: 'Time Duration', description: 'Calculate time duration', icon: <Clock className="w-5 h-5" />, href: '/calculators/datetime/time-duration' },
    ],
  },
  {
    id: 'converters',
    title: 'Unit Converters',
    description: 'Convert anything, instantly.',
    icon: <ArrowLeftRight className="w-6 h-6" />,
    calculators: [
      { title: 'Length Converter', description: 'Convert length units', icon: <Ruler className="w-5 h-5" />, href: '/calculators/units/length' },
      { title: 'Weight Converter', description: 'Convert weight units', icon: <Scale className="w-5 h-5" />, href: '/calculators/units/weight' },
      { title: 'Temperature Converter', description: 'Convert temperature units', icon: <Thermometer className="w-5 h-5" />, href: '/calculators/units/temperature' },
      { title: 'Data Units Converter', description: 'Convert digital storage units', icon: <HardDrive className="w-5 h-5" />, href: '/calculators/units/data' },
      { title: 'Area Converter', description: 'Convert area units', icon: <ArrowLeftRight className="w-5 h-5" />, href: '/calculators/units/area' },
      { title: 'Volume Converter', description: 'Convert volume units', icon: <ArrowLeftRight className="w-5 h-5" />, href: '/calculators/units/volume' },
      { title: 'Speed Converter', description: 'Convert speed units', icon: <Zap className="w-5 h-5" />, href: '/calculators/units/speed' },
    ],
  },
  {
    id: 'utilities',
    title: 'API Utilities',
    description: 'Lookup services for India.',
    icon: <Wrench className="w-6 h-6" />,
    calculators: [
      { title: 'PIN Code Lookup', description: 'Get details for any Indian PIN', icon: <MapPin className="w-5 h-5" />, href: '/calculators/api/pin-lookup' },
      { title: 'IFSC Code Lookup', description: 'Get bank details from IFSC', icon: <Building2 className="w-5 h-5" />, href: '/calculators/api/ifsc-lookup' },
    ],
  },
  {
    id: 'misc',
    title: 'Misc Tools',
    description: 'Handy tools for everyday use.',
    icon: <Wrench className="w-6 h-6" />,
    calculators: [
      { title: 'QR Code Generator', description: 'Generate QR codes instantly', icon: <QrCode className="w-5 h-5" />, href: '/tools/qr-generator' },
      { title: 'Password Generator', description: 'Generate secure passwords', icon: <Key className="w-5 h-5" />, href: '/tools/password-generator' },
    ],
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;

    const query = searchQuery.toLowerCase();
    return categories
      .map((category) => ({
        ...category,
        calculators: category.calculators.filter(
          (calc) =>
            calc.title.toLowerCase().includes(query) ||
            calc.description.toLowerCase().includes(query)
        ),
      }))
      .filter((category) => category.calculators.length > 0);
  }, [searchQuery]);

  const allCalculators = useMemo(() => {
    return categories.flatMap((c) => c.calculators);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-accent/50 to-background py-16 lg:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/5" />
          <div className="absolute bottom-10 right-20 w-48 h-48 rounded-full bg-primary/5" />
          <div className="absolute top-40 right-1/4 w-20 h-20 rounded-lg bg-primary/5 rotate-45" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              One Platform.{' '}
              <span className="text-primary">Unlimited Calculators.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Finance, Health, Date, Physics, Conversions & More — All Fully Functional.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for a calculator..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg bg-card shadow-swiss-lg"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setSearchQuery('')}
                >
                  Clear
                </Button>
              )}
            </div>

            {/* Quick Stats */}
            <div className="flex justify-center gap-8 mt-10 text-sm">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{allCalculators.length}+</p>
                <p className="text-muted-foreground">Calculators</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{categories.length}</p>
                <p className="text-muted-foreground">Categories</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">100%</p>
                <p className="text-muted-foreground">Free</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Ad */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center">
          <AdPlaceholder size="leaderboard" />
        </div>
      </div>

      {/* Categories Grid */}
      <section className="container mx-auto px-4 py-8">
        {searchQuery && filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl font-medium mb-2">No calculators found</p>
            <p className="text-muted-foreground">Try searching for something else</p>
          </div>
        )}

        <div className="space-y-6">
          {filteredCategories.map((category, index) => (
            <CategorySection
              key={category.id}
              title={category.title}
              description={category.description}
              icon={category.icon}
              defaultOpen={index === 0 || searchQuery.length > 0}
            >
              {category.calculators.map((calc) => (
                <CalculatorCard
                  key={calc.href}
                  title={calc.title}
                  description={calc.description}
                  icon={calc.icon}
                  href={calc.href}
                />
              ))}
            </CategorySection>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Save Your Calculations
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Sign up to save your calculations, access history, and sync across devices.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="swiss" size="lg" asChild>
              <Link to="/signup">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
