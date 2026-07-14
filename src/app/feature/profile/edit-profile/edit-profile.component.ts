import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";

interface CreatorProfile {
  bannerUrl: string;
  avatarUrl: string;
  artistName: string;
  bio: string;
  monthlyPrice: number;
  mainCategory: string;
}

@Component({
  selector: 'app-edit-profile',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent 
{
  // Profil lié au formulaire via ngModel
  profile: CreatorProfile = {
    bannerUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhPhCoMtFQxG9fGcamvFy3OGMdzKalD2XVK1Tfa6zApVclCwBKrHT3mqiXccmFOvHYGeOsHdudzIUJlun-VtADxVN7Bta128gggi9xGx-rW0AudqmCjdRzHo2dHMs7zt0r8zXFUOjvd_uWwYC33_UL7sQr2mBMiQOSjXEK01vXEClcHYDTqyA3jFDyK_56C3qYFv5_ZC2nuPJp2Vyd_GYaIuglChsy-HY0RwIIl9cmiVbB1_23KAcx1mpBRm4bCmpImcLLzH_8Rws',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMnfuV8fLH3gxOUQggGJhdP6ODHhRZfMo22NPC-69usEGsKtPTVwRCVjwXWZXPCs0BUrtTWb0Emu-sVLOHQFt-23dnRkCKppBfpgcYEFwohAAf5oQPkz5cTbOUoIBBIKDcVySdlDwCwQ_jZloL0thvSYNJTaY25260czrwzcjXMxh4E9_q0p4shvsg3zYHLAZjQ0chOiRx4XBz9oFovOJij31Cm27icli3GfwgH35XtCpmdkAT6Ytn0m5Iy3RJbH1S3kqBMhYPxNY',
    artistName: 'Elena Lumina',
    bio: "Artiste visuelle explorant les frontières entre le numérique et l'organique. Créatrice de contenus exclusifs pour les passionnés de design minimaliste et d'esthétique light-luxury.",
    monthlyPrice: 19.99,
    mainCategory: 'Art Numérique'
  };

  // Liste des catégories exploitables
  categories: string[] = ['Art Numérique', 'Photographie', 'Mode & Lifestyle', 'Musique'];

  // États de gestion de l'interface (UI)
  isSaving: boolean = false;
  isSavedSuccess: boolean = false;
  focusedFields: { [key: string]: boolean } = {};

  onFocus(fieldName: string): void {
    this.focusedFields[fieldName] = true;
  }

  onBlur(fieldName: string): void {
    this.focusedFields[fieldName] = false;
  }

  triggerBannerUpload(): void {
    console.log('Déclenchement de l\'upload de la bannière...');
  }

  triggerAvatarUpload(): void {
    console.log('Déclenchement de l\'upload de l\'avatar...');
  }

  onCancel(): void {
    console.log('Annulation des modifications');
    // Logique de réinitialisation ou redirection ici
  }

  onSubmit(): void {
    if (this.isSaving) return;

    this.isSaving = true;
    console.log('Données prêtes à être envoyées à l\'API :', this.profile);

    // Simulation d'une requête HTTP asynchrone
    setTimeout(() => {
      this.isSaving = false;
      this.isSavedSuccess = true;

      setTimeout(() => {
        this.isSavedSuccess = false;
      }, 2000);
    }, 1500);
  }

  navigateToSetting(settingType: string): void {
    console.log(`Navigation vers l'option : ${settingType}`);
  }
}
