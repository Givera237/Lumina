import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private barRequestCount = 0;
  private overlayRequestCount = 0;

  isBarLoading = signal<boolean>(false);
  isOverlayLoading = signal<boolean>(false);

  show(useOverlay: boolean): void {
    if (useOverlay) {
      this.overlayRequestCount++;
      this.isOverlayLoading.set(true);
    } else {
      this.barRequestCount++;
      this.isBarLoading.set(true);
    }
  }

  hide(useOverlay: boolean): void {
    if (useOverlay) {
      this.overlayRequestCount = Math.max(0, this.overlayRequestCount - 1);
      if (this.overlayRequestCount === 0) this.isOverlayLoading.set(false);
    } else {
      this.barRequestCount = Math.max(0, this.barRequestCount - 1);
      if (this.barRequestCount === 0) this.isBarLoading.set(false);
    }
  }
}