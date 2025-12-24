import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { CalculatorCard } from '@/components/shared/CalculatorCard';
import { categories, searchCalculators } from '@/lib/calculatorData';
import { Search, ChevronRight, Calculator } from 'lucide-react';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const results = useMemo(() => {
    return searchCalculators(query);
  }, [query]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">Search Results</span>
        </nav>

        <div className="flex items-center gap-3 mb-6">
          <Search className="w-6 h-6 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold">
            {query ? `Results for "${query}"` : 'Search'}
          </h1>
        </div>

        {!query && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">Enter a search term to find calculators</p>
          </div>
        )}

        {query && results.length === 0 && (
          <div className="text-center py-12">
            <Calculator className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">No calculators found</p>
            <p className="text-muted-foreground mb-6">Try a different search or browse categories below</p>
            
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to="/calculators"
                  className="px-4 py-2 bg-secondary rounded-full text-sm hover:bg-accent transition-colors"
                >
                  {cat.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        {query && results.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {results.map((calc) => (
              <CalculatorCard
                key={calc.href}
                title={calc.title}
                description={calc.description}
                href={calc.href}
                icon={<Calculator className="w-5 h-5" />}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchPage;
