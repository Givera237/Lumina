import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth-service.service';
import { Router, RouterLink } from '@angular/router';



@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
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
    console.log(this.registerForm.value);
    const email = this.registerForm.value.email!;

    this.AuthService.createUser(this.registerForm.value).subscribe(
    {
      next: (response: any) => 
      { 
        this.AuthService.setEmail(email);
        console.log('Utilisateur créé avec succès !', response);
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
    console.log(`Rôle sélectionné : ${this.selectedRole}`);
  }
}
