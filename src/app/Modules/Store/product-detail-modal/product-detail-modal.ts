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
    if (this.product.stock === 0) {
      this.cantidad = 0;
    }
  }

  aumentar(): void {
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
}
