import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { CalculatorLayout } from '@/components/shared/CalculatorLayout';
import { AgeCalculator } from '@/components/calculators/datetime/AgeCalculator';

const AgeCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <CalculatorLayout
        title="Age Calculator"
        description="Calculate your exact age in years, months, days, and more from your date of birth."
        category="Date & Time Calculators"
        categoryHref="/#datetime"
      >
        <AgeCalculator />
      </CalculatorLayout>
    </Layout>
  );
};

export default AgeCalculatorPage;
