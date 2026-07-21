import { ChangeDetectionStrategy, Component, computed, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
 
import { AuthService } from '../auth-service.service';

type StrengthLevel = 'empty' | 'weak' | 'medium' | 'strong' | 'excellent';
 
interface StrengthInfo {
  level: StrengthLevel;
  score: number;
  label: string;
  barClass: string;
  textClass: string;
}

@Component({
  selector: 'app-reset-password',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent 
{
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
 
  // --- Token de réinitialisation transmis par e-mail via Signal ---
  private readonly queryParamMap = toSignal(this.route.queryParamMap, { initialValue: null });
  
  // Dérivé réactif pour obtenir facilement le token sous forme de chaîne
  private readonly token = computed(() => this.queryParamMap()?.get('jwt') ?? null);
 
  // --- État local piloté par signaux ---
  protected readonly isCheckingToken = signal(true); // En cours de vérification au chargement
  protected readonly isTokenValid = signal(false);   // Détermine si le formulaire doit s'afficher
  protected readonly isSubmitting = signal(false);
  protected readonly isSuccess = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly showNewPassword = signal(false);
  protected readonly showConfirmPassword = signal(false);
 
  protected readonly form = this.fb.nonNullable.group(
    {
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordsMatchValidator },
  );

  constructor() 
  {
    // On réagit automatiquement dès que le token dans l'URL change
    effect(() => {
      const currentToken = this.token();
      if (currentToken) 
      {
        this.verifierTokenAvecLeBackend(currentToken);
      } 
      else 
      {
        this.isCheckingToken.set(false);
        this.isTokenValid.set(false);
        this.errorMessage.set('Lien de réinitialisation manquant.');

        console.log("test du constructor en sortie")
      }
    });
  }

  private verifierTokenAvecLeBackend(token: string): void {
    this.isCheckingToken.set(true);
    this.errorMessage.set(null);

    this.authService.verifyResetToken(token)
      .pipe(finalize(() => this.isCheckingToken.set(false)))
      .subscribe({
        next: () => {
          console.log('Token de réinitialisation du mot de passe validé avec succès.');
          this.isTokenValid.set(true);
        },
        error: (error) => {
          console.error('Erreur lors de la validation du token :', error);
          this.isTokenValid.set(false);
          this.errorMessage.set('Lien de réinitialisation invalide ou expiré.');
        }
      });
  }

  protected get newPasswordControl() {
    return this.form.controls.newPassword;
  }
 
  protected get confirmPasswordControl() {
    return this.form.controls.confirmPassword;
  }
 
  // --- Indicateur de robustesse du mot de passe ---
  private readonly newPasswordValue = toSignal(this.newPasswordControl.valueChanges, {
    initialValue: '',
  });
 
  protected readonly strength = computed<StrengthInfo>(() => computeStrength(this.newPasswordValue()));
 
  protected toggleNewPasswordVisibility(): void {
    this.showNewPassword.update((v) => !v);
  }
 
  protected toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword.update((v) => !v);
  }
 
  protected onSubmit(): void {
    if (this.form.invalid || this.isSubmitting() || !this.isTokenValid()) {
      this.form.markAllAsTouched();
      return;
    }
 
    const currentToken = this.token();
    if (!currentToken) {
      this.errorMessage.set('Lien de réinitialisation invalide ou expiré.');
      return;
    }
 
    this.errorMessage.set(null);
    this.isSubmitting.set(true);
 
    this.authService
      .resetPassword(currentToken, this.newPasswordControl.value)
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: () => {
          this.isSuccess.set(true);
          setTimeout(() => this.router.navigateByUrl('/auth/login'), 1500);
        },
        error: () => {
          this.errorMessage.set(
            'Impossible de mettre à jour le mot de passe. Le lien a peut-être expiré.',
          );
        },
      });
  }
}
 
/** Validateur au niveau du groupe */
const passwordsMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const newPassword = group.get('newPassword')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
 
  if (!newPassword || !confirmPassword) {
    return null;
  }
 
  return newPassword === confirmPassword ? null : { passwordMismatch: true };
};
 
/** Calcule le niveau de robustesse */
function computeStrength(value: string): StrengthInfo {
  if (!value) {
    return {
      level: 'empty',
      score: 0,
      label: 'Sécurité du mot de passe',
      barClass: 'bg-surface-container',
      textClass: 'text-outline',
    };
  }
 
  let score = 0;
  if (value.length > 5) score++;
  if (value.length > 8) score++;
  if (/[A-Z]/.test(value) && /[0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;
 
  if (score <= 1) {
    return { level: 'weak', score: 1, label: 'Faible', barClass: 'bg-error', textClass: 'text-error' };
  }
  if (score === 2) {
    return { level: 'medium', score: 2, label: 'Moyen', barClass: 'bg-secondary', textClass: 'text-secondary' };
  }
  if (score === 3) {
    return { level: 'strong', score: 3, label: 'Fort', barClass: 'bg-primary-container', textClass: 'text-primary-container' };
  }
  return { level: 'excellent', score: 4, label: 'Excellent', barClass: 'bg-primary', textClass: 'text-primary' };
}