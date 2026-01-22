import React, { useState } from 'react';
import { FinancialGoal } from '../types';
import { formatFCFA, formatDate } from '../utils/format';
import { Target, Plus, Trash2, CheckCircle2, TrendingUp } from 'lucide-react';

interface GoalListProps {
  goals: FinancialGoal[];
  onAddFunds: (id: string, amount: number) => void;
  onDelete: (id: string) => void;
  onOpenAddModal: () => void;
}

const GoalList: React.FC<GoalListProps> = ({ goals, onAddFunds, onDelete, onOpenAddModal }) => {
  const [addingToId, setAddingToId] = useState<string | null>(null);
  const [amountInput, setAmountInput] = useState('');

  const handleAddSubmit = (id: string) => {
    const amount = parseFloat(amountInput);
    if (amount > 0) {
      onAddFunds(id, amount);
      setAddingToId(null);
      setAmountInput('');
    }
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl mb-8">
      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-2">
        <h3 className="text-xl font-orbitron text-white flex items-center gap-2">
          <Target className="text-cyan-400" />
          Mes Projets & Cagnottes
        </h3>
        <button
          onClick={onOpenAddModal}
          className="text-xs bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 px-3 py-1.5 rounded-lg border border-cyan-500/30 transition-all font-bold uppercase tracking-wider"
        >
          + Nouveau
        </button>
      </div>

      {goals.length === 0 ? (
        <div className="text-center py-8 bg-white/5 rounded-xl border border-dashed border-white/10">
          <Target size={32} className="mx-auto text-slate-500 mb-2" />
          <p className="text-slate-400 text-sm">Aucun objectif défini.</p>
          <p className="text-slate-500 text-xs mt-1">Épargne pour ton terrain, ta dot ou la PS5 !</p>
          <button 
             onClick={onOpenAddModal}
             className="mt-4 text-cyan-400 hover:text-cyan-300 text-sm font-bold"
          >
            Commencer un projet
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goals.map((goal) => {
            const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
            const isCompleted = goal.currentAmount >= goal.targetAmount;

            return (
              <div key={goal.id} className="relative bg-slate-800/50 p-4 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-all group overflow-hidden">
                {/* Background Glow based on progress */}
                <div 
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-1000"
                    style={{ width: `${progress}%`, opacity: 0.5 }}
                />

                <div className="flex justify-between items-start mb-2 relative z-10">
                  <div>
                    <h4 className="font-bold text-slate-200">{goal.name}</h4>
                    {goal.deadline && (
                      <p className="text-xs text-slate-500">Objectif: {formatDate(goal.deadline)}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                     <button 
                        onClick={() => onDelete(goal.id)}
                        className="text-slate-600 hover:text-red-400 transition-colors"
                     >
                        <Trash2 size={16} />
                     </button>
                  </div>
                </div>

                <div className="flex justify-between items-end mb-2 relative z-10">
                    <span className="text-2xl font-mono text-cyan-400 font-bold">
                        {formatFCFA(goal.currentAmount)}
                    </span>
                    <span className="text-xs text-slate-400 mb-1">
                        / {formatFCFA(goal.targetAmount)}
                    </span>
                </div>

                {/* Progress Bar */}
                <div className="h-3 bg-slate-700 rounded-full overflow-hidden relative z-10">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 relative ${isCompleted ? 'bg-green-500' : 'bg-gradient-to-r from-cyan-500 to-purple-600'}`}
                    style={{ width: `${progress}%` }}
                  >
                     <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
                
                <div className="mt-2 flex justify-between items-center relative z-10">
                    <span className="text-xs font-bold text-slate-400">{progress.toFixed(0)}%</span>
                    
                    {!isCompleted && (
                        addingToId === goal.id ? (
                            <div className="flex items-center gap-2 animate-fade-in">
                                <input 
                                    type="number" 
                                    autoFocus
                                    className="w-20 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-xs text-white outline-none focus:border-cyan-500"
                                    placeholder="Montant"
                                    value={amountInput}
                                    onChange={(e) => setAmountInput(e.target.value)}
                                />
                                <button 
                                    onClick={() => handleAddSubmit(goal.id)}
                                    className="bg-green-500/20 text-green-400 p-1 rounded hover:bg-green-500/40"
                                >
                                    <CheckCircle2 size={16} />
                                </button>
                                <button 
                                    onClick={() => setAddingToId(null)}
                                    className="text-slate-500 hover:text-white"
                                >
                                    <Plus size={16} className="rotate-45" />
                                </button>
                            </div>
                        ) : (
                            <button 
                                onClick={() => setAddingToId(goal.id)}
                                className="flex items-center gap-1 text-xs text-cyan-300 hover:text-white transition-colors"
                            >
                                <TrendingUp size={14} />
                                Cotiser
                            </button>
                        )
                    )}
                    
                    {isCompleted && (
                        <span className="text-xs text-green-400 font-bold flex items-center gap-1">
                            <CheckCircle2 size={14} /> Terminé !
                        </span>
                    )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GoalList;