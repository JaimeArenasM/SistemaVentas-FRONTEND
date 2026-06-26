import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../../../../Core/Interfaces/IProduct.interface';
import { ProductService } from '../../../../Core/Services/product.service';
import { CarritoService } from '../../../../Core/Services/carrito.service';
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
export class ProductosPage implements OnInit {

  product: Product[] = [];
  filteredProducts: Product[] = [];

  private productService = inject(ProductService);
  private cartService = inject(CarritoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    // Escuchamos la data del backend y validamos si viene paginada
    this.productService.getProductos().subscribe((data: any) => {
      this.product = data.content ? data.content : data;
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
        // Actualizado al nuevo nombre de la interfaz
        (p) => p.nombreCategoria === category
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

      productosFiltrados = productosFiltrados.filter((prod) => {
        // Actualizado a las nuevas propiedades
        const textoProducto = normalizarTexto(`
          ${prod.nombre}
          ${prod.descripcion}
          ${prod.nombreCategoria}
        `);

        return palabras.every((palabra: string) =>
          textoProducto.includes(palabra)
        );
      });
    }

    this.filteredProducts = productosFiltrados;
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
    // Armamos el request exacto que espera tu Swagger (CarritoRequest)
    const itemRequest = {
      idProducto: prod.idProducto,
      cantidad: cantidad
    };

    // Disparamos la petición HTTP real para persistir el carrito
    this.cartService.agregarItem(itemRequest).subscribe({
      next: () => {
        alert(`${cantidad} ${prod.nombre} agregado(s) al carrito 🛒`);
      },
      error: (err) => {
        console.error('Error al agregar producto:', err);
      }
    });
  }
}
