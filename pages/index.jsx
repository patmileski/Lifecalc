// pages/index.jsx
import Head from 'next/head';
import Link from 'next/link';
import { CALCULATORS, SITE_NAME, SITE_DESCRIPTION } from '../lib/seo';
import AdSlot from '../components/ads/AdSlot';

const STATS = [
  { value: '4', label: 'Free Calculators' },
  { value: '100%', label: 'Client-Side — No Data Stored' },
  { value: '0', label: 'Sign-ups Required' },
  { value: '∞', label: 'Calculations Available' },
];

const COLOR_MAP = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'bg-blue-100 text-blue-600', badge: 'bg-blue-100 text-blue-700', btn: 'bg-blue-600 hover:bg-blue-700' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'bg-purple-100 text-purple-600', badge: 'bg-purple-100 text-purple-700', btn: 'bg-purple-600 hover:bg-purple-700' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'bg-orange-100 text-orange-600', badge: 'bg-orange-100 text-orange-700', btn: 'bg-orange-600 hover:bg-orange-700' },
  teal: { bg: 'bg-teal-50', border: 'border-teal-200', icon: 'bg-teal-100 text-teal-600', badge: 'bg-teal-100 text-teal-700', btn: 'bg-teal-600 hover:bg-teal-700' },
};

export default function Home() {
  return (
    <>
      <Head>
        <title>{SITE_NAME} — Free Financial Calculators for Mortgage, LOC, Renovation & More</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta name="keywords" content="mortgage calculator, line of credit calculator, renovation cost calculator, boat affordability calculator, financial calculators" />
        <meta property="og:title" content={`${SITE_NAME} — Free Financial Calculators`} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.calcwise.io" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": SITE_NAME,
          "description": SITE_DESCRIPTION,
          "url": "https://www.calcwise.io",
        })}} />
      </Head>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Free — No signup required
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
              Financial Calculators <br />
              <span className="text-accent-400">Built for Real Decisions</span>
            </h1>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl leading-relaxed">
              Instant, accurate calculations for mortgages, lines of credit, home renovations, and recreational purchases. Get the full picture — monthly payments, total interest, and true cost of ownership.
            </p>
            <div className="flex flex-wrap gap-3">
              {CALCULATORS.map(c => (
                <Link key={c.slug} href={c.href}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm rounded-xl px-4 py-2.5 text-sm font-medium transition-all hover:scale-105">
                  <span>{c.icon}</span>
                  {c.shortTitle}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-display font-bold text-brand-700">{s.value}</p>
                <p className="text-xs text-slate-500 mt-1 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Header Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-center">
        <AdSlot type="leaderboard" />
      </div>

      {/* Calculator Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-3">Choose Your Calculator</h2>
          <p className="text-slate-500 max-w-xl mx-auto">Each calculator gives you a detailed breakdown so you can make confident financial decisions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CALCULATORS.map((calc) => {
            const colors = COLOR_MAP[calc.color] || COLOR_MAP.blue;
            return (
              <Link key={calc.slug} href={calc.href}
                className={`group calc-card ${colors.bg} ${colors.border} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 ${colors.icon} rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-sm`}>
                    {calc.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-xl text-slate-900 mb-2 group-hover:text-brand-700 transition-colors">
                      {calc.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">{calc.description}</p>
                    <span className={`inline-flex items-center gap-1 ${colors.btn} text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors`}>
                      Open Calculator →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Why CalcWise */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-3">Why Use CalcWise?</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Built for accuracy, designed for clarity. No fluff, no upsells.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '⚡', title: 'Instant Results', desc: 'Calculations update in real-time as you type. No "calculate" button required.' },
              { icon: '🔒', title: 'Privacy First', desc: 'All calculations happen in your browser. No data is ever sent to a server.' },
              { icon: '💾', title: 'Saves Your Inputs', desc: 'Your calculator inputs are saved locally so you can come back anytime.' },
              { icon: '📊', title: 'Visual Breakdowns', desc: 'Charts and amortization tables make complex numbers easy to understand.' },
              { icon: '📱', title: 'Mobile Friendly', desc: 'Works perfectly on any device — phone, tablet, or desktop.' },
              { icon: '🎯', title: 'No Sign-up', desc: 'Start calculating immediately. No account, no email, no credit card.' },
            ].map((f, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <span className="text-2xl mb-3 block">{f.icon}</span>
                <h3 className="font-semibold text-white mb-1">{f.title}</h3>
                <p className="text-sm text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center">
        <AdSlot type="rectangle" />
      </div>
    </>
  );
}
