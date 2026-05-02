// pages/privacy-policy.jsx
import Head from 'next/head';
import Link from 'next/link';

export default function PrivacyPolicy() {
  const lastUpdated = 'May 1, 2025';

  return (
    <>
      <Head>
        <title>Privacy Policy | LifeCalc</title>
        <meta name="description" content="LifeCalc privacy policy — how we collect, use, and protect your information." />
        <link rel="canonical" href="https://www.yourlifecalc.com/privacy-policy" />
        <meta name="robots" content="noindex" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">Privacy Policy</span>
        </div>

        <div className="calc-card">
          <h1 className="text-3xl font-display font-bold text-slate-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-slate-500 mb-8">Last updated: {lastUpdated}</p>

          <div className="prose max-w-none space-y-8 text-slate-600 leading-relaxed">

            {/* Introduction */}
            <section>
              <h2 className="text-xl font-display font-bold text-slate-900 mb-3">1. Introduction</h2>
              <p>
                Welcome to LifeCalc ("we," "our," or "us"). We operate the website located at{' '}
                <a href="https://www.yourlifecalc.com" className="text-brand-600 hover:underline">
                  www.yourlifecalc.com
                </a>{' '}
                (the "Site"). This Privacy Policy explains how we collect, use, disclose, and safeguard your
                information when you visit our Site. Please read this policy carefully. If you disagree with
                its terms, please discontinue use of the Site.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-xl font-display font-bold text-slate-900 mb-3">2. Information We Collect</h2>

              <h3 className="text-base font-semibold text-slate-800 mb-2">Information You Provide</h3>
              <p className="mb-4">
                LifeCalc is a free calculator tool. We do not require you to create an account or provide
                personal information to use our calculators. All calculator inputs you enter are processed
                entirely within your browser and are never transmitted to our servers.
              </p>

              <h3 className="text-base font-semibold text-slate-800 mb-2">Automatically Collected Information</h3>
              <p className="mb-4">
                When you visit our Site, we may automatically collect certain information about your device
                and usage, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>General geographic location (country/region level)</li>
                <li>Device type (desktop, mobile, tablet)</li>
              </ul>
              <p>
                This information is collected through cookies and similar tracking technologies, including
                Google Analytics and Google AdSense (described below).
              </p>
            </section>

            {/* Local Storage */}
            <section>
              <h2 className="text-xl font-display font-bold text-slate-900 mb-3">3. Local Storage</h2>
              <p>
                To improve your experience, LifeCalc saves your calculator inputs (such as loan amounts,
                interest rates, and terms) in your browser's local storage. This data never leaves your
                device and is not accessible to us. You can clear this data at any time by clearing your
                browser's local storage or site data.
              </p>
            </section>

            {/* Google Analytics */}
            <section>
              <h2 className="text-xl font-display font-bold text-slate-900 mb-3">4. Google Analytics</h2>
              <p className="mb-4">
                We use Google Analytics to understand how visitors use our Site. Google Analytics collects
                information such as how often users visit the Site, what pages they visit, and what other
                sites they used prior to coming to our Site. We use this information to improve our Site.
              </p>
              <p className="mb-4">
                Google Analytics collects only the IP address assigned to you on the date you visit the Site,
                rather than your name or other identifying information. We do not combine the information
                collected through Google Analytics with personally identifiable information.
              </p>
              <p>
                You can opt out of Google Analytics by installing the{' '}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 hover:underline"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>.
              </p>
            </section>

            {/* Google AdSense */}
            <section>
              <h2 className="text-xl font-display font-bold text-slate-900 mb-3">5. Google AdSense & Advertising</h2>
              <p className="mb-4">
                We use Google AdSense to display advertisements on our Site. Google AdSense uses cookies to
                serve ads based on your prior visits to our Site and other sites on the internet. Google's
                use of advertising cookies enables it and its partners to serve ads based on your visit to
                our Site and/or other sites on the internet.
              </p>
              <p className="mb-4">
                You may opt out of personalized advertising by visiting{' '}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 hover:underline"
                >
                  Google Ads Settings
                </a>.
              </p>
              <p>
                For more information about how Google uses data when you use our Site, visit{' '}
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 hover:underline"
                >
                  How Google uses data when you use our partners' sites or apps
                </a>.
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-xl font-display font-bold text-slate-900 mb-3">6. Cookies</h2>
              <p className="mb-4">
                Cookies are small data files stored on your device. We use cookies for the following purposes:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">Cookie</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">Purpose</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="px-4 py-3 font-medium text-slate-800">_ga, _gid</td>
                      <td className="px-4 py-3 text-slate-600">Google Analytics — usage statistics</td>
                      <td className="px-4 py-3 text-slate-600">2 years / 24 hours</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-slate-800">IDE, DSID</td>
                      <td className="px-4 py-3 text-slate-600">Google AdSense — ad targeting</td>
                      <td className="px-4 py-3 text-slate-600">13 months</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-slate-800">localStorage</td>
                      <td className="px-4 py-3 text-slate-600">Calculator input persistence</td>
                      <td className="px-4 py-3 text-slate-600">Until cleared</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4">
                You can control cookies through your browser settings. Note that disabling cookies may
                affect the functionality of our Site.
              </p>
            </section>

            {/* Third Party Links */}
            <section>
              <h2 className="text-xl font-display font-bold text-slate-900 mb-3">7. Third-Party Links</h2>
              <p>
                Our Site may contain links to third-party websites. We have no control over the content,
                privacy policies, or practices of any third-party sites or services and encourage you to
                review the privacy policy of every site you visit.
              </p>
            </section>

            {/* Disclaimer */}
            <section>
              <h2 className="text-xl font-display font-bold text-slate-900 mb-3">8. Financial Disclaimer</h2>
              <p>
                LifeCalc provides financial calculators for <strong>educational and informational purposes
                only</strong>. The results produced by our calculators are estimates and should not be
                considered financial, legal, or tax advice. Always consult a qualified financial advisor,
                lender, or other professional before making financial decisions. LifeCalc makes no
                representations or warranties about the accuracy of calculator results.
              </p>
            </section>

            {/* Children */}
            <section>
              <h2 className="text-xl font-display font-bold text-slate-900 mb-3">9. Children's Privacy</h2>
              <p>
                Our Site is not directed to children under the age of 13. We do not knowingly collect
                personal information from children under 13. If you believe a child has provided us with
                personal information, please contact us and we will delete such information.
              </p>
            </section>

            {/* Changes */}
            <section>
              <h2 className="text-xl font-display font-bold text-slate-900 mb-3">10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by
                posting the new policy on this page and updating the "Last updated" date. Your continued
                use of the Site after any changes constitutes your acceptance of the new Privacy Policy.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-xl font-display font-bold text-slate-900 mb-3">11. Contact Us</h2>
              <p className="mb-4">
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <p className="font-semibold text-slate-900">LifeCalc</p>
                <p className="text-slate-600">Website: <a href="https://www.yourlifecalc.com" className="text-brand-600 hover:underline">www.yourlifecalc.com</a></p>
              </div>
            </section>

          </div>
        </div>

        {/* Back to calculators */}
        <div className="mt-8 text-center">
          <Link href="/" className="btn-primary inline-flex items-center gap-2">
            ← Back to Calculators
          </Link>
        </div>
      </div>
    </>
  );
}
