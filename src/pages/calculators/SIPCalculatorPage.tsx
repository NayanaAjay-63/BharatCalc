import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { CalculatorLayout } from '@/components/shared/CalculatorLayout';
import { SIPCalculator } from '@/components/calculators/finance/SIPCalculator';

const SIPCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <CalculatorLayout
        title="SIP Calculator"
        description="Calculate returns on your Systematic Investment Plan with our SIP calculator."
        category="Finance Calculators"
        categoryHref="/#finance"
      >
        <SIPCalculator />
      </CalculatorLayout>
    </Layout>
  );
};

export default SIPCalculatorPage;
