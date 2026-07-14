import { Component, ElementRef } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-feed',
  imports: [RouterLink],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent 
{
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.el.nativeElement.querySelectorAll('.glass-card').forEach((card: HTMLElement) => {
      card.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });

    this.el.nativeElement.querySelectorAll('.material-symbols-outlined').forEach((icon: HTMLElement) => {
      if (icon.textContent === 'favorite') {
        icon.parentElement?.addEventListener('click', function (this: HTMLElement) {
          const span = this.querySelector('.material-symbols-outlined') as HTMLElement;
          const isFilled = span.style.fontVariationSettings.includes("'FILL' 1");
          span.style.fontVariationSettings = isFilled
            ? "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24"
            : "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24";
          this.classList.toggle('text-secondary');
        });
      }
    });
  }
}
