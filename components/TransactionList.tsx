import React, { useState } from 'react';
import { Transaction } from '../types';
import { formatFCFA, formatDate } from '../utils/format';
import { Trash2, TrendingUp, TrendingDown, Check, X, Search } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete }) => {
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => setDeleteConfirmId(id);
  const confirmDelete = (id: string) => { onDelete(id); setDeleteConfirmId(null); };
  const cancelDelete = () => setDeleteConfirmId(null);

  return (
    <div className="bg-white rounded-2xl p-6 h-full flex flex-col shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
        <h3 className="text-lg font-rajdhani font-bold text-slate-900">Dernières Transactions</h3>
        <div className="bg-slate-50 p-2 rounded-lg text-slate-400">
             <Search size={16} />
        </div>
      </div>

      <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1">
        {transactions.length === 0 ? (
          <div className="text-center py-12 flex flex-col items-center">
             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-400">
                <TrendingUp size={24} />
             </div>
             <p className="text-slate-400 text-sm">Aucune transaction pour le moment.</p>
          </div>
        ) : (
          transactions.map((t) => (
            <div
              key={t.id}
              className={`group flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${
                deleteConfirmId === t.id 
                  ? 'bg-red-50 border-red-200' 
                  : 'bg-white hover:bg-slate-50 border-transparent hover:border-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                    t.type === 'INCOME' 
                        ? 'bg-emerald-50 border-emerald-100 text-emerald-600' 
                        : 'bg-rose-50 border-rose-100 text-rose-600'
                }`}>
                  {t.type === 'INCOME' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{t.category}</p>
                  <p className="text-[10px] text-slate-400 font-mono tracking-wide">{formatDate(t.date)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {deleteConfirmId === t.id ? (
                  <div className="flex items-center gap-2 animate-fade-in">
                    <button
                      onClick={() => confirmDelete(t.id)}
                      className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <Check size={14} />
                    </button>
                    <button
                      onClick={cancelDelete}
                      className="p-1.5 bg-slate-100 text-slate-600 rounded hover:bg-slate-200 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="text-right">
                         <span className={`block font-rajdhani font-bold text-sm ${t.type === 'INCOME' ? 'text-emerald-600' : 'text-slate-900'}`}>
                            {t.type === 'INCOME' ? '+' : '-'}{formatFCFA(t.amount)}
                        </span>
                        <span className="block text-[10px] text-slate-400 truncate max-w-[80px]">{t.description}</span>
                    </div>
                    
                    <button
                      onClick={() => handleDeleteClick(t.id)}
                      className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200"
                    >
                      <Trash2 size={14} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionList;