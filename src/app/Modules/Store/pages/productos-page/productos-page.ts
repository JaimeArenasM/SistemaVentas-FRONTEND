import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { ActivatedRoute } from '@angular/router';

import { Product } from '../../../../Core/Interfaces/IProduct.interface';

import { ProductService }
from '../../../../Core/Services/product.service';

import { CarritoService }
from '../../../../Core/Services/carrito.service';

@Component({
  selector: 'app-productos-page',

  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],

  templateUrl: './productos-page.html',
  styleUrl: './productos-page.css',
})

export class ProductosPage {

  product: Product[] = [];

  filteredProducts: Product[] = [];

  private productService =
    inject(ProductService);

  private cartService =
    inject(CarritoService);

  private route =
    inject(ActivatedRoute);

  ngOnInit(): void {

    this.productService
      .getProductos()
      .subscribe(data => {

        this.product = data;

        this.aplicarFiltros();

      });

    this.route.queryParams.subscribe(() => {

      this.aplicarFiltros();

    });

  }

  aplicarFiltros() {

    const params =
      this.route.snapshot.queryParams;

    const category =
      params['categoria'];

    const search =
      params['search']?.toLowerCase() || '';

    let productosFiltrados =
      this.product;

    if (
      category &&
      category !== 'Todos'
    ) {

      productosFiltrados =
        productosFiltrados.filter(

          p =>
            p.category === category

        );

    }

    if (search) {

      const normalizarTexto =
      (texto: string) =>

        texto
          .toLowerCase()
          .normalize('NFD')
          .replace(
            /[\u0300-\u036f]/g,
            ''
          );

      const palabras =
        normalizarTexto(search)

        .trim()

        .split(' ')

        .filter(
          (p: string) =>
            p !== ''
        );

      productosFiltrados =
        productosFiltrados.filter(product => {

          const textoProducto =
            normalizarTexto(`

              ${product.name}

              ${product.description}

              ${product.category}

            `);

          return palabras.every(

            (palabra: string) =>

              textoProducto.includes(
                palabra
              )

          );

        });

    }

    this.filteredProducts =
      productosFiltrados;

  }

  addToCart(product: Product) {

    this.cartService
      .addToCart(product);

    alert(
      `${product.name}
      agregado al carrito 🛒`
    );

  }

}