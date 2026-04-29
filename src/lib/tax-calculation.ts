import { FilingStatus, TaxBracket } from '../types';

// 2025 Federal Tax Brackets
export const FEDERAL_BRACKETS: Record<FilingStatus, TaxBracket[]> = {
  single: [
    { rate: 0.10, min: 0, max: 11925 },
    { rate: 0.12, min: 11925, max: 48475 },
    { rate: 0.22, min: 48475, max: 103350 },
    { rate: 0.24, min: 103350, max: 197300 },
    { rate: 0.32, min: 197300, max: 250525 },
    { rate: 0.35, min: 250525, max: 626350 },
    { rate: 0.37, min: 626350, max: null },
  ],
  married: [
    { rate: 0.10, min: 0, max: 23850 },
    { rate: 0.12, min: 23850, max: 96950 },
    { rate: 0.22, min: 96950, max: 206700 },
    { rate: 0.24, min: 206700, max: 394600 },
    { rate: 0.32, min: 394600, max: 501050 },
    { rate: 0.35, min: 501050, max: 751600 },
    { rate: 0.37, min: 751600, max: null },
  ],
  headOfHousehold: [
    { rate: 0.10, min: 0, max: 17000 },
    { rate: 0.12, min: 17000, max: 64850 },
    { rate: 0.22, min: 64850, max: 103350 },
    { rate: 0.24, min: 103350, max: 197300 },
    { rate: 0.32, min: 197300, max: 250525 },
    { rate: 0.35, min: 250525, max: 626350 },
    { rate: 0.37, min: 626350, max: null },
  ],
};

export const STANDARD_DEDUCTION: Record<FilingStatus, number> = {
  single: 15000,
  married: 30000,
  headOfHousehold: 22500,
};

// State Tax Data Structure
export const STATE_TAX_DATA: Record<string, { type: 'flat' | 'none' | 'progressive'; rate?: number; brackets?: TaxBracket[] }> = {
  'Alabama': { type: 'flat', rate: 0.05 },
  'Alaska': { type: 'none' },
  'Arizona': { type: 'flat', rate: 0.025 },
  'Arkansas': { type: 'flat', rate: 0.044 },
  'California': { 
    type: 'progressive', 
    brackets: [
      { rate: 0.01, min: 0, max: 10412 },
      { rate: 0.02, min: 10412, max: 24684 },
      { rate: 0.04, min: 24684, max: 38959 },
      { rate: 0.06, min: 38959, max: 54081 },
      { rate: 0.08, min: 54081, max: 68350 },
      { rate: 0.093, min: 68350, max: 349137 },
      { rate: 0.103, min: 349137, max: 418961 },
      { rate: 0.113, min: 418961, max: 698271 },
      { rate: 0.123, min: 698271, max: null },
    ]
  },
  'Colorado': { type: 'flat', rate: 0.044 },
  'Connecticut': { type: 'progressive', brackets: [
    { rate: 0.03, min: 0, max: 10000 },
    { rate: 0.05, min: 10000, max: 50000 },
    { rate: 0.055, min: 50000, max: 100000 },
    { rate: 0.06, min: 100000, max: 200000 },
    { rate: 0.065, min: 200000, max: 250000 },
    { rate: 0.069, min: 250000, max: 500000 },
    { rate: 0.0699, min: 500000, max: null },
  ]},
  'Delaware': { type: 'flat', rate: 0.06 },
  'Florida': { type: 'none' },
  'Georgia': { type: 'flat', rate: 0.0549 },
  'Hawaii': { type: 'flat', rate: 0.0825 },
  'Idaho': { type: 'flat', rate: 0.058 },
  'Illinois': { type: 'flat', rate: 0.0495 },
  'Indiana': { type: 'flat', rate: 0.0305 },
  'Iowa': { type: 'flat', rate: 0.057 },
  'Kansas': { type: 'flat', rate: 0.057 },
  'Kentucky': { type: 'flat', rate: 0.04 },
  'Louisiana': { type: 'flat', rate: 0.0425 },
  'Maine': { type: 'flat', rate: 0.0715 },
  'Maryland': { type: 'flat', rate: 0.0475 },
  'Massachusetts': { type: 'flat', rate: 0.05 },
  'Michigan': { type: 'flat', rate: 0.0425 },
  'Minnesota': { type: 'flat', rate: 0.0785 },
  'Mississippi': { type: 'flat', rate: 0.05 },
  'Missouri': { type: 'flat', rate: 0.048 },
  'Montana': { type: 'flat', rate: 0.059 },
  'Nebraska': { type: 'flat', rate: 0.0584 },
  'Nevada': { type: 'none' },
  'New Hampshire': { type: 'none' },
  'New Jersey': { type: 'progressive', brackets: [
    { rate: 0.014, min: 0, max: 20000 },
    { rate: 0.0175, min: 20000, max: 35000 },
    { rate: 0.035, min: 35000, max: 40000 },
    { rate: 0.05525, min: 40000, max: 75000 },
    { rate: 0.0637, min: 75000, max: 500000 },
    { rate: 0.0897, min: 500000, max: 1000000 },
    { rate: 0.1075, min: 1000000, max: null },
  ]},
  'New Mexico': { type: 'flat', rate: 0.049 },
  'New York': { 
    type: 'progressive', 
    brackets: [
      { rate: 0.04, min: 0, max: 8500 },
      { rate: 0.045, min: 8500, max: 11700 },
      { rate: 0.0525, min: 11700, max: 13900 },
      { rate: 0.0585, min: 13900, max: 21400 },
      { rate: 0.0625, min: 21400, max: 80650 },
      { rate: 0.0685, min: 80650, max: 215400 },
      { rate: 0.0965, min: 215400, max: 1077550 },
      { rate: 0.103, min: 1077550, max: 5000000 },
      { rate: 0.109, min: 5000000, max: null },
    ]
  },
  'North Carolina': { type: 'flat', rate: 0.045 },
  'North Dakota': { type: 'flat', rate: 0.025 },
  'Ohio': { type: 'flat', rate: 0.035 },
  'Oklahoma': { type: 'flat', rate: 0.0475 },
  'Oregon': { type: 'flat', rate: 0.0875 },
  'Pennsylvania': { type: 'flat', rate: 0.0307 },
  'Rhode Island': { type: 'flat', rate: 0.0599 },
  'South Carolina': { type: 'flat', rate: 0.07 },
  'South Dakota': { type: 'none' },
  'Tennessee': { type: 'none' },
  'Texas': { type: 'none' },
  'Utah': { type: 'flat', rate: 0.0465 },
  'Vermont': { type: 'flat', rate: 0.068 },
  'Virginia': { type: 'flat', rate: 0.0575 },
  'Washington': { type: 'none' },
  'West Virginia': { type: 'flat', rate: 0.0512 },
  'Wisconsin': { type: 'flat', rate: 0.053 },
  'Wyoming': { type: 'none' },
};

