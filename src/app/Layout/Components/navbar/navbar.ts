import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Angular Material
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { AuthService } from '../../../Core/Services/auth.service';
import { CarritoService } from '../../../Core/Services/carrito.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatBadgeModule
  ],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {

  private router = inject(Router);
  private authService = inject(AuthService);
  private cartService = inject(CarritoService);

  // Variables de estado que pide tu HTML
  mostrarMenuCategorias = false;
  mostrarCarrito = false;
  textoBusqueda = '';

  // Variables del carrito
  cartItems: any[] = [];
  cartCount = 0;
  total = 0;

  ngOnInit() {
    this.actualizarCarritoLocal();
  }

  // --- NAVEGACIÓN ---
  irInicio() {
    this.router.navigate(['/store/catalogo']);
  }

  // --- MENÚ LATERAL CATEGORÍAS ---
  abrirMenuCategorias() { this.mostrarMenuCategorias = true; }
  cerrarMenuCategorias() { this.mostrarMenuCategorias = false; }

  filterByCategory(categoria: string) {
    this.router.navigate(['/store/productos'], { queryParams: { categoria } });
    this.cerrarMenuCategorias();
  }

  // --- BÚSQUEDA DE PRODUCTOS ---
  buscarProducto() {
    if (this.textoBusqueda.trim()) {
      this.router.navigate(['/store/productos'], { queryParams: { search: this.textoBusqueda } });
      this.textoBusqueda = '';
    }
  }

  // --- CARRITO OVERLAY ---
  abrirCarrito() {
    this.actualizarCarritoLocal();
    this.mostrarCarrito = true;
  }

  cerrarCarrito() {
    this.mostrarCarrito = false;
  }

  actualizarCarritoLocal() {
    // Lee el carrito actual del LocalStorage
    this.cartItems = JSON.parse(localStorage.getItem('carrito') || '[]');
    this.cartCount = this.cartItems.length;
    // Suma el precio (asume que la estructura tiene un precio, ajusta si es necesario)
    this.total = this.cartItems.reduce((sum, item) => sum + (item.price || item.product?.price || 0), 0);
  }

  remove(id: number) {
    // Si tu servicio tiene método para borrar, úsalo. Si no, borramos localmente:
    this.cartItems = this.cartItems.filter(item => (item.id || item.product?.id) !== id);
    localStorage.setItem('carrito', JSON.stringify(this.cartItems));
    this.actualizarCarritoLocal();
  }

  irAlCarrito() {
    this.cerrarCarrito();
    this.router.navigate(['/store/checkout']);
  }

  // --- AUTENTICACIÓN ---
  logout() {
    this.authService.logout();
  }

}
