import { CategoryItem } from './types';

export const EXPENSE_CATEGORIES: CategoryItem[] = [
  { id: 'food', label: 'Nourriture & Marché', icon: 'Utensils', color: '#f87171' },
  { id: 'transport', label: 'Taxi & Moto', icon: 'Bike', color: '#fb923c' },
  { id: 'housing', label: 'Loyer & Maison', icon: 'Home', color: '#60a5fa' },
  { id: 'utilities', label: 'Eneo & Camwater', icon: 'Zap', color: '#fbbf24' },
  { id: 'social', label: 'Tontine & Famille', icon: 'Users', color: '#a78bfa' },
  { id: 'leisure', label: 'Sorties & Chill', icon: 'PartyPopper', color: '#ec4899' },
  { id: 'health', label: 'Santé & Pharmacie', icon: 'HeartPulse', color: '#34d399' },
  { id: 'other', label: 'Divers', icon: 'MoreHorizontal', color: '#94a3b8' },
];

export const INCOME_CATEGORIES: CategoryItem[] = [
  { id: 'salary', label: 'Salaire', icon: 'Briefcase', color: '#4ade80' },
  { id: 'business', label: 'Business / Gombo', icon: 'TrendingUp', color: '#2dd4bf' },
  { id: 'tontine_benefit', label: 'Bénéfice Tontine', icon: 'PiggyBank', color: '#818cf8' },
  { id: 'gift', label: 'Cadeaux', icon: 'Gift', color: '#f472b6' },
];

// Mock data for initial visualization
export const MOCK_TRANSACTIONS = [
  { id: '1', amount: 150000, type: 'INCOME', category: 'Salaire', description: 'Avance sur salaire', date: new Date().toISOString() },
  { id: '2', amount: 5000, type: 'EXPENSE', category: 'Nourriture & Marché', description: 'DG et Compléments', date: new Date().toISOString() },
  { id: '3', amount: 2000, type: 'EXPENSE', category: 'Taxi & Moto', description: 'Yango course', date: new Date().toISOString() },
  { id: '4', amount: 10000, type: 'EXPENSE', category: 'Eneo & Camwater', description: 'Facture Eneo prépayé', date: new Date().toISOString() },
  { id: '5', amount: 25000, type: 'EXPENSE', category: 'Tontine & Famille', description: 'Cotisation mensuelle', date: new Date().toISOString() },
];
