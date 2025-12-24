import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ChevronRight } from 'lucide-react';

const PrivacyPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">Privacy Policy</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: December 2024</p>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
            <p className="text-muted-foreground">
              CalcSuite is designed with privacy in mind. All calculations are performed locally in your browser, 
              and we do not collect or store your calculation data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Account Information</h2>
            <p className="text-muted-foreground">
              If you create an account, we collect your email address to provide login functionality 
              and sync your favorites and calculation history. You can delete your account and data at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Cookies and Analytics</h2>
            <p className="text-muted-foreground">
              We use essential cookies for site functionality (like remembering your theme preference). 
              We may use anonymous analytics to understand how our site is used and improve our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Third-Party APIs</h2>
            <p className="text-muted-foreground">
              Some features (like PIN Code Lookup and IFSC Lookup) use third-party APIs. 
              When you use these features, your queries are sent to these services. 
              Please refer to their respective privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Data Security</h2>
            <p className="text-muted-foreground">
              We implement appropriate security measures to protect any information you provide. 
              However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Contact</h2>
            <p className="text-muted-foreground">
              If you have questions about this privacy policy, please{' '}
              <Link to="/contact" className="text-primary hover:underline">contact us</Link>.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPage;
