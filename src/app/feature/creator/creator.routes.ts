// src/app/features/discover/discover.routes.ts
import { Routes } from '@angular/router';

export const CREATOR_ROUTES: Routes = 
[
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'catalogue',
  },
  {
    path: 'catalogue', loadComponent: () => import('./catalogue/catalogue.component').then(m => m.CatalogueComponent), title: 'Lumina · Catalogue',
  },
  {
    path: 'dashboard', loadComponent: () => import('./dashboard-creator/dashboard-creator.component').then(m => m.DashboardCreatorComponent), title: 'Lumina · Dashboard'
  },
  {
    path: 'upload', loadComponent: () => import('./upload/upload.component').then(m => m.UploadComponent), title: 'Lumina · Upload'
  },
  {
    path: 'profile', loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent), title: 'Lumina · Profile'
  },

];