import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, User, ArrowRight, Wallet } from 'lucide-react';

const AuthScreen: React.FC = () => {
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
    <div className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1535868463750-c78d9543614f?q=80&w=2076&auto=format&fit=crop')] bg-cover bg-center px-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm"></div>
      
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
            <h1 className="text-5xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                KAMER<span className="text-white">FLOW</span>
            </h1>
            <p className="text-slate-400 mt-2 font-rajdhani text-lg">Gère tes dos, sécurise ton futur.</p>
        </div>

        <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-8 shadow-[0_0_50px_rgba(168,85,247,0.15)] backdrop-blur-xl">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-cyan-500 to-purple-600 p-4 rounded-full shadow-lg">
                <Wallet className="text-white" size={32} />
            </div>
          </div>

          <h2 className="text-2xl font-orbitron text-white text-center mb-6">
            {isLogin ? 'Connexion' : 'Créer un compte'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-3.5 text-slate-500" size={20} />
                <input
                  type="text"
                  placeholder="Nom complet (ex: Ivan du Kwat)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
                  required
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-slate-500" size={20} />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-slate-500" size={20} />
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
                required
              />
            </div>

            {error && <p className="text-red-400 text-sm text-center bg-red-500/10 p-2 rounded-lg">{error}</p>}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold py-3.5 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 mt-4"
            >
              <span className="font-orbitron tracking-wider">{isLogin ? 'ENTRER' : "S'INSCRIRE"}</span>
              <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-slate-400 hover:text-white text-sm underline underline-offset-4 transition-colors"
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
