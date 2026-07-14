// src/app/features/discover/discover.routes.ts
import { Routes } from '@angular/router';

export const PAYMENT_ROUTES: Routes = 
[
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'token_pack',
  },
  {
    path: 'token_pack', loadComponent: () => import('./token-packs/token-packs.component').then(m => m.TokenPacksComponent), title: 'Lumina · Token Pack',
  },
  {path: 'wallet_dashboard', loadComponent: () => import('./wallet-dashboard/wallet-dashboard.component').then(m => m.WalletDashboardComponent), title: 'Lumina · Wallet Dashboard'},
 
];