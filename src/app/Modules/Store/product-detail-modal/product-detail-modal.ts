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

  get stockDisponible(): number {
    return Math.max(1, this.product?.stock ?? 10);
  }

  get puedeDisminuir(): boolean {
    return this.cantidad > 1;
  }

  get puedeAumentar(): boolean {
    return this.cantidad < this.stockDisponible;
  }

  aumentar(): void {
    if (this.cantidad < this.stockDisponible) {
      this.cantidad += 1;
    }
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
      input.value = '1';
      return;
    }

    const cantidadLimitada = Math.min(Math.floor(valor), this.stockDisponible);
    this.cantidad = cantidadLimitada;
    input.value = String(this.cantidad);
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public product: Product,
    private dialogRef: MatDialogRef<ProductDetailModalComponent>
  ) {}

  agregar(): void {
    this.cantidad = Math.min(this.cantidad, this.stockDisponible);
    this.dialogRef.close({
      product: this.product,
      cantidad: this.cantidad
    });
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}