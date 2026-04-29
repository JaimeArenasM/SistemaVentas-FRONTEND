import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../Core/Interfaces/IProduct.interface';
import { ProductConfirmDialog } from '../../../Shared/Components/product-confirm-dialog/product-confirm-dialog.ts';
import { ProductFormDialog } from '../../../Shared/Components/product-form-dialog/product-form-dialog.ts';

@Component({
  selector: 'app-gestion-productos-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductConfirmDialog, ProductFormDialog],
  templateUrl: './gestion-productos-page.html',
  styleUrls: ['./gestion-productos-page.css']
})
export class GestionProductosPage {
  products: Product[] = [];
  selectedProduct: Product | null = null;
  showConfirmDialog = false;
  showFormDialog = false;

  openNewProductForm() {
    this.selectedProduct = { id: 0, name: '', price: 0, image: '', description: '', category: '' };
    this.showFormDialog = true;
  }

  openEditProductForm(product: Product) {
    this.selectedProduct = { ...product };
    this.showFormDialog = true;
  }

  saveProduct(product: Product) {
    if (product.id === 0) {
      product.id = this.products.length + 1;
      this.products.push(product);
    } else {
      const index = this.products.findIndex(p => p.id === product.id);
      if (index !== -1) this.products[index] = product;
    }
    this.showFormDialog = false;
  }

  cancelForm() {
    this.showFormDialog = false;
  }

  confirmDelete(product: Product) {
    this.selectedProduct = product;
    this.showConfirmDialog = true;
  }

  deleteProduct(confirm: boolean) {
    if (confirm && this.selectedProduct) {
      this.products = this.products.filter(p => p.id !== this.selectedProduct!.id);
    }
    this.showConfirmDialog = false;
  }
}
