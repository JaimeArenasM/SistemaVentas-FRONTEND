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
import { ProductService } from '../../../Core/Services/product.service';
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
  private productService = inject(ProductService);

productos: any[] = [];
sugerencias: any[] = [];

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
  this.cartService.cartItems$.subscribe(items => {
    this.cartItems = items;
    this.cartCount = items.reduce((total, item) => total + item.quantity, 0);
    this.total = Math.round(
  items.reduce(
    (sum, item) => sum + (Number(item.product.price) * item.quantity),
    0
  ) * 100
) / 100;
  });
  this.productService.getProductos().subscribe(data => {
    this.productos = data;
  });
}
  

  // --- NAVEGACIÓN ---
  irInicio() {
    this.router.navigate(['/store/catalogo']);
  }

  // ¡AQUÍ ESTÁN LAS FUNCIONES QUE FALTABAN!
  irPerfil() {
    this.router.navigate(['/store/perfil']);
  }

  irMisCompras() {
    this.router.navigate(['/store/mis-compras']);
  }

  // --- NAVEGACIÓN DE AUTENTICACIÓN ---
  irLogin() {
    this.router.navigate(['/auth/login']);
  }

  irRegistro() {
    this.router.navigate(['/auth/register']);
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
  this.cartService.removeFromCart(id);
}

  irAlCarrito() {
    this.cerrarCarrito();
    this.router.navigate(['/store/carrito']);
  }

  get session() {
    return this.authService.getSession();
  }


  // --- AUTENTICACIÓN ---
  logout() {
    this.authService.logout();
  }
  filtrarSugerencias() {
  const texto = this.textoBusqueda.toLowerCase().trim();

  if (!texto) {
    this.sugerencias = [];
    return;
  }

  this.sugerencias = this.productos
    .filter(p => p.name.toLowerCase().includes(texto))
    .slice(0, 5);
}

seleccionarProducto(producto: any) {
  this.textoBusqueda = producto.name;
  this.sugerencias = [];

  this.router.navigate(['/store/productos'], {
    queryParams: { search: producto.name }
  });
}

}
