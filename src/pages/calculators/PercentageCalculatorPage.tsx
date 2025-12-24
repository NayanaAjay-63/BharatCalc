import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { CalculatorLayout } from '@/components/shared/CalculatorLayout';
import { PercentageCalculator } from '@/components/calculators/basic/PercentageCalculator';

const PercentageCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <CalculatorLayout
        title="Percentage Calculator"
        description="Calculate percentages, find what percent one number is of another."
        category="Basic Calculators"
        categoryHref="/#basic"
      >
        <PercentageCalculator />
      </CalculatorLayout>
    </Layout>
  );
};

export default PercentageCalculatorPage;
