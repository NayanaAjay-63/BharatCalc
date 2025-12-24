import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ChevronRight, AlertTriangle } from 'lucide-react';

const DisclaimerPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">Disclaimer</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold mb-2">Disclaimer</h1>
        <p className="text-muted-foreground mb-8">Last updated: December 2024</p>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-8 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 dark:text-amber-200">
            The calculators and tools provided on this website are for informational and educational purposes only.
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">General Disclaimer</h2>
            <p className="text-muted-foreground">
              While we strive to provide accurate calculations, the results should not be considered 
              as professional financial, medical, legal, or any other type of advice. Always consult 
              with qualified professionals for important decisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Financial Calculators</h2>
            <p className="text-muted-foreground">
              Financial calculators (EMI, SIP, loan, interest calculators) provide estimates based on 
              the inputs you provide. Actual figures may vary based on bank policies, market conditions, 
              and other factors. Consult with a financial advisor for investment decisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Health Calculators</h2>
            <p className="text-muted-foreground">
              Health calculators (BMI, BMR, calorie calculators) provide general estimates and should 
              not be used as a substitute for professional medical advice. Consult with healthcare 
              professionals for health-related decisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">API Lookups</h2>
            <p className="text-muted-foreground">
              PIN Code and IFSC lookup services rely on third-party data sources. While we try to 
              ensure accuracy, we cannot guarantee that the information is always up-to-date or complete.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Limitation of Liability</h2>
            <p className="text-muted-foreground">
              CalcSuite and its creators shall not be liable for any damages arising from the use 
              of this website or reliance on any information provided. Use at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Questions?</h2>
            <p className="text-muted-foreground">
              If you have questions about this disclaimer, please{' '}
              <Link to="/contact" className="text-primary hover:underline">contact us</Link>.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default DisclaimerPage;
