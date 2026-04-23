// components/calculators/MortgageCalculator.jsx
import { useState, useEffect, useCallback } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { calcMortgage, buildAmortizationSchedule, formatCurrency, formatNumber } from '../../lib/calculations';
import { useLocalStorage } from '../../lib/useLocalStorage';
import { InputField, SliderField, ResultCard, StatBig, BreakdownRow, AffordabilityMeter } from '../ui';
import AdSlot from '../ads/AdSlot';

const DEFAULTS = {
  homePrice: 450000,
  downPayment: 90000,
  interestRate: 6.8,
  termYears: 30,
  annualTax: 5400,
  annualInsurance: 1800,
  monthlyIncome: 8000,
};

export default function MortgageCalculator() {
  const [inputs, setInputs, clearInputs] = useLocalStorage('mortgage-inputs', DEFAULTS);
  const [results, setResults] = useState(null);
  const [amortization, setAmortization] = useState([]);
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState('summary');

  const validate = (vals) => {
    const e = {};
    if (!vals.homePrice || vals.homePrice <= 0) e.homePrice = 'Home price must be greater than 0';
    if (vals.downPayment < 0) e.downPayment = 'Down payment cannot be negative';
    if (vals.downPayment >= vals.homePrice) e.downPayment = 'Down payment must be less than home price';
    if (!vals.interestRate || vals.interestRate <= 0) e.interestRate = 'Interest rate must be greater than 0';
    if (!vals.termYears || vals.termYears <= 0) e.termYears = 'Term must be greater than 0';
    return e;
  };

  const calculate = useCallback(() => {
    const errs = validate(inputs);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const res = calcMortgage({
      homePrice: Number(inputs.homePrice),
      downPayment: Number(inputs.downPayment),
      annualRate: Number(inputs.interestRate),
      termYears: Number(inputs.termYears),
      annualTax: Number(inputs.annualTax) || 0,
      annualInsurance: Number(inputs.annualInsurance) || 0,
    });
    setResults(res);

    const schedule = buildAmortizationSchedule({
      principal: res.principal,
      annualRate: Number(inputs.interestRate),
      termYears: Number(inputs.termYears),
    });
    setAmortization(schedule);
  }, [inputs]);

  useEffect(() => { calculate(); }, [calculate]);

  const handleChange = (field) => (e) => {
    setInputs(prev => ({ ...prev, [field]: e.target.value }));
  };

  const downPaymentPct = inputs.homePrice > 0
    ? ((inputs.downPayment / inputs.homePrice) * 100).toFixed(1)
    : 0;

  const pieData = results ? [
    { name: 'Principal', value: results.principal, color: '#0284c7' },
    { name: 'Total Interest', value: results.totalInterest, color: '#f97316' },
    { name: 'Property Tax', value: (inputs.annualTax || 0) * (inputs.termYears || 30), color: '#8b5cf6' },
    { name: 'Insurance', value: (inputs.annualInsurance || 0) * (inputs.termYears || 30), color: '#10b981' },
  ].filter(d => d.value > 0) : [];

  const affordability = results && inputs.monthlyIncome
    ? { ratio: (results.monthlyPayment / inputs.monthlyIncome) * 100, label: results.monthlyPayment / inputs.monthlyIncome <= 0.15 ? 'Excellent' : results.monthlyPayment / inputs.monthlyIncome <= 0.28 ? 'Good' : results.monthlyPayment / inputs.monthlyIncome <= 0.36 ? 'Manageable' : 'High' }
    : null;

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Inputs */}
        <div className="lg:col-span-1 space-y-4">
          <div className="calc-card">
            <h2 className="text-lg font-display font-bold text-slate-900 mb-5 flex items-center gap-2">
              <span>🏠</span> Loan Details
            </h2>

            <InputField
              label="Home Price"
              name="homePrice"
              value={inputs.homePrice}
              onChange={handleChange('homePrice')}
              prefix="$"
              min={1}
              step={5000}
              error={errors.homePrice}
            />

            <InputField
              label={`Down Payment (${downPaymentPct}%)`}
              name="downPayment"
              value={inputs.downPayment}
              onChange={handleChange('downPayment')}
              prefix="$"
              min={0}
              step={1000}
              error={errors.downPayment}
              helper={`${downPaymentPct}% down — ${downPaymentPct < 20 ? '⚠️ PMI may apply under 20%' : '✓ No PMI required'}`}
            />

            <SliderField
              label="Interest Rate"
              name="interestRate"
              value={inputs.interestRate}
              onChange={handleChange('interestRate')}
              min={1}
              max={15}
              step={0.05}
              suffix="%"
            />

            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Loan Term</label>
              <div className="grid grid-cols-3 gap-2">
                {[10, 15, 20, 25, 30].map(t => (
                  <button
                    key={t}
                    onClick={() => setInputs(p => ({ ...p, termYears: t }))}
                    className={`py-2 rounded-lg text-sm font-medium transition-all ${inputs.termYears == t ? 'bg-brand-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                  >
                    {t} yr
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="calc-card">
            <h2 className="text-lg font-display font-bold text-slate-900 mb-5 flex items-center gap-2">
              <span>📋</span> Monthly Costs
            </h2>

            <InputField
              label="Annual Property Tax"
              name="annualTax"
              value={inputs.annualTax}
              onChange={handleChange('annualTax')}
              prefix="$"
              min={0}
              helper="Annual amount — we'll divide by 12"
            />

            <InputField
              label="Annual Home Insurance"
              name="annualInsurance"
              value={inputs.annualInsurance}
              onChange={handleChange('annualInsurance')}
              prefix="$"
              min={0}
            />

            <InputField
              label="Monthly Gross Income (for affordability)"
              name="monthlyIncome"
              value={inputs.monthlyIncome}
              onChange={handleChange('monthlyIncome')}
              prefix="$"
              min={0}
              helper="Optional — used to calculate debt-to-income ratio"
            />

            <div className="flex gap-3 mt-6">
              <button onClick={() => { clearInputs(); }} className="btn-secondary flex-1 text-sm">
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Right: Results */}
        <div className="lg:col-span-2 space-y-4">
          {results && (
            <>
              <ResultCard>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <StatBig
                    label="Monthly Payment"
                    value={formatCurrency(results.monthlyPayment, 0)}
                    sub="Principal + Interest + Tax + Ins."
                  />
                  <StatBig
                    label="P&I Payment"
                    value={formatCurrency(results.principalAndInterest, 0)}
                    sub="Principal & interest only"
                  />
                  <StatBig
                    label="Total Interest"
                    value={formatCurrency(results.totalInterest, 0)}
                    sub={`Over ${inputs.termYears} years`}
                  />
                </div>
              </ResultCard>

              {/* Tabs */}
              <div className="calc-card">
                <div className="flex gap-1 mb-5 bg-slate-100 p-1 rounded-xl">
                  {['summary', 'chart', 'amortization'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg capitalize transition-all ${activeTab === tab ? 'bg-white shadow-sm text-brand-700' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {activeTab === 'summary' && (
                  <div className="animate-fade-in">
                    <BreakdownRow label="Loan Amount" value={formatCurrency(results.principal)} />
                    <BreakdownRow label="Down Payment" value={`${formatCurrency(results.principal ? inputs.downPayment : 0)} (${downPaymentPct}%)`} />
                    <BreakdownRow label="Monthly P&I" value={formatCurrency(results.principalAndInterest)} />
                    <BreakdownRow label="Monthly Tax" value={formatCurrency(results.monthlyTax)} />
                    <BreakdownRow label="Monthly Insurance" value={formatCurrency(results.monthlyInsurance)} />
                    <BreakdownRow label="Total Monthly Payment" value={formatCurrency(results.monthlyPayment)} bold highlight />
                    <BreakdownRow label="Total of Payments" value={formatCurrency(results.principalAndInterest * inputs.termYears * 12)} />
                    <BreakdownRow label="Total Interest Paid" value={formatCurrency(results.totalInterest)} highlight />
                    <BreakdownRow label="Loan-to-Value (LTV)" value={`${results.loanToValue.toFixed(1)}%`} />

                    {affordability && (
                      <div className="mt-5 pt-5 border-t border-slate-100">
                        <AffordabilityMeter ratio={affordability.ratio} label={affordability.label} />
                        <p className="text-xs text-slate-400 mt-2">
                          Lenders typically prefer a housing expense ratio below 28% of gross monthly income.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'chart' && (
                  <div className="animate-fade-in">
                    <h3 className="text-sm font-semibold text-slate-700 mb-4">Cost Breakdown</h3>
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                          <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={50}>
                            {pieData.map((entry, i) => (
                              <Cell key={i} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(val) => formatCurrency(val)} />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="space-y-2 min-w-[160px]">
                        {pieData.map(d => (
                          <div key={d.name} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                            <div>
                              <p className="text-xs font-medium text-slate-700">{d.name}</p>
                              <p className="text-xs text-slate-500">{formatCurrency(d.value)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <h3 className="text-sm font-semibold text-slate-700 mt-6 mb-4">Principal vs Interest Over Time</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={amortization.filter((_, i) => i % 3 === 0).slice(0, 15)}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="year" tick={{ fontSize: 11 }} tickFormatter={v => `Yr ${v}`} />
                        <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                        <Tooltip formatter={(val) => formatCurrency(val)} />
                        <Bar dataKey="principal" fill="#0284c7" name="Principal" stackId="a" radius={[2, 2, 0, 0]} />
                        <Bar dataKey="interest" fill="#f97316" name="Interest" stackId="a" radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {activeTab === 'amortization' && (
                  <div className="animate-fade-in overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          <th className="text-left px-3 py-2 text-slate-600 font-semibold">Month</th>
                          <th className="text-right px-3 py-2 text-slate-600 font-semibold">Payment</th>
                          <th className="text-right px-3 py-2 text-slate-600 font-semibold">Principal</th>
                          <th className="text-right px-3 py-2 text-slate-600 font-semibold">Interest</th>
                          <th className="text-right px-3 py-2 text-slate-600 font-semibold">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {amortization.slice(0, 20).map((row, i) => (
                          <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                            <td className="px-3 py-2 text-slate-600">Mo. {row.month}</td>
                            <td className="px-3 py-2 text-right text-slate-800 font-medium">{formatCurrency(row.payment)}</td>
                            <td className="px-3 py-2 text-right text-brand-600">{formatCurrency(row.principal)}</td>
                            <td className="px-3 py-2 text-right text-accent-600">{formatCurrency(row.interest)}</td>
                            <td className="px-3 py-2 text-right text-slate-800">{formatCurrency(row.balance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="text-xs text-slate-400 mt-2 px-3">Showing selected months — full schedule has {inputs.termYears * 12} payments.</p>
                  </div>
                )}
              </div>

              {/* Inline Ad */}
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
