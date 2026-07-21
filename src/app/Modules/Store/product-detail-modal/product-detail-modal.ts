import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../../Core/Interfaces/IProduct.interface';

@Component({
  selector: 'app-product-detail-modal',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './product-detail-modal.html',
  styleUrl: './product-detail-modal.css'
})
export class ProductDetailModalComponent {
  cantidad = 1;

  constructor(
    @Inject(MAT_DIALOG_DATA) public product: Product,
    private dialogRef: MatDialogRef<ProductDetailModalComponent>
  ) {
    // Protección adicional: Si un producto llega con stock 0, inicializamos en 0
    if (this.product.stock === 0) {
      this.cantidad = 0;
    }
  }

  aumentar(): void {
    // Validamos que el cliente no pida más de lo que hay en inventario real
    if (this.cantidad < this.product.stock) {
      this.cantidad = this.cantidad + 1;
    }
  }

  disminuir(): void {
    if (this.cantidad > 1) {
      this.cantidad = this.cantidad - 1;
    }
  }

  agregar(): void {
    if (this.cantidad > 0) {
      this.dialogRef.close({
        product: this.product,
        cantidad: this.cantidad
      });
    }
  }

  cerrar(): void {
    this.dialogRef.close();
  }

  // Nueva función para validar la escritura manual en tiempo real
  validarCantidad(event: any): void {
    // Si no hay stock, obligamos a que sea 0
    if (this.product.stock === 0) {
      this.cantidad = 0;
      event.target.value = 0;
      return;
    }

    // Convertimos lo que el usuario escribió a número entero
    let valor = parseInt(event.target.value, 10);

    // Si borran el campo, escriben letras (NaN) o ponen números negativos, lo forzamos a 1
    if (isNaN(valor) || valor < 1) {
      valor = 1;
    }
    // Si intentan comprar más del stock real, lo limitamos al stock máximo
    else if (valor > this.product.stock) {
      valor = this.product.stock;
    }

    // Actualizamos nuestra variable interna y forzamos a la vista a mostrar el número corregido
    this.cantidad = valor;
    event.target.value = this.cantidad;
  }
}
