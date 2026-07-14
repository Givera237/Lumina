import { Component, inject } from '@angular/core';
import { LoadingService } from '../loader/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-bar',
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent 
{
    loadingService = inject(LoadingService);

}
