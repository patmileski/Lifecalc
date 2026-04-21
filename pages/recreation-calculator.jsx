// pages/recreation-calculator.jsx
import Head from 'next/head';
import RecreationCalculator from '../components/calculators/RecreationCalculator';
import { FAQAccordion, RelatedCalcs, ShareBar } from '../components/ui';
import AdSlot from '../components/ads/AdSlot';
import { buildFAQSchema, buildCalculatorSchema, SITE_URL } from '../lib/seo';

const PAGE_TITLE = 'Recreation & Lifestyle Affordability Calculator — Boats, RVs & More';
const PAGE_DESC = 'Calculate the true monthly and yearly cost of buying a boat, RV, ATV, motorcycle, or vacation property. Includes loan payment, maintenance, insurance, and storage in one total.';
const PAGE_URL = `${SITE_URL}/recreation-calculator`;

const FAQS = [
  {
    question: 'How much does it really cost to own a boat?',
    answer: "The purchase price is only the beginning. Most boat owners spend an additional 10-15% of the boat's value per year in ongoing costs. For a $60,000 boat, that's $6,000-$9,000/year — or $500-$750/month — on top of your loan payment. These costs include insurance ($1,000-$3,000/year), slip or storage ($2,000-$8,000/year), fuel, maintenance (winterization, bottom paint, engine service), registration, and unexpected repairs. Our calculator includes all of these in one total.",
  },
  {
    question: 'What is a good interest rate for a boat or RV loan?',
    answer: "Boat and RV loans are considered non-essential (recreational) loans, so rates are typically higher than mortgage rates. In 2024, rates for well-qualified borrowers range from 6.5% to 10% for new vessels and 8% to 15% for used ones. Credit unions often offer the best rates for these loans. Loan terms range from 5 to 20 years for larger purchases. Your credit score, down payment percentage, and the age/type of the vessel all affect your rate.",
  },
  {
    question: 'What percentage of my income should I spend on a recreational vehicle?',
    answer: "Most financial advisors suggest keeping all non-essential/lifestyle expenses (including recreation vehicles) under 10-20% of your take-home (net) income combined. As a specific guideline for a single recreation purchase, try to keep the all-in monthly cost (loan + maintenance + insurance + storage) under 10-15% of gross monthly income. Our affordability meter uses this benchmark to give you a personalized rating.",
  },
  {
    question: 'Is it better to buy or rent/charter a boat?',
    answer: "If you'll use it more than 30-40 days per year and plan to keep it for 5+ years, buying often makes financial sense despite the higher upfront cost. If you'll use it less frequently or want variety, chartering/renting is usually far cheaper. Charter rates for a comparable boat run $500-$2,000/day. At $800/day, you'd spend about $16,000 for 20 days — far less than the $25,000-$35,000/year true cost of ownership on a $80,000 boat.",
  },
  {
    question: 'What should I budget for RV maintenance?',
    answer: "A general rule is 1.5-3% of the RV's value per year for maintenance. A $100,000 Class A motorhome might cost $1,500-$3,000/year in maintenance alone, plus tires ($1,500-$4,000 every 5-7 years), roof seals, generator service, and slide-out maintenance. Travel and campsite costs add another significant layer. Many RV owners underestimate annual costs by 30-50% in their first year.",
  },
  {
    question: 'Do recreational vehicle loans affect credit score?',
    answer: "Yes, like any installment loan, a boat or RV loan appears on your credit report and affects your credit score. Applying involves a hard inquiry (small temporary dip). Once open, consistent on-time payments build credit positively. Missing payments or defaulting can significantly damage your score — and unlike a mortgage, a lender can repossess the vehicle with less legal complexity. Make sure the monthly payment is comfortably within your budget before committing.",
  },
  {
    question: 'Should I pay cash or finance a recreational vehicle?',
    answer: "If you have cash available without depleting your emergency fund, paying cash eliminates interest costs (which can add $10,000-$50,000+ over a loan's life for a large RV). However, financing at a low rate while keeping your savings invested (especially if you're getting market returns above the loan rate) can make mathematical sense. Many recreational lenders offer 10-20 year terms, which makes monthly payments manageable but dramatically increases total cost — aim for the shortest term your budget allows.",
  },
];

