import { Layout } from "@/components/layout/Layout";

const TermsPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>

        <p className="text-muted-foreground mb-4">
          By using Bharat Calculator, you agree to the following terms and conditions.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Use of Service</h2>
        <p className="text-muted-foreground">
          All calculators and tools provided on this website are for informational
          and educational purposes only.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Accuracy Disclaimer</h2>
        <p className="text-muted-foreground">
          While we strive for accuracy, Bharat Calculator does not guarantee the
          correctness of results. Always verify critical calculations independently.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Limitation of Liability</h2>
        <p className="text-muted-foreground">
          Bharat Calculator shall not be held liable for any losses or damages arising
          from the use of this website.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Changes to Terms</h2>
        <p className="text-muted-foreground">
          These terms may be updated at any time without prior notice.
        </p>
      </div>
    </Layout>
  );
};

export default TermsPage;
