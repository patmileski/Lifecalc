// pages/credit-card-calculator.jsx
import Head from 'next/head';
import CreditCardCalculator from '../components/calculators/CreditCardCalculator';
import { FAQAccordion, RelatedCalcs, ShareBar } from '../components/ui';
import AdSlot from '../components/ads/AdSlot';
import { buildFAQSchema, buildCalculatorSchema, SITE_URL } from '../lib/seo';

const PAGE_TITLE = 'Credit Card Payoff Calculator — Interest & Minimum Payment';
const PAGE_DESC = 'Calculate how long it takes to pay off your credit card, total interest paid, and how much you save by paying more than the minimum. Compare payoff strategies side by side.';
const PAGE_URL = `${SITE_URL}/credit-card-calculator`;

const FAQS = [
  {
    question: 'How is credit card interest calculated?',
    answer: "Credit card interest is calculated daily using your Daily Periodic Rate (DPR), which is your APR divided by 365. Each day, your balance is multiplied by the DPR to calculate that day's interest charge. These daily charges accumulate and are added to your balance at the end of each billing cycle. This is why carrying a balance is so expensive — interest compounds daily, not monthly.",
  },
  {
    question: 'Why does paying only the minimum take so long?',
    answer: "Minimum payments are typically 1-3% of your balance or a small fixed amount — whichever is greater. On a $5,000 balance at 22% APR, the minimum might be $100/month. Of that, roughly $92 goes to interest and only $8 reduces the balance. As the balance slowly shrinks, so does the minimum payment, stretching repayment over 20+ years and costing thousands in interest.",
  },
  {
    question: 'What is a balance transfer and should I use one?',
    answer: "A balance transfer moves your existing credit card debt to a new card with a 0% promotional APR, typically lasting 12-21 months. During this time, 100% of your payment reduces the principal with no interest. Balance transfer fees are usually 3-5% of the transferred amount. This strategy works best if you can pay off most or all of the balance before the promo period ends — otherwise you'll face a high regular APR on the remaining balance.",
  },
  {
    question: "What's the difference between the avalanche and snowball methods?",
    answer: "The avalanche method focuses extra payments on the highest-APR card first while paying minimums on others. This minimizes total interest paid and is mathematically optimal. The snowball method focuses on the smallest balance first regardless of rate. This provides faster wins and psychological motivation. Studies show the snowball method leads to higher overall debt payoff rates because motivation matters — choose what works for your personality.",
  },
  {
    question: 'How much should I pay on my credit card each month?',
    answer: "At minimum, always pay more than the minimum payment. A good rule of thumb is to pay at least 3-5% of your balance each month, or better yet, set a fixed dollar amount you can afford and stick to it. The most powerful strategy is to pay as much as possible — our comparison chart shows how dramatically each extra dollar reduces your total interest and payoff timeline.",
  },
  {
    question: 'Does paying off a credit card improve my credit score?',
    answer: "Yes, significantly. Credit utilization (your balance vs. credit limit) makes up about 30% of your FICO score. Keeping utilization below 30% is recommended, and below 10% is ideal. Paying off a card reduces utilization and can improve your score within 1-2 billing cycles. Additionally, a clean payment history (no missed payments) is the single biggest factor in your credit score at 35%.",
  },
  {
    question: 'Should I close my credit card after paying it off?',
    answer: "Generally no — keeping the account open maintains your available credit limit, which helps your utilization ratio and credit history length (both factors in your score). The exception is if the card has a high annual fee with no benefits, or if having the card open leads to overspending. If you close it, your available credit decreases and utilization on other cards may increase.",
  },
];

