import React, { useState, useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Plus, LogOut, Bell, BellOff, Sparkles } from 'lucide-react';
import { Transaction, FinancialSummary, FinancialGoal } from './types';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import AddTransactionModal from './components/AddTransactionModal';
import AddGoalModal from './components/AddGoalModal';
import GoalList from './components/GoalList';
import AIAssistant from './components/AIAssistant';
import { useAuth } from './context/AuthContext';
import AuthScreen from './components/AuthScreen';
import LandingPage from './components/LandingPage';
import { checkAndSendTontineReminders, requestNotificationPermission } from './services/notificationService';

const App: React.FC = () => {
  const { user, logout, isLoading } = useAuth();
  
  // Navigation State for Non-Authenticated Users
  const [showAuth, setShowAuth] = useState(false);

  // App Data State
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [goals, setGoals] = useState<FinancialGoal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // Load Data
  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`kamerflow_transactions_${user.id}`);
      setTransactions(saved ? JSON.parse(saved) : []);
      
      const savedGoals = localStorage.getItem(`kamerflow_goals_${user.id}`);
      setGoals(savedGoals ? JSON.parse(savedGoals) : []);

      const notifPref = localStorage.getItem(`kamerflow_notif_pref_${user.id}`);
      setNotificationsEnabled(notifPref === 'true');
    }
  }, [user]);

  // Notifications Check Logic
  useEffect(() => {
    if (user && notificationsEnabled) {
      checkAndSendTontineReminders(transactions, goals);
    }
  }, [transactions, goals, notificationsEnabled, user]);

  // Save Data
  useEffect(() => {
    if (user) {
      localStorage.setItem(`kamerflow_transactions_${user.id}`, JSON.stringify(transactions));
    }
  }, [transactions, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`kamerflow_goals_${user.id}`, JSON.stringify(goals));
    }
  }, [goals, user]);

  const toggleNotifications = async () => {
    if (!notificationsEnabled) {
      const granted = await requestNotificationPermission();
      if (granted) {
        setNotificationsEnabled(true);
        localStorage.setItem(`kamerflow_notif_pref_${user?.id}`, 'true');
        new Notification("KamerFlow", { body: "Notifications activées ! Je te rappellerai tes échéances de Tontine." });
      } else {
        alert("Notifications refusées par le navigateur.");
      }
    } else {
      setNotificationsEnabled(false);
      localStorage.setItem(`kamerflow_notif_pref_${user?.id}`, 'false');
    }
  };

  const handleAddTransaction = (data: Omit<Transaction, 'id' | 'date'> & { date?: string }) => {
    setTransactions(prev => [{
      id: uuidv4(),
      date: data.date || new Date().toISOString(),
      ...data,
    }, ...prev]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const handleAddGoal = (data: Omit<FinancialGoal, 'id'>) => {
    setGoals(prev => [{ id: uuidv4(), ...data }, ...prev]);
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  const handleAddFundsToGoal = (id: string, amount: number) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, currentAmount: g.currentAmount + amount } : g));
  };

  const summary: FinancialSummary = useMemo(() => {
    const income = transactions.filter(t => t.type === 'INCOME').reduce((acc, t) => acc + t.amount, 0);
    const expense = transactions.filter(t => t.type === 'EXPENSE').reduce((acc, t) => acc + t.amount, 0);
    return { totalIncome: income, totalExpense: expense, balance: income - expense };
  }, [transactions]);

  if (isLoading) return <div className="min-h-screen bg-white flex items-center justify-center text-cyan-600">Chargement...</div>;

  // Navigation Logic
  if (!user) {
    if (!showAuth) {
      return <LandingPage onGetStarted={() => setShowAuth(true)} />;
    }
    return <AuthScreen onBack={() => setShowAuth(false)} />;
  }

  // Authenticated Dashboard
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans selection:bg-cyan-200 selection:text-cyan-900">
        
        {/* Light Theme Background Gradients */}
        <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-100 blur-[100px] opacity-60"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-100 blur-[100px] opacity-60"></div>
             <div className="absolute top-[30%] left-[40%] w-[30%] h-[30%] rounded-full bg-purple-100 blur-[120px] opacity-40"></div>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-8">
            
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl p-4 md:px-8 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-200">
                        <Sparkles size={20} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-orbitron font-bold text-slate-900 tracking-wide">
                            KAMER<span className="text-cyan-600">FLOW</span>
                        </h1>
                        <p className="text-slate-500 text-xs font-medium tracking-widest uppercase">Finance Manager Pro</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                   <div className="hidden md:flex flex-col items-end mr-4">
                        <span className="text-slate-800 font-bold">{user.name}</span>
                        <span className="text-slate-500 text-xs">Compte Premium</span>
                   </div>

                   <button 
                      onClick={toggleNotifications}
                      title={notificationsEnabled ? "Désactiver les rappels" : "Activer les rappels Tontine"}
                      className={`p-3 rounded-xl border transition-all duration-300 ${notificationsEnabled ? 'bg-cyan-50 border-cyan-200 text-cyan-600' : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-white'}`}
                  >
                      {notificationsEnabled ? <Bell size={20} /> : <BellOff size={20} />}
                  </button>

                   <button 
                      onClick={logout}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-400 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all duration-300"
                  >
                      <LogOut size={20} />
                  </button>

                  <button 
                      onClick={() => setIsModalOpen(true)}
                      className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-slate-200 transition-all transform hover:translate-y-[-2px]"
                  >
                      <Plus size={18} strokeWidth={2.5} />
                      <span className="font-rajdhani font-bold tracking-wide">NOUVEAU</span>
                  </button>
                </div>
            </header>

            {/* Main Layout Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                
                {/* Left Column (Dashboard & Goals) */}
                <div className="xl:col-span-8 flex flex-col gap-8">
                    <Dashboard summary={summary} transactions={transactions} />
                    <GoalList 
                        goals={goals} 
                        onAddFunds={handleAddFundsToGoal} 
                        onDelete={handleDeleteGoal}
                        onOpenAddModal={() => setIsGoalModalOpen(true)}
                    />
                </div>

                {/* Right Column (Transactions History) */}
                <div className="xl:col-span-4 h-full">
                    <TransactionList transactions={transactions} onDelete={handleDeleteTransaction} />
                </div>
            </div>
        </div>

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