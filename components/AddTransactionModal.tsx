import React, { useState } from 'react';
import { X } from 'lucide-react';
import { TransactionType } from '../types';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../constants';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (transaction: any) => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [type, setType] = useState<TransactionType>('EXPENSE');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category) return;

    onAdd({
      amount: parseFloat(amount),
      type,
      category,
      description,
      date: new Date().toISOString(),
    });

    // Reset form
    setAmount('');
    setCategory('');
    setDescription('');
    onClose();
  };

  const categories = type === 'EXPENSE' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-white/20 rounded-2xl w-full max-w-md overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.1)]">
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <h2 className="text-2xl font-orbitron text-white">Nouvelle Transaction</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Type Toggle */}
          <div className="flex bg-slate-800 rounded-lg p-1">
            <button
              type="button"
              onClick={() => { setType('EXPENSE'); setCategory(''); }}
              className={`flex-1 py-2 rounded-md font-bold transition-all ${type === 'EXPENSE' ? 'bg-red-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              Dépense
            </button>
            <button
              type="button"
              onClick={() => { setType('INCOME'); setCategory(''); }}
              className={`flex-1 py-2 rounded-md font-bold transition-all ${type === 'INCOME' ? 'bg-green-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              Revenu
            </button>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-slate-400 text-sm mb-1">Montant (FCFA)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Ex: 5000"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600 font-mono text-lg"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-slate-400 text-sm mb-1">Catégorie</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all appearance-none"
              required
            >
              <option value="" disabled>Choisir une catégorie</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.label}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-slate-400 text-sm mb-1">Description (Optionnel)</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Course Yango, Marché Mfoundi..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all transform hover:scale-[1.02] mt-4 font-orbitron tracking-wider"
          >
            VALIDER
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
