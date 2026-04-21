// pages/line-of-credit-calculator.jsx
import Head from 'next/head';
import LOCCalculator from '../components/calculators/LOCCalculator';
import { FAQAccordion, RelatedCalcs, ShareBar } from '../components/ui';
import AdSlot from '../components/ads/AdSlot';
import { buildFAQSchema, buildCalculatorSchema, SITE_URL } from '../lib/seo';

const PAGE_TITLE = 'Line of Credit Payment Calculator — LOC Payoff & Interest';
const PAGE_DESC = "Calculate how long it takes to pay off your line of credit, total interest paid, and compare different monthly payment scenarios. Works for HELOCs and personal lines of credit.";
const PAGE_URL = `${SITE_URL}/line-of-credit-calculator`;

const FAQS = [
  {
    question: 'What is a line of credit and how does interest work?',
    answer: "A line of credit (LOC) is a flexible loan with a set credit limit you can draw from as needed. Unlike a fixed installment loan, you only pay interest on the amount you've actually borrowed. Interest accrues daily and is charged monthly. As you repay, you can borrow again — making it revolving credit. The interest rate is usually variable, tied to the prime rate or another benchmark.",
  },
  {
    question: 'What is the minimum payment on a line of credit?',
    answer: "Most lenders set a minimum payment equal to either the interest accrued for the month (interest-only), or a small percentage of the outstanding balance (commonly 1-3%), whichever is greater. Paying only the minimum means you'll make very slow progress reducing the balance. Our calculator shows you the exact minimum interest-only payment and lets you model what happens when you pay more.",
  },
  {
    question: "What's the difference between a HELOC and a personal line of credit?",
    answer: "A HELOC (Home Equity Line of Credit) is secured by your home's equity, which typically means lower interest rates (often prime + 0.5% to 2%) but the risk of losing your home if you default. A personal line of credit is unsecured, so rates are higher (usually 8-20%), but there's no collateral at risk. Both work the same way in this calculator — just enter the correct interest rate for your product.",
  },
  {
    question: 'How do I pay off my line of credit faster?',
    answer: "The most effective strategies are: (1) Pay more than the minimum — even an extra $100/month can save thousands in interest and shave years off payoff time. (2) Make bi-weekly payments. (3) Apply windfalls like tax refunds or bonuses directly to the balance. (4) Avoid drawing more while trying to pay down. (5) Consider a balance transfer to a lower-rate product. Use the Quick Scenarios in our calculator to model different payment amounts.",
  },
  {
    question: 'Why does my line of credit balance barely go down even when I make payments?',
    answer: "If your monthly payment is equal to or only slightly above the interest charge, nearly all of your payment goes toward interest with very little reducing the principal. This is called 'negative amortization' risk. For example, on a $20,000 balance at 9% APR, monthly interest is $150. A $200 payment only reduces the balance by $50. Our calculator flags this and shows you exactly how much of your payment is covering interest vs. reducing the balance.",
  },
  {
    question: 'Should I use a line of credit or a personal loan for a large purchase?',
    answer: "A personal loan is usually better for large, defined purchases because it has a fixed rate, fixed term, and fixed monthly payment — making budgeting predictable. A line of credit is better for ongoing or uncertain expenses (home renovation with variable costs, emergency fund backup) where you want flexibility. Lines of credit often have variable rates that can increase over time, adding payment risk.",
  },
  {
    question: 'Is line of credit interest tax deductible?',
    answer: "HELOC interest may be tax deductible if the funds were used to buy, build, or substantially improve the home securing the loan, subject to the mortgage interest deduction limits. Personal line of credit interest is generally not tax deductible. Tax laws change — consult a tax professional for advice specific to your situation.",
  },
];

