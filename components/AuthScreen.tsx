import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, User, ArrowRight, Wallet, ArrowLeft } from 'lucide-react';

interface AuthScreenProps {
  onBack?: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onBack }) => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const success = login(email, password);
      if (!success) setError('Email ou mot de passe incorrect.');
    } else {
      if (!name) { setError('Le nom est requis.'); return; }
      const success = register(name, email, password);
      if (!success) setError('Cet email est déjà utilisé.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 relative overflow-hidden">
        
      {/* Background Shapes */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-100 blur-[80px] opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-100 blur-[80px] opacity-50 pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-md">
        
        {/* Back Button */}
        {onBack && (
          <button 
            onClick={onBack}
            className="absolute -top-12 left-0 text-slate-500 hover:text-slate-900 flex items-center gap-2 transition-colors font-medium text-sm"
          >
            <ArrowLeft size={16} /> Retour à l'accueil
          </button>
        )}

        <div className="text-center mb-8">
            <h1 className="text-5xl font-orbitron font-black text-slate-900 drop-shadow-sm">
                KAMER<span className="text-cyan-600">FLOW</span>
            </h1>
            <p className="text-slate-500 mt-2 font-rajdhani text-lg">Gère tes dos, sécurise ton futur.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-4 rounded-full shadow-lg shadow-cyan-200">
                <Wallet className="text-white" size={32} />
            </div>
          </div>

          <h2 className="text-2xl font-orbitron text-slate-900 text-center mb-6">
            {isLogin ? 'Connexion' : 'Créer un compte'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-3.5 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Nom complet (ex: Ivan du Kwat)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-slate-900 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  required
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-slate-400" size={20} />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-slate-900 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-slate-400" size={20} />
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-slate-900 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                required
              />
            </div>

            {error && <p className="text-red-600 text-sm text-center bg-red-50 p-2 rounded-lg border border-red-100">{error}</p>}

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-slate-300 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 mt-4"
            >
              <span className="font-orbitron tracking-wider">{isLogin ? 'ENTRER' : "S'INSCRIRE"}</span>
              <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-slate-500 hover:text-slate-800 text-sm underline underline-offset-4 transition-colors"
            >
              {isLogin ? "Pas encore de compte ? Créer un compte" : "Déjà un compte ? Se connecter"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;