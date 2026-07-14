// src/app/features/discover/discover.routes.ts
import { Routes } from '@angular/router';

export const DISCOVER_ROUTES: Routes = 
[
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'feed',
  },
  {
    path: 'feed', loadComponent: () => import('./feed/feed.component').then(m => m.FeedComponent), title: 'Lumina · Fil d\'actualité',
  },
  {
    path: 'search', loadComponent: () => import('./search/search.component').then(m => m.SearchComponent), title: 'Lumina · Recherche'
  },
  {
    path: 'creator', loadComponent: () => import('./creator-list/creator-list.component').then(m => m.CreatorListComponent), title: 'Lumina · Créateurs'
  },
 
];