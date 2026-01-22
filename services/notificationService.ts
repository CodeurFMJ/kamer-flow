import { Transaction, FinancialGoal } from '../types';

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.log("Ce navigateur ne supporte pas les notifications desktop");
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  const permission = await Notification.requestPermission();
  return permission === 'granted';
};

export const sendLocalNotification = (title: string, body: string) => {
  if (Notification.permission === 'granted') {
    // Vérifier si on a déjà envoyé une notif aujourd'hui pour ne pas spammer
    const lastNotifKey = `kamerflow_last_notif_${title}`;
    const lastNotifDate = localStorage.getItem(lastNotifKey);
    const today = new Date().toDateString();

    if (lastNotifDate === today) {
      return; // Déjà notifié aujourd'hui
    }

    try {
      new Notification(title, {
        body,
        icon: '/vite.svg', // Fallback icon or app icon
        tag: 'kamerflow-reminder'
      });
      localStorage.setItem(lastNotifKey, today);
    } catch (e) {
      console.error("Erreur lors de l'envoi de la notification", e);
    }
  }
};

export const checkAndSendTontineReminders = (
  transactions: Transaction[], 
  goals: FinancialGoal[]
) => {
  // 1. Analyser les transactions passées pour prédire la prochaine cotisation
  // On cherche les dépenses de catégorie "Tontine & Famille" (id: social) ou contenant "Tontine"
  const tontineTransactions = transactions
    .filter(t => t.type === 'EXPENSE' && (t.category === 'Tontine & Famille' || t.description.toLowerCase().includes('tontine')))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (tontineTransactions.length > 0) {
    const lastTontine = tontineTransactions[0];
    const lastDate = new Date(lastTontine.date);
    const now = new Date();
    
    // Calcul de la différence en jours
    const diffTime = Math.abs(now.getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Si cela fait environ un mois (28-30 jours) depuis la dernière cotisation
    if (diffDays >= 28 && diffDays <= 32) {
      sendLocalNotification(
        "📅 Rappel Tontine",
        "Grand(e), ça fait environ un mois depuis ta dernière tontine. N'oublie pas de cotiser pour ne pas gâter ton nom !"
      );
    }
  }

  // 2. Vérifier les objectifs (Cagnottes) liés à la Tontine avec une date limite proche
  const upcomingTontineGoals = goals.filter(g => {
    if (!g.deadline) return false;
    const isTontine = g.name.toLowerCase().includes('tontine') || g.name.toLowerCase().includes('cotisation');
    if (!isTontine) return false;
    
    const deadline = new Date(g.deadline);
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Rappel si l'échéance est dans 3 jours ou moins et que l'objectif n'est pas atteint
    return diffDays > 0 && diffDays <= 3 && g.currentAmount < g.targetAmount;
  });

  upcomingTontineGoals.forEach(goal => {
    sendLocalNotification(
      "⚠️ Échéance Tontine Proche",
      `Le projet "${goal.name}" arrive à échéance dans quelques jours. Complète le montant manquant !`
    );
  });
};