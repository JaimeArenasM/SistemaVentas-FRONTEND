import { Component } from '@angular/core';
import { Product } from '../../../Shared/Models/product.model';

@Component({
  selector: 'app-gestion-productos-page',
  templateUrl: './gestion-productos-page.html',
  styleUrls: ['./gestion-productos-page.css']
})
export class GestionProductosPage {
  products: Product[] = [
    { id: 1, name: 'Laptop', price: 2500, image: 'laptop.png', description: 'Laptop gamer', category: 'Tecnología' },
    { id: 2, name: 'Mouse', price: 50, image: 'mouse.png', description: 'Mouse inalámbrico', category: 'Accesorios' }
  ];

  newProduct: Product = { id: 0, name: '', price: 0, image: '', description: '', category: '' };

  addProduct() {
    this.newProduct.id = this.products.length + 1;
    this.products.push({ ...this.newProduct });
    this.newProduct = { id: 0, name: '', price: 0, image: '', description: '', category: '' };
  }

  editProduct(product: Product) {
    this.newProduct = { ...product };
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
  }
}
