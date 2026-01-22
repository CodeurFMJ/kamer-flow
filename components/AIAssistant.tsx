import React, { useState } from 'react';
import { Bot, Sparkles, X } from 'lucide-react';
import { Transaction } from '../types';
import { getFinancialAdvice } from '../services/geminiService';

interface AIAssistantProps {
  transactions: Transaction[];
  balance: number;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ transactions, balance }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);

  const handleGetAdvice = async () => {
    setLoading(true);
    setAdvice(null);
    const result = await getFinancialAdvice(transactions, balance);
    setAdvice(result);
    setLoading(false);
  };

  return (
    <>
      {/* Floating Action Button for AI */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-full shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:scale-105 transition-transform font-bold font-orbitron"
      >
        <Bot size={24} />
        <span className="hidden md:inline">Kwat Coach</span>
      </button>

      {/* AI Modal/Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-slate-900 border border-purple-500/30 rounded-2xl w-full max-w-lg shadow-[0_0_50px_rgba(168,85,247,0.2)] flex flex-col max-h-[80vh]">
            
            <div className="flex justify-between items-center p-6 border-b border-white/10 bg-purple-900/10">
              <div className="flex items-center gap-3">
                <div className="bg-purple-500/20 p-2 rounded-lg text-purple-400">
                    <Sparkles size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-orbitron text-white">Coach Financier</h2>
                    <p className="text-xs text-purple-300">Propulsé par Gemini AI</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 text-slate-200 leading-relaxed space-y-4">
              {!advice && !loading && (
                <div className="text-center py-10">
                  <Bot size={48} className="mx-auto text-purple-500/50 mb-4" />
                  <p className="mb-6 text-slate-400">Clique ci-dessous pour analyser tes dépenses récentes et recevoir des conseils adaptés au Cameroun.</p>
                  <button
                    onClick={handleGetAdvice}
                    className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-bold transition-all"
                  >
                    Analyser mes finances
                  </button>
                </div>
              )}

              {loading && (
                <div className="flex flex-col items-center justify-center py-10 space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                  <p className="text-purple-300 animate-pulse">Le coach réfléchit...</p>
                </div>
              )}

              {advice && (
                <div className="prose prose-invert prose-sm max-w-none">
                    <div className="bg-purple-500/10 border border-purple-500/20 p-4 rounded-xl">
                        <pre className="whitespace-pre-wrap font-sans text-sm">{advice}</pre>
                    </div>
                    <button
                        onClick={handleGetAdvice}
                        className="mt-6 w-full text-center text-purple-400 hover:text-purple-300 text-sm underline"
                    >
                        Demander une nouvelle analyse
                    </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
