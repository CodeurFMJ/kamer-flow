import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Transaction, FinancialSummary } from '../types';
import { formatFCFA } from '../utils/format';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

interface DashboardProps {
  summary: FinancialSummary;
  transactions: Transaction[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A78BFA', '#F472B6', '#34D399'];

const Dashboard: React.FC<DashboardProps> = ({ summary, transactions }) => {
  // Aggregate expenses by category for the chart
  const expenseData = transactions
    .filter((t) => t.type === 'EXPENSE')
    .reduce((acc, curr) => {
      const existing = acc.find((item) => item.name === curr.category);
      if (existing) {
        existing.value += curr.amount;
      } else {
        acc.push({ name: curr.category, value: curr.amount });
      }
      return acc;
    }, [] as { name: string; value: number }[]);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-[0_0_15px_rgba(56,189,248,0.15)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <Wallet size={48} className="text-cyan-400" />
            </div>
            <p className="text-slate-400 text-sm font-medium tracking-wider uppercase">Solde Total</p>
            <h3 className={`text-3xl font-orbitron font-bold mt-1 ${summary.balance >= 0 ? 'text-cyan-400' : 'text-red-400'}`}>
                {formatFCFA(summary.balance)}
            </h3>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-[0_0_15px_rgba(74,222,128,0.15)] relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <TrendingUp size={48} className="text-green-400" />
            </div>
            <p className="text-slate-400 text-sm font-medium tracking-wider uppercase">Revenus</p>
            <h3 className="text-3xl font-orbitron font-bold mt-1 text-green-400">
                {formatFCFA(summary.totalIncome)}
            </h3>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-[0_0_15px_rgba(248,113,113,0.15)] relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <TrendingDown size={48} className="text-red-400" />
            </div>
            <p className="text-slate-400 text-sm font-medium tracking-wider uppercase">Dépenses</p>
            <h3 className="text-3xl font-orbitron font-bold mt-1 text-red-400">
                {formatFCFA(summary.totalExpense)}
            </h3>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
        <h3 className="text-xl font-orbitron text-white mb-6 border-b border-white/10 pb-2">Répartition des Dépenses</h3>
        {expenseData.length > 0 ? (
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value: number) => formatFCFA(value)}
                />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-slate-500">
            Aucune dépense enregistrée
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
