// components/calculators/LOCCalculator.jsx
import { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { calcLOC, formatCurrency, formatNumber } from '../../lib/calculations';
import { useLocalStorage } from '../../lib/useLocalStorage';
import { InputField, SliderField, ResultCard, StatBig, BreakdownRow } from '../ui';
import AdSlot from '../ads/AdSlot';

const DEFAULTS = {
  creditLimit: 50000,
  balance: 30000,
  interestRate: 8.5,
  monthlyPayment: 800,
};

export default function LOCCalculator() {
  const [inputs, setInputs, clearInputs] = useLocalStorage('loc-inputs', DEFAULTS);
  const [results, setResults] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [errors, setErrors] = useState({});

  const buildChart = useCallback((balance, rate, payment) => {
    const monthlyRate = rate / 100 / 12;
    let bal = balance;
    const data = [{ month: 0, balance: bal }];
    for (let m = 1; m <= 360 && bal > 0; m++) {
      const interest = bal * monthlyRate;
      bal = Math.max(0, bal + interest - payment);
      if (m % 3 === 0 || m === 1) data.push({ month: m, balance: Math.round(bal) });
    }
    return data;
  }, []);

  const calculate = useCallback(() => {
    const errs = {};
    if (!inputs.balance || inputs.balance <= 0) errs.balance = 'Balance must be greater than 0';
    if (!inputs.interestRate || inputs.interestRate <= 0) errs.interestRate = 'Rate must be greater than 0';
    if (!inputs.monthlyPayment || inputs.monthlyPayment <= 0) errs.monthlyPayment = 'Payment must be greater than 0';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const res = calcLOC({
      creditLimit: Number(inputs.creditLimit),
      balance: Number(inputs.balance),
      annualRate: Number(inputs.interestRate),
      monthlyPayment: Number(inputs.monthlyPayment),
    });
    setResults(res);
    setChartData(buildChart(Number(inputs.balance), Number(inputs.interestRate), Number(inputs.monthlyPayment)));
  }, [inputs, buildChart]);

  useEffect(() => { calculate(); }, [calculate]);

  const handleChange = (field) => (e) => {
    setInputs(prev => ({ ...prev, [field]: e.target.value }));
  };

  const utilizationPct = inputs.creditLimit > 0
    ? ((inputs.balance / inputs.creditLimit) * 100).toFixed(0)
    : 0;

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inputs */}
        <div className="lg:col-span-1 space-y-4">
          <div className="calc-card">
            <h2 className="text-lg font-display font-bold text-slate-900 mb-5 flex items-center gap-2">
              <span>💳</span> Credit Details
            </h2>

            <InputField
              label="Credit Limit"
              name="creditLimit"
              value={inputs.creditLimit}
              onChange={handleChange('creditLimit')}
              prefix="$"
              min={1}
              step={1000}
            />

            <InputField
              label={`Current Balance (${utilizationPct}% utilized)`}
              name="balance"
              value={inputs.balance}
              onChange={handleChange('balance')}
              prefix="$"
              min={0}
              step={500}
              error={errors.balance}
              helper={`${utilizationPct}% credit utilization — lenders prefer under 30%`}
            />

            <SliderField
              label="Annual Interest Rate (APR)"
              name="interestRate"
              value={inputs.interestRate}
              onChange={handleChange('interestRate')}
              min={1}
              max={30}
              step={0.25}
              suffix="%"
            />

            <InputField
              label="Monthly Payment"
              name="monthlyPayment"
              value={inputs.monthlyPayment}
              onChange={handleChange('monthlyPayment')}
              prefix="$"
              min={1}
              step={50}
              error={errors.monthlyPayment}
              helper={results?.minPayment ? `Interest-only minimum: ${formatCurrency(results.minPayment)} — pay more to reduce balance` : ''}
            />

            <div className="flex gap-3 mt-6">
              <button onClick={() => clearInputs()} className="btn-secondary flex-1 text-sm">
                Reset
              </button>
            </div>
          </div>

          {/* Quick scenarios */}
          <div className="calc-card">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Quick Scenarios</h3>
            <div className="space-y-2">
              {[
                { label: 'Minimum payment', payment: Math.ceil((inputs.balance * inputs.interestRate / 100 / 12) * 1.1) },
                { label: '2× minimum', payment: Math.ceil((inputs.balance * inputs.interestRate / 100 / 12) * 2.2) },
                { label: 'Pay off in 2 yrs', payment: Math.ceil(inputs.balance / 20 + inputs.balance * inputs.interestRate / 100 / 12) },
                { label: 'Pay off in 5 yrs', payment: Math.ceil(inputs.balance / 50 + inputs.balance * inputs.interestRate / 100 / 12) },
              ].map(s => (
                <button
                  key={s.label}
                  onClick={() => setInputs(p => ({ ...p, monthlyPayment: s.payment }))}
                  className="w-full flex justify-between items-center text-xs px-3 py-2 bg-slate-50 hover:bg-brand-50 hover:text-brand-600 rounded-lg transition-colors"
                >
                  <span>{s.label}</span>
                  <span className="font-semibold">{formatCurrency(s.payment)}/mo</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-4">
          {results && (
            <>
              <ResultCard>
                {results.canPayOff ? (
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
                      sub={`Balance + all interest`}
                    />
                  </div>
                ) : (
                  <div className="text-center text-white">
                    <p className="text-5xl font-bold mb-2">⚠️</p>
                    <p className="text-xl font-bold">Your payment doesn't cover interest!</p>
                    <p className="text-blue-200 mt-2 text-sm">
                      Minimum interest-only payment: {formatCurrency(results.minPayment)}/mo. Increase your payment to start reducing the balance.
                    </p>
                  </div>
                )}
              </ResultCard>

              {results.canPayOff && (
                <>
                  <div className="calc-card">
                    <h3 className="text-base font-semibold text-slate-900 mb-4">Balance Payoff Over Time</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="month" tick={{ fontSize: 11 }} tickFormatter={v => `Mo ${v}`} />
                        <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                        <Tooltip formatter={(val) => formatCurrency(val)} labelFormatter={l => `Month ${l}`} />
                        <Line type="monotone" dataKey="balance" stroke="#0284c7" strokeWidth={2.5} dot={false} name="Balance" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="calc-card">
                    <h3 className="text-base font-semibold text-slate-900 mb-4">Payment Breakdown</h3>
                    <BreakdownRow label="Starting Balance" value={formatCurrency(inputs.balance)} />
                    <BreakdownRow label="Monthly Payment" value={formatCurrency(inputs.monthlyPayment)} />
                    <BreakdownRow label="Months to Pay Off" value={`${results.months} months`} />
                    <BreakdownRow label="Total Interest Paid" value={formatCurrency(results.totalInterest)} highlight />
                    <BreakdownRow label="Total Amount Paid" value={formatCurrency(results.totalPaid)} bold />
                    <BreakdownRow label="Interest as % of Balance" value={`${((results.totalInterest / inputs.balance) * 100).toFixed(1)}%`} />
                    <BreakdownRow label="Minimum Interest Payment" value={formatCurrency(results.minPayment)} />

                    <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                      <p className="text-xs font-semibold text-amber-800 mb-1">💡 Interest Savings Tip</p>
                      <p className="text-xs text-amber-700">
                        Increasing your payment by just {formatCurrency(inputs.monthlyPayment * 0.25)}/mo could save you thousands in interest. Use the quick scenarios above to compare options.
                      </p>
                    </div>
                  </div>
                </>
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
