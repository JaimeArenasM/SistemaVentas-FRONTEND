import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../../Core/Interfaces/IProduct.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CloudinaryService } from '../../../Core/Services/cloudinary.service';
import { CategoriaComboboxComponent } from '../categoria-combobox/categoria-combobox';

interface ProductDialogData {
  product?: Product;
  categorias?: string[];
}

@Component({
  selector: 'app-product-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CategoriaComboboxComponent
  ],

  templateUrl: './product-form-dialog.html',
  styleUrls: ['./product-form-dialog.css']
})
export class ProductFormDialog {
  product: Product;
  categorias: string[] = [];

  constructor(
    private dialogRef: MatDialogRef<ProductFormDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ProductDialogData | null,
    private cloudinaryService: CloudinaryService
  ) {
    this.product = data?.product
      ? { ...data.product }
      : {
          id: 0,
          name: '',
          price: 0,
          image: '',
          description: '',
          category: ''
        };

    this.categorias = data?.categorias ?? this.obtenerCategoriasDesdeStorage();
  }

  get opcionesCategorias(): string[] {
    return this.categorias.filter(categoria => categoria !== 'Todos');
  }

  private obtenerCategoriasDesdeStorage(): string[] {
    const productos = JSON.parse(localStorage.getItem('donPepe_products') || '[]') as Product[];
    return Array.from(new Set(productos.map(p => p.category).filter(Boolean))).sort();
  }

  crearNuevaCategoria(nombre: string): void {
    const categoria = nombre.trim();

    if (!categoria) {
      return;
    }

    if (!this.categorias.includes(categoria)) {
      this.categorias.push(categoria);
    }

    this.product.category = categoria;
  }

  selectedFile: File | null = null;
  previewUrl: string | null = null;
  uploading = false;

onFileSelected(event: any) {
  const file = event.target.files[0];

  if (!file) return;

  this.selectedFile = file;
  this.previewUrl = URL.createObjectURL(file);
}

uploadImage() {
 
  if (!this.selectedFile) return;

  this.uploading = true;

  this.cloudinaryService.uploadImage(this.selectedFile).subscribe({

    next: (response) => {

      this.product.image = response.secure_url;
      
      this.uploading = false;

      alert('Imagen subida correctamente');
    },

    error: () => {

      this.uploading = false;

      alert('Error al subir la imagen');

    }

  });

}

  onSave() { this.dialogRef.close(this.product); }
  onCancel() { this.dialogRef.close(null); }
}