export default function RecreationCalculatorPage() {
  return (
    <>
      <Head>
        <title>{PAGE_TITLE} | CalcWise</title>
        <meta name="description" content={PAGE_DESC} />
        <meta name="keywords" content="boat affordability calculator, RV cost calculator, boat loan calculator, RV loan payment calculator, recreation vehicle cost calculator, motorcycle loan calculator, true cost of owning a boat" />
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
          <span className="text-slate-800 font-medium">Recreation Calculator</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-2">
              ⛵ Recreation & Lifestyle Calculator
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

        <RecreationCalculator />

        <div className="flex justify-center my-10">
          <AdSlot type="rectangle" />
        </div>

        {/* SEO Content */}
        <article className="max-w-4xl mx-auto mt-12">
          <div className="calc-card mb-6">
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">The True Cost of Recreational Purchases</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              One of the biggest financial mistakes people make with recreational purchases is focusing only on the sticker price and monthly loan payment. The reality is that the ongoing costs of ownership — maintenance, insurance, storage, fuel, and repairs — often equal or exceed the loan payment itself. This calculator gives you the complete picture.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Select your vehicle type and the calculator automatically pre-fills typical maintenance percentages, insurance estimates, and storage costs based on that category. You can fine-tune each input to match your actual quotes and situation. The result is a realistic monthly and yearly budget for what ownership truly costs.
            </p>
            <p className="text-slate-600 leading-relaxed">
              The <strong>affordability meter</strong> compares your total monthly cost against your income to give an objective rating. The <strong>cost distribution chart</strong> visualizes what portion of your monthly expense comes from each category, helping you identify where to look for savings.
            </p>
          </div>

          <div className="calc-card mb-6">
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">True Annual Cost Estimates by Vehicle Type</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-4 py-2.5 font-semibold text-slate-700">Vehicle</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-slate-700">Price Range</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-slate-700">Annual Maintenance</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-slate-700">Insurance/yr</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-slate-700">Storage/yr</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { v: 'Pontoon Boat', price: '$25k–$75k', maint: '3–5%', ins: '$800–$2,000', stor: '$2,400–$6,000' },
                    { v: 'Cabin Cruiser / Sailboat', price: '$50k–$300k+', maint: '4–8%', ins: '$1,500–$5,000', stor: '$3,600–$12,000' },
                    { v: 'Class A Motorhome', price: '$100k–$500k+', maint: '2–3%', ins: '$2,000–$5,000', stor: '$1,800–$4,800' },
                    { v: 'Travel Trailer / 5th Wheel', price: '$25k–$100k', maint: '2–3%', ins: '$600–$1,500', stor: '$1,200–$3,600' },
                    { v: 'ATV / Side-by-Side', price: '$10k–$35k', maint: '3–5%', ins: '$300–$800', stor: '$600–$1,200' },
                    { v: 'Jet Ski / PWC', price: '$8k–$20k', maint: '3–5%', ins: '$400–$800', stor: '$1,200–$2,400' },
                    { v: 'Snowmobile', price: '$8k–$18k', maint: '2–4%', ins: '$200–$500', stor: '$400–$900' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="px-4 py-2.5 font-medium text-slate-800">{row.v}</td>
                      <td className="px-4 py-2.5 text-slate-600">{row.price}</td>
                      <td className="px-4 py-2.5 text-slate-600">{row.maint}</td>
                      <td className="px-4 py-2.5 text-slate-600">{row.ins}</td>
                      <td className="px-4 py-2.5 text-slate-600">{row.stor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-400 mt-2">Ranges are approximate national averages. Actual costs vary by location, age of vehicle, usage, and insurer.</p>
          </div>

          <div className="calc-card mb-6">
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">Smart Tips Before You Buy</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: '🔍', title: 'Get a pre-purchase inspection', tip: "Always have a marine surveyor (boats) or certified RV inspector check a used vehicle before buying. A $300-$500 inspection can reveal $10,000+ in issues — or give you negotiating leverage." },
                { icon: '📊', title: 'Budget for year one separately', tip: "First-year costs are often the highest: registration, safety gear, any deferred maintenance, modifications, and the learning curve. Budget an extra 20% on top of your ongoing annual estimate for year one." },
                { icon: '🤝', title: 'Join an owners club first', tip: "Connect with owners before you buy. They'll share real cost figures, common problems, and which models to avoid. Online forums for specific makes are invaluable." },
                { icon: '📅', title: 'Buy at end of season', tip: "Dealers and private sellers move inventory at the end of recreational seasons (fall for boats and RVs in northern climates). You can often negotiate 10-20% off peak-season prices." },
                { icon: '🔒', title: 'Get multiple insurance quotes', tip: "Recreational insurance rates vary widely. Get quotes from specialists (BoatUS, Progressive, National General) alongside your regular insurer. Bundling can save 10-15%." },
                { icon: '💼', title: 'Consider a LLC for tax purposes', tip: "If you plan to charter or rent your vessel when not in use, holding it in an LLC may offer liability protection and potential tax deductions. Consult a tax advisor first." },
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
          <RelatedCalcs current="recreation" />
        </div>

        <div className="flex justify-center mt-10">
          <AdSlot type="leaderboard" />
        </div>
      </div>
    </>
  );
}
