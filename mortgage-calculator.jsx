// pages/mortgage-calculator.jsx
import Head from 'next/head';
import MortgageCalculator from '../components/calculators/MortgageCalculator';
import { FAQAccordion, RelatedCalcs, ShareBar } from '../components/ui';
import AdSlot from '../components/ads/AdSlot';
import { buildFAQSchema, buildCalculatorSchema, SITE_URL } from '../lib/seo';

const PAGE_TITLE = 'Mortgage Calculator with Taxes & Insurance';
const PAGE_DESC = 'Calculate your monthly mortgage payment including property tax, homeowner\'s insurance, and full amortization schedule. Free, instant, accurate.';
const PAGE_URL = `${SITE_URL}/mortgage-calculator`;

const FAQS = [
  {
    question: 'How is a monthly mortgage payment calculated?',
    answer: 'Your monthly mortgage payment is calculated using the amortization formula: M = P[r(1+r)^n] / [(1+r)^n-1], where P is the loan principal, r is the monthly interest rate (annual rate ÷ 12), and n is the total number of payments. On top of principal and interest, your payment typically includes a property tax escrow and homeowner\'s insurance escrow, often called PITI (Principal, Interest, Taxes, Insurance).',
  },
  {
    question: 'What is a good interest rate for a mortgage in 2024?',
    answer: 'Mortgage rates change daily based on economic conditions. In 2024, 30-year fixed rates have generally ranged from 6.5% to 7.5% for borrowers with strong credit. Your actual rate depends on your credit score, down payment, loan type, and lender. A credit score of 760+ typically qualifies for the best rates. Check current rates with multiple lenders to get the most competitive offer.',
  },
  {
    question: 'Should I choose a 15-year or 30-year mortgage?',
    answer: 'A 15-year mortgage typically offers a lower interest rate and builds equity faster, but requires a significantly higher monthly payment. A 30-year mortgage has a lower monthly payment, giving you more flexibility, but you\'ll pay considerably more in total interest over the life of the loan. Use our calculator to compare both terms — adjust the loan term and watch how the monthly payment and total interest change.',
  },
  {
    question: 'What is PMI and when do I need it?',
    answer: 'Private Mortgage Insurance (PMI) is required by most lenders when your down payment is less than 20% of the home\'s purchase price. PMI protects the lender — not you — if you default. It typically costs 0.5%–1.5% of the loan amount annually. Once your loan-to-value ratio reaches 80%, you can usually request PMI cancellation. Our calculator flags when your down payment is below 20%.',
  },
  {
    question: 'How much house can I afford?',
    answer: 'A common guideline is the 28/36 rule: your mortgage payment (PITI) should not exceed 28% of your gross monthly income, and your total debt payments should not exceed 36%. For example, with a $8,000/month gross income, your target mortgage payment would be $2,240 or less. Enter your monthly income in our calculator to see your personalized affordability rating.',
  },
  {
    question: 'What does the amortization schedule show?',
    answer: 'An amortization schedule breaks down each payment into how much goes toward principal (reducing your balance) and how much goes toward interest. In the early years of a mortgage, the majority of each payment is interest. As time passes, more of each payment reduces your principal. The schedule tab in our calculator shows this breakdown for the life of your loan.',
  },
  {
    question: 'How does a larger down payment affect my mortgage?',
    answer: 'A larger down payment reduces your loan amount, which lowers your monthly payment and the total interest you pay over the life of the loan. It also eliminates or reduces PMI if you reach 20% down, and may qualify you for a lower interest rate. However, tying up more cash in a down payment means less liquidity for emergencies or other investments — balance is key.',
  },
];

