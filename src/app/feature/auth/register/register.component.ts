import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth-service.service';
import { Router, RouterLink } from '@angular/router';



@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent 
{
  registerForm!: FormGroup; 

  formBuilder = inject(FormBuilder);
  AuthService = inject(AuthService);

  router = inject(Router);

  
  // Rôle sélectionné à l'inscription
  selectedRole: 'creator' | 'SUBSCRIBER' = 'SUBSCRIBER';

  ngOnInit()
  {
    this.registerForm = this.formBuilder.group
    (
      {
        name: [null,[Validators.required]],
        email: [null,[Validators.required]],
        password: [null,[Validators.required]],
        role: [this.selectedRole],
        googleId: [null],
        avatar: [null],
        tel: [null,[Validators.required]],
      }
    ) ;
   }

  onRegisterSubmit(): void 
  {
    const email = this.registerForm.value.email!;

    this.AuthService.createUser(this.registerForm.value).subscribe(
    {
      next: (response: any) => 
      { 
        this.AuthService.setEmail(email);
        this.router.navigate(['auth/mail-verification']);
      },
      error: (error: any) => 
      {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
      }
    });

  }

 
  setRole(role: 'creator' | 'SUBSCRIBER'): void 
  {
    this.selectedRole = role;
  }
}
