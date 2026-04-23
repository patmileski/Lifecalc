// pages/404.jsx
import Link from 'next/link';
import { CALCULATORS } from '../lib/seo';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <p className="text-6xl mb-4">🧮</p>
      <h1 className="text-3xl font-display font-bold text-slate-900 mb-3">Page Not Found</h1>
      <p className="text-slate-500 mb-8">That calculator doesn't exist — but these ones do:</p>
      <div className="grid grid-cols-2 gap-3 mb-8">
        {CALCULATORS.map(c => (
          <Link key={c.slug} href={c.href}
            className="flex items-center gap-2 p-4 bg-white border border-slate-200 rounded-xl hover:border-brand-300 hover:shadow-sm transition-all text-left">
            <span className="text-2xl">{c.icon}</span>
            <span className="text-sm font-semibold text-slate-800">{c.title}</span>
          </Link>
        ))}
      </div>
      <Link href="/" className="btn-primary">Go Home</Link>
    </div>
  );
}