export function calculateUSIncomeTax(grossIncome: number, filingStatus: FilingStatus, state: string) {
  const standardDeduction = STANDARD_DEDUCTION[filingStatus];
  const federalTaxable = Math.max(0, grossIncome - standardDeduction);

  // Federal Tax Calculation
  const brackets = FEDERAL_BRACKETS[filingStatus];
  let federalTaxTotal = 0;
  const federalBreakdown: { rate: number; amount: number }[] = [];

  for (const bracket of brackets) {
    if (federalTaxable > bracket.min) {
      const taxableInBracket = bracket.max === null 
        ? federalTaxable - bracket.min 
        : Math.min(federalTaxable, bracket.max) - bracket.min;
      
      const taxInBracket = taxableInBracket * bracket.rate;
      federalTaxTotal += taxInBracket;
      federalBreakdown.push({ rate: bracket.rate, amount: taxInBracket });
    }
  }

  // FICA calculation (2025)
  const ssMaxIncome = 176100;
  const ssTax = Math.min(grossIncome, ssMaxIncome) * 0.062;
  const medicareBaseTax = grossIncome * 0.0145;
  const medicareBonusThreshold = filingStatus === 'married' ? 250000 : 200000;
  const medicareBonusTax = Math.max(0, grossIncome - medicareBonusThreshold) * 0.009;
  const medicareTax = medicareBaseTax + medicareBonusTax;

  // Progressive State Tax Calculation
  const stateData = STATE_TAX_DATA[state];
  let stateTaxAmount = 0;
  const stateBreakdown: { rate: number; amount: number }[] = [];

  // Note: For simplicity, we use gross income for state tax taxable amount 
  // as state deductions vary wildly. A 5-10% standard reduction is simulated.
  const stateTaxable = Math.max(0, grossIncome * 0.9); 

  if (stateData.type === 'flat' && stateData.rate) {
    stateTaxAmount = grossIncome * stateData.rate;
    stateBreakdown.push({ rate: stateData.rate, amount: stateTaxAmount });
  } else if (stateData.type === 'progressive' && stateData.brackets) {
    for (const bracket of stateData.brackets) {
      if (stateTaxable > bracket.min) {
        const inBracket = bracket.max === null
          ? stateTaxable - bracket.min
          : Math.min(stateTaxable, bracket.max) - bracket.min;
        const taxInBracket = inBracket * bracket.rate;
        stateTaxAmount += taxInBracket;
        stateBreakdown.push({ rate: bracket.rate, amount: taxInBracket });
      }
    }
  }

  const totalTax = federalTaxTotal + ssTax + medicareTax + stateTaxAmount;
  const netPay = grossIncome - totalTax;

  return {
    grossIncome,
    taxableIncome: federalTaxable,
    standardDeduction,
    federalTax: {
      total: federalTaxTotal,
      effectiveRate: grossIncome > 0 ? federalTaxTotal / grossIncome : 0,
      bracketBreakdown: federalBreakdown,
    },
    fica: {
      socialSecurity: ssTax,
      medicare: medicareTax,
      total: ssTax + medicareTax,
    },
    stateTax: {
      name: state,
      amount: stateTaxAmount,
      bracketBreakdown: stateBreakdown,
    },
    totalTax,
    netPay,
    monthlyNetPay: netPay / 12,
  };
}
