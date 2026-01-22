import { GoogleGenAI } from "@google/genai";
import { Transaction } from '../types';
import { formatFCFA } from '../utils/format';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getFinancialAdvice = async (transactions: Transaction[], balance: number): Promise<string> => {
  try {
    const expenses = transactions.filter(t => t.type === 'EXPENSE');
    
    // Summarize data for the prompt to save tokens
    const expenseSummary = expenses.slice(0, 20).map(t => 
      `- ${t.category}: ${formatFCFA(t.amount)} (${t.description})`
    ).join('\n');

    const prompt = `
      Agis comme "Kwat Finance Coach", un conseiller financier expert pour le contexte camerounais.
      
      Contexte financier actuel :
      - Solde actuel: ${formatFCFA(balance)}
      - Transactions récentes (Dépenses):
      ${expenseSummary}
      
      Instructions:
      1. Analyse les habitudes de dépenses en tenant compte des réalités locales (Tontine, Taxi, Factures Eneo, Coût de la vie).
      2. Donne 3 conseils pratiques et directs, formulés avec un ton légèrement familier mais respectueux (style "Grand frère du kwat").
      3. Sois bref, concis et encourageant.
      4. Si des dépenses semblent élevées (ex: trop de taxi ou de sorties), suggère des alternatives locales.
      
      Format de réponse: Texte brut, formaté avec des puces.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Fast response needed
      }
    });

    return response.text || "Désolé, je n'ai pas pu analyser vos finances pour le moment. Réessayez plus tard.";
  } catch (error) {
    console.error("Error fetching Gemini advice:", error);
    return "Erreur de connexion au coach financier. Vérifiez votre connexion internet.";
  }
};
