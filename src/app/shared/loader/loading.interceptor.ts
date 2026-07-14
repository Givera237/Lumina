import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from './loading.service';
import { SHOW_FULLSCREEN_LOADER } from './loading-context.token';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  const useOverlay = req.context.get(SHOW_FULLSCREEN_LOADER);

  loadingService.show(useOverlay);

  return next(req).pipe(
    finalize(() => loadingService.hide(useOverlay))
  );
};