export default function CreditCardCalculatorPage() {
  return (
    <>
      <Head>
        <title>{PAGE_TITLE} | LifeCalc</title>
        <meta name="description" content={PAGE_DESC} />
        <meta name="keywords" content="credit card payoff calculator, credit card interest calculator, minimum payment calculator, how long to pay off credit card, credit card debt calculator, balance transfer calculator" />
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
          <span className="text-slate-800 font-medium">Credit Card Calculator</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-2">
              💳 Credit Card Payoff Calculator
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

        <CreditCardCalculator />

        <div className="flex justify-center my-10">
          <AdSlot type="rectangle" />
        </div>

        {/* SEO Content */}
        <article className="max-w-4xl mx-auto mt-12">
          <div className="calc-card mb-6">
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">How This Credit Card Calculator Works</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Enter your current credit card balance and APR, then set your monthly payment. The calculator instantly shows you how many months until the balance is zero, how much total interest you'll pay, and the total amount paid back to the card issuer.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              The <strong>vs. Minimum tab</strong> is the most eye-opening feature — it compares your chosen payment against paying only the minimum. For most balances, the difference in total interest and payoff time is shocking. A $5,000 balance at 22% APR paid at minimum takes over 20 years and costs $6,000+ in interest. Paying $300/month eliminates it in 20 months for under $1,000 in interest.
            </p>
            <p className="text-slate-600 leading-relaxed">
              The <strong>Comparison tab</strong> shows a table and chart of different payment amounts side by side, making it easy to see exactly how much each extra dollar saves. Use the <strong>Quick Select buttons</strong> to instantly model minimum, 2× minimum, and 3× minimum payment scenarios.
            </p>
          </div>

          <div className="calc-card mb-6">
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">Real Examples — Minimum vs. Paying More</h2>
            <div className="space-y-5">
              <div className="border-l-4 border-red-400 pl-4">
                <h3 className="font-semibold text-slate-900 mb-1">$5,000 Balance at 22.99% APR — Minimum Only (2%)</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Paying only the 2% minimum ($100 starting payment) takes approximately <strong>257 months (21+ years)</strong> to pay off and costs over <strong>$6,800 in interest</strong> — more than the original balance. Total paid: nearly $12,000 on a $5,000 debt.
                </p>
              </div>
              <div className="border-l-4 border-green-400 pl-4">
                <h3 className="font-semibold text-slate-900 mb-1">Same Balance — Paying $300/Month</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  At $300/month, the same $5,000 balance is gone in <strong>20 months</strong> with only <strong>$940 in interest</strong>. That's a savings of nearly $5,900 in interest and 19 years of payments — just by tripling the minimum payment.
                </p>
              </div>
              <div className="border-l-4 border-blue-400 pl-4">
                <h3 className="font-semibold text-slate-900 mb-1">$12,000 Balance at 24.99% APR — Balance Transfer Strategy</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Transferring $12,000 to a 0% APR card for 18 months (3% fee = $360) and paying $700/month pays off <strong>$12,600 in 18 months with $0 interest</strong>. Without the transfer at 24.99% APR paying the same $700, you'd pay <strong>$2,400 in interest</strong> and take 21 months. The transfer saves over $2,000.
                </p>
              </div>
            </div>
          </div>

          <div className="calc-card mb-6">
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">Credit Card Payoff Tips</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: '🎯', title: 'Pick one strategy and stick to it', tip: 'Avalanche saves the most money. Snowball builds the most momentum. Either beats making minimum payments by years and thousands of dollars.' },
                { icon: '📅', title: 'Pay before the statement closes', tip: "Paying before your statement closing date reduces the balance that gets reported to credit bureaus, improving your credit utilization ratio and potentially boosting your score." },
                { icon: '🔄', title: 'Set up autopay above the minimum', tip: 'Never miss a payment by automating it. Set autopay to your target monthly amount, not just the minimum — one missed payment can trigger a penalty APR of 29.99%.' },
                { icon: '💰', title: 'Apply windfalls immediately', tip: 'Tax refunds, bonuses, and gifts applied directly to credit card debt can slash your payoff timeline dramatically. A $1,500 tax refund on a $5,000 balance cuts payoff time nearly in half.' },
                { icon: '📞', title: 'Call and ask for a lower rate', tip: 'Cardholders with good payment history can often negotiate a lower APR with a simple phone call. Even a 3-5% reduction saves hundreds to thousands depending on your balance.' },
                { icon: '🚫', title: "Stop using the card while paying it off", tip: "It's nearly impossible to pay off a card if you keep adding to the balance. Freeze the card, delete it from saved payment methods, or switch to cash/debit for daily spending." },
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

        {/* Related */}
        <div className="max-w-4xl mx-auto mt-12">
          <h2 className="text-xl font-display font-bold text-slate-900 mb-4">Related Calculators</h2>
          <RelatedCalcs current="creditcard" />
        </div>

        <div className="flex justify-center mt-10">
          <AdSlot type="leaderboard" />
        </div>
      </div>
    </>
  );
}
