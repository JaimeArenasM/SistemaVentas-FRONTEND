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

  aumentar(): void {
    this.cantidad += 1;
  }

  disminuir(): void {
    if (this.cantidad > 1) {
      this.cantidad -= 1;
    }
  }

  onCantidadInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const valor = Number(input.value);

    if (!Number.isFinite(valor) || valor < 1) {
      this.cantidad = 1;
      return;
    }

    this.cantidad = Math.floor(valor);
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public product: Product,
    private dialogRef: MatDialogRef<ProductDetailModalComponent>
  ) {}


  agregar(): void {
    this.dialogRef.close({
      product: this.product,
      cantidad: this.cantidad
    });
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}