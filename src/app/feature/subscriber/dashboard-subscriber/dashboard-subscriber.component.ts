import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SubscriptionItem {
  name: string;
  badge: 'Pro' | 'Elite' | 'Premium';
  bgClass: string;
}

interface EngagementItem {
  name: string;
  avatarUrl: string;
  hasBorder: boolean;
}

interface TransactionItem {
  date: string;
  initial: string;
  itemTitle: string;
  amount: number;
  status: 'Validé' | 'En attente' | 'Échoué';
  bgClass: string;
  textClass: string;
}

@Component({
  selector: 'app-dashboard-subscriber',
  imports: [CommonModule],
  templateUrl: './dashboard-subscriber.component.html',
  styleUrl: './dashboard-subscriber.component.scss'
})
export class DashboardSubscriberComponent 
{
  // Données de l'utilisateur connecté
  user = {
    name: 'Farnel',
    tokenBalance: 2450,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARsutOJHEuxdVVgQkTNm7p0nSVU6_TyyQb7bQW6IqAjjTtVpQOPC6dQvAeRR0CxK32NB_TN_k1IeP9HNSLsYrBki9Uh1PxE32R4sqtxhKPLI8mzrTVQIlWZisHgCzACMHJIine-XNoVUpxPNCHNqh572ArFQsT7MpuUKbtgjdpKIjMtYk0Ict31VoUpiWRzPN75ZVvQBKV1Zjv-LcLMtNw4IYsGK7kZr3WmnAnNRqGlzPg9PaYazBlAT-eEkRQg0hH5ubzItYh-rc'
  };

  // Statistiques mensuelles
  monthlySpending = 1280;
  spendingChangePercent = -12;

  // Mini-graphique barres d'activité (hauteurs en %)
  chartBars: number[] = [40, 60, 30, 80, 50, 90];

  // Liste des abonnements actifs
  activeSubscriptions: SubscriptionItem[] = [
    { name: 'Clara Design', badge: 'Pro', bgClass: 'bg-surface-dim' },
    { name: 'Studio Horizon', badge: 'Elite', bgClass: 'bg-surface-dim' }
  ];

  // Liste des interactions fréquentes
  engagements: EngagementItem[] = [
    { 
      name: 'Elena M.', 
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0EAs1KrGvml0w42_eHep0arZGjYQLlmL0BxiIJiwpFzqe4gNVugUnw9wqFcs_JKKtMGSLQhd3Y_R1IOjfYY4HP37NPX23G8vqy3xaongmxe_5xd3DyDudoHo5OoTUI42xI65mwsecttxYDvv6ibmqrrqt5oYgwdLRfZ-k-3JkXhERkn2T7tlWcKlcFvxCP5LsDDWPHcIlASu-52Kvw-75onQo0xCAJSLTWFnif04q7uQm9pOUjr7dFyVHNdd8Ox9AosOOi90dYsY',
      hasBorder: true 
    },
    { 
      name: 'Marc V.', 
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJSJWGRdt1mHrB64TP9J_TMPyv4IfInZjjSMepCCk7AQkmeAAa83FkA-Nd0E3zrQRincvR6wFirAj_u4WIU0dAwd9m3K_cBFWKLHrwlDW1dP9swJkug1bucT_-LpdC24L3NMC9sKnW_-SLFBdLQsOZB-cuqZUMtOwrFczOlHzjwADEH0P1p9vmf8pWySzbPoitbPvrJeXzdDp9SPt-ZWxnSHVBZHjogrlcika0JzUmi11AQPvqPdJffkz-NEwZMrK1EH0lvXqHn44',
      hasBorder: false 
    },
    { 
      name: 'Léa Skin', 
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3EEORr3eKTzv48s5Zc8bkSIoyt4Al-B89PDEBdYj6sMw_rlDMsl4Y7VlhjBKVnKJxLx5vr31SsRzSzKib4wAcFLs_zuwMbWAaUOklDCXEmyEI9phLr502vQ236yK0V2O12u51ndprdvyApYR3no3WEAseNWysgiAToL2c4FnQqUJWl9A3t0V3SW7TgU-STc-IftNTBVr5BrHovrJWkJS-fgi0ocgiAoeKU_Nzw4kYCZzcPkpwCge5mdImjXWSVpqhFAPZrsXIMLc',
      hasBorder: true 
    },
    { 
      name: 'Julien G.', 
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNG7sYP0Gat6GzN_V15D3QtAnAoJcEKtp8-wyzUKRQ-a4cFgohGg_2C1qGphgCHnbayXAivXQ9k83HY4ngyXW2RVSZnVQu-fSfbu5YE2sAZONdR2vttljohykeSbLY4kXKM3NeWFbkJq7i12KKHNc6pVLN-EUVn-u09veO5Tamay0pv6ZJ54Js64MzDiN_AW-CYZ5g17SCTUzX97U71UiEaOhwl_35NRXiGR6TUJOdzhX_Z3HQs44fd0xK6l2FGEPnMOvP-VH8fJg',
      hasBorder: false 
    }
  ];

  // Liste des transactions récentes
  transactions: TransactionItem[] = [
    { 
      date: '14 Nov 2026', 
      initial: 'C', 
      itemTitle: 'Clara Design - Galerie Exclusive', 
      amount: 250, 
      status: 'Validé',
      bgClass: 'bg-primary-fixed',
      textClass: 'text-primary-container'
    },
    { 
      date: '12 Nov 2026', 
      initial: 'L', 
      itemTitle: 'Lumina Store - Pack Découverte', 
      amount: 500, 
      status: 'Validé',
      bgClass: 'bg-secondary-fixed',
      textClass: 'text-secondary'
    },
    { 
      date: '10 Nov 2026', 
      initial: 'M', 
      itemTitle: 'Marc V. - Message Privé', 
      amount: 50, 
      status: 'Validé',
      bgClass: 'bg-surface-dim',
      textClass: 'text-on-surface-variant'
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  onRecharge(): void {
    console.log('Ouverture de la passerelle de rechargement des tokens.');
  }

  onDownloadHistory(): void {
    console.log('Génération et téléchargement du rapport de facturation.');
  }

  onLoadMoreTransactions(): void {
    console.log('Chargement des transactions archivées supplémentaires...');
  }

  onViewFavorites(): void {
    console.log('Redirection vers l\'espace complet des créateurs favoris.');
  }
}
