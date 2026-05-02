// components/calculators/CreditCardCalculator.jsx
import { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { formatCurrency } from '../../lib/calculations';
import { useLocalStorage } from '../../lib/useLocalStorage';
import { InputField, SliderField, ResultCard, StatBig, BreakdownRow } from '../ui';
import AdSlot from '../ads/AdSlot';

const DEFAULTS = {
  balance: 8500,
  interestRate: 22.99,
  minimumPaymentType: 'percent',
  minimumPaymentPercent: 2,
  minimumPaymentFixed: 25,
  customPayment: 300,
  monthlyIncome: 5000,
};

const CARD_PRESETS = [
  { label: 'Store Card', rate: 28.99, icon: '🛍️' },
  { label: 'Avg Credit Card', rate: 22.99, icon: '💳' },
  { label: 'Travel Card', rate: 21.99, icon: '✈️' },
  { label: 'Cash Back', rate: 19.99, icon: '💰' },
  { label: 'Credit Union', rate: 12.99, icon: '🏦' },
  { label: '0% Promo', rate: 0, icon: '⭐' },
];

function calcPayoff(balance, annualRate, monthlyPayment) {
  if (balance <= 0) return { months: 0, totalInterest: 0, totalPaid: 0, canPayOff: true, chartData: [] };
  const monthlyRate = annualRate / 100 / 12;
  if (annualRate === 0) {
    const months = Math.ceil(balance / monthlyPayment);
    return { months, years: Math.floor(months / 12), remainingMonths: months % 12, totalInterest: 0, totalPaid: balance, canPayOff: true, chartData: [] };
  }
  const minInterest = balance * monthlyRate;
  if (monthlyPayment <= minInterest) {
    return { months: Infinity, totalInterest: Infinity, totalPaid: Infinity, canPayOff: false, minInterest, chartData: [] };
  }
  let remaining = balance;
  let totalInterest = 0;
  let months = 0;
  const chartData = [{ month: 0, balance: Math.round(remaining) }];
  while (remaining > 0.01 && months < 600) {
    const interest = remaining * monthlyRate;
    totalInterest += interest;
    remaining = Math.max(0, remaining + interest - monthlyPayment);
    months++;
    if (months % 3 === 0 || months === 1) {
      chartData.push({ month: months, balance: Math.round(remaining) });
    }
  }
  return {
    months,
    years: Math.floor(months / 12),
    remainingMonths: months % 12,
    totalInterest,
    totalPaid: balance + totalInterest,
    canPayOff: true,
    minInterest,
    chartData,
  };
}

function calcMinimumPayment(balance, rate, type, percent, fixed) {
  const monthlyRate = rate / 100 / 12;
  const interest = balance * monthlyRate;
  if (type === 'percent') {
    return Math.max(fixed || 25, balance * (percent / 100));
  }
  return Math.max(fixed, interest + 1);
}

export default function CreditCardCalculator() {
  const [inputs, setInputs, clearInputs] = useLocalStorage('creditcard-inputs', DEFAULTS);
  const [results, setResults] = useState(null);
  const [minResults, setMinResults] = useState(null);
  const [activeTab, setActiveTab] = useState('payoff');

  const calculate = useCallback(() => {
    const balance = Number(inputs.balance) || 0;
    const rate = Number(inputs.interestRate) || 0;
    const customPayment = Number(inputs.customPayment) || 0;
    const minPayment = calcMinimumPayment(
      balance, rate,
      inputs.minimumPaymentType,
      Number(inputs.minimumPaymentPercent),
      Number(inputs.minimumPaymentFixed)
    );

    const customRes = calcPayoff(balance, rate, customPayment);
    const minRes = calcPayoff(balance, rate, minPayment);

    setResults({ ...customRes, minPayment, customPayment });
    setMinResults(minRes);
  }, [inputs]);

  useEffect(() => { calculate(); }, [calculate]);

  const handleChange = (field) => (e) => {
    setInputs(prev => ({ ...prev, [field]: e.target.value }));
  };

  const applyPreset = (preset) => {
    setInputs(prev => ({ ...prev, interestRate: preset.rate }));
  };

  // Build comparison data for different payment amounts
  const comparisonData = results ? [100, 150, 200, 300, 400, 500].map(payment => {
    const res = calcPayoff(Number(inputs.balance), Number(inputs.interestRate), payment);
    return {
      payment: `$${payment}`,
      months: res.canPayOff && res.months < 600 ? res.months : null,
      interest: res.canPayOff ? Math.round(res.totalInterest) : null,
    };
  }).filter(d => d.months !== null) : [];

  const interestSaved = results && minResults && minResults.canPayOff
    ? minResults.totalInterest - results.totalInterest
    : 0;

  const monthsSaved = results && minResults && minResults.canPayOff
    ? minResults.months - results.months
    : 0;

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inputs */}
        <div className="lg:col-span-1 space-y-4">
          <div className="calc-card">
            <h2 className="text-lg font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span>💳</span> Card Details
            </h2>

            {/* Card presets */}
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Card Type Presets</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {CARD_PRESETS.map(p => (
                <button
                  key={p.label}
                  onClick={() => applyPreset(p)}
                  className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-medium border transition-all ${inputs.interestRate == p.rate ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-slate-200 hover:border-slate-300 text-slate-600'}`}
                >
                  <span>{p.icon}</span>
                  <div className="text-left">
                    <div>{p.label}</div>
                    <div className="text-slate-400">{p.rate}% APR</div>
                  </div>
                </button>
              ))}
            </div>

            <InputField
              label="Current Balance"
              name="balance"
              value={inputs.balance}
              onChange={handleChange('balance')}
              prefix="$"
              min={0}
              step={100}
            />

            <SliderField
              label="Interest Rate (APR)"
              name="interestRate"
              value={inputs.interestRate}
              onChange={handleChange('interestRate')}
              min={0}
              max={35}
              step={0.01}
              suffix="%"
            />
          </div>

          <div className="calc-card">
            <h2 className="text-lg font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span>💵</span> Payment Options
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Minimum Payment Type</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'percent', label: '% of Balance' },
                  { id: 'fixed', label: 'Fixed Amount' },
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setInputs(p => ({ ...p, minimumPaymentType: t.id }))}
                    className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${inputs.minimumPaymentType === t.id ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {inputs.minimumPaymentType === 'percent' ? (
              <SliderField
                label="Minimum Payment %"
                name="minimumPaymentPercent"
                value={inputs.minimumPaymentPercent}
                onChange={handleChange('minimumPaymentPercent')}
                min={1}
                max={5}
                step={0.5}
                suffix="%"
              />
            ) : (
              <InputField
                label="Minimum Fixed Payment"
                name="minimumPaymentFixed"
                value={inputs.minimumPaymentFixed}
                onChange={handleChange('minimumPaymentFixed')}
                prefix="$"
                min={1}
              />
            )}

            <div className="border-t border-slate-100 pt-4 mt-2">
              <InputField
                label="Your Monthly Payment"
                name="customPayment"
                value={inputs.customPayment}
                onChange={handleChange('customPayment')}
                prefix="$"
                min={0}
                step={25}
                helper={results ? `Minimum payment: ${formatCurrency(results.minPayment)}/mo` : ''}
              />
            </div>

            {/* Quick payment buttons */}
            <div className="mt-2">
              <p className="text-xs text-slate-500 mb-2">Quick select:</p>
              <div className="grid grid-cols-3 gap-2">
                {results && [
                  { label: 'Min', value: Math.ceil(results.minPayment) },
                  { label: '2× Min', value: Math.ceil(results.minPayment * 2) },
                  { label: '3× Min', value: Math.ceil(results.minPayment * 3) },
                ].map(btn => (
                  <button
                    key={btn.label}
                    onClick={() => setInputs(p => ({ ...p, customPayment: btn.value }))}
                    className="py-1.5 px-2 bg-slate-100 hover:bg-brand-50 hover:text-brand-600 rounded-lg text-xs font-medium transition-colors text-center"
                  >
                    <div className="font-semibold">{btn.label}</div>
                    <div className="text-slate-500">{formatCurrency(btn.value)}</div>
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => clearInputs()} className="btn-secondary w-full text-sm mt-4">Reset</button>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-4">
          {results && (
            <>
              {/* Warning if payment too low */}
              {!results.canPayOff && (
                <div className="bg-red-50 border border-red-300 rounded-2xl p-5">
                  <p className="text-red-800 font-bold text-lg mb-1">⚠️ Your payment doesn't cover interest!</p>
                  <p className="text-red-700 text-sm">
                    Monthly interest: <strong>{formatCurrency(results.minPayment)}</strong>. Your balance will grow forever at this payment level.
                    Increase your payment to at least <strong>{formatCurrency(Math.ceil(results.minPayment) + 1)}/mo</strong> to start reducing the balance.
                  </p>
                </div>
              )}

              {results.canPayOff && (
                <ResultCard>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <StatBig
                      label="Payoff Time"
                      value={results.years > 0 ? `${results.years}y ${results.remainingMonths}m` : `${results.months}mo`}
                      sub={`${results.months} total payments`}
                    />
                    <StatBig
                      label="Total Interest"
                      value={formatCurrency(results.totalInterest)}
                      sub="Cost of carrying this balance"
                    />
                    <StatBig
                      label="Total Paid"
                      value={formatCurrency(results.totalPaid)}
                      sub="Balance + interest"
                    />
                  </div>
                </ResultCard>
              )}

              {/* Tabs */}
              {results.canPayOff && (
                <div className="calc-card">
                  <div className="flex gap-1 mb-5 bg-slate-100 p-1 rounded-xl">
                    {['payoff', 'vs minimum', 'comparison'].map(tab => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg capitalize transition-all ${activeTab === tab ? 'bg-white shadow-sm text-brand-700' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Payoff Chart */}
                  {activeTab === 'payoff' && (
                    <div className="animate-fade-in">
                      <h3 className="text-sm font-semibold text-slate-700 mb-4">Balance Over Time</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={results.chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                          <XAxis dataKey="month" tick={{ fontSize: 11 }} tickFormatter={v => `Mo ${v}`} />
                          <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                          <Tooltip formatter={(val) => formatCurrency(val)} labelFormatter={l => `Month ${l}`} />
                          <Line type="monotone" dataKey="balance" stroke="#0284c7" strokeWidth={2.5} dot={false} name="Balance" />
                        </LineChart>
                      </ResponsiveContainer>

                      <div className="mt-5 space-y-1">
                        <BreakdownRow label="Starting Balance" value={formatCurrency(inputs.balance)} />
                        <BreakdownRow label="Monthly Payment" value={formatCurrency(inputs.customPayment)} />
                        <BreakdownRow label="Monthly Interest Rate" value={`${(inputs.interestRate / 12).toFixed(2)}%`} />
                        <BreakdownRow label="Months to Pay Off" value={`${results.months} months`} />
                        <BreakdownRow label="Total Interest" value={formatCurrency(results.totalInterest)} highlight />
                        <BreakdownRow label="Total Paid" value={formatCurrency(results.totalPaid)} bold />
                      </div>
                    </div>
                  )}

                  {/* vs Minimum */}
                  {activeTab === 'vs minimum' && minResults && (
                    <div className="animate-fade-in">
                      <h3 className="text-sm font-semibold text-slate-700 mb-4">Your Payment vs. Minimum Only</h3>
                      <div className="grid grid-cols-2 gap-4 mb-5">
                        <div className="bg-brand-50 border border-brand-200 rounded-xl p-4">
                          <p className="text-xs font-semibold text-brand-600 mb-2">Your Payment ({formatCurrency(inputs.customPayment)}/mo)</p>
                          <p className="text-xl font-bold text-brand-700">{results.years > 0 ? `${results.years}y ${results.remainingMonths}m` : `${results.months}mo`}</p>
                          <p className="text-xs text-brand-600 mt-1">Interest: {formatCurrency(results.totalInterest)}</p>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                          <p className="text-xs font-semibold text-red-600 mb-2">Minimum Only ({formatCurrency(results.minPayment)}/mo)</p>
                          {minResults.canPayOff ? (
                            <>
                              <p className="text-xl font-bold text-red-700">{minResults.years > 0 ? `${minResults.years}y ${minResults.remainingMonths}m` : `${minResults.months}mo`}</p>
                              <p className="text-xs text-red-600 mt-1">Interest: {formatCurrency(minResults.totalInterest)}</p>
                            </>
                          ) : (
                            <p className="text-sm font-bold text-red-700">Never pays off!</p>
                          )}
                        </div>
                      </div>

                      {minResults.canPayOff && interestSaved > 0 && (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                          <p className="text-sm font-bold text-green-800 mb-1">
                            💰 By paying {formatCurrency(inputs.customPayment)}/mo instead of the minimum you save:
                          </p>
                          <div className="grid grid-cols-2 gap-4 mt-2">
                            <div>
                              <p className="text-2xl font-bold text-green-700">{formatCurrency(interestSaved)}</p>
                              <p className="text-xs text-green-600">in interest savings</p>
                            </div>
                            <div>
                              <p className="text-2xl font-bold text-green-700">{Math.floor(monthsSaved / 12)}y {monthsSaved % 12}m</p>
                              <p className="text-xs text-green-600">sooner payoff</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Comparison */}
                  {activeTab === 'comparison' && (
                    <div className="animate-fade-in">
                      <h3 className="text-sm font-semibold text-slate-700 mb-4">Payment Amount vs. Total Interest</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={comparisonData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                          <XAxis dataKey="payment" tick={{ fontSize: 11 }} />
                          <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                          <Tooltip formatter={(val, name) => [formatCurrency(val), name === 'interest' ? 'Total Interest' : 'Months']} />
                          <Bar dataKey="interest" fill="#f97316" name="interest" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                      <p className="text-xs text-slate-400 mt-2">Higher monthly payments dramatically reduce total interest paid.</p>

                      <div className="mt-4 overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                              <th className="text-left px-3 py-2 font-semibold text-slate-600">Monthly Payment</th>
                              <th className="text-right px-3 py-2 font-semibold text-slate-600">Payoff Time</th>
                              <th className="text-right px-3 py-2 font-semibold text-slate-600">Total Interest</th>
                              <th className="text-right px-3 py-2 font-semibold text-slate-600">Total Paid</th>
                            </tr>
                          </thead>
                          <tbody>
                            {comparisonData.map((row, i) => (
                              <tr key={i} className={`border-b border-slate-100 ${inputs.customPayment == parseInt(row.payment.replace('$', '')) ? 'bg-brand-50' : 'hover:bg-slate-50'}`}>
                                <td className="px-3 py-2 font-semibold text-slate-800">{row.payment}/mo</td>
                                <td className="px-3 py-2 text-right text-slate-600">{row.months} mo</td>
                                <td className="px-3 py-2 text-right text-orange-600 font-medium">{formatCurrency(row.interest)}</td>
                                <td className="px-3 py-2 text-right text-slate-800 font-medium">{formatCurrency(Number(inputs.balance) + row.interest)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Debt payoff tips */}
              <div className="calc-card bg-amber-50 border border-amber-200">
                <h3 className="text-sm font-semibold text-amber-800 mb-3">💡 Credit Card Payoff Strategies</h3>
                <div className="space-y-2">
                  {[
                    { name: 'Avalanche Method', desc: 'Pay minimums on all cards, put extra toward highest APR first. Saves the most interest.' },
                    { name: 'Snowball Method', desc: 'Pay minimums on all cards, put extra toward smallest balance first. Best for motivation.' },
                    { name: 'Balance Transfer', desc: '0% APR promo cards let you pause interest for 12-21 months. Transfer fee typically 3-5%.' },
                    { name: 'Debt Consolidation', desc: 'Personal loan at lower rate than your card. Fixed payments, fixed payoff date.' },
                  ].map((s, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="text-amber-500 font-bold text-xs mt-0.5">▸</span>
                      <p className="text-xs text-amber-800"><strong>{s.name}:</strong> {s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <AdSlot type="inline" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
