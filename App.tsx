import React, { useState, useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Plus, LogOut, User as UserIcon } from 'lucide-react';
import { Transaction, FinancialSummary } from './types';
import { MOCK_TRANSACTIONS } from './constants';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import AddTransactionModal from './components/AddTransactionModal';
import AIAssistant from './components/AIAssistant';
import { useAuth } from './context/AuthContext';
import AuthScreen from './components/AuthScreen';

const App: React.FC = () => {
  const { user, logout, isLoading } = useAuth();
  
  // State for transactions, initialized empty, loaded via useEffect
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load data when user changes
  useEffect(() => {
    if (user) {
      const storageKey = `kamerflow_transactions_${user.id}`;
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setTransactions(JSON.parse(saved));
      } else {
        // If it's a new user, give them the mock data as a template, but assign new IDs
        // Or keep it empty. Let's give mock data for better UX demonstration.
        // But only if we want to demo. Let's start clean for new users to be realistic, 
        // OR mock data only for a specific demo user. Let's start empty for clean feel, 
        // but maybe inject mock data if array is strictly empty on first ever load?
        // Let's settle on: Empty for new users.
        setTransactions([]);
      }
    }
  }, [user]);

  // Save data when transactions change
  useEffect(() => {
    if (user) {
      const storageKey = `kamerflow_transactions_${user.id}`;
      localStorage.setItem(storageKey, JSON.stringify(transactions));
    }
  }, [transactions, user]);

  const handleAddTransaction = (data: Omit<Transaction, 'id' | 'date'> & { date?: string }) => {
    const newTransaction: Transaction = {
      id: uuidv4(),
      date: data.date || new Date().toISOString(),
      ...data,
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const summary: FinancialSummary = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'INCOME')
      .reduce((acc, t) => acc + t.amount, 0);
    const expense = transactions
      .filter(t => t.type === 'EXPENSE')
      .reduce((acc, t) => acc + t.amount, 0);
    
    return {
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense
    };
  }, [transactions]);

  if (isLoading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-cyan-500">Chargement...</div>;
  }

  if (!user) {
    return <AuthScreen />;
  }

  return (
    <div className="min-h-screen pb-20 bg-[url('https://images.unsplash.com/photo-1535868463750-c78d9543614f?q=80&w=2076&auto=format&fit=crop')] bg-cover bg-fixed bg-center">
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-slate-950/90 z-0 pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
            
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-4xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                        KAMER<span className="text-white">FLOW</span>
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="bg-cyan-900/30 px-2 py-0.5 rounded text-xs text-cyan-300 border border-cyan-500/30">
                        {user.name}
                      </div>
                      <p className="text-slate-400 text-sm">Gère tes dos comme un pro</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-4 w-full md:w-auto">
                   <button 
                      onClick={logout}
                      className="flex items-center gap-2 bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 py-3 px-4 rounded-xl border border-white/10 transition-all"
                      title="Se déconnecter"
                  >
                      <LogOut size={20} />
                  </button>

                  {/* Floating Add Button (Desktop) / Header Action */}
                  <button 
                      onClick={() => setIsModalOpen(true)}
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-6 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all transform hover:scale-105"
                  >
                      <Plus size={20} className="stroke-[3px]" />
                      <span className="font-orbitron">NOUVEAU</span>
                  </button>
                </div>
            </header>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Dashboard (2/3 width on LG) */}
                <div className="lg:col-span-2">
                    <Dashboard summary={summary} transactions={transactions} />
                </div>

                {/* Right Column: List (1/3 width on LG) */}
                <div className="lg:col-span-1">
                    <TransactionList transactions={transactions} onDelete={handleDeleteTransaction} />
                </div>
            </div>

            {/* Mobile Add Button (Sticky) */}
            <button 
                onClick={() => setIsModalOpen(true)}
                className="md:hidden fixed bottom-6 right-6 z-40 bg-cyan-500 text-black p-4 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.6)]"
            >
                <Plus size={32} />
            </button>
        </div>

        {/* Modals & Overlays */}
        <AddTransactionModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onAdd={handleAddTransaction} 
        />

        <AIAssistant transactions={transactions} balance={summary.balance} />
    </div>
  );
};

export default App;