// components/calculators/RecreationCalculator.jsx
import { useState, useEffect, useCallback } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import { calcRecreation, formatCurrency, getAffordabilityRating } from '../../lib/calculations';
import { useLocalStorage } from '../../lib/useLocalStorage';
import { InputField, SliderField, ResultCard, StatBig, BreakdownRow, AffordabilityMeter } from '../ui';
import AdSlot from '../ads/AdSlot';

const DEFAULTS = {
  itemType: 'boat',
  itemCost: 65000,
  downPayment: 13000,
  interestRate: 7.9,
  termYears: 10,
  maintenancePct: 3,
  annualInsurance: 2000,
  annualStorage: 3600,
  monthlyIncome: 10000,
};

const ITEM_TYPES = [
  { id: 'boat', label: 'Boat', emoji: '⛵', maintenancePct: 3, insurance: 1500, storage: 3600, notes: 'Includes winterization, bottom paint, engine service' },
  { id: 'rv', label: 'RV / Motorhome', emoji: '🚐', maintenancePct: 2, insurance: 1800, storage: 2400, notes: 'Class A/B/C varies widely. Budget for tires, fluids, roof seals.' },
  { id: 'atv', label: 'ATV / Side-by-Side', emoji: '🏍️', maintenancePct: 4, insurance: 500, storage: 600, notes: 'Higher wear items — tires, fluids, suspension' },
  { id: 'motorcycle', label: 'Motorcycle', emoji: '🏍️', maintenancePct: 2, insurance: 800, storage: 300, notes: 'Varies by type: sport vs cruiser' },
  { id: 'snowmobile', label: 'Snowmobile', emoji: '❄️', maintenancePct: 3, insurance: 400, storage: 600, notes: 'Seasonal use — tune-ups, track, carb' },
  { id: 'vacation', label: 'Vacation Home', emoji: '🏖️', maintenancePct: 1.5, insurance: 3000, storage: 0, notes: 'HOA, utilities, property management not included' },
  { id: 'jetski', label: 'Jet Ski / PWC', emoji: '🌊', maintenancePct: 3.5, insurance: 600, storage: 1200, notes: 'High-maintenance — impeller, pump, hull' },
  { id: 'other', label: 'Other', emoji: '🎯', maintenancePct: 2, insurance: 1000, storage: 600, notes: 'Generic recreation purchase' },
];

