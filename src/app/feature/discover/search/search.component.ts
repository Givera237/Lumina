import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


interface Creator 
{
  id: number;
  name: string;
  role: string;
  tags: string[];
  image: string;
  isPremium: boolean;
  isVerified: boolean;
}

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent 
{
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  searchQuery = '';
  selectedCategory = 'Tous';
  categories = ['Tous', 'Sport', 'Art', 'Cuisine', 'Tech', 'Musique'];
  
  // Simulation de la base de données de créateurs
  allCreators: Creator[] = [
    {
      id: 1,
      name: 'Elena Vost',
      role: 'Artiste Digitale & NFT',
      tags: ['ART', 'TECH'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIbCOIXo1YlfJXnVKKFIDqtblDurCYanNDUOlD-084LyNBCpTN4VIeE-gdxIPMmwaxzdm8K3lDCSkC3FtwiX1NVqw3wCami-_SD9cseKxKyxBhIws0ThmMBNtOiBS0Ocq_ElRhvXz8E5ZPodc6h3jJlSrZewsj1kBxtZzHxff9wEK6sBzcuJiWF5HTFD22h7wVOvp8JGdbrgApOXqXtOuSFGTo2wxVi0cdLu1elEPnIRgFhMb3HvSIwFPKRL10TyQ1jbnpuNGLtr4',
      isPremium: true,
      isVerified: true
    },
    {
      id: 2,
      name: 'Julian Mars',
      role: 'Performance & Bien-être',
      tags: ['SPORT', 'LIFE'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjBq2BvmaZWXuwERFJ8wL-XZxGv6TGvNG7Kfjb1gBZB-JyziZpeO4G2J5Ayo4_CJncb1L3Sg8djsZhS15Us1Ij3FHmbOoej-BRvHTbMQVDZoViCSfvxvo98D7xhLpbA-dVpIeQBw25KF6-owb9aWMi7MO_K-9PtNVFqBSTpaCa4kZ_SsGuF8FGHYErD-5TS-0phj2fZ3KOlsi8Ne3tathSLBbg5-Yu-PcJlmlzSqnnUIrladR0vdYUteH1vBWF-9fy0DjhPWqA6ao',
      isPremium: false,
      isVerified: false
    },
    {
      id: 3,
      name: 'Chef Amélie',
      role: 'Gastronomie Moderne',
      tags: ['CUISINE', 'BIO'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKrQbLrHkVpz0xInnLCaBAWFrpceZmgxC0JX4lHeNm8XCU99qLpOxoitMt-fjKM0OtvTQ6URFVEN7_81l1YNFfsZPC3l4cwRb4G3faia4jNIe9uxtWJzfz2x9qo_l-oVZ4jKpKudJbR9eBbim1s7ua4suhsK0BfEZgj5LGF6ofHqaH4v0D7VHivgf9gcK97ltqpKJcVsf22pS1fxdJfke9iOvZ3fj3n2sr9bNAW-zWykQKDln68-SNeOB58cNElI2VdOW577eMuUo',
      isPremium: false,
      isVerified: true
    }
  ];

  filteredCreators: Creator[] = [];
  isSearchFocused = false;

  ngOnInit(): void {
    this.filterCreators();
  }

  // Écouteur global pour le raccourci clavier ⌘ K / Ctrl K
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.searchInput.nativeElement.focus();
    }
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.filterCreators();
  }

  onSearchChange(): void {
    this.filterCreators();
  }

  filterCreators(): void {
    this.filteredCreators = this.allCreators.filter(creator => {
      const matchesSearch = creator.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            creator.role.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesCategory = this.selectedCategory === 'Tous' || 
                              creator.tags.some(tag => tag.toLowerCase() === this.selectedCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.filterCreators();
    this.searchInput.nativeElement.focus();
  }
}
