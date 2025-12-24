import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { CalculatorLayout } from '@/components/shared/CalculatorLayout';
import { PinCodeLookup } from '@/components/utilities/PinCodeLookup';

const PinCodeLookupPage: React.FC = () => {
  return (
    <Layout>
      <CalculatorLayout
        title="PIN Code Lookup"
        description="Look up area, district, state, and post office details for any Indian PIN code."
        category="API Utilities"
        categoryHref="/#utilities"
      >
        <PinCodeLookup />
      </CalculatorLayout>
    </Layout>
  );
};

export default PinCodeLookupPage;
