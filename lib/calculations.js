// lib/calculations.js

export function formatCurrency(amount, decimals = 0) {
  if (isNaN(amount) || !isFinite(amount)) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

export function formatNumber(num, decimals = 0) {
  if (isNaN(num) || !isFinite(num)) return '0';
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

export function parseCurrency(str) {
  if (!str) return 0;
  return parseFloat(String(str).replace(/[$,]/g, '')) || 0;
}

// ── Mortgage ──────────────────────────────────────────────
export function calcMortgage({ homePrice, downPayment, annualRate, termYears, annualTax, annualInsurance }) {
  const principal = homePrice - downPayment;
  if (principal <= 0 || annualRate <= 0 || termYears <= 0) {
    return { monthlyPayment: 0, totalPayment: 0, totalInterest: 0, monthlyTax: 0, monthlyInsurance: 0, principalAndInterest: 0 };
  }
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = termYears * 12;
  const monthlyTax = (annualTax || 0) / 12;
  const monthlyInsurance = (annualInsurance || 0) / 12;
  let principalAndInterest;
  if (monthlyRate === 0) {
    principalAndInterest = principal / numPayments;
  } else {
    principalAndInterest = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  }
  const monthlyPayment = principalAndInterest + monthlyTax + monthlyInsurance;
  const totalPayment = principalAndInterest * numPayments + (monthlyTax + monthlyInsurance) * numPayments;
  const totalInterest = (principalAndInterest * numPayments) - principal;
  return {
    principalAndInterest,
    monthlyPayment,
    totalPayment,
    totalInterest,
    monthlyTax,
    monthlyInsurance,
    principal,
    loanToValue: (principal / homePrice) * 100,
  };
}

export function buildAmortizationSchedule({ principal, annualRate, termYears }) {
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = termYears * 12;
  const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  let balance = principal;
  const schedule = [];
  for (let month = 1; month <= numPayments; month++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    balance -= principalPayment;
    if (month % 12 === 0 || month === 1 || month === numPayments) {
      schedule.push({ month, year: Math.ceil(month / 12), payment: monthlyPayment, principal: principalPayment, interest: interestPayment, balance: Math.max(0, balance) });
    }
  }
  return schedule;
}

// ── Line of Credit ────────────────────────────────────────
export function calcLOC({ creditLimit, balance, annualRate, monthlyPayment }) {
  const used = balance || creditLimit;
  if (used <= 0 || annualRate <= 0 || monthlyPayment <= 0) {
    return { months: 0, totalInterest: 0, totalPaid: 0, canPayOff: false };
  }
  const monthlyRate = annualRate / 100 / 12;
  const minPayment = used * monthlyRate;
  if (monthlyPayment <= minPayment) {
    return { months: Infinity, totalInterest: Infinity, totalPaid: Infinity, canPayOff: false, minPayment };
  }
  let remaining = used;
  let totalInterest = 0;
  let months = 0;
  const maxMonths = 600;
  while (remaining > 0.01 && months < maxMonths) {
    const interest = remaining * monthlyRate;
    totalInterest += interest;
    const principal = Math.min(monthlyPayment - interest, remaining);
    remaining -= principal;
    months++;
  }
  return {
    months,
    years: Math.floor(months / 12),
    remainingMonths: months % 12,
    totalInterest,
    totalPaid: used + totalInterest,
    canPayOff: months < maxMonths,
    minPayment,
    effectiveRate: (totalInterest / used) * 100,
  };
}

// ── Car Loan ──────────────────────────────────────────────
export function calcCarLoan({
  vehiclePrice,
  downPayment,
  tradeInValue,
  annualRate,
  termMonths,
  salesTaxRate,
  annualInsurance,
  annualMaintenance,
  annualFuelCost,
  isUsed,
}) {
  const taxableAmount = Math.max(0, vehiclePrice - (tradeInValue || 0));
  const salesTax = taxableAmount * ((salesTaxRate || 0) / 100);
  const totalVehicleCost = vehiclePrice + salesTax;
  const principal = Math.max(0, totalVehicleCost - (downPayment || 0) - (tradeInValue || 0));

  let monthlyPayment = 0;
  let totalInterest = 0;

  if (principal > 0 && annualRate > 0 && termMonths > 0) {
    const monthlyRate = annualRate / 100 / 12;
    monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1);
    totalInterest = (monthlyPayment * termMonths) - principal;
  } else if (principal > 0 && annualRate === 0) {
    monthlyPayment = principal / termMonths;
  }

  const monthlyInsurance = (annualInsurance || 0) / 12;
  const monthlyMaintenance = (annualMaintenance || 0) / 12;
  const monthlyFuel = (annualFuelCost || 0) / 12;
  const totalMonthly = monthlyPayment + monthlyInsurance + monthlyMaintenance + monthlyFuel;
  const totalLoanCost = monthlyPayment * termMonths;
  const totalOwnershipCost = totalLoanCost + (annualInsurance || 0) * (termMonths / 12) + (annualMaintenance || 0) * (termMonths / 12) + (annualFuelCost || 0) * (termMonths / 12);

  // Depreciation estimate
  const depreciationRate = isUsed ? 0.12 : 0.20; // used cars depreciate slower
  const firstYearDepreciation = vehiclePrice * depreciationRate;
  const estimatedValueAfterTerm = vehiclePrice * Math.pow(1 - (isUsed ? 0.10 : 0.15), termMonths / 12);

  return {
    principal,
    salesTax,
    totalVehicleCost,
    monthlyPayment,
    totalInterest,
    totalLoanCost,
    monthlyInsurance,
    monthlyMaintenance,
    monthlyFuel,
    totalMonthly,
    totalOwnershipCost,
    firstYearDepreciation,
    estimatedValueAfterTerm: Math.max(0, estimatedValueAfterTerm),
    netCost: totalOwnershipCost - Math.max(0, estimatedValueAfterTerm),
  };
}

// ── Renovation ────────────────────────────────────────────
export function calcRenovation({ budget, downPayment, annualRate, termYears, financed }) {
  if (!financed) {
    return { monthlyPayment: 0, totalCost: budget, totalInterest: 0, financed: false };
  }
  const principal = budget - (downPayment || 0);
  if (principal <= 0) return { monthlyPayment: 0, totalCost: budget, totalInterest: 0, financed: true };
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = termYears * 12;
  let monthlyPayment;
  if (monthlyRate === 0) {
    monthlyPayment = principal / numPayments;
  } else {
    monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  }
  const totalPaid = monthlyPayment * numPayments;
  const totalInterest = totalPaid - principal;
  return { monthlyPayment, totalCost: totalPaid + (downPayment || 0), totalInterest, financed: true, principal };
}

// ── Recreation ────────────────────────────────────────────
export function calcRecreation({ itemCost, downPayment, annualRate, termYears, maintenancePct, annualInsurance, annualStorage }) {
  const principal = itemCost - (downPayment || 0);
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = termYears * 12;
  let loanPayment = 0;
  if (principal > 0 && annualRate > 0 && termYears > 0) {
    loanPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  }
  const annualMaintenance = itemCost * ((maintenancePct || 0) / 100);
  const monthlyMaintenance = annualMaintenance / 12;
  const monthlyInsurance = (annualInsurance || 0) / 12;
  const monthlyStorage = (annualStorage || 0) / 12;
  const monthlyCost = loanPayment + monthlyMaintenance + monthlyInsurance + monthlyStorage;
  const yearlyCost = monthlyCost * 12;
  const totalLoanCost = loanPayment * numPayments;
  const totalInterest = totalLoanCost - principal;
  const fiveYearCost = totalLoanCost + (annualMaintenance + (annualInsurance || 0) + (annualStorage || 0)) * Math.min(termYears, 5);
  return { loanPayment, monthlyMaintenance, monthlyInsurance, monthlyStorage, monthlyCost, yearlyCost, totalInterest, fiveYearCost, totalCostOfOwnership: fiveYearCost };
}

// ── Shared helpers ────────────────────────────────────────
export function getAffordabilityRating(monthlyPayment, monthlyIncome) {
  if (!monthlyIncome) return null;
  const ratio = (monthlyPayment / monthlyIncome) * 100;
  if (ratio <= 15) return { label: 'Excellent', color: 'green', ratio };
  if (ratio <= 25) return { label: 'Good', color: 'blue', ratio };
  if (ratio <= 35) return { label: 'Manageable', color: 'yellow', ratio };
  if (ratio <= 45) return { label: 'Stretched', color: 'orange', ratio };
  return { label: 'High Risk', color: 'red', ratio };
}
