import { Layout } from "@/components/layout/Layout";

const TermsPage = () => {
  return (
     (
    <Layout>
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Terms & Conditions
        </h1>

        <ol className="list-decimal pl-6 space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
          <li>
            This website is provided for <strong>informational and utility purposes only</strong>.
          </li>

          <li>
            We do not guarantee the accuracy, completeness, or reliability of any content,
            calculations, or results provided on this website.
          </li>

          <li>
            Users access and use this website <strong>at their own risk</strong>.
            We are not responsible for any loss or damage arising from the use of the website.
          </li>

          <li>
            All tools and calculators available on this website do <strong>not constitute professional advice</strong>,
            including financial, legal, or medical advice.
          </li>

          <li>
            Advertisements displayed on this website are <strong>third-party advertisements</strong>.
            We do not control, endorse, or guarantee the content of such advertisements.
          </li>

          <li>
            Clicking on advertisements is entirely the user’s responsibility.
            We shall not be liable for any loss or damage resulting from ad interactions.
          </li>

          <li>
            We do not support, promote, or encourage illegal, adult, gambling, betting,
            or fraudulent activities.
          </li>

          <li>
            This website may contain links to third-party websites.
            We are not responsible for the content, policies, or practices of external websites.
          </li>

          <li>
            We may use cookies or similar technologies for analytics and advertising purposes.
            Users may control or disable cookies through their browser settings.
          </li>

          <li>
            Users must not misuse the website, including attempting hacking, scraping,
            unauthorized access, or any form of abuse.
          </li>

          <li>
            Content, features, and tools on this website may be modified, updated,
            or removed at any time without prior notice.
          </li>

          <li>
            We reserve the right to suspend or terminate access to the website
            if these Terms & Conditions are violated.
          </li>

          <li>
            All trademarks, logos, and brand names displayed on this website
            belong to their respective owners.
          </li>

          <li>
            Use of this website signifies acceptance of these Terms & Conditions.
          </li>

          <li>
            Any disputes arising from the use of this website shall be governed by
            <strong> Indian laws</strong> and subject to Indian jurisdiction.
          </li>

          <li>
            For any issues or complaints, users may contact us via the contact options
            provided on the website.
          </li>
        </ol>
      </div>
    </Layout>
  );
};

export default TermsPage;
