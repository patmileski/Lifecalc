// pages/renovation-calculator.jsx
import Head from 'next/head';
import RenovationCalculator from '../components/calculators/RenovationCalculator';
import { FAQAccordion, RelatedCalcs, ShareBar } from '../components/ui';
import AdSlot from '../components/ads/AdSlot';
import { buildFAQSchema, buildCalculatorSchema, SITE_URL } from '../lib/seo';

const PAGE_TITLE = 'Renovation Cost Calculator — Home Improvement Financing';
const PAGE_DESC = 'Estimate your home renovation costs, monthly payments if financed, total interest, and projected return on investment. Compare cash vs. financing options instantly.';
const PAGE_URL = `${SITE_URL}/renovation-calculator`;

const FAQS = [
  {
    question: 'How do I estimate my renovation budget?',
    answer: "Start with a detailed scope of work and get at least three contractor quotes. As a rough baseline: kitchen renovations average $25,000–$75,000+; bathrooms $10,000–$30,000; basement finishing $30,000–$75,000; and room additions $80,000–$200,000+. Add a 10-20% contingency buffer for unexpected costs — they almost always arise. Our calculator lets you model both your ideal budget and your realistic budget with contingency.",
  },
  {
    question: 'What is the best loan type for a home renovation?',
    answer: "The best renovation loan depends on how much equity you have and how much you need to borrow. A HELOC offers flexibility and low rates if you have equity. A home equity loan gives a lump sum at a fixed rate. A cash-out refinance works if you can score a rate lower than your current mortgage. Personal loans are fastest and require no equity, but carry higher rates. For smaller projects under $20,000, a personal loan or 0% promotional credit card may be most practical.",
  },
  {
    question: 'Which renovations add the most value to a home?',
    answer: "According to Remodeling Magazine's Cost vs. Value report, the highest ROI projects are typically garage door replacement (100%+ ROI), manufactured stone veneer (90%+), minor kitchen remodels (75-85%), wood deck additions (65-75%), and siding replacement (65-80%). Major kitchen overhauls and bathroom additions often return only 50-65% of their cost. Our calculator shows the estimated ROI for each project type to help you prioritize.",
  },
  {
    question: 'Should I pay cash or finance a renovation?',
    answer: "Paying cash saves you the cost of interest — which can be substantial for large projects. However, depleting savings leaves you vulnerable to emergencies. Financing preserves liquidity and lets you complete the renovation now while property values may be rising. A balanced approach is often best: use savings for part of the project and finance the rest. Our cash vs. finance comparison chart makes it easy to see the exact dollar cost of each option.",
  },
  {
    question: 'How do I avoid renovation cost overruns?',
    answer: "Key strategies: (1) Get detailed, itemized bids — not ballpark estimates. (2) Build in a 15-20% contingency. (3) Finalize design decisions before work starts — mid-project changes are expensive. (4) Use a fixed-price contract, not time and materials, for large projects. (5) Stage your renovation — complete one phase at a time, especially if funding is limited. (6) Hire licensed, insured contractors and check references.",
  },
  {
    question: 'Can renovation costs be tax deductible?',
    answer: "Generally, home renovations are not tax deductible for a primary residence. However, renovations that increase your home's cost basis can reduce capital gains taxes when you sell. Energy-efficient improvements (solar panels, heat pumps, insulation) may qualify for federal tax credits. Renovations to a home office or rental property may have different deduction rules. Consult a tax professional for guidance specific to your situation.",
  },
  {
    question: 'What is a construction or renovation loan?',
    answer: "A construction or renovation loan (like an FHA 203k or Fannie Mae HomeStyle loan) combines purchase/refinance financing with renovation funds in a single loan. The lender releases money in stages as work is completed. These loans are ideal for major renovations but involve more paperwork, appraisals, and lender oversight than a simple HELOC or personal loan. They're worth considering for renovations exceeding $50,000.",
  },
];

