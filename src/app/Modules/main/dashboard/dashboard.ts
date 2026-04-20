import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// --- NUEVAS IMPORTANCIONES DE MATERIAL ---
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
// ------------------------------------------

import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    // --- NUEVOS MÓDULOS EN EL ARRAY ---
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatBadgeModule
    // -----------------------------------
  ], 
  templateUrl: './dashboard.html', 
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = []; // <-- NUEVA: Aquí guardamos los productos filtrados
  cartCount = 0;
  selectedCategory: string = 'Todos'; // <-- NUEVA: Categoría seleccionada

  private productService = inject(ProductService);
  private cartService = inject(CartService);

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data; 
      this.filteredProducts = data;
    });

    this.cartService.cartItems$.subscribe(() => {
      this.cartCount = this.cartService.getCartCount();
    });
  }

    // <-- NUEVA FUNCIÓN: Filtra los productos cuando haces clic en una categoría
  filterByCategory(category: string) {
    this.selectedCategory = category;
    if (category === 'Todos') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(p => p.category === category);
    }
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}


