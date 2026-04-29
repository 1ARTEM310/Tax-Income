import React from 'react';
import { calculateUSIncomeTax, STATE_TAX_DATA } from '../lib/tax-calculation';
import { FilingStatus, TaxResult } from '../types';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { 
  DollarSign, 
  TrendingDown, 
  Wallet, 
  Info, 
  ChevronRight,
  Calculator,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const FILING_STATUS_OPTIONS: { label: string; value: FilingStatus }[] = [
  { label: 'Single', value: 'single' },
  { label: 'Married Filing Jointly', value: 'married' },
  { label: 'Head of Household', value: 'headOfHousehold' },
];

const STATES = Object.keys(STATE_TAX_DATA).sort();

const COLORS = {
  netPay: '#10b981', // emerald-500
  federalTax: '#ef4444', // red-500
  fica: '#3b82f6', // blue-500
  stateTax: '#f59e0b', // amber-500
};

export default function TaxCalculator() {
  const [income, setIncome] = React.useState<number>(75000);
  const [status, setStatus] = React.useState<FilingStatus>('single');
  const [stateA, setStateA] = React.useState<string>('Texas');
  const [stateB, setStateB] = React.useState<string>('California');
  const [showComparison, setShowComparison] = React.useState<boolean>(false);

  const resultA = React.useMemo(() => calculateUSIncomeTax(income, status, stateA), [income, status, stateA]);
  const resultB = React.useMemo(() => calculateUSIncomeTax(income, status, stateB), [income, status, stateB]);

  const chartData = [
    { name: 'Federal Tax', value: resultA.federalTax.total, color: COLORS.federalTax },
    { name: 'FICA (SS & Medicare)', value: resultA.fica.total, color: COLORS.fica },
    { name: 'State Tax', value: resultA.stateTax.amount, color: COLORS.stateTax },
    { name: 'Take-home Pay', value: resultA.netPay, color: COLORS.netPay },
  ].filter(d => d.value > 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return (value * 100).toFixed(1) + '%';
  };

  return (
    <div id="tax-calculator-container" className="min-h-screen bg-[#050608] text-slate-200 font-sans p-6 md:p-12 relative overflow-hidden">
      <div className="bg-glow-container">
        <div className="glow-blue"></div>
        <div className="glow-emerald"></div>
      </div>

      <div id="calculator-inner-wrapper" className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* Header */}
        <header id="main-header" className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800/50 pb-8">
          <div>
            <p className="text-emerald-400 font-mono text-xs tracking-[0.2em] uppercase mb-2">IRS | 2025 Estimator</p>
            <h1 id="app-title" className="text-5xl font-bold tracking-tight text-white italic">
              Tax <span className="text-emerald-500 not-italic">Vault</span>
            </h1>
          </div>
          <div id="meta-stats" className="text-right">
            <div className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">Standard Deduction ({status})</div>
            <div className="text-2xl font-mono text-white">{formatCurrency(resultA.standardDeduction)}</div>
          </div>
        </header>

        <div id="calculator-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Controls */}
          <aside id="calculator-sidebar" className="lg:col-span-5 space-y-6">
            <div id="salary-input-card" className="bg-[#0D1117] p-8 rounded-3xl shadow-2xl border border-slate-800/50 space-y-8">
              <div id="salary-input-group" className="space-y-4">
                <label htmlFor="salary-input" className="text-xs font-semibold text-slate-500 uppercase tracking-widest block">Annual Gross Income</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-slate-500 font-mono">$</span>
                  <input 
                    id="salary-input"
                    type="number" 
                    value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="w-full bg-[#161B22] border-none text-white text-3xl font-mono rounded-xl py-5 pl-12 pr-4 focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                  />
                </div>
                <input 
                  id="salary-slider"
                  type="range" 
                  min="0" 
                  max="500000" 
                  step="1000"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div id="selection-grid" className="space-y-6">
                <div id="status-selection-group" className="space-y-3">
                  <label htmlFor="status-select" className="text-xs font-semibold text-slate-500 uppercase tracking-widest block">Filing Status</label>
                  <select 
                    id="status-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as FilingStatus)}
                    className="w-full bg-[#161B22] border-none text-white rounded-xl p-3 focus:ring-1 focus:ring-emerald-500 appearance-none cursor-pointer text-sm"
                  >
                    {FILING_STATUS_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>

                <div id="location-a-selection" className="space-y-3">
                  <label htmlFor="state-select-a" className="text-xs font-semibold text-slate-500 uppercase tracking-widest block">Primary State</label>
                  <select 
                    id="state-select-a"
                    value={stateA}
                    onChange={(e) => setStateA(e.target.value)}
                    className="w-full bg-[#161B22] border-none text-white rounded-xl p-3 focus:ring-1 focus:ring-emerald-500 appearance-none cursor-pointer text-sm"
                  >
                    {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div id="comparison-toggle-area" className="pt-4 border-t border-slate-800/50">
                   <button 
                    onClick={() => setShowComparison(!showComparison)}
                    className={cn(
                      "w-full flex items-center justify-between p-4 rounded-2xl border transition-all text-sm font-medium",
                      showComparison ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-slate-800/20 border-slate-800 text-slate-400 hover:border-slate-700"
                    )}
                   >
                     <span>Compare with another state</span>
                     <div className={cn("w-10 h-5 rounded-full relative transition-colors", showComparison ? "bg-emerald-500" : "bg-slate-700")}>
                        <div className={cn("absolute top-1 w-3 h-3 bg-white rounded-full transition-all", showComparison ? "left-6" : "left-1")} />
                     </div>
                   </button>
                </div>

                <AnimatePresence>
                  {showComparison && (
                    <motion.div 
                      id="location-b-selection"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-3 overflow-hidden"
                    >
                      <label htmlFor="state-select-b" className="text-xs font-semibold text-slate-500 uppercase tracking-widest block">Comparison State</label>
                      <select 
                        id="state-select-b"
                        value={stateB}
                        onChange={(e) => setStateB(e.target.value)}
                        className="w-full bg-[#161B22] border-none text-white rounded-xl p-3 focus:ring-1 focus:ring-emerald-500 appearance-none cursor-pointer text-sm"
                      >
                        {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div id="info-callout" className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl">
              <div className="flex items-start gap-4">
                <Info className="text-emerald-500 mt-1 flex-shrink-0" size={18} />
                <p className="text-sm text-slate-400 leading-relaxed italic">
                  Estimates are based on 2025 federal projections. Actual liability depends on specific deductions and individual state variances.
                </p>
              </div>
            </div>
          </aside>

          {/* Visualization & Results */}
          <main id="calculator-results" className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Comparison view if enabled */}
            {showComparison ? (
              <div id="comparison-dashboard" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ComparisonCard title={stateA} res={resultA} accent="emerald" />
                <ComparisonCard title={stateB} res={resultB} accent="blue" />
                
                <div id="diff-analysis" className="md:col-span-2 bg-[#0D1117] border border-slate-800/50 p-6 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6">
                   <div className="flex items-center gap-4">
                      <div className="p-3 bg-emerald-500/10 rounded-full"><TrendingDown className="text-emerald-400" size={24} /></div>
                      <div>
                        <div className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Net Difference</div>
                        <div className="text-2xl font-bold font-mono text-white">{formatCurrency(Math.abs(resultA.netPay - resultB.netPay))}</div>
                      </div>
                   </div>
                   <div className="text-center md:text-right">
                      <div className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Most Efficient</div>
                      <div className="text-xl font-bold text-emerald-400 italic">
                        {resultA.netPay > resultB.netPay ? stateA : stateB}
                      </div>
                   </div>
                </div>
              </div>
            ) : (
              <div id="results-card" className="bg-gradient-to-br from-[#161B22] to-[#0D1117] border border-slate-800/50 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden h-full flex flex-col justify-between">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Calculator size={200} className="text-emerald-500" />
                </div>

                <div id="primary-take-home" className="relative z-10 mb-8">
                  <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Annual Take-Home Pay ({stateA})</h2>
                  <div className="flex items-baseline gap-4">
                    <motion.span 
                      key={resultA.netPay + stateA}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-7xl font-bold text-white tracking-tighter drop-shadow-[0_0_30px_rgba(52,211,153,0.25)] font-mono"
                    >
                      {formatCurrency(resultA.netPay)}
                    </motion.span>
                    <span className="text-emerald-400 font-mono text-xl tracking-tight">/ yr</span>
                  </div>
                </div>

                <div id="tax-meters" className="space-y-6 relative z-10">
                  <MeterRow name="Federal Tax" amount={resultA.federalTax.total} gross={resultA.grossIncome} color="#3b82f6" />
                  <MeterRow name="FICA Deductions" amount={resultA.fica.total} gross={resultA.grossIncome} color="#6366f1" />
                  <MeterRow name="State Tax" amount={resultA.stateTax.amount} gross={resultA.grossIncome} color="#f59e0b" />

                  <div id="secondary-stats" className="pt-4 flex justify-between items-center border-t border-slate-800/50">
                    <div>
                      <div className="text-[10px] uppercase text-slate-500 tracking-[0.2em] mb-1 font-bold">Effective Rate</div>
                      <div className="text-3xl font-bold text-white font-mono">{formatPercent(resultA.totalTax / resultA.grossIncome)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase text-slate-500 tracking-[0.2em] mb-1 font-bold">Monthly Estimate</div>
                      <div className="text-3xl font-bold text-emerald-400 font-mono">{formatCurrency(resultA.monthlyNetPay)}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>

        {/* Visualizations - only in single view */}
        {!showComparison && (
          <div id="visualization-hub" className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div id="income-split-bar" className="bg-[#0D1117] border border-slate-800/50 p-8 rounded-[2.5rem] shadow-xl">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-8 px-2 flex items-center gap-3">
                <div className="w-4 h-px bg-slate-800"></div>
                Relational Breakdown
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical" margin={{ left: -20, right: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                    <XAxis type="number" hide />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      width={100} 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                    />
                    <Tooltip 
                      cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                      itemStyle={{ fontSize: 12, color: '#fff' }}
                      formatter={(value: number) => formatCurrency(value)}
                    />
                    <Bar 
                      dataKey="value" 
                      radius={[0, 4, 4, 0]} 
                      isAnimationActive={true} 
                      animationDuration={800} 
                      animationEasing="ease-out"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div id="allocation-pie" className="bg-[#0D1117] border border-slate-800/50 p-8 rounded-[2.5rem] shadow-xl flex flex-col items-center">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-8 self-start px-2 flex items-center gap-3">
                <div className="w-4 h-px bg-slate-800"></div>
                Allocation Distribution
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={90}
                      paddingAngle={8}
                      dataKey="value"
                      stroke="none"
                      isAnimationActive={true}
                      animationDuration={800}
                      animationEasing="ease-out"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                      formatter={(value: number) => formatCurrency(value)}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4 w-full px-4">
                {chartData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bracket Breakdown */}
        <div id="bracket-breakdown-section" className="space-y-6 relative z-10">
           <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 px-2 flex items-center gap-3">
             <div className="w-8 h-px bg-slate-800"></div>
             Marginal Bracket Utilization (Primary state)
           </h3>
           <div className="overflow-hidden rounded-3xl border border-slate-800/50 bg-[#0D1117] shadow-xl">
             <table className="w-full text-sm text-left">
               <thead className="bg-[#161B22] text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                 <tr>
                   <th className="px-8 py-5">Rate</th>
                   <th className="px-8 py-5">Reference</th>
                   <th className="px-8 py-5 text-right">Tax Applied</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-800/50">
                  {resultA.federalTax.bracketBreakdown.map((b, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-8 py-4 font-mono font-bold text-emerald-400 group-hover:text-emerald-300">
                        {formatPercent(b.rate)}
                      </td>
                      <td className="px-8 py-4 text-slate-500 font-mono text-xs uppercase">
                        Federal Tier {i + 1}
                      </td>
                      <td className="px-8 py-4 text-right font-mono text-white">
                        {formatCurrency(b.amount)}
                      </td>
                    </tr>
                  ))}
               </tbody>
             </table>
           </div>
        </div>

        {/* Footer info */}
        <footer id="main-footer" className="w-full max-w-5xl mt-12 flex justify-between items-center border-t border-slate-900 pt-8 opacity-40">
          <p className="text-[10px] font-mono tracking-widest uppercase">Estimate only — No legal liability implied</p>
          <div className="flex gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-800"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-800"></div>
          </div>
        </footer>
      </div>
    </div>
  );
}

// Sub-components for cleaner structure
function ComparisonCard({ title, res, accent }: { title: string; res: TaxResult; accent: 'emerald' | 'blue' }) {
  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  const formatPercent = (v: number) => (v * 100).toFixed(1) + '%';

  return (
    <div className={cn(
      "bg-[#0D1117] border p-8 rounded-[2rem] shadow-xl space-y-6",
      accent === 'emerald' ? "border-emerald-500/20" : "border-blue-500/20"
    )}>
      <div className="flex justify-between items-start">
        <h3 className={cn("text-xs font-bold uppercase tracking-widest", accent === 'emerald' ? "text-emerald-400" : "text-blue-400")}>{title}</h3>
        <div className="text-[10px] text-slate-500 uppercase font-mono">Net {formatPercent(res.netPay / res.grossIncome)}</div>
      </div>
      
      <div className="space-y-1">
        <div className="text-sm text-slate-500 uppercase tracking-wider">Net Take-Home</div>
        <div className="text-4xl font-bold text-white font-mono">{formatCurrency(res.netPay)}</div>
      </div>

      <div className="space-y-3 pt-4 border-t border-slate-800/50">
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">Total Tax Paid</span>
          <span className="text-white font-mono">{formatCurrency(res.totalTax)}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">Monthly Net</span>
          <span className="text-emerald-400 font-mono font-bold">{formatCurrency(res.monthlyNetPay)}</span>
        </div>
      </div>
    </div>
  );
}

function MeterRow({ name, amount, gross, color }: { name: string; amount: number; gross: number; color: string }) {
  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  
  return (
    <div className="flex justify-between items-center group">
      <span className="text-slate-400 group-hover:text-white transition-colors text-sm uppercase tracking-wider font-medium">{name}</span>
      <div className="flex items-center gap-6">
        <div className="w-32 h-1.5 bg-slate-800/50 rounded-full overflow-hidden hidden md:block">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(amount / gross) * 100}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ backgroundColor: color }}
            className="h-full"
          />
        </div>
        <span className="text-white font-mono w-28 text-right text-lg">{formatCurrency(amount)}</span>
      </div>
    </div>
  );
}

