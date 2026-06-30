import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { Product } from '../../../../Core/Interfaces/IProduct.interface';
import { ProductService } from '../../../../Core/Services/product.service';
import { CarritoService } from '../../../../Core/Services/carrito.service';
import { ProductDetailModalComponent } from '../../product-detail-modal/product-detail-modal';
import { AuthService } from '../../../../Core/Services/auth.service';

@Component({
  selector: 'app-productos-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    RouterModule
  ],
  templateUrl: './productos-page.html',
  styleUrl: './productos-page.css',
})
export class ProductosPage implements OnInit {

  product: Product[] = [];
  filteredProducts: Product[] = [];
  categoriaActual: string = '';
  busquedaActual: string = '';

  private productService = inject(ProductService);
  private cartService = inject(CarritoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef); // Inyección del Detector de Cambios

  ngOnInit(): void {
    // 1. Cargar productos
    this.productService.getProductos().subscribe((data: any) => {
      this.product = data.content ? data.content : data;
      this.aplicarFiltros();
    });

    // 2. Escuchar cambios de URL
    this.route.queryParams.subscribe((params) => {
      this.categoriaActual = params['categoria'] || '';
      this.busquedaActual = params['search'] || '';
      this.aplicarFiltros();
    });
  }

  aplicarFiltros(): void {
    if (!this.product || this.product.length === 0) {
      this.filteredProducts = [];
      this.cdr.detectChanges();
      return;
    }

    const catFiltro = this.categoriaActual.toLowerCase().trim();
    const busqFiltro = this.busquedaActual.toLowerCase().trim();

    let productosFiltrados = [...this.product];

    if (catFiltro && catFiltro !== 'todos') {
      productosFiltrados = productosFiltrados.filter((p) => {
        const catProd = p.nombreCategoria ? p.nombreCategoria.toLowerCase().trim() : '';
        return catProd === catFiltro;
      });
    }

    if (busqFiltro) {
        const normalizar = (t: string) => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        productosFiltrados = productosFiltrados.filter(p =>
            normalizar(p.nombre || '').includes(normalizar(busqFiltro)) ||
            normalizar(p.descripcion || '').includes(normalizar(busqFiltro))
        );
    }

    this.filteredProducts = productosFiltrados;

    this.cdr.detectChanges();
  }

  abrirModal(prod: Product): void {
    const dialogRef = this.dialog.open(ProductDetailModalComponent, {
      width: '900px',
      maxWidth: '95vw',
      data: prod
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addToCart(result.product, result.cantidad);
      }
    });
  }

  addToCart(prod: Product, cantidad: number = 1): void {
    if (!this.authService.getSession()) {
      alert('⚠️ Para agregar productos, primero debes iniciar sesión.');
      this.router.navigate(['/auth/login']);
      return;
    }

    if (prod.stock <= 0) {
      alert('🚫 Lo sentimos, este producto está agotado actualmente.');
      return;
    }

    const itemRequest = { idProducto: prod.idProducto, cantidad: cantidad };

    this.cartService.agregarItem(itemRequest).subscribe({
      next: () => alert('✅ Producto agregado al carrito'),
      error: (err) => alert('Error: ' + (err.error?.message || 'No se pudo agregar al carrito'))
    });
  }
}
