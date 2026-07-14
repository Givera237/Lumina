// src/app/features/discover/discover.routes.ts
import { Routes } from '@angular/router';

export const CHAT_ROUTES: Routes = 
[
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
  {
    path: 'chat', loadComponent: () => import('./chat-window/chat-window.component').then(m => m.ChatWindowComponent), title: 'Lumina · Chat',
  },
  {path: 'list', loadComponent: () => import('./conversation-list/conversation-list.component').then(m => m.ConversationListComponent), title: 'Lumina · Conversation'},
 
];