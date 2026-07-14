import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dashboard-creator',
  imports: [],
  templateUrl: './dashboard-creator.component.html',
  styleUrl: './dashboard-creator.component.scss'
})
export class DashboardCreatorComponent 
{
   constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    // Animate bar charts on entrance
    const bars = this.el.nativeElement.querySelectorAll('.chart-bar') as NodeListOf<HTMLElement>;
    bars.forEach((bar: HTMLElement, index: number) => {
      const targetHeight = bar.style.height;
      bar.style.height = '0%';
      setTimeout(() => {
        bar.style.height = targetHeight;
      }, 200 * index);
    });

    // Smooth fade for glass cards on scroll
    const cards = this.el.nativeElement.querySelectorAll('.glass-card') as NodeListOf<HTMLElement>;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach((card: HTMLElement) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      observer.observe(card);
    });
  }
}
