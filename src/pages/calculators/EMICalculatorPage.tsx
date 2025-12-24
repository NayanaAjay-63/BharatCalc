import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { CalculatorLayout } from '@/components/shared/CalculatorLayout';
import { EMICalculator } from '@/components/calculators/finance/EMICalculator';

const EMICalculatorPage: React.FC = () => {
  return (
    <Layout>
      <CalculatorLayout
        title="EMI Calculator"
        description="Calculate your Equated Monthly Installment for loans with the EMI formula."
        category="Finance Calculators"
        categoryHref="/#finance"
      >
        <EMICalculator />
      </CalculatorLayout>
    </Layout>
  );
};

export default EMICalculatorPage;
