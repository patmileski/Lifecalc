// pages/car-loan-calculator.jsx
import Head from 'next/head';
import CarLoanCalculator from '../components/calculators/CarLoanCalculator';
import { FAQAccordion, RelatedCalcs, ShareBar } from '../components/ui';
import AdSlot from '../components/ads/AdSlot';
import { buildFAQSchema, buildCalculatorSchema, SITE_URL } from '../lib/seo';

const PAGE_TITLE = 'Car Loan Calculator — New & Used Auto Loan Payment Estimator';
const PAGE_DESC = 'Calculate your monthly car payment, total interest, true cost of ownership, and depreciation for new and used vehicles. Compare loan terms and see the full picture before you buy.';
const PAGE_URL = `${SITE_URL}/car-loan-calculator`;

const FAQS = [
  {
    question: 'What is a good interest rate for a car loan?',
    answer: "Car loan rates vary based on your credit score, loan term, and whether the car is new or used. In 2024, borrowers with excellent credit (750+) can expect rates of 5-7% on new cars and 6-9% on used cars. Average credit (650-699) typically sees rates of 9-13%. Rates above 15% are considered high — if you're in this range, improving your credit score before buying or making a larger down payment can help significantly. Credit unions often offer lower rates than dealerships.",
  },
  {
    question: 'Should I buy a new or used car?',
    answer: "New cars offer the latest features, full warranty, and lower interest rates, but depreciate 15-25% in the first year alone. A used car that's 2-3 years old has already absorbed that depreciation hit, making it a better value in many cases. However, used cars may have higher maintenance costs and interest rates. Our calculator lets you compare both scenarios side by side — enter the same vehicle type as new vs. used to see the full cost difference.",
  },
  {
    question: 'How much should I put down on a car?',
    answer: "A down payment of 20% is the traditional recommendation for a new car, and 10% for a used car. This helps you avoid being 'underwater' on your loan (owing more than the car is worth) due to depreciation. Even if you can't reach 20%, putting something down reduces your loan amount, monthly payment, and total interest. Avoid no-money-down deals unless you're getting 0% financing, as they often lead to negative equity quickly.",
  },
  {
    question: "What does it mean to be 'underwater' on a car loan?",
    answer: "Being underwater (or upside-down) means you owe more on your car loan than the car is currently worth. This commonly happens when you make a small down payment on a new car with a long loan term — the car depreciates faster than you pay down the loan. If you need to sell or trade the car while underwater, you'll still owe the difference. Our calculator shows estimated vehicle value after your loan term to help you avoid this situation.",
  },
  {
    question: 'What loan term should I choose?',
    answer: "Shorter loan terms (24-48 months) mean higher monthly payments but much less total interest paid and less risk of negative equity. Longer terms (60-84 months) lower your monthly payment but dramatically increase total interest — and a 72 or 84-month loan on a depreciating asset is risky. As a rule of thumb, try not to finance a car for longer than 48 months for used, or 60 months for new. Our term comparison chart shows exactly how much each term costs in total.",
  },
  {
    question: 'Is dealer financing or bank financing better?',
    answer: "Dealer financing can sometimes offer 0% or low promotional rates (especially on new cars), but always compare this against your bank or credit union first. Get pre-approved before visiting the dealership so you have a rate to compare against. Dealers make profit on financing — they may mark up the rate they receive from lenders. A credit union pre-approval often beats dealer financing, especially for used cars.",
  },
  {
    question: 'What costs should I budget for beyond the car payment?',
    answer: "Your true monthly car cost includes: loan payment, insurance (avg $125-200/month), fuel (avg $150-250/month depending on MPG), maintenance and repairs (avg $80-200/month, higher for used), registration/taxes (varies by state), and parking. Our calculator adds all of these together to show you the real all-in monthly cost, which is often 40-60% higher than the loan payment alone.",
  },
];

