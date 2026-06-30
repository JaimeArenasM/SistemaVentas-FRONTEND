import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

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
    this.product = data ? { ...data } : {
      nombre: '',
      precio: null,
      imagenUrl: '',
      descripcion: '',
      stock: null,
      idCategoria: null
    };
  }

  // --- BLOQUEADORES DE TECLADO ---

  // Para el Stock: Estrictamente números del 0 al 9
  soloNumerosEnteros(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    // Si no es un número (48 al 57), lo bloquea instantáneamente
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  // Para el Precio: Números y un punto decimal
  soloNumerosYDecimales(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    // Permite números (48-57) y el punto (46)
    if (charCode !== 46 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }

  // Nota: Para el nombre del producto NO bloqueamos números,
  // porque puedes tener un producto que se llame "Coca Cola 3 Litros".

  onSave() {
    this.dialogRef.close(this.product);
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}
