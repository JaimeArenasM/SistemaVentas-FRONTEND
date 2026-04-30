import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router'; // IMPORTAMOS ROUTER
import { Product } from '../../../../Core/Interfaces/IProduct.interface';
import { ProductService } from '../../../../Core/Services/product.service';
import { CarritoService } from '../../../../Core/Services/carrito.service';
import { AuthService } from '../../../../Core/Services/auth.service'; // IMPORTAMOS AUTHSERVICE

@Component({
  selector: 'app-productos-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './productos-page.html',
  styleUrl: './productos-page.css',
})
export class ProductosPage {
  product: Product[] = [];

  filteredProducts: Product[] = [];

  private productService = inject(ProductService);
  private cartService = inject(CarritoService);
  private route = inject(ActivatedRoute);

  // INYECTAMOS LOS NUEVOS SERVICIOS
  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.productService.getProductos().subscribe((data) => {
      this.product = data;

      this.aplicarFiltros();
    });

    this.route.queryParams.subscribe(() => {
      this.aplicarFiltros();
    });
  }

  aplicarFiltros() {
    const params = this.route.snapshot.queryParams;
    const category = params['categoria'];
    const search = params['search']?.toLowerCase() || '';

    let productosFiltrados = this.product;

    if (category && category !== 'Todos') {
      productosFiltrados = productosFiltrados.filter((p) => p.category === category);
    }

    if (search) {
      const normalizarTexto = (texto: string) =>
        texto
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');

      const palabras = normalizarTexto(search)
        .trim()
        .split(' ')
        .filter((p: string) => p !== '');

      productosFiltrados = productosFiltrados.filter((product) => {
        const textoProducto = normalizarTexto(`
              ${product.name}
              ${product.description}
              ${product.category}
            `);

        return palabras.every((palabra: string) => textoProducto.includes(palabra));
      });
    }
    this.filteredProducts = productosFiltrados;
  }

  addToCart(product: Product) {
    const session = this.authService.getSession();

    // 1. Si no hay sesión, lanzamos la alerta y lo mandamos al login
    if (!session) {
      alert('¡Debes iniciar sesión para agregar productos al carrito!');
      this.router.navigate(['/auth/login']);
      return; // Cortamos la función para que NO agregue nada
    }

    // 2. Si sí está logueado, sigue el flujo normal
    this.cartService.addToCart(product);

    alert(
      `${product.name} agregado al carrito 🛒`,
    );
  }
}
