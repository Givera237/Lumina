import { Component, ElementRef, AfterViewInit, OnDestroy, OnInit, QueryList, ViewChildren, inject, signal,} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule,Validators,} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { AuthService } from '../auth-service.service';


@Component({
  selector: 'app-mail-verification',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mail-verification.component.html',
  styleUrl: './mail-verification.component.scss'
})
export class MailVerificationComponent 
{
  // Injection du AuthService pour gérer la vérification par mail
  AuthService = inject(AuthService);
  router = inject(Router);

  // Référence aux champs de saisie du code OTP pour gérer le focus et la navigation entre eux
   @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  otpForm = new FormGroup
  ({
    digits: new FormArray(
      Array.from(
        { length: 6 },
        () => new FormControl('', [Validators.required, Validators.pattern(/^[0-9]$/)])
      )
    ),
  });

  // Variables pour gérer l'état du formulaire et le compte à rebours
  isSubmitting = false;
  hasError = false;
  timeLeft = 59;

  // Subscription pour gérer le compte à rebours
  private countdownSub?: Subscription;

  // Signal réactif pour stocker l'email de l'utilisateur (utile pour la vérification par mail)
  email = this.AuthService.email;

  //signal pour afficher le message d'erreur
  errorMessage = signal<string | null>(null);

  // Sécurité : si pas d'email en mémoire, redirection
  constructor() 
  {
    if (!this.email()) {
      this.router.navigate(['/auth/register']);
    }
  }

  get digits(): FormArray 
  {
    return this.otpForm.get('digits') as FormArray;
  }

  // Getter pour afficher le compte à rebours sous forme de chaîne de caractères

  get countdownLabel(): string 
  {
    if (this.timeLeft <= 0) return '';
    const seconds = this.timeLeft < 10 ? `0${this.timeLeft}` : `${this.timeLeft}`;
    return `(0:${seconds})`;
  }

  ngOnInit(): void 
  {
    this.startCountdown();
  }

  
  ngAfterViewInit(): void 
  {
    this.otpInputs.first?.nativeElement.focus();
  }

  ngOnDestroy(): void 
  {
    this.countdownSub?.unsubscribe();
  }

  
  
  startCountdown(): void 
  {
    this.timeLeft = 59;
    this.countdownSub?.unsubscribe();
    this.countdownSub = interval(1000).subscribe(() => {
      if (this.timeLeft <= 0) {
        this.countdownSub?.unsubscribe();
      } else {
        this.timeLeft -= 1;
      }
    });
  }

  // 
  onDigitInput(event: Event, index: number): void 
  {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/[^0-9]/g, '').slice(0, 1);
    this.digits.at(index).setValue(value);
    if (value && index < this.digits.length - 1) {
      this.focusInput(index + 1);
    }
  }

  onKeyDown(event: KeyboardEvent, index: number): void 
  {
    if (event.key === 'Backspace' && !this.digits.at(index).value && index > 0) 
    {
      this.focusInput(index - 1);
    }
  }

  onPaste(event: ClipboardEvent): void 
  {
    event.preventDefault();
    const pasted = event.clipboardData?.getData('text').replace(/[^0-9]/g, '').slice(0, 6) ?? '';
    pasted.split('').forEach((char, i) => this.digits.at(i)?.setValue(char));
    const lastIndex = Math.min(pasted.length, this.digits.length) - 1;
    if (lastIndex >= 0) this.focusInput(lastIndex);
  }

  onSubmit(): void 
  {
    const code = this.digits.value.join('');
    const obj = 
    {
      email : this.email(),
      code : code
    }

    if (code.length === 6 && this.otpForm.valid) 
    {
      this.hasError = false;
      this.isSubmitting = true;

      // TODO: remplacer par l'appel réel à ton service d'authentification
      this.AuthService.verifyMail(obj).subscribe({

        next: (response : any) => 
        {
          console.log('Utilisateur créé avec succès !', response);
          console.log('voici le objet : ', obj);
          this.router.navigate(['/auth/login']);

        }, 

        error: (error : any) => 
        { 
          console.log('voici le obj dans ereur : ', obj);
          console.log('erreur verification mail', error)
          console.log('Voici le message d erreur : ',error.error.error.message)
          this.errorMessage.set(error.error.error.message);
          this.isSubmitting = false; this.triggerError(); 
        }
        
       }); 
    } 
    else 
    {
      this.triggerError();
    }
  }

  onResend(): void {
    if (this.timeLeft > 0) return;
    // TODO: appeler le service pour renvoyer le code
    this.startCountdown();
  }

  private triggerError(): void {
    this.hasError = true;
    setTimeout(() => (this.hasError = false), 500);
  }

  private focusInput(index: number): void {
    this.otpInputs.get(index)?.nativeElement.focus();
  }
}

