import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
 
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-forget-password',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent 
{
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private route = inject(ActivatedRoute);
 
  // --- État local piloté par signaux ---
  protected readonly isSubmitting = signal(false);
  protected readonly isSuccess = signal(false);
  protected readonly showToast = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  token: string | null = null;

  ngOnInit() 
  {
    // On s'abonne aux queryParams pour intercepter le changement d'URL à tous les coups
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      
      if (this.token) 
      {
        console.log('Token de réinitialisation du mot de passe reçu :', this.token);
        this.verifierTokenAvecLeBackend(this.token);
      }
    });
  }

  verifierTokenAvecLeBackend(token: string) 
  {
    // Votre appel API ici...
  }
 
  protected readonly form = this.fb.nonNullable.group
  ({
    email: ['', [Validators.required, Validators.email]],
  });
 
  protected get emailControl() 
  {
    return this.form.controls.email;
  }
 
  protected onSubmit(): void 
  {
    if (this.form.invalid || this.isSubmitting()) 
    {
      this.form.markAllAsTouched();
      return;
    }
 
    this.errorMessage.set(null);
    this.isSubmitting.set(true);
 
    const email = this.emailControl.value;
 
    this.authService
      .requestPasswordReset(email)
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: (response: any) => 
        {
          console.log('Lien de réinitialisation du mot de passe envoyé avec succès.', email);
          console.log('Réponse du serveur :', response);
          this.isSuccess.set(true);
          this.triggerToast();
        },
        error: (error: any) => 
        {
          console.error("Erreur lors de l'envoi du lien de réinitialisation.", error);
          this.errorMessage.set(
            "Impossible d'envoyer le lien pour le moment. Vérifie ton e-mail et réessaie.",
          );
        },
      });
  }
 
  private triggerToast(): void 
  {
    this.showToast.set(true);
    setTimeout(() => this.showToast.set(false), 3000);
  }
}
