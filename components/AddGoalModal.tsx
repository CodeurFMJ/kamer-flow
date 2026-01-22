import React, { useState } from 'react';
import { X, Target } from 'lucide-react';

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (goal: any) => void;
}

const AddGoalModal: React.FC<AddGoalModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [deadline, setDeadline] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !targetAmount) return;

    onAdd({
      name,
      targetAmount: parseFloat(targetAmount),
      currentAmount: 0,
      deadline: deadline || undefined,
      color: '#06b6d4'
    });

    setName('');
    setTargetAmount('');
    setDeadline('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-white/20 rounded-2xl w-full max-w-md overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.2)]">
        <div className="flex justify-between items-center p-6 border-b border-white/10 bg-gradient-to-r from-slate-900 to-slate-800">
          <h2 className="text-2xl font-orbitron text-white flex items-center gap-2">
            <Target className="text-cyan-400" />
            Nouvel Objectif
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div>
            <label className="block text-slate-400 text-sm mb-1">Nom du projet</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Terrain au village, Iphone 15..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600"
              required
            />
          </div>

          <div>
            <label className="block text-slate-400 text-sm mb-1">Montant Cible (FCFA)</label>
            <input
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              placeholder="Ex: 500000"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600 font-mono text-lg"
              required
            />
          </div>

          <div>
            <label className="block text-slate-400 text-sm mb-1">Date limite (Optionnel)</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all transform hover:scale-[1.02] mt-4 font-orbitron tracking-wider"
          >
            CRÉER LA CAGNOTTE
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddGoalModal;