import { Component, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CreatorSubscription {
  id: number;
  name: string;
  role: string;
  avatar: string;
  price: number;
  nextRenewal: string;
  isOnline?: boolean;
}

@Component({
  selector: 'app-subscriptions',
  imports: [CommonModule],
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.scss'
})
export class SubscriptionsComponent 
{
  // Simulation d'une source de données réutilisable
  subscriptions: CreatorSubscription[] = [
    {
      id: 33,
      name: 'Elena Vance',
      role: 'Artiste Conceptuelle',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXsO4rGfENi8i5s_jCXMAfwN1f708fOKFCYl5LoQwI3JGRBpRNIml1o096CYMLKwt6TzbqmhEug545TP053EHjNCxNz7Odra-sfwQjnS21-jZSr0RiTkPjoC-EuBWRWmgvkk8X9UQW9ZhUdsO3Bz9tDSOcTHgAl4VxwaeGH4a28gO---xw2SkA6Yt_P3kHsSvS2eY1ZismRivlNhJzgiixj4PWJjRNJ4DqI80r857Ib9I2rdtumObBJAf_G5Tj_Dcnokkr-VX1aK4',
      price: 50,
      nextRenewal: '12 Oct. 2023',
      isOnline: true
    },
    {
      id: 34,
      name: 'Marcus Thorne',
      role: 'Photographe de Mode',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALbaLuSJQldLjn6DNFodRdwZkpNmEtPKDIenhM5qVnyHjeZyXYKEFc849EYxMi-poSlesq7ZcGNUjKiMZV6s9lQ6Cm2GkFLeXVkI5Ny08Bg36MbHMgt-fvEhMO988WKSy71hSWnpjOBHEF0-_YhpSWBn4Mdx1I6TxXRA5LYzO1qi9QG8OvyvmWXhFwamLdtu4WPPrcJG5mRuNo-PTx0WgukDMbfEHMwxgZMnd11zAVsC-lmCXLjEIvEQxAVVmBnzFtZHiMNMRCrgg',
      price: 150,
      nextRenewal: '15 Oct. 2023',
      isOnline: false
    },
    {
      id: 35,
      name: 'Sofia Rossi',
      role: 'Lifestyle & Travel',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrLzG4VQ6G_P-ZOSsw5uwcNoaTHYZu9F2Nh1uLabVmOQ9SQVgRwj4PBEQBWXUiYnyaaV_ff_d_yb_Rt_XI0Ch7y_RiYO5KR6y3hEs39pAuNKdBd5VcdJoCGeQHy_husdGEs3IPhli9n_SRmaPnZn7Qb4wmjquvVTYNiNG5cl-aR0w-SVUqQusiFrxsIythpxGAvEHq2akrUKdY-C6f2FsDiOg5kT3UtSW6kMJTaGwNMjJOEMwCHtSwinAU8PNZp2on3nt3KJaMC5w',
      price: 250,
      nextRenewal: '22 Oct. 2023',
      isOnline: false
    }
  ];

  totalExpense = 450;
  walletBalance = '1,240';

  @ViewChildren('glassCard') glassCards!: QueryList<ElementRef>;

  // Gestion propre de l'effet Spotlight réactif via Angular
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.glassCards) return;

    this.glassCards.forEach((card) => {
      const rect = card.nativeElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      card.nativeElement.style.setProperty('--mouse-x', `${x}px`);
      card.nativeElement.style.setProperty('--mouse-y', `${y}px`);
    });
  }

  manageSubscription(sub: CreatorSubscription): void {
    console.log(`Gestion de l'abonnement pour : ${sub.name}`);
    // Logique d'ouverture de modal ou de redirection
  }

  createPost(): void {
    console.log('Action : Créer un post');
  }
}
