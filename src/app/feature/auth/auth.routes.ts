// src/app/features/discover/discover.routes.ts
import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = 
[
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent), title: 'Lumina · Connexion',
  },
  {path: 'register', loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent), title: 'Lumina · Inscription'},
  {path: 'mail-verification', loadComponent: () => import('./mail-verification/mail-verification.component').then(m => m.MailVerificationComponent), title: 'Lumina · Vérification de l\'email'},
  {path: 'forgot-password', loadComponent: () => import('./forget-password/forget-password.component').then(m => m.ForgetPasswordComponent), title: 'Lumina · Mot de passe oublié'},
  {path: 'reset-password', loadComponent: () => import('./reset-password/reset-password.component').then(m => m.ResetPasswordComponent), title: 'Lumina · Réinitialisation du mot de passe'},
];