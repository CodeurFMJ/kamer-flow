import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Transaction, FinancialSummary } from '../types';
import { formatFCFA } from '../utils/format';
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface DashboardProps {
  summary: FinancialSummary;
  transactions: Transaction[];
}

const COLORS = ['#3b82f6', '#06b6d4', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#64748b'];
const INCOME_COLORS = ['#10b981', '#14b8a6', '#6366f1', '#a855f7', '#ec4899'];

const Dashboard: React.FC<DashboardProps> = ({ summary, transactions }) => {
  // Data aggregation logic
  const expenseData = transactions
    .filter((t) => t.type === 'EXPENSE')
    .reduce((acc, curr) => {
      const existing = acc.find((item) => item.name === curr.category);
      if (existing) existing.value += curr.amount;
      else acc.push({ name: curr.category, value: curr.amount });
      return acc;
    }, [] as { name: string; value: number }[])
    .sort((a, b) => b.value - a.value);

  const incomeData = transactions
    .filter((t) => t.type === 'INCOME')
    .reduce((acc, curr) => {
      const existing = acc.find((item) => item.name === curr.category);
      if (existing) existing.value += curr.amount;
      else acc.push({ name: curr.category, value: curr.amount });
      return acc;
    }, [] as { name: string; value: number }[]);

  return (
    <div className="space-y-8">
      {/* Summary Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Balance Card */}
        <div className="bg-white rounded-2xl p-6 relative overflow-hidden group shadow-sm border border-slate-100">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <Wallet size={80} className="text-slate-900" />
            </div>
            <div className="relative z-10">
                <p className="text-slate-500 text-xs font-bold tracking-widest uppercase mb-2">Solde Total</p>
                <h3 className="text-4xl font-rajdhani font-bold text-slate-900 tracking-tight">
                    {formatFCFA(summary.balance)}
                </h3>
                <div className={`mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${summary.balance >= 0 ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-red-50 border-red-100 text-red-600'}`}>
                    {summary.balance >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    <span>{summary.balance >= 0 ? 'Solde positif' : 'Attention requise'}</span>
                </div>
            </div>
        </div>

        {/* Income Card */}
        <div className="bg-white rounded-2xl p-6 relative overflow-hidden group shadow-sm border border-slate-100">
             <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-emerald-100 blur-3xl rounded-full opacity-50"></div>
            <div className="flex justify-between items-start mb-4">
                 <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 border border-emerald-100">
                    <TrendingUp size={24} />
                 </div>
            </div>
            <p className="text-slate-500 text-xs font-bold tracking-widest uppercase">Revenus</p>
            <h3 className="text-3xl font-rajdhani font-bold text-slate-900 mt-1">
                {formatFCFA(summary.totalIncome)}
            </h3>
        </div>

        {/* Expense Card */}
        <div className="bg-white rounded-2xl p-6 relative overflow-hidden group shadow-sm border border-slate-100">
             <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-red-100 blur-3xl rounded-full opacity-50"></div>
             <div className="flex justify-between items-start mb-4">
                 <div className="p-3 bg-red-50 rounded-xl text-red-600 border border-red-100">
                    <TrendingDown size={24} />
                 </div>
            </div>
            <p className="text-slate-500 text-xs font-bold tracking-widest uppercase">Dépenses</p>
            <h3 className="text-3xl font-rajdhani font-bold text-slate-900 mt-1">
                {formatFCFA(summary.totalExpense)}
            </h3>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Expense Breakdown */}
        <div className="bg-white rounded-2xl p-6 flex flex-col shadow-sm border border-slate-100">
          <h3 className="text-lg font-rajdhani font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="w-1 h-5 bg-red-500 rounded-full"></span>
            Répartition des Dépenses
          </h3>
          <div className="h-[280px] w-full mt-auto">
            {expenseData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                  >
                    {expenseData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                      contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', color: '#0f172a' }}
                      itemStyle={{ color: '#0f172a', fontFamily: 'Rajdhani', fontWeight: 'bold' }}
                      formatter={(value: number) => [formatFCFA(value), '']}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                    <p>Aucune donnée</p>
                </div>
            )}
          </div>
          {/* Custom Legend */}
          <div className="mt-4 flex flex-wrap gap-3 justify-center">
              {expenseData.slice(0, 4).map((entry, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs text-slate-500">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      {entry.name}
                  </div>
              ))}
          </div>
        </div>

        {/* Income Sources */}
        <div className="bg-white rounded-2xl p-6 flex flex-col shadow-sm border border-slate-100">
          <h3 className="text-lg font-rajdhani font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="w-1 h-5 bg-emerald-500 rounded-full"></span>
            Sources de Revenus
          </h3>
          <div className="h-[280px] w-full mt-auto">
            {incomeData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incomeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#94a3b8" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false} 
                    dy={10}
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} 
                  />
                  <Tooltip
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                    itemStyle={{ color: '#10b981' }}
                    formatter={(value: number) => [formatFCFA(value), '']}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={50}>
                    {incomeData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={INCOME_COLORS[index % INCOME_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                    <p>Aucune donnée</p>
                </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;