export default function RecreationCalculator() {
  const [inputs, setInputs, clearInputs] = useLocalStorage('recreation-inputs', DEFAULTS);
  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState({});

  const calculate = useCallback(() => {
    const errs = {};
    if (!inputs.itemCost || inputs.itemCost <= 0) errs.itemCost = 'Cost must be greater than 0';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const res = calcRecreation({
      itemCost: Number(inputs.itemCost),
      downPayment: Number(inputs.downPayment) || 0,
      annualRate: Number(inputs.interestRate),
      termYears: Number(inputs.termYears),
      maintenancePct: Number(inputs.maintenancePct),
      annualInsurance: Number(inputs.annualInsurance) || 0,
      annualStorage: Number(inputs.annualStorage) || 0,
    });
    setResults(res);
  }, [inputs]);

  useEffect(() => { calculate(); }, [calculate]);

  const handleChange = (field) => (e) => {
    setInputs(prev => ({ ...prev, [field]: e.target.value }));
  };

  const selectItemType = (type) => {
    const preset = ITEM_TYPES.find(t => t.id === type);
    if (preset) {
      setInputs(prev => ({
        ...prev,
        itemType: type,
        maintenancePct: preset.maintenancePct,
        annualInsurance: preset.insurance,
        annualStorage: preset.storage,
      }));
    }
  };

  const selectedType = ITEM_TYPES.find(t => t.id === inputs.itemType) || ITEM_TYPES[0];
  const affordability = results && inputs.monthlyIncome
    ? getAffordabilityRating(results.monthlyCost, Number(inputs.monthlyIncome))
    : null;

  const radarData = results ? [
    { subject: 'Loan', value: Math.min(100, (results.loanPayment / results.monthlyCost) * 100) },
    { subject: 'Maintenance', value: Math.min(100, (results.monthlyMaintenance / results.monthlyCost) * 100) },
    { subject: 'Insurance', value: Math.min(100, (results.monthlyInsurance / results.monthlyCost) * 100) },
    { subject: 'Storage', value: Math.min(100, (results.monthlyStorage / results.monthlyCost) * 100) },
  ] : [];

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inputs */}
        <div className="lg:col-span-1 space-y-4">
          <div className="calc-card">
            <h2 className="text-lg font-display font-bold text-slate-900 mb-5 flex items-center gap-2">
              <span>⛵</span> Item Type
            </h2>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {ITEM_TYPES.map(t => (
                <button
                  key={t.id}
                  onClick={() => selectItemType(t.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-medium border transition-all ${inputs.itemType === t.id ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-slate-200 hover:border-slate-300 text-slate-600'}`}
                >
                  <span>{t.emoji}</span>
                  <span>{t.label}</span>
                </button>
              ))}
            </div>

            {selectedType.notes && (
              <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg mb-4">
                💡 {selectedType.notes}
              </p>
            )}

            <InputField
              label="Purchase Price"
              name="itemCost"
              value={inputs.itemCost}
              onChange={handleChange('itemCost')}
              prefix="$"
              min={1}
              step={500}
              error={errors.itemCost}
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
              label="Monthly Gross Income"
              name="monthlyIncome"
              value={inputs.monthlyIncome}
              onChange={handleChange('monthlyIncome')}
              prefix="$"
              min={0}
              helper="For affordability rating"
            />
          </div>

          <div className="calc-card">
            <h2 className="text-lg font-display font-bold text-slate-900 mb-5 flex items-center gap-2">
              <span>🏦</span> Financing
            </h2>

            <SliderField
              label="Interest Rate (APR)"
              name="interestRate"
              value={inputs.interestRate}
              onChange={handleChange('interestRate')}
              min={3}
              max={20}
              step={0.25}
              suffix="%"
            />

            <div className="mb-5">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Loan Term</label>
              <div className="grid grid-cols-4 gap-2">
                {[3, 5, 7, 10, 12, 15, 20].map(t => (
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
          </div>

          <div className="calc-card">
            <h2 className="text-lg font-display font-bold text-slate-900 mb-5 flex items-center gap-2">
              <span>📋</span> Ongoing Costs
            </h2>

            <SliderField
              label={`Annual Maintenance`}
              name="maintenancePct"
              value={inputs.maintenancePct}
              onChange={handleChange('maintenancePct')}
              min={0}
              max={10}
              step={0.25}
              suffix="%"
              formatFn={(v) => `${v}% (${formatCurrency(inputs.itemCost * v / 100)}/yr)`}
            />

            <InputField
              label="Annual Insurance"
              name="annualInsurance"
              value={inputs.annualInsurance}
              onChange={handleChange('annualInsurance')}
              prefix="$"
              min={0}
            />

            <InputField
              label="Annual Storage / Marina / Lot"
              name="annualStorage"
              value={inputs.annualStorage}
              onChange={handleChange('annualStorage')}
              prefix="$"
              min={0}
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
                    label="Monthly Cost"
                    value={formatCurrency(results.monthlyCost)}
                    sub="All-in monthly expense"
                  />
                  <StatBig
                    label="Yearly Cost"
                    value={formatCurrency(results.yearlyCost)}
                    sub="Annual total"
                  />
                  <StatBig
                    label="5-Year Cost"
                    value={formatCurrency(results.fiveYearCost)}
                    sub="Loan + ownership costs"
                  />
                </div>
              </ResultCard>

              <div className="calc-card">
                <h3 className="text-base font-semibold text-slate-900 mb-4">Monthly Cost Breakdown</h3>
                <BreakdownRow label="Loan Payment" value={formatCurrency(results.loanPayment)} />
                <BreakdownRow label="Monthly Maintenance" value={formatCurrency(results.monthlyMaintenance)} />
                <BreakdownRow label="Monthly Insurance" value={formatCurrency(results.monthlyInsurance)} />
                <BreakdownRow label="Monthly Storage" value={formatCurrency(results.monthlyStorage)} />
                <BreakdownRow label="Total Monthly" value={formatCurrency(results.monthlyCost)} bold highlight />
                <BreakdownRow label="Total Interest (loan)" value={formatCurrency(results.totalInterest)} />
                <BreakdownRow label="Annual Maintenance" value={formatCurrency(inputs.itemCost * inputs.maintenancePct / 100)} />

                {affordability && (
                  <div className="mt-5 pt-5 border-t border-slate-100">
                    <AffordabilityMeter ratio={affordability.ratio} label={affordability.label} />
                    <div className={`mt-3 p-3 rounded-xl text-xs ${
                      affordability.color === 'green' ? 'bg-green-50 border border-green-200 text-green-700' :
                      affordability.color === 'blue' ? 'bg-blue-50 border border-blue-200 text-blue-700' :
                      affordability.color === 'yellow' ? 'bg-yellow-50 border border-yellow-200 text-yellow-700' :
                      'bg-red-50 border border-red-200 text-red-700'
                    }`}>
                      <strong>Affordability: {affordability.label}</strong> — This purchase would use {affordability.ratio.toFixed(1)}% of your monthly income.
                      {affordability.ratio > 35 && ' Financial advisors generally recommend keeping non-essential purchases under 20% of income.'}
                    </div>
                  </div>
                )}
              </div>

              {radarData.some(d => d.value > 0) && (
                <div className="calc-card">
                  <h3 className="text-base font-semibold text-slate-900 mb-4">Cost Distribution</h3>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <ResponsiveContainer width="100%" height={200}>
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                        <Radar dataKey="value" stroke="#0284c7" fill="#0284c7" fillOpacity={0.15} strokeWidth={2} />
                        <Tooltip formatter={v => `${v.toFixed(0)}% of total`} />
                      </RadarChart>
                    </ResponsiveContainer>
                    <div className="min-w-[200px] space-y-3">
                      {[
                        { label: 'Loan Payment', val: results.loanPayment, color: 'bg-brand-500' },
                        { label: 'Maintenance', val: results.monthlyMaintenance, color: 'bg-orange-500' },
                        { label: 'Insurance', val: results.monthlyInsurance, color: 'bg-purple-500' },
                        { label: 'Storage', val: results.monthlyStorage, color: 'bg-green-500' },
                      ].map(item => (
                        <div key={item.label}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-600">{item.label}</span>
                            <span className="font-semibold">{formatCurrency(item.val)}/mo</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full ${item.color}`}
                              style={{ width: `${Math.min(100, (item.val / results.monthlyCost) * 100)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="calc-card bg-amber-50 border border-amber-200">
                <h3 className="text-sm font-semibold text-amber-800 mb-2">🧮 True Cost of Ownership</h3>
                <p className="text-xs text-amber-700 leading-relaxed">
                  The sticker price of {formatCurrency(inputs.itemCost)} is just the beginning. Over {inputs.termYears} years, you'll spend approximately <strong>{formatCurrency(results.fiveYearCost)}</strong> — {((results.fiveYearCost / inputs.itemCost - 1) * 100).toFixed(0)}% more than the purchase price. Always budget for the true cost of ownership before buying recreational equipment.
                </p>
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
