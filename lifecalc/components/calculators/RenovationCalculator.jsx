// components/calculators/RenovationCalculator.jsx
import { useState, useEffect, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { calcRenovation, formatCurrency } from '../../lib/calculations';
import { useLocalStorage } from '../../lib/useLocalStorage';
import { InputField, SliderField, ToggleSwitch, ResultCard, StatBig, BreakdownRow } from '../ui';
import AdSlot from '../ads/AdSlot';

const DEFAULTS = {
  budget: 50000,
  downPayment: 10000,
  interestRate: 7.5,
  termYears: 5,
  financed: true,
  projectType: 'kitchen',
};

const PROJECT_TYPES = [
  { id: 'kitchen', label: 'Kitchen', roi: 75, emoji: '🍳' },
  { id: 'bathroom', label: 'Bathroom', roi: 65, emoji: '🛁' },
  { id: 'addition', label: 'Addition', roi: 55, emoji: '🏗️' },
  { id: 'roofing', label: 'Roofing', roi: 70, emoji: '🏠' },
  { id: 'deck', label: 'Deck/Patio', roi: 60, emoji: '🪴' },
  { id: 'basement', label: 'Basement', roi: 50, emoji: '⬇️' },
  { id: 'windows', label: 'Windows', roi: 68, emoji: '🪟' },
  { id: 'other', label: 'Other', roi: 50, emoji: '🔨' },
];

const LOAN_TYPES = [
  { id: 'heloc', label: 'HELOC', typical: '7-9%', desc: 'Use home equity as collateral' },
  { id: 'personal', label: 'Personal Loan', typical: '8-15%', desc: 'No collateral required' },
  { id: 'cash_out', label: 'Cash-Out Refi', typical: '6-8%', desc: 'Refinance mortgage for cash' },
  { id: 'construction', label: 'Construction Loan', typical: '8-12%', desc: 'Short-term building loan' },
];

export default function RenovationCalculator() {
  const [inputs, setInputs, clearInputs] = useLocalStorage('renovation-inputs', DEFAULTS);
  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState({});

  const calculate = useCallback(() => {
    const errs = {};
    if (!inputs.budget || inputs.budget <= 0) errs.budget = 'Budget must be greater than 0';
    if (inputs.financed) {
      if (!inputs.interestRate || inputs.interestRate <= 0) errs.interestRate = 'Rate required for financing';
      if (!inputs.termYears || inputs.termYears <= 0) errs.termYears = 'Term required for financing';
    }
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const res = calcRenovation({
      budget: Number(inputs.budget),
      downPayment: Number(inputs.downPayment) || 0,
      annualRate: Number(inputs.interestRate),
      termYears: Number(inputs.termYears),
      financed: inputs.financed,
    });
    setResults(res);
  }, [inputs]);

  useEffect(() => { calculate(); }, [calculate]);

  const handleChange = (field) => (e) => {
    setInputs(prev => ({ ...prev, [field]: e.target.value }));
  };

  const selectedProject = PROJECT_TYPES.find(p => p.id === inputs.projectType) || PROJECT_TYPES[0];
  const estimatedROI = results ? (inputs.budget * selectedProject.roi / 100) : 0;

  const comparisonData = results && inputs.financed ? [
    { name: 'Cash', value: Number(inputs.budget), fill: '#10b981' },
    { name: 'Financed', value: results.totalCost, fill: '#0284c7' },
    { name: 'Total Interest', value: results.totalInterest, fill: '#f97316' },
  ] : [];

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inputs */}
        <div className="lg:col-span-1 space-y-4">
          <div className="calc-card">
            <h2 className="text-lg font-display font-bold text-slate-900 mb-5 flex items-center gap-2">
              <span>🔨</span> Project Details
            </h2>

            <div className="mb-5">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Project Type</label>
              <div className="grid grid-cols-2 gap-2">
                {PROJECT_TYPES.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setInputs(prev => ({ ...prev, projectType: p.id }))}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition-all ${inputs.projectType === p.id ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-slate-200 hover:border-slate-300 text-slate-600'}`}
                  >
                    <span>{p.emoji}</span>
                    <span>{p.label}</span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Average ROI for {selectedProject.label}: <strong className="text-green-600">{selectedProject.roi}%</strong>
              </p>
            </div>

            <InputField
              label="Total Renovation Budget"
              name="budget"
              value={inputs.budget}
              onChange={handleChange('budget')}
              prefix="$"
              min={1}
              step={1000}
              error={errors.budget}
            />

            <ToggleSwitch
              label="Finance this renovation"
              checked={inputs.financed}
              onChange={(val) => setInputs(p => ({ ...p, financed: val }))}
              description="Toggle off if paying cash"
            />
          </div>

          {inputs.financed && (
            <div className="calc-card animate-fade-in">
              <h2 className="text-lg font-display font-bold text-slate-900 mb-5 flex items-center gap-2">
                <span>🏦</span> Loan Options
              </h2>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Loan Type</label>
                <div className="space-y-2">
                  {LOAN_TYPES.map(l => (
                    <button
                      key={l.id}
                      onClick={() => setInputs(p => ({ ...p, loanType: l.id }))}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-xs border transition-all ${inputs.loanType === l.id ? 'border-brand-500 bg-brand-50' : 'border-slate-200 hover:border-slate-300'}`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-slate-800">{l.label}</span>
                        <span className="text-slate-500">{l.typical} APR</span>
                      </div>
                      <p className="text-slate-500 mt-0.5">{l.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <InputField
                label="Down Payment / Deposit"
                name="downPayment"
                value={inputs.downPayment}
                onChange={handleChange('downPayment')}
                prefix="$"
                min={0}
              />

              <SliderField
                label="Interest Rate (APR)"
                name="interestRate"
                value={inputs.interestRate}
                onChange={handleChange('interestRate')}
                min={3}
                max={25}
                step={0.25}
                suffix="%"
              />

              <div className="mb-4">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Loan Term</label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 5, 7, 10, 15, 20].map(t => (
                    <button
                      key={t}
                      onClick={() => setInputs(p => ({ ...p, termYears: t }))}
                      className={`py-2 rounded-lg text-xs font-medium transition-all ${inputs.termYears == t ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                    >
                      {t}yr
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={() => clearInputs()} className="btn-secondary w-full text-sm mt-2">Reset</button>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-4">
          {results && (
            <>
              <ResultCard>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {results.financed ? (
                    <>
                      <StatBig label="Monthly Payment" value={formatCurrency(results.monthlyPayment)} sub="Loan payment" />
                      <StatBig label="Total Cost" value={formatCurrency(results.totalCost)} sub="All-in cost" />
                      <StatBig label="Interest Paid" value={formatCurrency(results.totalInterest)} sub="Cost of financing" />
                    </>
                  ) : (
                    <>
                      <StatBig label="Total Project Cost" value={formatCurrency(results.totalCost)} sub="Cash purchase" />
                      <StatBig label="Est. ROI Value" value={formatCurrency(estimatedROI)} sub={`${selectedProject.roi}% ROI`} />
                      <StatBig label="Net Cost" value={formatCurrency(results.totalCost - estimatedROI)} sub="After value added" />
                    </>
                  )}
                </div>
              </ResultCard>

              <div className="calc-card">
                <h3 className="text-base font-semibold text-slate-900 mb-4">Cost Summary</h3>
                <BreakdownRow label="Project Budget" value={formatCurrency(inputs.budget)} />
                {results.financed && (
                  <>
                    <BreakdownRow label="Down Payment" value={formatCurrency(inputs.downPayment || 0)} />
                    <BreakdownRow label="Loan Amount" value={formatCurrency(results.principal)} />
                    <BreakdownRow label="Monthly Payment" value={formatCurrency(results.monthlyPayment)} />
                    <BreakdownRow label="Loan Term" value={`${inputs.termYears} years (${inputs.termYears * 12} payments)`} />
                    <BreakdownRow label="Total Interest" value={formatCurrency(results.totalInterest)} highlight />
                    <BreakdownRow label="Total Financed Cost" value={formatCurrency(results.totalCost)} bold />
                    <BreakdownRow label="Extra Cost vs. Cash" value={formatCurrency(results.totalInterest)} highlight />
                  </>
                )}

                <div className="mt-5 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <p className="text-xs font-semibold text-green-800 mb-1">📈 Value Added Estimate</p>
                  <p className="text-xs text-green-700">
                    A {selectedProject.label.toLowerCase()} renovation typically returns <strong>{selectedProject.roi}%</strong> of its cost in home value.
                    Your {formatCurrency(inputs.budget)} project may add approximately <strong>{formatCurrency(estimatedROI)}</strong> to your home's value.
                  </p>
                </div>
              </div>

              {results.financed && comparisonData.length > 0 && (
                <div className="calc-card">
                  <h3 className="text-base font-semibold text-slate-900 mb-4">Cash vs. Finance Comparison</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={comparisonData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                      <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={80} />
                      <Tooltip formatter={(val) => formatCurrency(val)} />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                        {comparisonData.map((entry, i) => (
                          <Cell key={i} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  <p className="text-xs text-slate-400 mt-2">
                    Financing costs <strong className="text-orange-600">{formatCurrency(results.totalInterest)}</strong> more than paying cash.
                  </p>
                </div>
              )}

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
