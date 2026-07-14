import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent 
{
  passwordForm!: FormGroup;
  notificationForm!: FormGroup;
  languageForm!: FormGroup;

  // États pour les effets de focus d'Angular (remplace le script vanille)
  activeFocus: { [key: string]: boolean } = {};

  languages = [
    { code: 'FR', label: 'Français (FR)' },
    { code: 'US', label: 'Anglais (US)' },
    { code: 'ES', label: 'Espagnol (ES)' },
    { code: 'DE', label: 'Allemand (DE)' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    });

    this.notificationForm = this.fb.group({
      emailMarketing: [true],
      pushMobile: [false]
    });

    this.languageForm = this.fb.group({
      currentLanguage: ['Français (FR)']
    });
  }

  setFocus(key: string, isFocused: boolean): void {
    this.activeFocus[key] = isFocused;
  }

  onUpdatePassword(): void {
    if (this.passwordForm.valid) {
      console.log('Mot de passe mis à jour :', this.passwordForm.value);
      // Logique API ici
    }
  }

  onDownloadData(): void {
    console.log('Téléchargement des données utilisateur demandé...');
  }

  onDeleteAccount(): void {
    if (confirm('Êtes-vous absolument sûr de vouloir supprimer votre compte IFO-HORIZON ? Cette action est irréversible.')) {
      console.log('Suppression du compte initiée');
    }
  }
}
