import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { Product } from '../../../../Core/Interfaces/IProduct.interface';
import { ProductService } from '../../../../Core/Services/product.service';

@Component({
  selector: 'app-catalogo-page',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './catalogo-page.html',
  styleUrl: './catalogo-page.css',
})
export class CatalogoPage {

  productos: Product[] = [];

  imagenes = [
    'assets/img/portadalimpieza.png',
    'assets/img/tiendasinlogo.png',
    'assets/img/tiendadedonpepe.png'
  ];

  indice = 0;

  private productService = inject(ProductService);
  private router = inject(Router);

  ngOnInit(): void {
    this.productService.getProductos().subscribe(data => {
      this.productos = data;
    });

    setInterval(() => {
      this.siguiente();
    }, 3000);
  }

  siguiente() {
    this.indice = (this.indice + 1) % this.imagenes.length;
  }

  anterior() {
    this.indice =
      (this.indice - 1 + this.imagenes.length) % this.imagenes.length;
  }

  obtenerPorCategoria(categoria: string): Product[] {
    return this.productos.filter(producto => producto.category === categoria);
  }

  irCategoria(categoria: string) {
    this.router.navigate(
      ['/store/productos'],
      { queryParams: { categoria } }
    );
  }
}