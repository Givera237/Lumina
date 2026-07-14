import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Conversation, Message } from '../model/message.model';

@Component({
  selector: 'app-chat-window',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent 
{
  // Stockage du texte saisi par l'utilisateur
  newMessageText: string = '';

  // Liste globale des conversations actives
  conversations: Conversation[] = [
    {
      id: 'c1',
      name: 'Elena V.',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtxZxq_6oaQi4KYSVvZbP0HrN_wb2UTNq_ZMDYkvAYPVQfdNFgi5L8CND38lbPPmt-mVY4-4o2xF2_DmhznRUyK6vXSmc0aCug4jqEZfS89WVBW9axJFryuiauagltk-5HvGZX4mNh-mCDEs0vbIAqck1H6UpSfk2zBIw_6nKQ0RYU41IFumhHwdC6bJE_KIbr_vVGaKTcPUoNbSg2R7AhEnTfFKNENHyHq-kedwrugx1xpoVV77_0ujHpngrx-BiTucXD6cWPRGg',
      lastMessage: "The proposal looks exquisite. Let's...",
      time: 'Just now',
      online: true
    },
    {
      id: 'c2',
      name: 'Julian S.',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlwaTgwLpE5ib84I9wipyQZ2dLQfwLGH1VtFxw2jIYJC6ittD0RToOab5fWfSav3FyvVUt9R3muecD43-x2VM9LwFFbnYCwTQLSfb4-9P_x7fgZfjB5qvvqqq3spCL-1DMASLXn68RU7nPaulxi5CkTe2poAsxJve7c4buja8ccvlHFYXeW7eWQfqfzAszcNwgjAON0lxWStsuxd72KBSvE5N-FegssvGSrDqqWPBkzf3Eren8d3SDNWoUHY-hwnMbhUBSqnKlW8w',
      lastMessage: 'Attached the updated portfolio links.',
      time: '14:20',
      online: false
    },
    {
      id: 'c3',
      name: 'Marcus T.',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAva7UACicJFFooFiL6EYXRhuAL6fYNk68jzDicuwgv4UrywyxS-FvLjjldfakANI3aU3AetSHTw0TXpdj8--EGSkinh83qzKJN6vTCpwCzp9cAI7bD50d051PsWDQhyabyAozPzSR0ApPxW0BX_9lO0yXyRKnmLm-_2OV0geqRYPHNl-sWcdjUEKmlitQ0L4WEkJZElD2brs9wTKT67Cw2npsZRzsWYgkuiun69jC4UXp67d4SyoItemzxj-hg9-6gengFS7Cf43A',
      lastMessage: 'Is the venue confirmed for Saturday?',
      time: 'Yesterday',
      online: false
    }
  ];

  // Mock des messages pour la conversation sélectionnée (Elena V.)
  activeMessages: Message[] = [
    {
      senderId: 'them',
      text: "Good morning, Julian. I've had a chance to review the initial curation for the Lumina collection. The direction is impeccable.",
      time: '09:14 AM'
    },
    {
      senderId: 'me',
      text: "Thank you, Elena. I'm pleased to hear that. I believe the soft glassmorphism accents will really resonate with our high-end audience.",
      time: '09:16 AM',
      status: 'Read'
    },
    {
      senderId: 'them',
      text: "Agreed. The effortless prestige we're aiming for is coming through beautifully. When can we expect the final asset delivery?",
      time: '09:17 AM'
    },
    {
      senderId: 'me',
      text: "The design team is finalizing the last few screens as we speak. We'll have everything ready for the walkthrough by 4 PM today.",
      time: '09:20 AM',
      status: 'Sent'
    }
  ];

  // Conversation par défaut sélectionnée au chargement
  selectedConversation!: Conversation;

  ngOnInit(): void {
    this.selectedConversation = this.conversations[0];
  }

  // Sélectionner une autre conversation
  selectConversation(conversation: Conversation): void {
    this.selectedConversation = conversation;
    // Ici, tu pourrais charger les messages spécifiques via un service dédié
  }

  // Envoi d'un message
  sendMessage(): void {
    if (!this.newMessageText.trim()) return;

    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const message: Message = {
      senderId: 'me',
      text: this.newMessageText,
      time: `${formattedTime}`,
      status: 'Sent'
    };

    this.activeMessages.push(message);
    
    // Met à jour l'aperçu du dernier message dans le fil de gauche
    this.selectedConversation.lastMessage = this.newMessageText;
    this.selectedConversation.time = 'Just now';

    this.newMessageText = '';
  }
}
