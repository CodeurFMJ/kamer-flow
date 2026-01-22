import React, { useState } from 'react';
import { FinancialGoal } from '../types';
import { formatFCFA, formatDate } from '../utils/format';
import { Target, Plus, Trash2, CheckCircle2 } from 'lucide-react';

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
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-rajdhani font-bold text-slate-900 flex items-center gap-2">
          <Target className="text-cyan-600" size={20} />
          Projets & Épargne
        </h3>
        <button
          onClick={onOpenAddModal}
          className="text-xs bg-cyan-50 hover:bg-cyan-100 text-cyan-600 px-4 py-2 rounded-lg border border-cyan-100 transition-all font-bold tracking-wide"
        >
          + NOUVEAU
        </button>
      </div>

      {goals.length === 0 ? (
        <div className="bg-slate-50 rounded-xl border border-dashed border-slate-200 p-8 text-center">
          <Target size={32} className="mx-auto text-slate-300 mb-3" />
          <p className="text-slate-400 text-sm">Aucun projet en cours.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {goals.map((goal) => {
            const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
            const isCompleted = goal.currentAmount >= goal.targetAmount;

            return (
              <div key={goal.id} className="bg-white p-5 rounded-2xl border border-slate-100 relative group hover:border-slate-300 transition-all shadow-md">
                
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg tracking-tight">{goal.name}</h4>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">
                        {goal.deadline ? `Échéance: ${formatDate(goal.deadline)}` : 'Pas de date'}
                    </p>
                  </div>
                  <button 
                        onClick={() => onDelete(goal.id)}
                        className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                        <Trash2 size={14} />
                  </button>
                </div>

                <div className="flex flex-col gap-1 mb-4">
                    <span className="text-2xl font-rajdhani font-bold text-cyan-600">
                        {formatFCFA(goal.currentAmount)}
                    </span>
                    <span className="text-xs text-slate-500">
                        sur {formatFCFA(goal.targetAmount)}
                    </span>
                </div>

                {/* Sleek Progress Bar */}
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-4">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${isCompleted ? 'bg-emerald-500' : 'bg-gradient-to-r from-cyan-400 to-blue-500'}`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center h-8">
                    {!isCompleted ? (
                        addingToId === goal.id ? (
                            <div className="flex items-center gap-2 w-full animate-fade-in bg-slate-50 p-1 rounded-lg border border-slate-200">
                                <input 
                                    type="number" 
                                    autoFocus
                                    className="w-full bg-transparent text-xs text-slate-900 outline-none pl-1 placeholder:text-slate-400"
                                    placeholder="Montant..."
                                    value={amountInput}
                                    onChange={(e) => setAmountInput(e.target.value)}
                                />
                                <button 
                                    onClick={() => handleAddSubmit(goal.id)}
                                    className="bg-cyan-600 text-white p-1 rounded hover:bg-cyan-700"
                                >
                                    <CheckCircle2 size={12} />
                                </button>
                            </div>
                        ) : (
                            <button 
                                onClick={() => setAddingToId(goal.id)}
                                className="w-full py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs text-slate-600 transition-colors flex items-center justify-center gap-2 border border-slate-100"
                            >
                                <Plus size={12} /> Ajouter des fonds
                            </button>
                        )
                    ) : (
                        <div className="w-full py-2 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-bold text-center flex items-center justify-center gap-2">
                            <CheckCircle2 size={14} /> Objectif Atteint
                        </div>
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