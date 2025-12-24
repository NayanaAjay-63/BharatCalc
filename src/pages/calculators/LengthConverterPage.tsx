import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { CalculatorLayout } from '@/components/shared/CalculatorLayout';
import { LengthConverter } from '@/components/calculators/converters/LengthConverter';

const LengthConverterPage: React.FC = () => {
  return (
    <Layout>
      <CalculatorLayout
        title="Length Converter"
        description="Convert between different length units including metric and imperial."
        category="Unit Converters"
        categoryHref="/#converters"
      >
        <LengthConverter />
      </CalculatorLayout>
    </Layout>
  );
};

export default LengthConverterPage;
