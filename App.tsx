import React, { useState, useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Plus, LogOut, User as UserIcon, Bell, BellOff, AlertCircle, X } from 'lucide-react';
import { Transaction, FinancialSummary, FinancialGoal } from './types';
import { MOCK_TRANSACTIONS } from './constants';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import AddTransactionModal from './components/AddTransactionModal';
import AddGoalModal from './components/AddGoalModal';
import GoalList from './components/GoalList';
import AIAssistant from './components/AIAssistant';
import { useAuth } from './context/AuthContext';
import AuthScreen from './components/AuthScreen';

const App: React.FC = () => {
  const { user, logout, isLoading } = useAuth();
  
  // State for transactions
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [goals, setGoals] = useState<FinancialGoal[]>([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  
  // Notification States
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [showDailyReminder, setShowDailyReminder] = useState(false);

  // Load data when user changes
  useEffect(() => {
    if (user) {
      // Load Transactions
      const storageKey = `kamerflow_transactions_${user.id}`;
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setTransactions(JSON.parse(saved));
      } else {
        setTransactions([]);
      }

      // Load Goals
      const goalsKey = `kamerflow_goals_${user.id}`;
      const savedGoals = localStorage.getItem(goalsKey);
      if (savedGoals) {
        setGoals(JSON.parse(savedGoals));
      } else {
        setGoals([]);
      }

      // Load notification preference
      const notifPref = localStorage.getItem(`kamerflow_notif_pref_${user.id}`);
      setNotificationsEnabled(notifPref === 'true');
    }
  }, [user]);

  // Save data when transactions change
  useEffect(() => {
    if (user) {
      const storageKey = `kamerflow_transactions_${user.id}`;
      localStorage.setItem(storageKey, JSON.stringify(transactions));
      checkDailyStatus();
    }
  }, [transactions, user]);

  // Save data when goals change
  useEffect(() => {
    if (user) {
      const goalsKey = `kamerflow_goals_${user.id}`;
      localStorage.setItem(goalsKey, JSON.stringify(goals));
    }
  }, [goals, user]);

  // Logic to check if user logged something today
  const checkDailyStatus = () => {
    if (!user) return;
    
    const today = new Date().toDateString();
    const hasTransactionToday = transactions.some(t => new Date(t.date).toDateString() === today);

    // Show banner if nothing logged today
    setShowDailyReminder(!hasTransactionToday);

    // Trigger Native Notification if enabled and nothing logged
    if (notificationsEnabled && !hasTransactionToday && 'Notification' in window) {
       if (Notification.permission === 'granted') {
          // Prevent spamming logic could go here
       }
    }
  };

  const toggleNotifications = async () => {
    if (!notificationsEnabled) {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          setNotificationsEnabled(true);
          localStorage.setItem(`kamerflow_notif_pref_${user?.id}`, 'true');
          new Notification("KamerFlow Activé", {
            body: "On va gérer tes dos ensemble ! Je te ferai signe.",
          });
        }
      } else {
        alert("Ton navigateur ne supporte pas les notifications.");
      }
    } else {
      setNotificationsEnabled(false);
      localStorage.setItem(`kamerflow_notif_pref_${user?.id}`, 'false');
    }
  };

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

  // -- GOAL HANDLERS --
  const handleAddGoal = (data: Omit<FinancialGoal, 'id'>) => {
    const newGoal: FinancialGoal = {
      id: uuidv4(),
      ...data
    };
    setGoals(prev => [newGoal, ...prev]);
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  const handleAddFundsToGoal = (id: string, amount: number) => {
    setGoals(prev => prev.map(g => {
        if (g.id === id) {
            return { ...g, currentAmount: g.currentAmount + amount };
        }
        return g;
    }));
  };
  // -------------------

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
                      onClick={toggleNotifications}
                      className={`flex items-center gap-2 py-3 px-4 rounded-xl border border-white/10 transition-all ${notificationsEnabled ? 'bg-purple-500/20 text-purple-300 border-purple-500/50' : 'bg-slate-800 text-slate-400'}`}
                      title={notificationsEnabled ? "Notifications activées" : "Activer les rappels"}
                  >
                      {notificationsEnabled ? <Bell size={20} /> : <BellOff size={20} />}
                  </button>

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

            {/* Daily Reminder Banner */}
            {showDailyReminder && (
              <div className="mb-8 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-4 flex items-start justify-between backdrop-blur-md animate-fade-in">
                 <div className="flex gap-4">
                    <div className="bg-orange-500/20 p-2 rounded-lg h-fit text-orange-400">
                      <AlertCircle size={24} />
                    </div>
                    <div>
                      <h3 className="text-orange-200 font-bold font-orbitron text-lg">⚠️ Le Bilan du Jour !</h3>
                      <p className="text-slate-300 text-sm mt-1">
                        Gars, tu n'as rien noté aujourd'hui ? Si tu as dépensé pour le taxi ou le beignet-haricot, note ça vite avant d'oublier !
                      </p>
                    </div>
                 </div>
                 <button 
                    onClick={() => setShowDailyReminder(false)}
                    className="text-slate-500 hover:text-white transition-colors"
                 >
                   <X size={20} />
                 </button>
              </div>
            )}

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Dashboard (2/3 width on LG) */}
                <div className="lg:col-span-2 space-y-8">
                    <Dashboard summary={summary} transactions={transactions} />
                    
                    {/* Goals Section inside Main Dashboard Column */}
                    <GoalList 
                        goals={goals} 
                        onAddFunds={handleAddFundsToGoal} 
                        onDelete={handleDeleteGoal}
                        onOpenAddModal={() => setIsGoalModalOpen(true)}
                    />
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
        
        <AddGoalModal
            isOpen={isGoalModalOpen}
            onClose={() => setIsGoalModalOpen(false)}
            onAdd={handleAddGoal}
        />

        <AIAssistant transactions={transactions} balance={summary.balance} />
    </div>
  );
};

export default App;