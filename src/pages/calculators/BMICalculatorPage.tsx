import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { CalculatorLayout } from '@/components/shared/CalculatorLayout';
import { BMICalculator } from '@/components/calculators/health/BMICalculator';

const BMICalculatorPage: React.FC = () => {
  return (
    <Layout>
      <CalculatorLayout
        title="BMI Calculator"
        description="Calculate your Body Mass Index to check if you're in a healthy weight range."
        category="Health Calculators"
        categoryHref="/#health"
      >
        <BMICalculator />
      </CalculatorLayout>
    </Layout>
  );
};

export default BMICalculatorPage;
