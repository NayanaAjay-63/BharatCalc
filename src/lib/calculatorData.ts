import {
  Calculator,
  Percent,
  PiggyBank,
  Heart,
  Calendar,
  Ruler,
  Wrench,
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
  Hash,
  Thermometer,
  HardDrive,
  TrendingUp,
  DollarSign,
  Target,
  Divide,
  Plus,
} from 'lucide-react';

export interface CalculatorItem {
  title: string;
  description: string;
  href: string;
  category: string;
  keywords: string[];
}

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  calculators: CalculatorItem[];
}

export const categories: Category[] = [
  {
    id: 'basic',
    title: 'Basic Calculators',
    description: 'Quick everyday math, done instantly.',
    icon: 'Calculator',
    calculators: [
      { title: 'Simple Calculator', description: 'Basic arithmetic operations', href: '/calculators/basic/simple', category: 'basic', keywords: ['add', 'subtract', 'multiply', 'divide', 'math'] },
      { title: 'Percentage Calculator', description: 'Calculate percentages easily', href: '/calculators/basic/percentage', category: 'basic', keywords: ['percent', 'ratio', 'fraction'] },
      { title: 'Discount Calculator', description: 'Find discounted prices', href: '/calculators/basic/discount', category: 'basic', keywords: ['sale', 'price', 'savings'] },
      { title: 'Average Calculator', description: 'Calculate mean, median, mode', href: '/calculators/basic/average', category: 'basic', keywords: ['mean', 'median', 'mode', 'statistics'] },
      { title: 'Fraction Calculator', description: 'Add, subtract, multiply fractions', href: '/calculators/basic/fraction', category: 'basic', keywords: ['numerator', 'denominator'] },
      { title: 'Random Number Generator', description: 'Generate random numbers', href: '/calculators/basic/random', category: 'basic', keywords: ['random', 'dice', 'lottery'] },
    ],
  },
  {
    id: 'finance',
    title: 'Finance Calculators',
    description: 'Smart financial tools for planning and decisions.',
    icon: 'PiggyBank',
    calculators: [
      { title: 'EMI Calculator', description: 'Calculate loan EMIs instantly', href: '/calculators/finance/emi', category: 'finance', keywords: ['loan', 'mortgage', 'payment', 'interest'] },
      { title: 'GST Calculator', description: 'Calculate GST amounts', href: '/calculators/finance/gst', category: 'finance', keywords: ['tax', 'india', 'goods', 'services'] },
      { title: 'SIP Calculator', description: 'Plan your SIP investments', href: '/calculators/finance/sip', category: 'finance', keywords: ['mutual fund', 'investment', 'monthly'] },
      { title: 'Compound Interest', description: 'Calculate compound interest', href: '/calculators/finance/compound-interest', category: 'finance', keywords: ['interest', 'principal', 'rate'] },
      { title: 'Simple Interest', description: 'Calculate simple interest', href: '/calculators/finance/simple-interest', category: 'finance', keywords: ['interest', 'principal', 'rate'] },
    ],
  },
  {
    id: 'health',
    title: 'Health Calculators',
    description: 'Health calculations made simple.',
    icon: 'Heart',
    calculators: [
      { title: 'BMI Calculator', description: 'Calculate Body Mass Index', href: '/calculators/health/bmi', category: 'health', keywords: ['weight', 'height', 'body', 'mass'] },
      { title: 'BMR Calculator', description: 'Calculate Basal Metabolic Rate', href: '/calculators/health/bmr', category: 'health', keywords: ['metabolism', 'calories', 'energy'] },
      { title: 'Calorie Calculator', description: 'Daily calorie needs', href: '/calculators/health/calories', category: 'health', keywords: ['food', 'diet', 'energy', 'tdee'] },
      { title: 'Ideal Weight Calculator', description: 'Find your ideal weight', href: '/calculators/health/ideal-weight', category: 'health', keywords: ['weight', 'height', 'healthy'] },
      { title: 'Body Fat Calculator', description: 'Estimate body fat percentage', href: '/calculators/health/body-fat', category: 'health', keywords: ['fat', 'lean', 'mass'] },
    ],
  },
  {
    id: 'datetime',
    title: 'Date & Time Calculators',
    description: 'Precise time and date utilities.',
    icon: 'Calendar',
    calculators: [
      { title: 'Age Calculator', description: 'Calculate exact age from DOB', href: '/calculators/datetime/age', category: 'datetime', keywords: ['birthday', 'years', 'months', 'days'] },
      { title: 'Days Between Dates', description: 'Count days between two dates', href: '/calculators/datetime/days-between', category: 'datetime', keywords: ['duration', 'difference', 'count'] },
      { title: 'Add/Subtract Days', description: 'Add or subtract days from a date', href: '/calculators/datetime/add-days', category: 'datetime', keywords: ['future', 'past', 'deadline'] },
      { title: 'Time Duration Calculator', description: 'Calculate time duration', href: '/calculators/datetime/time-duration', category: 'datetime', keywords: ['hours', 'minutes', 'seconds'] },
    ],
  },
  {
    id: 'units',
    title: 'Unit Converters',
    description: 'Convert anything, instantly.',
    icon: 'ArrowLeftRight',
    calculators: [
      { title: 'Length Converter', description: 'Convert length units', href: '/calculators/units/length', category: 'units', keywords: ['meter', 'feet', 'inch', 'cm', 'km', 'mile'] },
      { title: 'Weight Converter', description: 'Convert weight units', href: '/calculators/units/weight', category: 'units', keywords: ['kg', 'pound', 'ounce', 'gram'] },
      { title: 'Temperature Converter', description: 'Convert temperature units', href: '/calculators/units/temperature', category: 'units', keywords: ['celsius', 'fahrenheit', 'kelvin'] },
      { title: 'Data Units Converter', description: 'Convert digital storage units', href: '/calculators/units/data', category: 'units', keywords: ['byte', 'kb', 'mb', 'gb', 'tb'] },
      { title: 'Area Converter', description: 'Convert area units', href: '/calculators/units/area', category: 'units', keywords: ['sqft', 'sqm', 'acre', 'hectare'] },
      { title: 'Volume Converter', description: 'Convert volume units', href: '/calculators/units/volume', category: 'units', keywords: ['liter', 'gallon', 'ml', 'cup'] },
      { title: 'Speed Converter', description: 'Convert speed units', href: '/calculators/units/speed', category: 'units', keywords: ['kmph', 'mph', 'knot'] },
    ],
  },
  {
    id: 'api',
    title: 'API Utilities',
    description: 'Lookup services for India.',
    icon: 'Wrench',
    calculators: [
      { title: 'PIN Code Lookup', description: 'Get details for any Indian PIN', href: '/calculators/api/pin-lookup', category: 'api', keywords: ['postal', 'pincode', 'india', 'address'] },
      { title: 'IFSC Code Lookup', description: 'Get bank details from IFSC', href: '/calculators/api/ifsc-lookup', category: 'api', keywords: ['bank', 'branch', 'neft', 'rtgs'] },
    ],
  },
  {
    id: 'tools',
    title: 'Misc Tools',
    description: 'Handy tools for everyday use.',
    icon: 'Wrench',
    calculators: [
      { title: 'QR Code Generator', description: 'Generate QR codes instantly', href: '/tools/QRCodeGenerator', category: 'tools', keywords: ['qr', 'barcode', 'scan'] },
      { title: 'Password Generator', description: 'Generate secure passwords', href: '/tools/PasswordGenerator',category:'tools', keywords: ['password', 'security', 'random'] },
    ],
  },
];

export const getAllCalculators = (): CalculatorItem[] => {
  return categories.flatMap((c) => c.calculators);
};

export const searchCalculators = (query: string): CalculatorItem[] => {
  if (!query.trim()) return [];
  
  const q = query.toLowerCase().trim();
  const all = getAllCalculators();
  
  return all.filter((calc) => {
    const titleMatch = calc.title.toLowerCase().includes(q);
    const descMatch = calc.description.toLowerCase().includes(q);
    const keywordMatch = calc.keywords.some((k) => k.toLowerCase().includes(q));
    return titleMatch || descMatch || keywordMatch;
  }).slice(0, 8);
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find((c) => c.id === id);
};
