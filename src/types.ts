
export type FilingStatus = 'single' | 'married' | 'headOfHousehold';

export interface TaxBracket {
  rate: number;
  min: number;
  max: number | null;
}

export interface TaxResult {
  grossIncome: number;
  taxableIncome: number;
  standardDeduction: number;
  federalTax: {
    total: number;
    effectiveRate: number;
    bracketBreakdown: {rate: number; amount: number;}[];
  };
  fica: {
    socialSecurity: number;
    medicare: number;
    total: number;
  };
  stateTax: {
    name: string;
    amount: number;
    bracketBreakdown: {rate: number; amount: number;}[];
  };
  totalTax: number;
  netPay: number;
  monthlyNetPay: number;
}
