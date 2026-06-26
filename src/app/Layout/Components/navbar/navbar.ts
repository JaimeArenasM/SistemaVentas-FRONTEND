import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

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
export class Navbar implements OnInit {

  productos: any[] = [];
  sugerencias: any[] = [];

  mostrarMenuCategorias = false;
  mostrarCarrito = false;
  textoBusqueda = '';

  cartItems: any[] = [];
  cartCount = 0;
  total = 0;

  private router = inject(Router);
  private authService = inject(AuthService);
  private cartService = inject(CarritoService);
  private productService = inject(ProductService);

  ngOnInit(): void {
    // Solo cargamos la lista de productos para el buscador
    this.productService.getProductos().subscribe((data: any) => {
      this.productos = data.content ? data.content : data;
    });

    // Validamos si hay sesión para cargar el conteo inicial del carrito
    if (this.session) {
      this.cargarCarritoEnVivo();
    }
  }

  // MÉTODO NUEVO: Consulta a PostgreSQL el estado del carrito
  cargarCarritoEnVivo() {
    this.cartService.obtenerCarrito().subscribe({
      next: (carritoBackend) => {
        if (carritoBackend && carritoBackend.items) {
          this.cartItems = carritoBackend.items;
          this.cartCount = this.cartItems.reduce((total, item) => total + item.cantidad, 0);
          this.total = carritoBackend.total || 0;
        } else {
          this.cartItems = [];
          this.cartCount = 0;
          this.total = 0;
        }
      },
      error: () => console.error("Error cargando carrito en Navbar")
    });
  }

  irInicio(): void { this.router.navigate(['/store/catalogo']); }
  irPerfil(): void { this.router.navigate(['/store/perfil']); }
  irMisCompras(): void { this.router.navigate(['/store/mis-compras']); }
  irLogin(): void { this.router.navigate(['/auth/login']); }
  irRegistro(): void { this.router.navigate(['/auth/register']); }

  abrirMenuCategorias(): void { this.mostrarMenuCategorias = true; }
  cerrarMenuCategorias(): void { this.mostrarMenuCategorias = false; }

  filterByCategory(categoria: string): void {
    this.router.navigate(['/store/productos'], { queryParams: { categoria } });
    this.cerrarMenuCategorias();
  }

  buscarProducto(): void {
    if (this.textoBusqueda.trim()) {
      this.router.navigate(['/store/productos'], { queryParams: { search: this.textoBusqueda } });
      this.textoBusqueda = '';
      this.sugerencias = [];
    }
  }

  abrirCarrito(): void {
    if (this.session) {
      this.cargarCarritoEnVivo(); // Refrescamos los datos al abrir el mini-panel
    }
    this.mostrarCarrito = true;
  }

  cerrarCarrito(): void { this.mostrarCarrito = false; }

  remove(idItem: number): void {
    this.cartService.eliminarItem(idItem).subscribe({
      next: () => {
        this.cargarCarritoEnVivo(); // Recargamos para reflejar que se borró
      }
    });
  }

  irAlCarrito(): void {
    this.cerrarCarrito();
    this.router.navigate(['/store/carrito']);
  }

  get session() {
    return this.authService.getSession();
  }

  logout(): void {
    this.authService.logout();
    this.cartCount = 0; // Reseteamos contador visual
    this.cartItems = [];
  }

  // Corregido: Usamos p.nombre en vez de p.name
  filtrarSugerencias(): void {
    const texto = this.textoBusqueda.toLowerCase().trim();

    if (!texto) {
      this.sugerencias = [];
      return;
    }

    this.sugerencias = this.productos
      .filter(p => p.nombre.toLowerCase().includes(texto))
      .slice(0, 5);
  }

  // Corregido: Usamos producto.nombre
  seleccionarProducto(producto: any): void {
    this.textoBusqueda = producto.nombre;
    this.sugerencias = [];

    this.router.navigate(['/store/productos'], {
      queryParams: { search: producto.nombre }
    });
  }
}
