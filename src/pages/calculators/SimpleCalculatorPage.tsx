import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { CalculatorLayout } from '@/components/shared/CalculatorLayout';
import { SimpleCalculator } from '@/components/calculators/basic/SimpleCalculator';

const SimpleCalculatorPage: React.FC = () => {
  return (
    <Layout>
      <CalculatorLayout
        title="Simple Calculator"
        description="Perform basic arithmetic operations quickly and easily."
        category="Basic Calculators"
        categoryHref="/#basic"
      >
        <SimpleCalculator />
      </CalculatorLayout>
    </Layout>
  );
};

export default SimpleCalculatorPage;
