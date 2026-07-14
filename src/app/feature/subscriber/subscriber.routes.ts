// src/app/features/discover/discover.routes.ts
import { Routes } from '@angular/router';

export const SUBSCRIBER_ROUTES: Routes = 
[
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'catalogue',
  },
  {
    path: 'subscriptions', loadComponent: () => import('./subscriptions/subscriptions.component').then(m => m.SubscriptionsComponent), title: 'Lumina · Subscriptions',
  },
  {
    path: 'purchases', loadComponent: () => import('./purchases/purchases.component').then(m => m.PurchasesComponent), title: 'Lumina · Purchases',
  },
  {
    path: 'dashboard-subscriber', loadComponent: () => import('./dashboard-subscriber/dashboard-subscriber.component').then(m => m.DashboardSubscriberComponent), title: 'Lumina · Dashboard Subscriber'
  },
 
];