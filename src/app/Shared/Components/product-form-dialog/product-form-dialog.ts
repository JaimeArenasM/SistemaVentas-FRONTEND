import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon'; // <- Importante para los íconos
import { CloudinaryService } from '../../../Core/Services/cloudinary.service';

@Component({
  selector: 'app-product-form-dialog',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatSelectModule, MatIconModule
  ],
  templateUrl: './product-form-dialog.html',
  styleUrls: ['./product-form-dialog.css']
})
export class ProductFormDialog {
  product: any;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  uploading = false;

  // Restauramos las categorías con ID que tu backend exige
  categorias = [
    { id: 1, nombre: 'Cereales' },
    { id: 2, nombre: 'Snacks' },
    { id: 3, nombre: 'Detergentes' },
    { id: 4, nombre: 'Bebidas' },
    { id: 5, nombre: 'Lácteos' },
    { id: 6, nombre: 'Frutas' }
  ];

  constructor(
    private dialogRef: MatDialogRef<ProductFormDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cloudinaryService: CloudinaryService
  ) {
    this.product = data ? { ...data } : {
      nombre: '', precio: null, imagenUrl: '', descripcion: '', stock: null, idCategoria: null
    };
  }

  soloNumerosEnteros(event: KeyboardEvent) {
    if (event.key < '0' || event.key > '9') event.preventDefault();
  }

  soloNumerosYDecimales(event: KeyboardEvent) {
    if (event.key !== '.' && (event.key < '0' || event.key > '9')) event.preventDefault();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.previewUrl = URL.createObjectURL(file);
    }
  }

  uploadImage() {
    if (!this.selectedFile) return;
    this.uploading = true;
    this.cloudinaryService.uploadImage(this.selectedFile).subscribe({
      next: (response: any) => {
        this.product.imagenUrl = response.secure_url;
        this.uploading = false;
        alert('✅ Imagen subida con éxito a la nube');
      },
      error: () => {
        this.uploading = false;
        alert('❌ Error al subir la imagen');
      }
    });
  }

  onSave() { this.dialogRef.close(this.product); }
  onCancel() { this.dialogRef.close(null); }
}
