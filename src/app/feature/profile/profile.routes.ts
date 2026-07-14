// src/app/features/discover/discover.routes.ts
import { Routes } from '@angular/router';

export const PROFILE_ROUTES: Routes = 
[
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'settings',
  },
  {
    path: 'edit', loadComponent: () => import('./edit-profile/edit-profile.component').then(m => m.EditProfileComponent), title: 'Lumina · Connexion',
  },
  {path: 'settings', loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent), title: 'Lumina · Paramètres'},
 
];