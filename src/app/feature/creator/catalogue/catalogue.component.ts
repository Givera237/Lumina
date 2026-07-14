import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CatalogItem {
  id: number;
  thumbnail: string;
  title: string;
  category: string;
  type: 'Payant' | 'Gratuit';
  views: number;
  tokens: number | null;
  date: string;
}

@Component({
  selector: 'app-catalogue',
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.scss'
})
export class CatalogueComponent 
{
  searchQuery: string = '';
  totalContents: number = 24;

  // Modèle de données typé et dynamique
  catalogItems: CatalogItem[] = [
    {
      id: 1,
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3dgiZ9t7mQ4OaEjJ4ERq3lhvJKxyxKtiHlrab3FDweyHlTuWg810LcHSCo-COyvCCA9k2VuvKXCi92AQKPeOpiIXYlJRtBxJCktFxMh_MX46T4o5adquV8AtcnhoUhD1X5THQvLlkf84DdbYYOJfXkYKsPIgXoLT0PXeumxZCnORsLfoF6AJX2-TYbc0DT2gTxDUwYPu00AFVwK_apN0w0Lt97ISjZL0wPyCD0J0L34RlIPuQMhygUWRf7GElnv8ZmgnaYsw_wgU',
      title: 'Éclats de Lumière : Session Vol. I',
      category: 'Série Art Numérique',
      type: 'Payant',
      views: 12402,
      tokens: 4250,
      date: '12 Oct 2024'
    },
    {
      id: 2,
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZNlQY7KSxrVZnr0Ci3zbkCQRxH0fEANsnMeV0mLA_3u-zypRzwSP4PslsFOC295S_H-O0cqoXirez9EO3FbQCOvZqiK5oYNuqCAidMomsGHJ6i1h-FzlaiNcbEVWiovzYY0TVCSs9klwmLld7TFR9lM6Hnt9lafH5hQYczh79pH-GKzcd14YVHSEwjCWBcEsZ56TOFYaNnC9bwio8eQiw5N48dJtoKQ5XXCTnrPem5vulutsHHLay-lvua5tCtoACQdhiRyJBPDQ',
      title: 'Minimalisme Architectural',
      category: 'Portfolio Photographie',
      type: 'Gratuit',
      views: 34115,
      tokens: null,
      date: '08 Oct 2024'
    },
    {
      id: 3,
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyF2IqRwpSJWp8smtRqyWz0h9Q_g-3XuOLoO4xlKCthWyuTwjbRT9a0H8WPEthN_zmIhFhg-54QhLjD8EzK3nekjfl6Hrr30y1DVSECEpmIDiK2DRtHbCruhxsmrs6J2cmpQ0dpbXsKOOFqZD0ATAMiX2Z0nYfH2QTRR0JVFgZItbm0DR8HvfdCaWn9OzUpum4aZc1gSLx9_Nc12x-jwDRBTSQ4Gp0BeuLlEqM8T0POsPGBF4BBtR1rM87lJbhVYbPBKUFpdUtPI4',
      title: 'Velours et Rosée',
      category: 'Série Macro',
      type: 'Payant',
      views: 8920,
      tokens: 12800,
      date: '01 Oct 2024'
    },
    {
      id: 4,
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2WqPWCq1I0cLutJ3At8borVRhZCpD0imMK-gvaFlT5pqZL757b2XIkKQyOndr0SBwhUXbXnCvR_sNvARUUatloRF2KVHziXDDVJOzOq5rOsbY9PWBOYSDZhFpQAUpirRJOExcqzAB5KnLLmVqhQJgppwAAS2yd8bF4aX59o9MxYO4skkNOETWGvMAOg52Ek_nz3Gyp0uspOUhNCbQ5xRHeXLsiYq7NbXW-tljDBd2fTZn699ZtX6BRwo3_JfHQzWRqjz6prQ5VR0',
      title: "L'Heure Bleue",
      category: 'Vidéo Loop 4K',
      type: 'Payant',
      views: 102400,
      tokens: 85200,
      date: '22 Sep 2024'
    }
  ];

  onCreatePost(): void {
    console.log('Création d\'un nouveau post...');
  }

  onSearchChange(): void {
    console.log('Recherche en cours pour :', this.searchQuery);
    // Filtrage ou appel API ici
  }

  onFilter(): void {
    console.log('Ouverture des filtres');
  }

  onEditPrice(item: CatalogItem, event: Event): void {
    event.stopPropagation();
    console.log(`Modifier le prix de : ${item.title}`);
  }

  onArchive(item: CatalogItem, event: Event): void {
    event.stopPropagation();
    console.log(`Archiver l'item : ${item.title}`);
  }

  onDelete(item: CatalogItem, event: Event): void {
    event.stopPropagation();
    console.log(`Supprimer/Dépublier l'item : ${item.title}`);
  }
}
