import { Layout } from "@/components/layout/Layout";

const TermsPage = () => {
  return (
       <Layout>
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Terms & Conditions
        </h1>

        <div className="space-y-5 text-sm md:text-base text-muted-foreground leading-relaxed">
          <p>
            This website is provided for <strong>informational and utility purposes only</strong>.
          </p>

          <p>
            We do not guarantee the accuracy, completeness, or reliability of any content,
            calculations, or results available on this website.
          </p>

          <p>
            Users access and use this website entirely <strong>at their own risk</strong>.
            We are not responsible for any loss or damage arising from the use of this website.
          </p>

          <p>
            All tools and calculators provided on this website are <strong>not professional advice</strong>,
            including financial, legal, or medical advice. Users should consult qualified professionals
            before making any decisions.
          </p>

          <p>
            Advertisements displayed on this website are <strong>third-party ads</strong>.
            We do not control, endorse, or take responsibility for their content.
            Clicking on advertisements is the user’s responsibility.
          </p>

          <p>
            We do not support or promote illegal, adult, gambling, betting, or fraudulent content.
            Any such ads are served by third-party advertising networks beyond our direct control.
          </p>

          <p>
            This website may contain links to third-party websites.
            We are not responsible for the content, services, or policies of external websites.
          </p>

          <p>
            We may use cookies or similar technologies for analytics and advertising purposes.
            Users can manage or disable cookies through their browser settings.
          </p>

          <p>
            Users must not misuse this website, including attempting hacking, scraping,
            unauthorized access, or any form of abuse.
          </p>

          <p>
            Content on this website may be updated, modified, or removed at any time
            without prior notice.
          </p>

          <p>
            We reserve the right to suspend or terminate access to the website
            if these Terms & Conditions are violated.
          </p>

          <p>
            All trademarks, logos, and brand names displayed on this website
            belong to their respective owners.
          </p>

          <p>
            By using this website, you acknowledge that you have read, understood,
            and agreed to these Terms & Conditions.
          </p>

          <p>
            Any disputes arising from the use of this website shall be governed by
            <strong> Indian laws</strong> and subject to Indian jurisdiction.
          </p>

          <p>
            For any issues or complaints, users may contact us through the
            contact options available on this website.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default TermsPage;
