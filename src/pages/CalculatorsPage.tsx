import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { AdPlaceholder } from '@/components/shared/AdPlaceholder';
import { categories } from '@/lib/calculatorData';
import { 
  Calculator, PiggyBank, Heart, Calendar, ArrowLeftRight, Wrench,
  ChevronRight 
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Calculator: <Calculator className="w-5 h-5" />,
  PiggyBank: <PiggyBank className="w-5 h-5" />,
  Heart: <Heart className="w-5 h-5" />,
  Calendar: <Calendar className="w-5 h-5" />,
  ArrowLeftRight: <ArrowLeftRight className="w-5 h-5" />,
  Wrench: <Wrench className="w-5 h-5" />,
};

const CalculatorsPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">All Calculators</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold mb-2">All Calculators</h1>
        <p className="text-muted-foreground mb-8">
          Browse our complete collection of calculators and tools.
        </p>

        {/* Top Ad */}
        <div className="mb-8 flex justify-center">
          <AdPlaceholder size="leaderboard" />
        </div>

        {/* Side-by-side Category Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-card rounded-xl border border-border p-5 shadow-swiss">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  {iconMap[category.icon] || <Calculator className="w-5 h-5" />}
                </div>
                <div>
                  <h2 className="font-semibold text-lg">{category.title}</h2>
                  <p className="text-xs text-muted-foreground">{category.description}</p>
                </div>
              </div>
              
              <ul className="space-y-2">
                {category.calculators.map((calc) => (
                  <li key={calc.href}>
                    <Link
                      to={calc.href}
                      className="group flex items-center gap-2 py-1.5 px-2 -mx-2 rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                      <span className="text-sm font-medium group-hover:text-primary transition-colors">
                        {calc.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CalculatorsPage;