export default function CarLoanCalculatorPage() {
  return (
    <>
      <Head>
        <title>{PAGE_TITLE} | LifeCalc</title>
        <meta name="description" content={PAGE_DESC} />
        <meta name="keywords" content="car loan calculator, auto loan calculator, new car payment calculator, used car loan calculator, monthly car payment, auto loan interest calculator, car affordability calculator" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESC} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={PAGE_URL} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(FAQS)) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildCalculatorSchema({ name: PAGE_TITLE, description: PAGE_DESC, url: PAGE_URL })) }} />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
          <a href="/" className="hover:text-brand-600 transition-colors">Home</a>
          <span>/</span>
          <span className="text-slate-800 font-medium">Car Loan Calculator</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-2">
              🚗 Car Loan Calculator
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

        <CarLoanCalculator />

        <div className="flex justify-center my-10">
          <AdSlot type="rectangle" />
        </div>

        {/* SEO Content */}
        <article className="max-w-4xl mx-auto mt-12">
          <div className="calc-card mb-6">
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">How to Use This Car Loan Calculator</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Start by selecting <strong>New Car</strong> or <strong>Used Car</strong> — this changes the preset rates, depreciation estimates, and typical maintenance costs. Use the quick presets to load typical prices for common vehicle categories, or enter your exact vehicle price.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Enter your down payment and trade-in value — both reduce the loan amount. Add your local sales tax rate (varies by state, typically 5-10%) to see the true financed amount. Then choose your loan term and interest rate. The <strong>term comparison chart</strong> shows how different loan lengths affect your monthly payment and total interest simultaneously.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              The <strong>Ongoing Costs</strong> section is where most car buyers underestimate their true expense. Fill in insurance, maintenance, and fuel costs to see your real all-in monthly cost — not just the loan payment. The <strong>Depreciation section</strong> estimates what your car will be worth when the loan ends, helping you understand your true net cost of ownership.
            </p>
            <p className="text-slate-600 leading-relaxed">
              The <strong>affordability meter</strong> compares your total monthly car cost against your income. Financial experts recommend keeping all car-related expenses under 15-20% of gross monthly income — including loan payment, insurance, fuel, and maintenance combined.
            </p>
          </div>

          <div className="calc-card mb-6">
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">New vs. Used Car — Real Cost Examples</h2>
            <div className="space-y-5">
              <div className="border-l-4 border-green-400 pl-4">
                <h3 className="font-semibold text-slate-900 mb-1">Example 1: New Honda CR-V at $38,000</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  With 10% down ($3,800), 7.2% APR, 60-month term, and 8% sales tax: your loan amount is approximately $33,100, monthly payment is <strong>$657/month</strong>, and total interest over 5 years is about <strong>$6,300</strong>. Adding $160/month insurance, $100/month maintenance, and $200/month fuel brings your all-in cost to <strong>$1,117/month</strong>. The car is estimated to be worth around $18,500 after 5 years — you've paid $67,000 total to drive a $18,500 car.
                </p>
              </div>
              <div className="border-l-4 border-blue-400 pl-4">
                <h3 className="font-semibold text-slate-900 mb-1">Example 2: 3-Year-Old Honda CR-V at $26,000</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Same vehicle, 3 years old, with 10% down ($2,600), 8.5% APR, 48-month term: loan amount ~$21,200, monthly payment <strong>$525/month</strong>, total interest about <strong>$3,900</strong>. Higher maintenance budget ($180/month) but lower insurance ($140/month). All-in: <strong>$1,045/month</strong>. You save roughly $4,000 in total interest plus the initial depreciation cost — and finish paying sooner.
                </p>
              </div>
            </div>
          </div>

          <div className="calc-card mb-6">
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">Car Buying Tips That Save You Money</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: '🏦', title: 'Get pre-approved first', tip: 'Visit your bank or credit union before the dealership. A pre-approval gives you a rate benchmark and negotiating power. Dealers can sometimes beat it — but only if you show them what you have.' },
                { icon: '📅', title: 'Shop at end of month/quarter', tip: "Dealers have monthly and quarterly quotas. Shopping in the last few days of the month — especially end of a quarter (March, June, September, December) — gives you the most leverage for discounts." },
                { icon: '📋', title: "Negotiate price, not payment", tip: "Dealers love to focus on monthly payment because it obscures the total cost. Always negotiate the out-the-door price first, then discuss financing separately." },
                { icon: '🔍', title: 'Get a pre-purchase inspection', tip: 'For any used car, spend $100-150 on an independent mechanic inspection before buying. It can reveal hidden issues — or give you negotiating leverage on the price.' },
                { icon: '📊', title: 'Check market value first', tip: "Use Kelley Blue Book (kbb.com) or Edmunds to know the fair market value before negotiating. Never pay sticker price for used, and look for invoice price on new vehicles." },
                { icon: '⚡', title: 'Consider total cost of EVs', tip: "EVs have higher purchase prices but much lower fuel and maintenance costs. Factor in federal tax credits (up to $7,500 for qualifying new EVs) and your local electricity rates when comparing." },
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

          <div className="calc-card mb-6">
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">Average Car Costs by Type (2024)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-4 py-2.5 font-semibold text-slate-700">Vehicle Type</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-slate-700">Avg New Price</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-slate-700">Avg Used (3yr)</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-slate-700">Avg Insurance/yr</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-slate-700">5-yr Depreciation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { type: 'Economy Sedan', newPrice: '$22,000', used: '$14,000', ins: '$1,400', dep: '50%' },
                    { type: 'Mid-size Sedan', newPrice: '$32,000', used: '$20,000', ins: '$1,600', dep: '50%' },
                    { type: 'Compact SUV', newPrice: '$38,000', used: '$25,000', ins: '$1,700', dep: '45%' },
                    { type: 'Full-size SUV', newPrice: '$58,000', used: '$38,000', ins: '$2,100', dep: '48%' },
                    { type: 'Pickup Truck', newPrice: '$55,000', used: '$36,000', ins: '$1,900', dep: '40%' },
                    { type: 'Luxury Sedan', newPrice: '$65,000', used: '$38,000', ins: '$2,500', dep: '55%' },
                    { type: 'Electric Vehicle', newPrice: '$52,000', used: '$32,000', ins: '$2,000', dep: '50%' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="px-4 py-2.5 font-medium text-slate-800">{row.type}</td>
                      <td className="px-4 py-2.5 text-slate-600">{row.newPrice}</td>
                      <td className="px-4 py-2.5 text-slate-600">{row.used}</td>
                      <td className="px-4 py-2.5 text-slate-600">{row.ins}</td>
                      <td className="px-4 py-2.5 font-semibold text-orange-600">{row.dep}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-400 mt-2">Prices and depreciation are approximate national averages for 2024. Actual values vary by make, model, condition, and region.</p>
          </div>
        </article>

        {/* FAQ */}
        <div className="max-w-4xl mx-auto mt-10">
          <h2 className="text-2xl font-display font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <FAQAccordion faqs={FAQS} />
        </div>

        {/* Related */}
        <div className="max-w-4xl mx-auto mt-12">
          <h2 className="text-xl font-display font-bold text-slate-900 mb-4">Related Calculators</h2>
          <RelatedCalcs current="car" />
        </div>

        <div className="flex justify-center mt-10">
          <AdSlot type="leaderboard" />
        </div>
      </div>
    </>
  );
}
