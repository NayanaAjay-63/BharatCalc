import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { CalculatorLayout } from '@/components/shared/CalculatorLayout';
import { GSTCalculator } from '@/components/calculators/finance/GSTCalculator';

const GSTCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <CalculatorLayout
        title="GST Calculator"
        description="Calculate GST amounts with CGST and SGST breakdown for Indian tax calculations."
        category="Finance Calculators"
        categoryHref="/#finance"
      >
        <GSTCalculator />
      </CalculatorLayout>
    </Layout>
  );
};

export default GSTCalculatorPage;
