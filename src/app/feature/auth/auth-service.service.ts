import { inject, Injectable, signal } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from './models/user.model'
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';


interface LoginResponse {
  access_token: string;
  refresh_token?: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

// Réponse attendue après vérification OTP réussie : mêmes champs que LoginResponse,
// puisque le backend connecte directement l'utilisateur après validation du code
type VerifyOtpResponse = LoginResponse;

const ACCESS_TOKEN_KEY = 'lumina_access_token';
const REFRESH_TOKEN_KEY = 'lumina_refresh_token';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  http = inject(HttpClient)
  router = inject(Router)

  baseUrl = environment.apiUrl + '/auth'

  isAuthenticated = signal<boolean>(!!this.getAccessToken());

  private _email = signal<string | null>(null);
  readonly email = this._email.asReadonly();

  setEmail(email: string): void {
    this._email.set(email);
  }

  clear(): void {
    this._email.set(null);
  }

  login( obj: {email: string, password: string}): Observable<LoginResponse> 
  {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/login`, obj)
      .pipe(
        tap((response) => {
          this.setTokens(response.access_token, response.refresh_token);
          this.isAuthenticated.set(true);
        })
      );
  }

  refreshAccessToken(): Observable<{ access_token: string }> {
    const refresh_token = this.getRefreshToken();
    return this.http.post<{ access_token: string }>(`${this.baseUrl}/refresh`, {
      refresh_token,
    });
  }

  setTokens(accessToken: string, refreshToken?: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
  }

  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  createUser(user: User) {
    return this.http.post<User>(this.baseUrl + '/register', user)
  }

  // Vérifie le code OTP ET connecte l'utilisateur si le code est valide :
  // le backend renvoie les tokens comme pour un login classique
  verifyMail(otp: { email: string | null; code: string }): Observable<VerifyOtpResponse> 
  {
    return this.http
      .post<VerifyOtpResponse>(`${this.baseUrl}/verify-otp`, otp)
      .pipe(
        tap((response) => {
          this.setTokens(response.access_token, response.refresh_token);
          this.isAuthenticated.set(true);
          this.clear(); // on nettoie l'email temporaire, plus besoin après connexion
        })
      );
  }

  requestPasswordReset(email : string): Observable<void> 
  {
    console.log(`${this.baseUrl}/forgot-password`, { email });
    return this.http.post<void>(`${this.baseUrl}/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<void> 
  {
    return this.http.post<void>(`${this.baseUrl}/reset-password`, { token, newPassword });
  }

  verifyResetToken(token: string): Observable<any>
  {
    const params = new HttpParams().set('jwt', token);

    console.log(`Vérification du token de réinitialisation du mot de passe : ${token}`);
    console.log(`Requête GET vers : ${this.baseUrl}/validate avec params :`, params.toString());
    return this.http.get<void>(`${this.baseUrl}/validate`, { params });
  }

}