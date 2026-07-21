import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; 

import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth-service.service';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent 
{
  // Injection du service AuthService, du routeur et du FormBuilder
    private AuthService = inject(AuthService);
    private router = inject(Router);
    private formBuilder = inject(FormBuilder);

  // Déclaration du formulaire de connexion
  loginForm!: FormGroup; 

  //signal pour afficher le message d'erreur
  errorMessage = signal<string | null>(null);


 

  ngOnInit()
  {
    this.loginForm = this.formBuilder.group
    (
      {
        email: [null,[Validators.required]],
        password: [null,[Validators.required]],
      }
    ) ;
   }


  onLoginSubmit(): void 
  {
    const obj = this.loginForm.value;

    this.AuthService.login(obj).subscribe(
    {
      next: (response: any) => 
      { 
        this.router.navigate(['discover/feed']);
      },
      error: (error: any) => 
      {
        this.errorMessage.set(error.error.error.message);
      }
    });
  }


}