export default function LOCCalculatorPage() {
  return (
    <>
      <Head>
        <title>{PAGE_TITLE} | CalcWise</title>
        <meta name="description" content={PAGE_DESC} />
        <meta name="keywords" content="line of credit payment calculator, HELOC calculator, LOC payoff calculator, credit line interest calculator, line of credit interest calculator, how long to pay off line of credit" />
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
          <span className="text-slate-800 font-medium">Line of Credit Calculator</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-2">
              💳 Line of Credit Calculator
            </h1>
            <p className="text-slate-600 max-w-2xl">{PAGE_DESC}</p>
          </div>
          <div className="shrink-0">
            <ShareBar title={PAGE_TITLE} url={PAGE_URL} />
          </div>
        </div>

        {/* Top Ad */}
        <div className="flex justify-center mb-8">
          <AdSlot type="leaderboard" />
        </div>

        {/* Calculator */}
        <LOCCalculator />

        {/* Mid Ad */}
        <div className="flex justify-center my-10">
          <AdSlot type="rectangle" />
        </div>

        {/* SEO Content */}
        <article className="max-w-4xl mx-auto mt-12">
          <div className="calc-card mb-6">
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">How This Line of Credit Calculator Works</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Enter your current balance (or credit limit), your interest rate (APR), and your intended monthly payment. The calculator instantly shows you how many months it will take to pay off the balance completely, how much total interest you'll pay, and the total amount paid back to the lender.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              The <strong>Quick Scenarios panel</strong> lets you compare four common payment strategies side by side — from the bare minimum payment to an aggressive payoff plan. This makes it easy to see the dramatic difference that even modestly higher payments can make.
            </p>
            <p className="text-slate-600 leading-relaxed">
              The <strong>balance payoff chart</strong> visualizes exactly how your balance decreases over time, clearly showing the "acceleration" effect as more of each payment goes toward principal once early interest charges shrink.
            </p>
          </div>

          <div className="calc-card mb-6">
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">Real-World LOC Examples</h2>
            <div className="space-y-5">
              <div className="border-l-4 border-purple-400 pl-4">
                <h3 className="font-semibold text-slate-900 mb-1">HELOC Used for Renovation — $40,000 at 8% APR</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  A homeowner draws $40,000 from a HELOC at 8% APR for a kitchen renovation. The interest-only minimum payment is $267/month. Paying just $600/month pays off the balance in <strong>84 months (7 years)</strong> with $10,100 in interest. Bumping to $1,000/month cuts payoff to <strong>47 months</strong> and interest to $6,700 — saving $3,400 and 3 years.
                </p>
              </div>
              <div className="border-l-4 border-blue-400 pl-4">
                <h3 className="font-semibold text-slate-900 mb-1">Personal LOC for Emergency — $15,000 at 12% APR</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  After an emergency, someone carries a $15,000 personal LOC balance at 12% APR. At $400/month, payoff takes <strong>45 months</strong> with $2,900 in interest. At $800/month, it's done in <strong>21 months</strong> with $1,300 in interest — a $1,600 savings for doubling the payment.
                </p>
              </div>
            </div>
          </div>

          <div className="calc-card mb-6">
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">Tips for Managing Your Line of Credit</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: '🎯', title: 'Set a payoff goal date', tip: 'Work backward from your target payoff date to find the monthly payment you need. Use our Quick Scenarios to find the right amount.' },
                { icon: '📉', title: 'Watch for rate increases', tip: 'Most LOCs have variable rates. A 2% rate increase on a $50,000 balance means an extra $83/month in interest — always budget a buffer.' },
                { icon: '🔄', title: "Don't re-borrow while paying off", tip: "It's tempting to redraw from a revolving LOC, but doing so resets your payoff timeline. Treat it like a fixed loan until it's zeroed out." },
                { icon: '📊', title: 'Monitor credit utilization', tip: 'Your LOC balance affects your credit score. Keeping utilization below 30% of the limit is ideal. Pay it down before applying for new credit.' },
                { icon: '💡', title: 'Consider consolidating', tip: 'If you have multiple high-rate balances, consolidating into a single lower-rate LOC (like a HELOC) can simplify payments and reduce interest costs.' },
                { icon: '📅', title: 'Pay before statement closes', tip: 'Paying before the statement closing date reduces the reported balance, which can boost your credit score if utilization is a concern.' },
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
          <RelatedCalcs current="loc" />
        </div>

        <div className="flex justify-center mt-10">
          <AdSlot type="leaderboard" />
        </div>
      </div>
    </>
  );
}
