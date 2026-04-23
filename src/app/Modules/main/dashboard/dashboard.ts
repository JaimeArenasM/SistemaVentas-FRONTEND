import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu'; // <--- 1. NUEVA IMPORTACIÓN

import { FormsModule } from '@angular/forms';

import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';

// <--- 2. NUEVAS IMPORTACIONES PARA EL LOGOUT
import { Router } from '@angular/router';
import { AuthSercice } from '../../Auth/Services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatBadgeModule,
    MatMenuModule // <--- 3. AGREGAR AQUÍ
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategory: string = 'Todos';

  cartItems: any[] = [];
  cartCount: number = 0;
  total: number = 0;

  mostrarCarrito: boolean = false;
  metodoPago: string = '';

  private productService = inject(ProductService);
  private cartService = inject(CartService);
  
  // <--- 4. INYECTAR ROUTER Y AUTH
  private router = inject(Router);
  private authService = inject(AuthSercice);

  ngOnInit(): void {

    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
    });

    // Cargar carrito
    const savedCart = localStorage.getItem('carrito');
    if (savedCart) {
      this.cartService['cartItems'].next(JSON.parse(savedCart));
    }

    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.cartCount = items.reduce((t, i) => t + i.quantity, 0);
      this.total = this.cartService.getTotalPrice();

      // Guardar carrito
      localStorage.setItem('carrito', JSON.stringify(items));
    });
  }

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
    alert(`${product.name} agregado al carrito 🛒`);
  }

  remove(id: number) {
    this.cartService.removeFromCart(id);
  }

  abrirCarrito() {
    this.mostrarCarrito = true;
  }

  cerrarCarrito() {
    this.mostrarCarrito = false;
  }

  pagar() {
    if (this.total === 0) {
      alert("Carrito vacío");
      return;
    }

    if (!this.metodoPago) {
      alert("Selecciona un método de pago");
      return;
    }

    alert(`Compra exitosa 🛒\nTotal: S/. ${this.total}\nMétodo: ${this.metodoPago}`);

    this.cartService.clearCart();
    this.metodoPago = '';
    this.cerrarCarrito();
  }

  // <--- 5. LA FUNCIÓN DE CERRAR SESIÓN
  logout() {
    this.authService.logout(); 
    this.router.navigate(['/auth']); 
  }
}