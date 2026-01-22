import React from 'react';
import { ArrowRight, Wallet, Users, Sparkles, TrendingUp, ShieldCheck, PieChart, Quote, Star } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-cyan-200 overflow-x-hidden">
      
      {/* --- HERO SECTION (Static) --- */}
      <header className="relative min-h-screen w-full overflow-hidden flex flex-col bg-white">
        
        {/* Grid Background & Abstract Shapes */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none"></div>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
             {/* Gradient Orbs */}
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-cyan-100 blur-[100px] opacity-40 animate-pulse"></div>
            <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-100 blur-[80px] opacity-40"></div>
        </div>

        {/* Navbar */}
        <nav className="relative z-50 flex justify-between items-center px-6 md:px-12 py-6 max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-100">
                    <Sparkles size={16} className="text-white" />
                </div>
                <span className="text-xl font-orbitron font-bold tracking-wide text-slate-900">
                    KAMER<span className="text-cyan-600">FLOW</span>
                </span>
            </div>
            <button 
                onClick={onGetStarted}
                className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-cyan-200 hover:text-cyan-600 font-medium transition-all text-sm shadow-sm"
            >
                Connexion
            </button>
        </nav>

        {/* Hero Content (Centered & Static) */}
        <div className="relative z-30 flex-1 flex flex-col items-center justify-center px-6 text-center pt-10 pb-20">
            
            <div className="max-w-5xl mx-auto flex flex-col items-center justify-center">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 shadow-sm mb-8 hover:scale-105 transition-transform cursor-default">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    <span className="text-xs font-rajdhani font-bold tracking-widest text-slate-600 uppercase">Version 2.0 <span className="text-cyan-600">Live</span></span>
                </div>

                {/* Main Title */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-orbitron font-black leading-tight mb-8 text-slate-900 tracking-tight drop-shadow-sm">
                   Gérez vos Doss<br />
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Comme un Boss.</span>
                </h1>

                {/* Subtitle */}
                <p className="text-slate-500 text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed font-light mb-10">
                    Le futur de la finance personnelle au Cameroun. Suivi intelligent, Tontines digitalisées et Coach IA.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-40">
                    <button 
                        onClick={onGetStarted}
                        className="group relative px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-lg flex items-center gap-3 shadow-xl shadow-slate-200 hover:scale-105 transition-all duration-300 hover:bg-slate-800"
                    >
                        Commencer Gratuitement
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <div className="flex items-center gap-3 px-6 py-4 bg-white/80 backdrop-blur-md rounded-full border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-default">
                            <div className="flex -space-x-3">
                                {[1,2,3].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center overflow-hidden">
                                         <img src={`https://ui-avatars.com/api/?name=User+${i}&background=${i===1?'0D8ABC':i===2?'6d28d9':'10b981'}&color=fff`} alt="User" />
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col items-start">
                                <div className="flex gap-0.5">
                                    {[1,2,3,4,5].map(i => <Star key={i} size={10} className="text-orange-400 fill-orange-400" />)}
                                </div>
                                <span className="text-xs font-bold text-slate-600">+2k Utilisateurs</span>
                            </div>
                    </div>
                </div>

            </div>
        </div>
      </header>

      {/* --- MOCKUP SECTION (Floating) --- */}
      <section className="relative z-40 -mt-24 px-6 mb-24">
         <div className="max-w-6xl mx-auto">
             <div className="bg-white/90 backdrop-blur-2xl border border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] rounded-3xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 relative overflow-hidden animate-float">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"></div>
                
                 {/* Mock Card 1 */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all group hover:-translate-y-1">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-emerald-100 rounded-xl text-emerald-600 group-hover:scale-110 transition-transform">
                            <Wallet size={24} />
                        </div>
                        <span className="text-xs text-slate-400 font-mono font-bold tracking-wider">SOLDE ACTUEL</span>
                    </div>
                    <div className="text-3xl font-rajdhani font-bold text-slate-900">1 250 000 <span className="text-lg text-slate-400">XAF</span></div>
                    <div className="text-xs text-emerald-600 mt-3 flex items-center gap-1 font-medium bg-emerald-50 w-fit px-2.5 py-1.5 rounded-full border border-emerald-100">
                        <TrendingUp size={12} /> +15% ce mois
                    </div>
                </div>

                {/* Mock Card 2 */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all group hover:-translate-y-1">
                     <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-purple-100 rounded-xl text-purple-600 group-hover:scale-110 transition-transform">
                            <Users size={24} />
                        </div>
                        <span className="text-xs text-slate-400 font-mono font-bold tracking-wider">TONTINE "FAMILLE"</span>
                    </div>
                    <div className="flex justify-between items-end mb-2">
                        <div className="text-sm text-slate-600 font-medium">Progression</div>
                        <span className="text-xs text-purple-600 font-bold">70%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-purple-500 h-full w-[70%] rounded-full animate-pulse"></div>
                    </div>
                    <div className="text-xs text-slate-400 mt-4 text-right flex justify-end items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping"></span>
                        Cotisation dans <span className="text-slate-900 font-bold">3 jours</span>
                    </div>
                </div>

                {/* Mock Card 3 */}
                <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700 shadow-lg text-center flex flex-col justify-center items-center relative overflow-hidden group hover:-translate-y-1 transition-all">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500 rounded-full blur-[50px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    
                    <div className="w-14 h-14 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mb-5 shadow-lg shadow-cyan-500/30 relative z-10 group-hover:scale-110 transition-transform">
                        <Sparkles size={28} className="text-white" />
                    </div>
                    <p className="text-sm text-slate-300 italic relative z-10 leading-relaxed">"Grand, tu as dépassé ton budget taxi de 5,000F. Prends le mototaxi demain !"</p>
                    <div className="mt-4 flex items-center gap-2 relative z-10">
                        <div className="h-[1px] w-8 bg-slate-700"></div>
                        <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">Kwat Coach IA</p>
                        <div className="h-[1px] w-8 bg-slate-700"></div>
                    </div>
                </div>
             </div>
         </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-10 border-y border-slate-100 bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <StatItem number="2.5k+" label="Utilisateurs Actifs" />
              <StatItem number="150M" label="FCFA Suivis" />
              <StatItem number="12k" label="Transactions/Mois" />
              <StatItem number="4.8/5" label="Note Moyenne" />
          </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section className="py-24 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto">
             <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-slate-900 mb-4">
                    Comment ça marche ?
                </h2>
                <p className="text-slate-500 max-w-xl mx-auto">Prenez le contrôle de vos finances en 3 étapes simples.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                {/* Connector Line (Desktop) */}
                <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-slate-200 via-cyan-200 to-slate-200 z-0"></div>

                <StepCard 
                    number="01" 
                    title="Créez votre compte" 
                    desc="Inscription rapide en 30 secondes. Pas de carte bancaire requise."
                />
                <StepCard 
                    number="02" 
                    title="Ajoutez vos opérations" 
                    desc="Entrez vos dépenses et revenus (Salaire, Gombo, Taxi...)."
                />
                <StepCard 
                    number="03" 
                    title="Laissez l'IA gérer" 
                    desc="Recevez des analyses et des conseils personnalisés pour épargner."
                />
            </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="py-24 px-6 bg-slate-50 relative overflow-hidden">
         <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,transparent,white,transparent)] pointer-events-none opacity-50"></div>
         
        <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-slate-900 mb-4">
                    Pourquoi choisir <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">KamerFlow</span> ?
                </h2>
                <p className="text-slate-500 max-w-2xl mx-auto">Une application conçue par des Camerounais, pour les réalités du Cameroun.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard 
                    icon={<PieChart size={32} className="text-cyan-600" />}
                    title="Tracking Intelligent"
                    desc="Visualisez où part votre argent avec des graphiques clairs. Fini les 'je ne sais pas où mon salaire est entré'."
                />
                <FeatureCard 
                    icon={<Users size={32} className="text-purple-600" />}
                    title="Gestion Tontine"
                    desc="Un module dédié pour suivre vos cotisations et vos tours de bouffe. Recevez des rappels automatiques."
                />
                <FeatureCard 
                    icon={<ShieldCheck size={32} className="text-emerald-600" />}
                    title="100% Sécurisé"
                    desc="Vos données sont stockées localement sur votre téléphone. Personne ne connaît vos dos à part vous."
                />
            </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                   <h2 className="text-3xl font-orbitron font-bold text-slate-900 mb-4">La parole aux Kwat</h2>
                   <p className="text-slate-500">Ils ont maîtrisé leur budget grâce à KamerFlow.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <TestimonialCard 
                    name="Junior M."
                    role="Entrepreneur à Douala"
                    text="Avant, je mélangeais l'argent du business et l'argent de poche. KamerFlow m'a aidé à séparer les deux. L'IA est trop forte !"
                  />
                  <TestimonialCard 
                    name="Clarisse T."
                    role="Étudiante à Yaoundé"
                    text="Je ne rate plus jamais mes cotisations de tontine. Les rappels m'ont sauvé la vie plusieurs fois."
                  />
                  <TestimonialCard 
                    name="Ibrahim A."
                    role="Commerçant à Garoua"
                    text="Simple, rapide et ça marche sans connexion tout le temps. C'est exactement ce qu'il me fallait."
                  />
              </div>
          </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto bg-slate-900 rounded-[2.5rem] p-12 text-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-600 rounded-full blur-[120px] opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-600 rounded-full blur-[100px] opacity-20"></div>
              
              <div className="relative z-10">
                  <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-white mb-6">Prêt à gérer vos dos ?</h2>
                  <p className="text-slate-300 max-w-2xl mx-auto mb-10 text-lg">Rejoignez la communauté et commencez à épargner intelligemment dès aujourd'hui.</p>
                  <button 
                    onClick={onGetStarted}
                    className="px-10 py-5 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-cyan-50 transition-all shadow-lg hover:shadow-cyan-500/20 hover:scale-105"
                  >
                    Créer mon compte gratuit
                  </button>
                  <p className="text-slate-500 text-sm mt-6">Aucune carte de crédit requise. Gratuit à vie.</p>
              </div>
          </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                    <Sparkles size={14} className="text-white" />
                </div>
                <span className="font-orbitron font-bold text-slate-900 text-xl">KAMER<span className="text-cyan-600">FLOW</span></span>
            </div>
            
            <div className="flex gap-8 text-sm text-slate-500 font-medium">
                <a href="#" className="hover:text-cyan-600 transition-colors">À propos</a>
                <a href="#" className="hover:text-cyan-600 transition-colors">Confidentialité</a>
                <a href="#" className="hover:text-cyan-600 transition-colors">Contact</a>
            </div>

            <p className="text-slate-400 text-sm">© {new Date().getFullYear()} KamerFlow par ARTIK STUDIO.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
    <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 group">
        <div className="mb-6 p-4 bg-slate-50 rounded-2xl w-fit group-hover:bg-slate-100 transition-colors">
            {icon}
        </div>
        <h3 className="text-xl font-rajdhani font-bold mb-3 text-slate-900 group-hover:text-cyan-600 transition-colors">{title}</h3>
        <p className="text-slate-500 leading-relaxed text-sm">{desc}</p>
    </div>
);

const StepCard: React.FC<{ number: string; title: string; desc: string }> = ({ number, title, desc }) => (
    <div className="bg-white p-6 rounded-2xl relative z-10 text-center group hover:-translate-y-2 transition-transform duration-300">
        <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto mb-6 text-xl font-orbitron font-bold text-cyan-600 shadow-sm group-hover:bg-cyan-50 group-hover:border-cyan-100 transition-colors">
            {number}
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
);

const TestimonialCard: React.FC<{ name: string; role: string; text: string }> = ({ name, role, text }) => (
    <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 relative">
        <Quote size={40} className="text-cyan-100 absolute top-6 left-6" />
        <p className="text-slate-600 italic mb-6 relative z-10 text-sm leading-relaxed">"{text}"</p>
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 text-xs">
                {name.charAt(0)}
            </div>
            <div>
                <h4 className="font-bold text-slate-900 text-sm">{name}</h4>
                <p className="text-xs text-slate-400">{role}</p>
            </div>
        </div>
    </div>
);

const StatItem: React.FC<{ number: string; label: string }> = ({ number, label }) => (
    <div className="flex flex-col items-center">
        <span className="text-3xl md:text-4xl font-rajdhani font-bold text-slate-900 mb-1">{number}</span>
        <span className="text-xs text-slate-500 uppercase tracking-widest font-medium">{label}</span>
    </div>
);

export default LandingPage;