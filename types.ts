export type TransactionType = 'EXPENSE' | 'INCOME';

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  category: string;
  description: string;
  date: string; // ISO date string
}

export interface CategoryItem {
  id: string;
  label: string;
  icon: string;
  color: string;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}
