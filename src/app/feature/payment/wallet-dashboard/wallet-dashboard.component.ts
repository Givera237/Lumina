import { Component } from '@angular/core';
import { TokenPack, PaymentMethod } from '../model/token.model';
import { TokenPacks, PaymentMethods } from '../model/wallet.model';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wallet-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './wallet-dashboard.component.html',
  styleUrl: './wallet-dashboard.component.scss'
})
export class WalletDashboardComponent 
{
  // Solde actuel de l'utilisateur (Dynamique)
  currentBalance: number = 2450;

  // Catalogue des packs de jetons
  tokenPacks: TokenPacks[] = [
    {
      id: 'pack-100',
      tokens: 100,
      label: 'Pack Découverte',
      priceXAF: 1000,
      icon: 'stars'
    },
    {
      id: 'pack-500',
      tokens: 500,
      label: 'Pack Essentiel',
      priceXAF: 4500,
      icon: 'military_tech',
      isPopular: true
    },
    {
      id: 'pack-1500',
      tokens: 1500,
      label: 'Pack Prestige',
      priceXAF: 12000,
      icon: 'diamond'
    }
  ];

  // Configuration des passerelles locales de paiement
  paymentMethods: PaymentMethods[] = [
    {
      id: 'orange',
      name: 'Orange Money',
      subtitle: 'Paiement instantané',
      logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgjjCO4IXh0qR3-oGy7g0xua5uOIsS6ySBPFsEcQ-PYyi8EW_tsNpIwkQwyjOl3R0MPa6lkApfQHx-iezOpyfAD8QDlGF_X2_IyrQHSP3BVNGFdCmkGYAcL7oCPUmju-KjJ4Z-VHPj43VnZ0TCiDUMzd0gvrJL-86dX07Z8gB1nTem7HVAY-6iItzRU1_GlDFk-o14f0E6vDRBqKvSzHcLnrAqjpqxgn4C0_IpHcd0IyrshKmx95Ah8MbK0mWmQFynOHE3XQAPzcY',
      logoAlt: 'Orange Money Logo',
      bgColorClass: 'bg-[#FF6600]/10'
    },
    {
      id: 'mtn',
      name: 'MTN Mobile Money',
      subtitle: 'Paiement sécurisé',
      logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAVTqC7oEvqir7BlpzpJtR4o9rLontgM3PCrPUK-1ICe9IgJWF38dRWAL3RkhK3G-a1AkInEU3PStgs1tME_PQhe8r6YOtU2r1wXVetrRI7pdt7iq9lijyHvhTiMqMr-5ZVAcitbQRb-i5neUkxI9jkNVrIrpQohDZqtgOatD_rMkYBjQzwedA-ApJ36VPE0uXJQ1IsdUO8HgINB-dQbEoSTnnQXSR8jyVYSnAIRmFo9iYbKJDVLztd5_PYE4B-BYtku9GdKsC8do',
      logoAlt: 'MTN MoMo Logo',
      bgColorClass: 'bg-[#FFCC00]/10'
    }
  ];

  // États du formulaire de paiement
  selectedPack!: TokenPacks;
  selectedPaymentMethodId: 'orange' | 'mtn' = 'orange';
  phoneNumber: string = '';

  ngOnInit(): void {
    // Sélectionner automatiquement le pack populaire au démarrage
    const defaultPack = this.tokenPacks.find(p => p.isPopular);
    this.selectedPack = defaultPack ? defaultPack : this.tokenPacks[0];
  }

  // Action de sélection d'un pack
  selectPack(pack: TokenPacks): void {
    this.selectedPack = pack;
  }

  // Traitement et envoi vers le service de paiement (ex: CamPay)
  confirmPurchase(): void {
    if (!this.phoneNumber) {
      alert('Veuillez renseigner votre numéro de téléphone.');
      return;
    }

    const payload = {
      packId: this.selectedPack.id,
      tokens: this.selectedPack.tokens,
      amount: this.selectedPack.priceXAF,
      paymentMethod: this.selectedPaymentMethodId,
      phone: this.phoneNumber
    };

    console.log('Initiating CamPay checkout with payload:', payload);
    // Insère ici l'appel HTTP vers ton backend NestJS / API de paiement
  }
}
