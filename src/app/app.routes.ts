import { Routes } from '@angular/router';

export const routes: Routes = 
[
    {path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)},
    {path: 'auth', loadChildren: () => import('./feature/auth/auth.routes').then(m => m.AUTH_ROUTES)}, 
    {path: 'creator', loadChildren: () => import('./feature/creator/creator.routes').then(m => m.CREATOR_ROUTES)},
    {path: 'discover', loadChildren: () => import('./feature/discover/discover.routes').then(m => m.DISCOVER_ROUTES)},
    {path: 'chat', loadChildren: () => import('./feature/chat/chat.routes').then(m => m.CHAT_ROUTES)},
    {path: 'payment', loadChildren: () => import('./feature/payment/payment.routes').then(m => m.PAYMENT_ROUTES)},
    {path: 'subscriber', loadChildren: () => import('./feature/subscriber/subscriber.routes').then(m => m.SUBSCRIBER_ROUTES)},
    {path: 'profile', loadChildren: () => import('./feature/profile/profile.routes').then(m => m.PROFILE_ROUTES)},
];
