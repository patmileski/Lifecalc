// components/ui/index.jsx
import { useState } from 'react';
import { formatCurrency } from '../../lib/calculations';

/* ── InputField ── */
export function InputField({ label, name, value, onChange, prefix, suffix, type = 'number', min, max, step, placeholder, error, helper }) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-semibold text-slate-700 mb-1.5">
        {label}
      </label>
      <div className="relative">
        {prefix && <span className="input-prefix">{prefix}</span>}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          className={`input-field ${prefix ? 'pl-7' : ''} ${suffix ? 'pr-12' : ''} ${error ? 'border-red-400 focus:ring-red-400' : ''}`}
          aria-describedby={helper ? `${name}-helper` : undefined}
        />
        {suffix && <span className="input-suffix">{suffix}</span>}
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      {helper && !error && <p id={`${name}-helper`} className="text-xs text-slate-400 mt-1">{helper}</p>}
    </div>
  );
}

/* ── SliderField ── */
export function SliderField({ label, name, value, onChange, min, max, step = 0.1, prefix, suffix, formatFn }) {
  const display = formatFn ? formatFn(value) : `${prefix || ''}${value}${suffix || ''}`;
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-1.5">
        <label htmlFor={`slider-${name}`} className="text-sm font-semibold text-slate-700">{label}</label>
        <span className="text-sm font-bold text-brand-600">{display}</span>
      </div>
      <input
        id={`slider-${name}`}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="range-slider w-full"
        aria-label={label}
      />
      <div className="flex justify-between text-xs text-slate-400 mt-1">
        <span>{formatFn ? formatFn(min) : `${prefix || ''}${min}${suffix || ''}`}</span>
        <span>{formatFn ? formatFn(max) : `${prefix || ''}${max}${suffix || ''}`}</span>
      </div>
    </div>
  );
}

/* ── ToggleSwitch ── */
export function ToggleSwitch({ label, checked, onChange, description }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-slate-100 last:border-0">
      <div>
        <span className="text-sm font-semibold text-slate-700 block">{label}</span>
        {description && <span className="text-xs text-slate-400">{description}</span>}
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${checked ? 'bg-brand-600' : 'bg-slate-200'}`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`}
        />
      </button>
    </div>
  );
}

/* ── ResultCard ── */
export function ResultCard({ children, className = '' }) {
  return (
    <div className={`result-card animate-slide-up ${className}`}>
      {children}
    </div>
  );
}

/* ── StatBig ── */
export function StatBig({ label, value, sub }) {
  return (
    <div className="text-center">
      <p className="text-sm text-blue-200 font-medium mb-1">{label}</p>
      <p className="text-4xl font-display font-bold text-white tracking-tight">{value}</p>
      {sub && <p className="text-xs text-blue-200 mt-1">{sub}</p>}
    </div>
  );
}

/* ── BreakdownRow ── */
export function BreakdownRow({ label, value, highlight, bold }) {
  return (
    <div className={`result-item ${bold ? 'font-bold' : ''}`}>
      <span className={`text-sm ${highlight ? 'text-brand-600 font-semibold' : 'text-slate-600'}`}>{label}</span>
      <span className={`text-sm font-semibold ${highlight ? 'text-brand-700' : 'text-slate-900'}`}>{value}</span>
    </div>
  );
}

/* ── FAQAccordion ── */
export function FAQAccordion({ faqs }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="faq-item">
          <button
            className="w-full flex justify-between items-start text-left px-5 py-4 hover:bg-slate-50 transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="font-semibold text-slate-900 text-sm pr-4">{faq.question}</span>
            <svg
              className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open === i && (
            <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed animate-fade-in border-t border-slate-100 pt-3">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── RelatedCalcs ── */
export function RelatedCalcs({ current }) {
  const { CALCULATORS } = require('../../lib/seo');
  const Link = require('next/link').default;
  const related = CALCULATORS.filter(c => c.slug !== current);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
      {related.map(c => (
        <Link key={c.slug} href={c.href}
          className="calc-card hover:shadow-md hover:border-brand-200 transition-all duration-200 group flex items-start gap-3">
          <span className="text-2xl">{c.icon}</span>
          <div>
            <p className="font-semibold text-slate-900 text-sm group-hover:text-brand-600 transition-colors">{c.title}</p>
            <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{c.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

/* ── ShareBar ── */
export function ShareBar({ title, url }) {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(url || window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const encodedUrl = encodeURIComponent(url || (typeof window !== 'undefined' ? window.location.href : ''));
  const encodedTitle = encodeURIComponent(title || 'CalcWise Calculator');

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Share:</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-1 px-3 py-1.5 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white text-xs font-medium rounded-lg transition-colors"
      >
        𝕏 Twitter
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-1 px-3 py-1.5 bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-medium rounded-lg transition-colors"
      >
        Facebook
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-1 px-3 py-1.5 bg-[#0A66C2] hover:bg-[#095ab5] text-white text-xs font-medium rounded-lg transition-colors"
      >
        LinkedIn
      </a>
      <button
        onClick={copyLink}
        className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors"
      >
        {copied ? '✓ Copied!' : '🔗 Copy Link'}
      </button>
    </div>
  );
}

/* ── AffordabilityMeter ── */
export function AffordabilityMeter({ ratio, label }) {
  const pct = Math.min(ratio || 0, 100);
  const color = pct <= 15 ? 'bg-green-500' : pct <= 25 ? 'bg-blue-500' : pct <= 35 ? 'bg-yellow-500' : pct <= 45 ? 'bg-orange-500' : 'bg-red-500';
  const textColor = pct <= 15 ? 'text-green-600' : pct <= 25 ? 'text-blue-600' : pct <= 35 ? 'text-yellow-600' : pct <= 45 ? 'text-orange-600' : 'text-red-600';

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-slate-600">Affordability</span>
        <span className={`text-sm font-bold ${textColor}`}>{label} ({pct.toFixed(1)}% of income)</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-3 rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-slate-400 mt-1">
        <span>0%</span><span>15%</span><span>30%</span><span>45%+</span>
      </div>
    </div>
  );
}
