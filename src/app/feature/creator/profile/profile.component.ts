import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ContentItem {
  id: number;
  title: string;
  description: string;
  type: 'Vidéo' | 'PDF' | 'Audio';
  meta: string; // ex: "12 min" ou "48 pages"
  imageUrl: string;
  isPremium: boolean;
  tokensCost?: number;
  viewsOrDownloads: string;
}

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent 
{
  // Gestion de l'état de l'onglet actif
  activeTab: string = 'Contenus';
  tabs: string[] = ['Contenus', 'À propos', 'Groupes'];

  // Données dynamiques du profil
  creator = {
    name: 'Julian Zen',
    title: 'Wellness Architect',
    subscribers: '12.8k',
    contentsCount: 142,
    views: '1.2M',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDl73CeALzIQTdhpDEdEyPp39ZuwlttfkXUhCrKACw62Q-SZFAqkopHKq6OK0ZC21sWG96OFNCUSbOzm2b_T0_KP0WMEqYHpe16GaQYveKUwMm8lL5vaAc7eOi03eOeOn9utAFmW0AXolXeL6HqmVCP-bwmV_N9QC1CdAWwSJgpYdVq0RDtCFt_yjE_ppYRFhWjEC-X8zjQTosjir4lQ1A6RuHLTNJhDcEHJPzKUXLK71GGc5or5aMHutABe8UBJDabj9YDJTowSLI',
    bannerUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRGEE1-LdBW9OFsePLZneZ6qxjOQCDYmRIw9uY9rPqcCXXfoe-dRSQ9Pd01CX610Fh9VX_zHf2AVW5s8RH5S5XvHSNbAAoZEqlTyKgyxL6xs8oR2Jwkp1YERiXddFAOm9xtk2Gth-t37u1nD24nyAGz8qQHhjW38K9Hw7SZ5OjueRjAo31v6N-S3y6eqjo3tKem9-P124Gmql05olrbMD817dF91vzQ-2sKZAGWhjwVwwe2S6qgq0VGYIXue35Yb-SytvUMVss-FQ',
    isVerified: true,
    subscriptionCost: 50
  };

  // Liste des contenus du créateur
  contents: ContentItem[] = [
    {
      id: 101,
      title: 'Morning Rituals: Architectural Breathwork',
      description: 'Explore the intersection of spatial design and mindful breathing in this exclusive masterclass.',
      type: 'Vidéo',
      meta: '12 min',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmo2fKT9ZDMCU2TBiCyXk969JnUet1ziRAdvN-AQ77RAzAQUAedQHjXAAxGBEssmF-nHmLM-VlH-NqvRBpRdB9TnaVLdUcV-FK8lkYXorwmlb1xcUkQRjzbI88zBgASy3UmolLMzODmDkGXuxV3kV07xQa1QeB9lLYUMOvso4rV2kF9Ivd6E75X6XlbznonWhry5HDQITwmWTGLCR2mENxeN5vo5uPMOcWmxhZNk0W6-B1_2kDv62laSCWJTzFK-Becg7Q3GKIFAM',
      isPremium: true,
      tokensCost: 25,
      viewsOrDownloads: '2.4k'
    },
    {
      id: 102,
      title: 'Introduction to Wellness Architecture',
      description: 'How your physical environment dictates your mental clarity and spiritual growth.',
      type: 'Vidéo',
      meta: '5 min',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfCT5ovtBrhaM8FL5hUb9-wO_ByBZc2oi-AD5LnJ6LoBWZYYKNzx7tonPLbIozgxomaXhULWvB9w8n-9Gtv7uCIwkffWGbqmtkU9mzj3rCF84ATwOGLVnuDWAqKlgjM2pr6dxbYnB16MtHNbC8V4zAHNX_0nxE-gjqAVf_nHS1RQv1lpTau8s5YypIw3X4ghx9EcZPpapMZQSLkuy1P6ROtoIba-pChulmgBqbU2birmRLARXKVXD3najksNYvdHFte1H3TKZBzeM',
      isPremium: false,
      viewsOrDownloads: '15.2k'
    },
    {
      id: 103,
      title: 'The Zen Manifesto: Volume I',
      description: 'A curated digital book exploring the principles of minimalism in the modern home.',
      type: 'PDF',
      meta: '48 pages',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnyjc27DfM9KrRGzj1zw9tAFe7yTtK6UpFKMlp-pWz1NyvWD690lvOSrus4HRGcpAmmbOtumxIqP-sZXRc_MhuHVmT2Eu_3lED_y_UHPRJ5QH-hx-8mGPOkaWHv9OeBdiaYzGnKGUGjVHtbEzKkgCWxajNzoJWLlYWiodoa24HsvhA-_aRT3Vd85XmJ1DpK5fhDAwapTRYW3KsmcfWGxy1diumk8UhJDW0waNXMlJruflWs-bFjNGanQdZJXIbryU8bqriQPkR0YA',
      isPremium: true,
      tokensCost: 25,
      viewsOrDownloads: '842'
    }
  ];

  // Effet Parallaxe sur la bannière au scroll
  parallaxOffset: number = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.parallaxOffset = window.pageYOffset * 0.3;
  }

  ngOnInit(): void {
    // Les micro-interactions d'affichage progressif peuvent être gérées nativement via CSS
  }

  selectTab(tab: string): void {
    this.activeTab = tab;
  }

  onSubscribe(): void {
    console.log(`Abonnement au sanctuaire de ${this.creator.name}`);
  }

  onShare(): void {
    console.log('Partage du profil déclenché');
  }

  onContentClick(item: ContentItem): void {
    if (item.isPremium) {
      console.log(`Débloquer le contenu premium "${item.title}" pour ${item.tokensCost} jetons`);
    } else {
      console.log(`Lecture du contenu gratuit "${item.title}"`);
    }
  }
}
