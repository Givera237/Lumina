import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, catchError, filter, finalize, switchMap, take, throwError } from 'rxjs';
import { AuthService } from './auth-service.service';

const PUBLIC_ENDPOINTS = ['/public/auth/login', '/public/auth/register', '/public/auth/refresh'];

// État partagé au niveau module : un interceptor fonctionnel est ré-exécuté à chaque
// requête, donc ces variables doivent vivre en dehors de la fonction pour persister
// l'état d'un refresh en cours entre plusieurs requêtes concurrentes.
let isRefreshing = false;
const refreshedToken$ = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const isPublic = PUBLIC_ENDPOINTS.some((url) => req.url.includes(url));

  const token = authService.getAccessToken();

  const authReq = token && !isPublic
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // On ne tente un refresh que si : 401, endpoint non-public, et un token existait
      // déjà (sinon pas de session à rafraîchir -> juste un vrai 401 "non autorisé")
      if (error.status === 401 && !isPublic && token) {
        // Un refresh est déjà en cours : cette requête attend son résultat au lieu
        // de déclencher son propre appel /refresh en parallèle
        if (isRefreshing) {
          return refreshedToken$.pipe(
            filter((newToken) => newToken !== null),
            take(1),
            switchMap((newToken) => {
              const retriedReq = req.clone({
                setHeaders: { Authorization: `Bearer ${newToken}` },
              });
              return next(retriedReq);
            })
          );
        }

        isRefreshing = true;
        refreshedToken$.next(null);

        return authService.refreshAccessToken().pipe(
          switchMap(({ access_token }) => {
            authService.setTokens(access_token);
            refreshedToken$.next(access_token);

            const retriedReq = req.clone({
              setHeaders: { Authorization: `Bearer ${access_token}` },
            });
            return next(retriedReq);
          }),
          catchError((refreshError) => {
            authService.logout();
            return throwError(() => refreshError);
          }),
          finalize(() => {
            isRefreshing = false;
          })
        );
      }
      return throwError(() => error);
    })
  );
};