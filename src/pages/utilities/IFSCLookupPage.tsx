import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { CalculatorLayout } from '@/components/shared/CalculatorLayout';
import { IFSCLookup } from '@/components/utilities/IFSCLookup';

const IFSCLookupPage: React.FC = () => {
  return (
    <Layout>
      <CalculatorLayout
        title="IFSC Code Lookup"
        description="Get bank details including branch name, address, and supported services from IFSC code."
        category="API Utilities"
        categoryHref="/#utilities"
      >
        <IFSCLookup />
      </CalculatorLayout>
    </Layout>
  );
};

export default IFSCLookupPage;
