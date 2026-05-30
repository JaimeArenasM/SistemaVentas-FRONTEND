import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../../../../Core/Interfaces/IProduct.interface';
import { ProductService } from '../../../../Core/Services/product.service';
import { CarritoService } from '../../../../Core/Services/carrito.service';
import { AuthService } from '../../../../Core/Services/auth.service';

import { ProductDetailModalComponent } from '../../product-detail-modal/product-detail-modal';

@Component({
  selector: 'app-productos-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './productos-page.html',
  styleUrl: './productos-page.css',
})
export class ProductosPage {

  product: Product[] = [];
  filteredProducts: Product[] = [];

  private productService = inject(ProductService);
  private cartService = inject(CarritoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.productService.getProductos().subscribe((data) => {
      this.product = data;
      this.aplicarFiltros();
    });

    this.route.queryParams.subscribe(() => {
      this.aplicarFiltros();
    });
  }

  aplicarFiltros(): void {
    const params = this.route.snapshot.queryParams;
    const category = params['categoria'];
    const search = params['search']?.toLowerCase() || '';

    let productosFiltrados = this.product;

    if (category && category !== 'Todos') {
      productosFiltrados = productosFiltrados.filter(
        (p) => p.category === category
      );
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

        return palabras.every((palabra: string) =>
          textoProducto.includes(palabra)
        );
      });
    }

    this.filteredProducts = productosFiltrados;
  }

  abrirModal(product: Product): void {
    const dialogRef = this.dialog.open(ProductDetailModalComponent, {
      width: '900px',
      maxWidth: '95vw',
      data: product
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addToCart(result.product, result.cantidad);
      }
    });
  }

  addToCart(product: Product, cantidad: number = 1): void {
    const session = this.authService.getSession();

    if (!session) {
      alert('¡Debes iniciar sesión para agregar productos al carrito!');
      this.router.navigate(['/auth/login']);
      return;
    }

    for (let i = 0; i < cantidad; i++) {
      this.cartService.addToCart(product);
    }

    alert(`${cantidad} ${product.name} agregado(s) al carrito 🛒`);
  }
}