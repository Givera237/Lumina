import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


interface MediaPreview {
  file: File;
  url: string;
  type: 'image' | 'video';
}

@Component({
  selector: 'app-upload',
  imports: [CommonModule, FormsModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent 
{
  // États du formulaire
  title: string = '';
  description: string = '';
  pricingType: 'free' | 'subscription' | 'sale' = 'free';
  price: number | null = null;

  // États pour la gestion des fichiers
  isDragActive: boolean = false;
  uploadedMedias: MediaPreview[] = [];
  
  // États UI
  isSubmitting: boolean = false;
  isPublished: boolean = false;

  // Déclenche le sélecteur de fichier masqué
  triggerFileInput(fileInput: HTMLInputElement): void {
    fileInput.click();
  }

  // Traitement du Drag & Drop
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragActive = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragActive = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragActive = false;

    if (event.dataTransfer?.files) {
      this.handleFiles(event.dataTransfer.files);
    }
  }

  // Traitement du clic standard de sélection de fichiers
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(input.files);
    }
  }

  // Génération des aperçus
  private handleFiles(files: FileList): void {
    Array.from(files).forEach(file => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');

      if (isImage || isVideo) {
        const previewUrl = URL.createObjectURL(file);
        this.uploadedMedias.push({
          file: file,
          url: previewUrl,
          type: isImage ? 'image' : 'video'
        });
      }
    });
  }

  // Supprimer un média de la grille de prévisualisation
  removeMedia(index: number, event: Event): void {
    event.stopPropagation();
    // Libération de la mémoire de l'URL créatée
    URL.revokeObjectURL(this.uploadedMedias[index].url);
    this.uploadedMedias.splice(index, 1);
  }

  // Soumission réactive du formulaire
  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.isSubmitting) return;

    this.isSubmitting = true;

    // Simulation de l'appel d'API vers ton backend NestJS / Microservices
    const formData = {
      title: this.title,
      description: this.description,
      pricing: this.pricingType,
      price: this.pricingType === 'sale' ? this.price : 0,
      files: this.uploadedMedias.map(m => m.file)
    };

    console.log('Sending publication data payload:', formData);

    setTimeout(() => {
      this.isSubmitting = false;
      this.isPublished = true;

      // Réinitialisation après le succès
      setTimeout(() => {
        this.isPublished = false;
        this.resetForm();
      }, 2000);
    }, 1500);
  }

  private resetForm(): void {
    this.title = '';
    this.description = '';
    this.pricingType = 'free';
    this.price = null;
    this.uploadedMedias.forEach(m => URL.revokeObjectURL(m.url));
    this.uploadedMedias = [];
  }
}
