import React, { useState } from 'react';
import { Bot, Sparkles, X, Send } from 'lucide-react';
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
      {/* Premium Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 z-40 group flex items-center justify-center w-14 h-14 bg-slate-900 border border-slate-800 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
        <Bot size={28} className="text-white relative z-10" />
      </button>

      {/* Glassmorphism Modal - Light Theme */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg shadow-2xl flex flex-col max-h-[85vh] overflow-hidden animate-scale-in">
            
            {/* Header */}
            <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-md">
                    <Sparkles size={20} className="text-white" />
                </div>
                <div>
                    <h2 className="text-lg font-bold font-rajdhani text-slate-900">Kwat Coach</h2>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">Intelligence Artificielle</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-800 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6 overflow-y-auto flex-1 bg-white">
              {!advice && !loading && (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="bg-cyan-50 p-4 rounded-full mb-4">
                      <Bot size={32} className="text-cyan-600" />
                  </div>
                  <h3 className="text-slate-900 font-bold text-lg mb-2">Besoin d'un conseil ?</h3>
                  <p className="text-slate-500 text-sm mb-8 max-w-[250px]">
                    Je peux analyser tes dépenses et te donner des astuces adaptées au Cameroun.
                  </p>
                  <button
                    onClick={handleGetAdvice}
                    className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
                  >
                    <Sparkles size={16} />
                    Analyser mes finances
                  </button>
                </div>
              )}

              {loading && (
                <div className="h-full flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 border-4 border-cyan-100 border-t-cyan-500 rounded-full animate-spin"></div>
                  <p className="text-cyan-600 text-xs animate-pulse font-mono">ANALYSE EN COURS...</p>
                </div>
              )}

              {advice && (
                <div className="space-y-4">
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-cyan-100 flex-shrink-0 flex items-center justify-center">
                            <Bot size={16} className="text-cyan-700" />
                        </div>
                        <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl rounded-tl-none text-slate-700 text-sm leading-relaxed shadow-sm">
                            <pre className="whitespace-pre-wrap font-sans">{advice}</pre>
                        </div>
                    </div>
                    
                    <div className="flex justify-end">
                         <button
                            onClick={handleGetAdvice}
                            className="text-xs text-cyan-600 hover:text-cyan-800 flex items-center gap-1 mt-2 font-medium"
                        >
                            <Sparkles size={12} /> Nouvelle analyse
                        </button>
                    </div>
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