import React from 'react';
import { Transaction } from '../types';
import { formatFCFA, formatDate } from '../utils/format';
import { Trash2, TrendingUp, TrendingDown } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete }) => {
  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl h-full">
      <h3 className="text-xl font-orbitron text-white mb-4 border-b border-white/10 pb-2">Historique</h3>
      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
        {transactions.length === 0 ? (
          <p className="text-slate-500 text-center py-8">Aucune transaction.</p>
        ) : (
          transactions.map((t) => (
            <div
              key={t.id}
              className="group flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-cyan-500/30 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${t.type === 'INCOME' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {t.type === 'INCOME' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                </div>
                <div>
                  <p className="font-bold text-slate-200">{t.category}</p>
                  <p className="text-xs text-slate-500">{t.description} • {formatDate(t.date)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`font-mono font-bold text-lg ${t.type === 'INCOME' ? 'text-green-400' : 'text-red-400'}`}>
                  {t.type === 'INCOME' ? '+' : '-'}{formatFCFA(t.amount)}
                </span>
                <button
                  onClick={() => onDelete(t.id)}
                  className="p-2 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                  aria-label="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionList;