export default function RenovationCalculatorPage() {
  return (
    <>
      <Head>
        <title>{PAGE_TITLE} | LifeCalc</title>
        <meta name="description" content={PAGE_DESC} />
        <meta name="keywords" content="renovation cost estimator, home renovation loan calculator, remodel financing calculator, home improvement cost calculator, kitchen renovation cost calculator, bathroom renovation cost, HELOC renovation calculator" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESC} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={PAGE_URL} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(FAQS)) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildCalculatorSchema({ name: PAGE_TITLE, description: PAGE_DESC, url: PAGE_URL })) }} />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
          <a href="/" className="hover:text-brand-600 transition-colors">Home</a>
          <span>/</span>
          <span className="text-slate-800 font-medium">Renovation Calculator</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-2">
              🔨 Renovation Cost Calculator
            </h1>
            <p className="text-slate-600 max-w-2xl">{PAGE_DESC}</p>
          </div>
          <div className="shrink-0">
            <ShareBar title={PAGE_TITLE} url={PAGE_URL} />
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <AdSlot type="leaderboard" />
        </div>

        <RenovationCalculator />

        <div className="flex justify-center my-10">
          <AdSlot type="rectangle" />
        </div>

        {/* SEO Content */}
        <article className="max-w-4xl mx-auto mt-12">
          <div className="calc-card mb-6">
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">How to Use This Renovation Calculator</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Start by selecting your project type and entering your total renovation budget. If you plan to pay cash, toggle off the "Finance this renovation" switch to see your all-in cost and estimated return on investment immediately. If you're financing, toggle it on to see loan options, monthly payments, and how much extra you'll pay in interest.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              The <strong>Loan Type selector</strong> helps you compare common renovation financing products: HELOCs, personal loans, cash-out refinances, and construction loans. Each has different typical rate ranges shown to guide you. Enter the rate you've been quoted (or an estimate) along with your preferred term to see your monthly obligation.
            </p>
            <p className="text-slate-600 leading-relaxed">
              The <strong>Cash vs. Finance comparison chart</strong> clearly shows how much financing adds to your total project cost, making the decision tangible. The <strong>ROI estimate</strong> is based on industry-average returns for each project type, helping you understand which renovations are most likely to increase your home's value relative to cost.
            </p>
          </div>

          <div className="calc-card mb-6">
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">Average Renovation Costs by Project (2024)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-4 py-2.5 font-semibold text-slate-700">Project</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-slate-700">Low</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-slate-700">Average</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-slate-700">High</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-slate-700">Avg. ROI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { project: 'Minor Kitchen Remodel', low: '$15,000', avg: '$28,000', high: '$50,000', roi: '80%' },
                    { project: 'Major Kitchen Remodel', low: '$50,000', avg: '$80,000', high: '$150,000+', roi: '55%' },
                    { project: 'Bathroom Remodel', low: '$10,000', avg: '$22,000', high: '$50,000', roi: '65%' },
                    { project: 'Basement Finishing', low: '$20,000', avg: '$45,000', high: '$90,000', roi: '50%' },
                    { project: 'Deck / Patio Addition', low: '$8,000', avg: '$20,000', high: '$50,000', roi: '60%' },
                    { project: 'Roof Replacement', low: '$9,000', avg: '$16,000', high: '$30,000', roi: '70%' },
                    { project: 'Window Replacement', low: '$5,000', avg: '$15,000', high: '$35,000', roi: '68%' },
                    { project: 'Room Addition', low: '$50,000', avg: '$120,000', high: '$250,000+', roi: '55%' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="px-4 py-2.5 font-medium text-slate-800">{row.project}</td>
                      <td className="px-4 py-2.5 text-slate-600">{row.low}</td>
                      <td className="px-4 py-2.5 text-slate-600">{row.avg}</td>
                      <td className="px-4 py-2.5 text-slate-600">{row.high}</td>
                      <td className="px-4 py-2.5 font-semibold text-green-600">{row.roi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-400 mt-2">Costs are national averages and vary significantly by region, materials, and contractor. ROI estimates based on Remodeling Magazine Cost vs. Value data.</p>
          </div>

          <div className="calc-card mb-6">
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">Renovation Financing Tips</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: '🏦', title: 'Check your home equity first', tip: "Your equity (home value minus mortgage balance) determines what you can borrow with a HELOC or home equity loan. Many lenders allow up to 85% LTV — subtract your mortgage balance to find your borrowing ceiling." },
                { icon: '📋', title: 'Get itemized contractor bids', tip: "Insist on line-item bids, not lump-sum estimates. This makes it easier to compare bids, identify where costs can be trimmed, and track expenses during the project." },
                { icon: '⏱️', title: 'Time your project strategically', tip: "Contractors are often less busy (and may offer better pricing) in fall and winter. Starting a kitchen reno in January rather than June could save 10-15% on labor." },
                { icon: '💳', title: 'Use 0% promo cards for small projects', tip: "For renovations under $15,000, a 0% APR promotional credit card (typically 12-18 months) can be interest-free if paid off before the promo period ends." },
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

        <div className="max-w-4xl mx-auto mt-10">
          <h2 className="text-2xl font-display font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <FAQAccordion faqs={FAQS} />
        </div>

        <div className="max-w-4xl mx-auto mt-12">
          <h2 className="text-xl font-display font-bold text-slate-900 mb-4">Related Calculators</h2>
          <RelatedCalcs current="renovation" />
        </div>

        <div className="flex justify-center mt-10">
          <AdSlot type="leaderboard" />
        </div>
      </div>
    </>
  );
}
