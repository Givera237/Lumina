import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TokenPack, PaymentMethod } from '../model/token.model';

@Component({
  selector: 'app-token-packs',
  imports: [CommonModule, FormsModule],
  templateUrl: './token-packs.component.html',
  styleUrl: './token-packs.component.scss'
})
export class TokenPacksComponent 
{
  // Configuration des différents packages de jetons disponibles
  tokenPacks: TokenPack[] = [
    {
      id: 'pack-standard',
      name: 'Standard',
      tokens: 500,
      description: 'Perfect for exploring our basic luxury curators.',
      priceXAF: 5000,
      icon: 'toll'
    },
    {
      id: 'pack-popular',
      name: 'Popular',
      tokens: 1200,
      description: 'Access premium concierge services and early drops.',
      priceXAF: 10000,
      icon: 'stars',
      isPopular: true
    },
    {
      id: 'pack-premium',
      name: 'Premium',
      tokens: 3000,
      description: 'Unrestricted access to all luxury assets and VIP events.',
      priceXAF: 25000,
      icon: 'workspace_premium'
    }
  ];

  // Configuration des modes de paiement locaux
  paymentMethods: PaymentMethod[] = [
    {
      id: 'orange-money',
      name: 'Orange Money',
      subtitle: 'Fast & Secure',
      icon: 'smartphone',
      iconColorClass: 'text-[#FF6600]',
      bgColorClass: 'bg-[#FF6600]/10'
    },
    {
      id: 'mtn-momo',
      name: 'MTN MoMo',
      subtitle: 'Mobile Wallet',
      icon: 'payments',
      iconColorClass: 'text-[#8B2AB0]',
      bgColorClass: 'bg-[#FFCC00]/20'
    }
  ];

  // États réactifs de la commande
  selectedPack!: TokenPack;
  selectedPaymentMethodId: string = 'orange-money';

  ngOnInit(): void {
    // Sélection par défaut du pack "Popular" au chargement
    const defaultPack = this.tokenPacks.find(pack => pack.isPopular);
    this.selectedPack = defaultPack ? defaultPack : this.tokenPacks[0];
  }

  // Changer de pack sélectionné
  selectPack(pack: TokenPack): void {
    this.selectedPack = pack;
  }

  // Retour à la page précédente
  goBack(): void {
    window.history.back();
  }

  // Soumission finale de l'achat
  confirmPurchase(): void {
    const selectedMethod = this.paymentMethods.find(m => m.id === this.selectedPaymentMethodId);
    console.log(`Processing purchase of ${this.selectedPack.tokens} tokens via ${selectedMethod?.name} for ${this.selectedPack.priceXAF} XAF.`);
    // Intégrez ici l'appel vers votre service API ou passerelle de paiement (ex: NestJS / API tiers)
  }
}
