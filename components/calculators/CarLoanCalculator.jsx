// components/calculators/CarLoanCalculator.jsx
import { useState, useEffect, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { calcCarLoan, formatCurrency } from '../../lib/calculations';
import { useLocalStorage } from '../../lib/useLocalStorage';
import { InputField, SliderField, ResultCard, StatBig, BreakdownRow, AffordabilityMeter } from '../ui';
import AdSlot from '../ads/AdSlot';

const DEFAULTS = {
  vehicleType: 'new',
  vehiclePrice: 35000,
  downPayment: 5000,
  tradeInValue: 0,
  annualRate: 6.9,
  termMonths: 60,
  salesTaxRate: 8,
  annualInsurance: 1800,
  annualMaintenance: 1200,
  annualFuelCost: 2400,
  monthlyIncome: 7000,
};

const TERM_OPTIONS = [24, 36, 48, 60, 72, 84];

const NEW_CAR_PRESETS = [
  { label: 'Economy', price: 22000, rate: 6.9, icon: '🚗' },
  { label: 'Sedan', price: 35000, rate: 7.2, icon: '🚙' },
  { label: 'SUV', price: 52000, rate: 7.5, icon: '🚐' },
  { label: 'Truck', price: 58000, rate: 7.5, icon: '🛻' },
  { label: 'Luxury', price: 85000, rate: 6.5, icon: '🏎️' },
  { label: 'EV', price: 48000, rate: 5.9, icon: '⚡' },
];

const USED_CAR_PRESETS = [
  { label: '1-2 yr old', price: 28000, rate: 7.9, icon: '🚗' },
  { label: '3-5 yr old', price: 18000, rate: 8.5, icon: '🚙' },
  { label: '6-8 yr old', price: 12000, rate: 9.9, icon: '🚘' },
  { label: '9+ yr old', price: 7000, rate: 11.9, icon: '🚌' },
];

export default function CarLoanCalculator() {
  const [inputs, setInputs, clearInputs] = useLocalStorage('car-inputs', DEFAULTS);
  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState({});

  const calculate = useCallback(() => {
    const errs = {};
    if (!inputs.vehiclePrice || inputs.vehiclePrice <= 0) errs.vehiclePrice = 'Vehicle price must be greater than 0';
    if (!inputs.termMonths || inputs.termMonths <= 0) errs.termMonths = 'Loan term required';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const res = calcCarLoan({
      vehiclePrice: Number(inputs.vehiclePrice),
      downPayment: Number(inputs.downPayment) || 0,
      tradeInValue: Number(inputs.tradeInValue) || 0,
      annualRate: Number(inputs.annualRate),
      termMonths: Number(inputs.termMonths),
      salesTaxRate: Number(inputs.salesTaxRate) || 0,
      annualInsurance: Number(inputs.annualInsurance) || 0,
      annualMaintenance: Number(inputs.annualMaintenance) || 0,
      annualFuelCost: Number(inputs.annualFuelCost) || 0,
      isUsed: inputs.vehicleType === 'used',
    });
    setResults(res);
  }, [inputs]);

  useEffect(() => { calculate(); }, [calculate]);

  const handleChange = (field) => (e) => {
    setInputs(prev => ({ ...prev, [field]: e.target.value }));
  };

  const applyPreset = (preset) => {
    setInputs(prev => ({ ...prev, vehiclePrice: preset.price, annualRate: preset.rate }));
  };

  const presets = inputs.vehicleType === 'new' ? NEW_CAR_PRESETS : USED_CAR_PRESETS;

  const pieData = results ? [
    { name: 'Principal', value: results.principal, color: '#0284c7' },
    { name: 'Interest', value: results.totalInterest, color: '#f97316' },
    { name: 'Insurance', value: (inputs.annualInsurance || 0) * (inputs.termMonths / 12), color: '#8b5cf6' },
    { name: 'Maintenance', value: (inputs.annualMaintenance || 0) * (inputs.termMonths / 12), color: '#10b981' },
    { name: 'Fuel', value: (inputs.annualFuelCost || 0) * (inputs.termMonths / 12), color: '#f59e0b' },
  ].filter(d => d.value > 0) : [];

  const comparisonData = TERM_OPTIONS.map(months => {
    if (!inputs.vehiclePrice || !inputs.annualRate) return { months: `${months}mo`, payment: 0 };
    const r = calcCarLoan({
      vehiclePrice: Number(inputs.vehiclePrice),
      downPayment: Number(inputs.downPayment) || 0,
      tradeInValue: Number(inputs.tradeInValue) || 0,
      annualRate: Number(inputs.annualRate),
      termMonths: months,
      salesTaxRate: Number(inputs.salesTaxRate) || 0,
      isUsed: inputs.vehicleType === 'used',
    });
    return { months: `${months}mo`, payment: Math.round(r.monthlyPayment), interest: Math.round(r.totalInterest) };
  });

  const affordability = results && inputs.monthlyIncome
    ? { ratio: (results.totalMonthly / inputs.monthlyIncome) * 100, label: results.totalMonthly / inputs.monthlyIncome <= 0.15 ? 'Excellent' : results.totalMonthly / inputs.monthlyIncome <= 0.20 ? 'Good' : results.totalMonthly / inputs.monthlyIncome <= 0.25 ? 'Manageable' : 'High' }
    : null;

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inputs */}
        <div className="lg:col-span-1 space-y-4">
          {/* New vs Used Toggle */}
          <div className="calc-card">
            <h2 className="text-lg font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span>🚗</span> Vehicle Type
            </h2>
            <div className="grid grid-cols-2 gap-2 mb-5">
              {['new', 'used'].map(type => (
                <button
                  key={type}
                  onClick={() => setInputs(p => ({ ...p, vehicleType: type }))}
                  className={`py-3 rounded-xl text-sm font-semibold capitalize transition-all ${inputs.vehicleType === type ? 'bg-green-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                >
                  {type === 'new' ? '✨ New Car' : '🔍 Used Car'}
                </button>
              ))}
            </div>

            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Quick Presets</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {presets.map(p => (
                <button
                  key={p.label}
                  onClick={() => applyPreset(p)}
                  className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-medium border transition-all ${inputs.vehiclePrice == p.price ? 'border-green-500 bg-green-50 text-green-700' : 'border-slate-200 hover:border-slate-300 text-slate-600'}`}
                >
                  <span>{p.icon}</span>
                  <div className="text-left">
                    <div>{p.label}</div>
                    <div className="text-slate-400">{formatCurrency(p.price)}</div>
                  </div>
                </button>
              ))}
            </div>

            <InputField
              label="Vehicle Price"
              name="vehiclePrice"
              value={inputs.vehiclePrice}
              onChange={handleChange('vehiclePrice')}
              prefix="$"
              min={1}
              step={500}
              error={errors.vehiclePrice}
            />

            <InputField
              label="Down Payment"
              name="downPayment"
              value={inputs.downPayment}
              onChange={handleChange('downPayment')}
              prefix="$"
              min={0}
              step={500}
            />

            <InputField
              label="Trade-In Value"
              name="tradeInValue"
              value={inputs.tradeInValue}
              onChange={handleChange('tradeInValue')}
              prefix="$"
              min={0}
              step={500}
              helper="Enter 0 if no trade-in"
            />

            <InputField
              label="Sales Tax Rate"
              name="salesTaxRate"
              value={inputs.salesTaxRate}
              onChange={handleChange('salesTaxRate')}
              suffix="%"
              min={0}
              max={15}
              step={0.1}
              helper="Varies by state — avg 7-9%"
            />
          </div>

          {/* Financing */}
          <div className="calc-card">
            <h2 className="text-lg font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span>🏦</span> Loan Details
            </h2>

            <SliderField
              label="Interest Rate (APR)"
              name="annualRate"
              value={inputs.annualRate}
              onChange={handleChange('annualRate')}
              min={0}
              max={25}
              step={0.1}
              suffix="%"
            />

            <div className="mb-5">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Loan Term</label>
              <div className="grid grid-cols-3 gap-2">
                {TERM_OPTIONS.map(t => (
                  <button
                    key={t}
                    onClick={() => setInputs(p => ({ ...p, termMonths: t }))}
                    className={`py-2 rounded-lg text-xs font-medium transition-all ${inputs.termMonths == t ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                  >
                    {t} mo
                  </button>
                ))}
              </div>
              {inputs.termMonths >= 72 && (
                <p className="text-xs text-amber-600 mt-2 bg-amber-50 p-2 rounded-lg">
                  ⚠️ Long terms mean you may owe more than the car is worth (negative equity).
                </p>
              )}
            </div>

            <InputField
              label="Monthly Gross Income"
              name="monthlyIncome"
              value={inputs.monthlyIncome}
              onChange={handleChange('monthlyIncome')}
              prefix="$"
              min={0}
              helper="For affordability rating"
            />
          </div>

          {/* Ongoing Costs */}
          <div className="calc-card">
            <h2 className="text-lg font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span>📋</span> Ongoing Costs
            </h2>

            <InputField
              label="Annual Insurance"
              name="annualInsurance"
              value={inputs.annualInsurance}
              onChange={handleChange('annualInsurance')}
              prefix="$"
              min={0}
              helper="Avg $1,500–$2,500/yr"
            />

            <InputField
              label="Annual Maintenance"
              name="annualMaintenance"
              value={inputs.annualMaintenance}
              onChange={handleChange('annualMaintenance')}
              prefix="$"
              min={0}
              helper={inputs.vehicleType === 'new' ? 'New cars avg $800–$1,500/yr' : 'Used cars avg $1,500–$3,000/yr'}
            />

            <InputField
              label="Annual Fuel Cost"
              name="annualFuelCost"
              value={inputs.annualFuelCost}
              onChange={handleChange('annualFuelCost')}
              prefix="$"
              min={0}
              helper="Avg 15k miles/yr — varies by MPG"
            />

            <button onClick={() => clearInputs()} className="btn-secondary w-full text-sm mt-2">Reset</button>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-4">
          {results && (
            <>
              <ResultCard>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <StatBig
                    label="Monthly Loan Payment"
                    value={formatCurrency(results.monthlyPayment)}
                    sub="Principal & interest only"
                  />
                  <StatBig
                    label="All-In Monthly Cost"
                    value={formatCurrency(results.totalMonthly)}
                    sub="Loan + insurance + fuel + maintenance"
                  />
                  <StatBig
                    label="Total Interest"
                    value={formatCurrency(results.totalInterest)}
                    sub={`Over ${inputs.termMonths} months`}
                  />
                </div>
              </ResultCard>

              {/* Summary */}
              <div className="calc-card">
                <h3 className="text-base font-semibold text-slate-900 mb-4">Full Cost Breakdown</h3>
                <BreakdownRow label="Vehicle Price" value={formatCurrency(inputs.vehiclePrice)} />
                <BreakdownRow label="Sales Tax" value={formatCurrency(results.salesTax)} />
                <BreakdownRow label="Total Vehicle Cost" value={formatCurrency(results.totalVehicleCost)} />
                <BreakdownRow label="Down Payment" value={formatCurrency(inputs.downPayment || 0)} />
                <BreakdownRow label="Trade-In Value" value={formatCurrency(inputs.tradeInValue || 0)} />
                <BreakdownRow label="Loan Amount" value={formatCurrency(results.principal)} bold />
                <BreakdownRow label="Monthly Payment (P&I)" value={formatCurrency(results.monthlyPayment)} />
                <BreakdownRow label="Total of Payments" value={formatCurrency(results.totalLoanCost)} />
                <BreakdownRow label="Total Interest Paid" value={formatCurrency(results.totalInterest)} highlight />
                <BreakdownRow label="Monthly Insurance" value={formatCurrency(results.monthlyInsurance)} />
                <BreakdownRow label="Monthly Maintenance" value={formatCurrency(results.monthlyMaintenance)} />
                <BreakdownRow label="Monthly Fuel" value={formatCurrency(results.monthlyFuel)} />
                <BreakdownRow label="Total Monthly (all-in)" value={formatCurrency(results.totalMonthly)} bold highlight />

                {affordability && (
                  <div className="mt-5 pt-5 border-t border-slate-100">
                    <AffordabilityMeter ratio={affordability.ratio} label={affordability.label} />
                    <p className="text-xs text-slate-400 mt-2">
                      Financial experts recommend keeping total car costs under 15-20% of gross monthly income.
                    </p>
                  </div>
                )}
              </div>

              {/* Depreciation */}
              <div className="calc-card">
                <h3 className="text-base font-semibold text-slate-900 mb-4">
                  {inputs.vehicleType === 'new' ? '📉 Depreciation & Net Cost' : '📉 Estimated Value & Net Cost'}
                </h3>
                <BreakdownRow label="Purchase Price" value={formatCurrency(inputs.vehiclePrice)} />
                <BreakdownRow
                  label={`Est. Value After ${Math.round(inputs.termMonths / 12)} Years`}
                  value={formatCurrency(results.estimatedValueAfterTerm)}
                />
                <BreakdownRow
                  label="Estimated Depreciation Loss"
                  value={formatCurrency(inputs.vehiclePrice - results.estimatedValueAfterTerm)}
                  highlight
                />
                <BreakdownRow
                  label="Total Ownership Cost"
                  value={formatCurrency(results.totalOwnershipCost)}
                  bold
                />
                <BreakdownRow
                  label="Net Cost (after resale value)"
                  value={formatCurrency(results.netCost)}
                  highlight
                  bold
                />
                {inputs.vehicleType === 'new' && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-700">
                    💡 New cars lose 15-25% of their value in the first year alone. Buying a 1-2 year old used vehicle can save you thousands while getting nearly the same car.
                  </div>
                )}
              </div>

              {/* Term comparison */}
              <div className="calc-card">
                <h3 className="text-base font-semibold text-slate-900 mb-4">Payment vs. Term Comparison</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="months" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `$${v}`} />
                    <Tooltip formatter={(val, name) => [formatCurrency(val), name === 'payment' ? 'Monthly Payment' : 'Total Interest']} />
                    <Bar dataKey="payment" fill="#16a34a" name="payment" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="interest" fill="#f97316" name="interest" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-xs text-slate-400 mt-2">Green = monthly payment. Orange = total interest paid. Shorter terms = lower total cost.</p>
              </div>

              {/* Cost pie */}
              <div className="calc-card">
                <h3 className="text-base font-semibold text-slate-900 mb-4">Total Cost Distribution</h3>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={85} innerRadius={45}>
                        {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
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
