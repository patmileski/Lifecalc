// components/layout/Footer.jsx
import Link from 'next/link';
import { CALCULATORS } from '../../lib/seo';
import AdSlot from '../ads/AdSlot';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16 no-print">
      <div className="border-b border-slate-800 py-4 flex justify-center">
        <AdSlot type="leaderboard" label={false} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">L</span>
              </div>
              <span className="font-display font-bold text-xl text-white">
                Life<span className="text-brand-400">Calc</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Free, accurate financial calculators for mortgage, line of credit, car loans, renovation, and recreational purchase planning. No signup required.
            </p>
            <p className="text-xs text-slate-500 mt-4">
              <strong className="text-slate-400">Disclaimer:</strong> LifeCalc provides calculators for educational purposes only. Results are estimates and should not be considered financial advice. Consult a licensed financial advisor for personalized guidance.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Calculators</h3>
            <ul className="space-y-2">
              {CALCULATORS.map(c => (
                <li key={c.slug}>
                  <Link href={c.href} className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                    <span>{c.icon}</span>{c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">All Calculators</Link></li>
              <li><a href="https://www.consumerfinance.gov" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-white transition-colors">CFPB Resources</a></li>
              <li><a href="https://www.nhtsa.gov" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-white transition-colors">NHTSA Vehicle Info</a></li>
              <li><Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">© {year} LifeCalc. All rights reserved.</p>
          <p className="text-xs text-slate-600">Built for accuracy. Designed for clarity.</p>
        </div>
      </div>
    </footer>
  );
}