export default function MortgageCalculatorPage() {
  return (
    <>
      <Head>
        <title>{PAGE_TITLE} | LifeCalc</title>
        <meta name="description" content={PAGE_DESC} />
        <meta name="keywords" content="mortgage calculator with taxes, mortgage calculator with insurance, monthly mortgage payment calculator, amortization calculator, home loan calculator, PITI calculator, 30 year mortgage calculator" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESC} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={PAGE_URL} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(FAQS)) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildCalculatorSchema({ name: PAGE_TITLE, description: PAGE_DESC, url: PAGE_URL })) }} />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
            <a href="/" className="hover:text-brand-600 transition-colors">Home</a>
            <span>/</span>
            <span className="text-slate-800 font-medium">Mortgage Calculator</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-2">
                🏠 Mortgage Calculator
              </h1>
              <p className="text-slate-600 max-w-2xl">{PAGE_DESC}</p>
            </div>
            <div className="shrink-0">
              <ShareBar title={PAGE_TITLE} url={PAGE_URL} />
            </div>
          </div>
        </div>

        {/* Top Ad */}
        <div className="flex justify-center mb-8">
          <AdSlot type="leaderboard" />
        </div>

        {/* Calculator */}
        <MortgageCalculator />

        {/* Mid Ad */}
        <div className="flex justify-center my-10">
          <AdSlot type="rectangle" />
        </div>

        {/* SEO Content */}
        <article className="prose-content max-w-4xl mx-auto mt-12">
          <div className="calc-card mb-6">
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">How to Use This Mortgage Calculator</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Our mortgage calculator gives you a complete picture of what your home loan will actually cost — not just the principal and interest, but also property taxes, homeowner's insurance, and a full amortization breakdown. Simply enter your home price, down payment, interest rate, and loan term to get started.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              The calculator uses the standard amortization formula to compute your monthly principal and interest payment. It then adds your monthly property tax escrow (your annual tax divided by 12) and your monthly insurance escrow, giving you the true PITI payment — what you'll actually write a check for each month.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Switch to the <strong>Chart tab</strong> to see a visual breakdown of where your money goes — principal vs. interest over time. Switch to the <strong>Amortization tab</strong> to see a month-by-month schedule showing exactly how your balance decreases with every payment.
            </p>
          </div>

          <div className="calc-card mb-6">
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">Example Scenarios</h2>

            <div className="space-y-5">
              <div className="border-l-4 border-brand-400 pl-4">
                <h3 className="font-semibold text-slate-900 mb-1">Scenario 1: First-Time Buyer, $350,000 Home</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  With a $350,000 home, 5% down ($17,500), a 6.9% rate, and a 30-year term, your principal and interest payment would be approximately <strong>$2,202/month</strong>. Adding $350/month in property tax and $130/month in insurance brings your total PITI to roughly <strong>$2,682/month</strong>. Over 30 years, you'd pay approximately <strong>$464,000 in total interest</strong> — nearly 1.4× the original loan amount.
                </p>
              </div>

              <div className="border-l-4 border-green-400 pl-4">
                <h3 className="font-semibold text-slate-900 mb-1">Scenario 2: Move-Up Buyer, $600,000 Home, 20% Down</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  With a $600,000 home, 20% down ($120,000), a 6.5% rate, and a 15-year term, your monthly P&I drops to approximately <strong>$4,186/month</strong> — and you'd pay only about <strong>$273,000 in total interest</strong> versus over $600,000 on a 30-year term. The trade-off is a higher monthly obligation, but you build equity twice as fast and pay far less in interest overall.
                </p>
              </div>

              <div className="border-l-4 border-accent-400 pl-4">
                <h3 className="font-semibold text-slate-900 mb-1">Scenario 3: Investment Property, $250,000, 25% Down</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  An investment property at $250,000 with 25% down ($62,500) at 7.25% for 30 years yields a P&I payment of roughly <strong>$1,281/month</strong>. To be cash-flow positive, your rental income needs to exceed your PITI plus maintenance — typically 1% of value per year, or $2,500/month in this case — making it important to run the full numbers before purchasing.
                </p>
              </div>
            </div>
          </div>

          <div className="calc-card mb-6">
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">Expert Tips to Lower Your Mortgage Cost</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: '💰', title: 'Shop at least 3 lenders', tip: 'Even a 0.25% rate difference on a $400,000 loan saves over $20,000 in interest over 30 years. Compare banks, credit unions, and mortgage brokers.' },
                { icon: '📈', title: 'Improve your credit score', tip: 'Borrowers with 760+ credit scores get the best rates. Pay down credit card balances below 30% utilization and dispute any errors before applying.' },
                { icon: '📅', title: 'Make bi-weekly payments', tip: 'Paying half your monthly payment every two weeks results in 26 half-payments, or 13 full payments per year. This can cut 4-6 years off a 30-year mortgage.' },
                { icon: '🎯', title: 'Consider buying down your rate', tip: 'Paying "points" (1% of loan amount = 1 point) upfront can lower your rate by 0.25%. Calculate your break-even: divide the cost of points by your monthly savings.' },
                { icon: '🏦', title: 'Avoid PMI with a piggyback loan', tip: 'If you can\'t reach 20% down, an 80-10-10 loan (80% mortgage, 10% second mortgage, 10% down) may help you avoid PMI while preserving cash.' },
                { icon: '📊', title: 'Watch your debt-to-income ratio', tip: 'Keep total debts under 43% of gross income for conventional loan approval. Pay off car loans or credit cards before applying if you\'re close to the limit.' },
              ].map((t, i) => (
                <div key={i} className="flex gap-3 p-4 bg-slate-50 rounded-xl">
                  <span className="text-xl shrink-0">{t.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 mb-1">{t.title}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{t.tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* FAQ */}
        <div className="max-w-4xl mx-auto mt-10">
          <h2 className="text-2xl font-display font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <FAQAccordion faqs={FAQS} />
        </div>

        {/* Related Calculators */}
        <div className="max-w-4xl mx-auto mt-12">
          <h2 className="text-xl font-display font-bold text-slate-900 mb-4">Related Calculators</h2>
          <RelatedCalcs current="mortgage" />
        </div>

        {/* Bottom Ad */}
        <div className="flex justify-center mt-10">
          <AdSlot type="leaderboard" />
        </div>
      </div>
    </>
  );
}
