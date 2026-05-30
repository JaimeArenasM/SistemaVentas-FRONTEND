import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
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
export class Navbar {

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
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = [...items];

      this.cartCount = items.reduce(
        (total, item) => total + item.quantity,
        0
      );

      this.total = Math.round(
        items.reduce(
          (sum, item) => sum + Number(item.product.price) * item.quantity,
          0
        ) * 100
      ) / 100;

      this.cdr.detectChanges();
    });

    this.productService.getProductos().subscribe(data => {
      this.productos = data;
    });
  }

  irInicio(): void {
    this.router.navigate(['/store/catalogo']);
  }

  irPerfil(): void {
    this.router.navigate(['/store/perfil']);
  }

  irMisCompras(): void {
    this.router.navigate(['/store/mis-compras']);
  }

  irLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  irRegistro(): void {
    this.router.navigate(['/auth/register']);
  }

  abrirMenuCategorias(): void {
    this.mostrarMenuCategorias = true;
  }

  cerrarMenuCategorias(): void {
    this.mostrarMenuCategorias = false;
  }

  filterByCategory(categoria: string): void {
    this.router.navigate(['/store/productos'], { queryParams: { categoria } });
    this.cerrarMenuCategorias();
  }

  buscarProducto(): void {
    if (this.textoBusqueda.trim()) {
      this.router.navigate(['/store/productos'], {
        queryParams: { search: this.textoBusqueda }
      });

      this.textoBusqueda = '';
      this.sugerencias = [];
    }
  }

  abrirCarrito(): void {
    this.mostrarCarrito = true;
  }

  cerrarCarrito(): void {
    this.mostrarCarrito = false;
  }

  remove(id: number): void {
    this.cartService.removeFromCart(id);
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
  }

  filtrarSugerencias(): void {
    const texto = this.textoBusqueda.toLowerCase().trim();

    if (!texto) {
      this.sugerencias = [];
      return;
    }

    this.sugerencias = this.productos
      .filter(p => p.name.toLowerCase().includes(texto))
      .slice(0, 5);
  }

  seleccionarProducto(producto: any): void {
    this.textoBusqueda = producto.name;
    this.sugerencias = [];

    this.router.navigate(['/store/productos'], {
      queryParams: { search: producto.name }
    });
  }
}