import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; // Importante para el desplegable

@Component({
  selector: 'app-product-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './product-form-dialog.html',
  styleUrls: ['./product-form-dialog.css']
})
export class ProductFormDialog {
  product: any;

  // Mapeo de categorías con sus IDs para la base de datos
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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Inicializamos con el nuevo formato
    this.product = data ? { ...data } : {
      idProducto: 0,
      nombre: '',
      precio: null,
      imagenUrl: '',
      descripcion: '',
      stock: null,
      idCategoria: null
    };
  }

  onSave() {
    this.dialogRef.close(this.product);
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}
