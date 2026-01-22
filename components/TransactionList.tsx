import React, { useState } from 'react';
import { Transaction } from '../types';
import { formatFCFA, formatDate } from '../utils/format';
import { Trash2, TrendingUp, TrendingDown, Check, X } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete }) => {
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = (id: string) => {
    onDelete(id);
    setDeleteConfirmId(null);
  };

  const cancelDelete = () => {
    setDeleteConfirmId(null);
  };

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
              className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                deleteConfirmId === t.id 
                  ? 'bg-red-500/10 border-red-500/30' 
                  : 'bg-white/5 hover:bg-white/10 border-transparent hover:border-cyan-500/30'
              }`}
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
                {deleteConfirmId === t.id ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-red-400 font-bold hidden sm:inline">Supprimer ?</span>
                    <button
                      onClick={() => confirmDelete(t.id)}
                      className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                      title="Confirmer"
                    >
                      <Check size={18} />
                    </button>
                    <button
                      onClick={cancelDelete}
                      className="p-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 hover:text-white transition-colors"
                      title="Annuler"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <>
                    <span className={`font-mono font-bold text-lg ${t.type === 'INCOME' ? 'text-green-400' : 'text-red-400'}`}>
                      {t.type === 'INCOME' ? '+' : '-'}{formatFCFA(t.amount)}
                    </span>
                    <button
                      onClick={() => handleDeleteClick(t.id)}
                      className="p-2 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                      aria-label="Delete"
                    >
                      <Trash2 size={18} />
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