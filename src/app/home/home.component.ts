import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

interface ShowcaseCreator {
  name: string;
  role: string;
  followers: string;
  tag: string;
  image: string;
  bgClass: string;
}

interface PricePlan {
  name: string;
  price: string;
  features: string[];
  isRecommended: boolean;
  buttonText: string;
  buttonClass: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent 
{
  @ViewChild('showcaseWrapper') showcaseWrapper!: ElementRef<HTMLDivElement>;

  // État pour l'en-tête (réduction au défilement)
  isScrolled = false;

  // Style dynamique pour le halo lumineux suivant la souris
  glowBackground = 'radial-gradient(circle at 50% 50%, rgba(139, 42, 176, 0.05) 0%, rgba(255, 247, 253, 0) 70%)';

  // Liste des créateurs d'élite pour le carrousel interactif
  creators: ShowcaseCreator[] = [
    {
      name: 'Elara Vance',
      role: 'Photographie & Design Éditorial',
      followers: '24k',
      tag: 'Arts Visuels',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBPiZT8gpDD6kQOKKacRjCO6DAXcBAJembXN_7DbNY1ksOV-h8NIyYb_V_iou75kHPHfsn-r9QJEeCqUzNYD7HMjeMFr20qTQ7G3KFOtmwbGExvtgxFJ7z3xKMdWGwWYkEPcSsARFX2glc8andrCZhkBgmIT8msYO0vS0txs-YJOAqEJVh-eR_StCh8w9u-v4wAN3zdQCUSofJl3K0NYJGNGffKK4CpROtnn9OlkCaJDGbV2HItI4rvt7kgSCF9nhgugbFdUNYG7o',
      bgClass: 'bg-primary'
    },
    {
      name: 'Julian Marc',
      role: 'Consulting & Stratégie Digitale',
      followers: '12k',
      tag: 'Tech Strategy',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvbbPLHaq0madK9rE1DiwJ-n95HYUHjLsnt6W21aHbwKz8yK6Z3hrbEwmsPnJHxCS_LMQWxcOsu8T6uJ_U60KdouERk9Pp32LrAVMaUTo_tkE20VAaoXlMT0SdLzqlkzXQVOnbCMIPs_Rgg8ptFPb_CCT02g7fsGTku9rX4hRkyXXzl3xxO9oLlOi-z1p9vEiImIV9GWyShd47NJMYRQ0RQAqAUDO8Uf5PG_YAguKCg1UM9vtHjP5hVIv97c8KgyJmeYZkDzPLUwk',
      bgClass: 'bg-secondary'
    },
    {
      name: 'Sonia K.',
      role: 'Curateur Mode & Bien-être',
      followers: '45k',
      tag: 'Lifestyle',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWSjX95Yc5uMHkGYUG_1X8V-a3ZJa0sK2jQnhWI4JNYHqJis38agcTAnUoqIUjB-7nWXbFauhRV0o9df0nJX7HtYrCFmm1yyeLK98--sciNcsLwNzld-Bo3JTEs7WU74DtU-xQ7WtjvX-Q7ymlwQbAWgHbKooUa74FEB_NSV6hI2vRHhR_Xwy9Z5SNw0tZG2WodDjOBFIArlqgu6uEB6v4v7_vfj76nYbGcjYMa66emGBIdHEBtOEVmL43uOfr_Gz8vcnf6-4tDUY',
      bgClass: 'bg-primary'
    },
    {
      name: 'Leo Rivers',
      role: 'Production & Composition',
      followers: '31k',
      tag: 'Musique',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVgCrsF0PAKlO-qOxAt4DUcrpMlRX-eL0D7tqKQEvsQly-c16vkwr4uydv47Ifz5ZKob22bQVTcgB99MzlpLAFvpCkCsn3jEB1nxshUln3TDpQvIi_ULV483HTVBxelFcsRgh4L_mNglQrfFkXIX0oY0AJXwfBEmV4udRHF22g-ZfoBRD2Cl1MFvrx3xLq4c5du0g4HyvZLP3uGITPwzoJE7y2b7sIWHxQSoMb52Dgh6m_b0PkXxPGIq79Ev5fgaPeiPBqWc3TNbk',
      bgClass: 'bg-secondary'
    }
  ];

  // Matrice des offres tarifaires
  plans: PricePlan[] = [
    {
      name: 'STARTER',
      price: '€0',
      features: ['Profil public personnalisé', '5% de frais de service', 'Accès Analytics de base'],
      isRecommended: false,
      buttonText: 'Commencer Gratuitement',
      buttonClass: 'border border-outline-variant hover:bg-surface-container'
    },
    {
      name: 'PREMIUM',
      price: '€29',
      features: ['Tout du plan Starter', '0% de frais de service', 'Analytics avancés & Insights', 'Support prioritaire 24/7'],
      isRecommended: true,
      buttonText: 'Devenir Premium',
      buttonClass: 'carmin-gradient text-white shadow-lg active:scale-95'
    },
    {
      name: 'EMPIRE',
      price: '€99',
      features: ['Tout du plan Premium', 'Marque blanche complète', 'API & Intégrations personnalisées', 'Account Manager dédié'],
      isRecommended: false,
      buttonText: 'Contact Sales',
      buttonClass: 'border border-outline-variant hover:bg-surface-container'
    }
  ];

  ngOnInit(): void {}

  // Micro-interaction réactive : le halo suit le curseur sur l'ensemble de la page
  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const x = (event.clientX / window.innerWidth) * 100;
    const y = (event.clientY / window.innerHeight) * 100;
    this.glowBackground = `radial-gradient(circle at ${x}% ${y}%, rgba(139, 42, 176, 0.08) 0%, rgba(255, 247, 253, 0) 60%)`;
  }

  // Écouteur de scroll pour animer la hauteur de la TopNavBar
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 20;
  }

  // Navigation du carrousel horizontal des créateurs
  scrollShowcase(direction: 'left' | 'right'): void {
    const container = this.showcaseWrapper.nativeElement;
    const scrollAmount = 340; // Largeur estimée d'une carte + gutter
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }
}
