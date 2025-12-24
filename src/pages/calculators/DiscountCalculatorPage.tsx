import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { CalculatorLayout } from '@/components/shared/CalculatorLayout';
import { DiscountCalculator } from '@/components/calculators/basic/DiscountCalculator';

const DiscountCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <CalculatorLayout
        title="Discount Calculator"
        description="Calculate discounted prices and see how much you save on any purchase."
        category="Basic Calculators"
        categoryHref="/#basic"
      >
        <DiscountCalculator />
      </CalculatorLayout>
    </Layout>
  );
};

export default DiscountCalculatorPage;
