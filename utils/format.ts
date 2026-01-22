export const formatFCFA = (amount: number): string => {
  return new Intl.NumberFormat('fr-CM', {
    style: 'currency',
    currency: 'XAF',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('fr-CM', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};
