import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { ScrollTopButton } from '../../../../Shared/Components/scroll-top-button/scroll-top-button';
import { Product } from '../../../../Core/Interfaces/IProduct.interface';
import { ProductService } from '../../../../Core/Services/product.service';

@Component({
  standalone: true,
  selector: 'app-catalogo-page',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    ScrollTopButton
  ],
  templateUrl: './catalogo-page.html',
  styleUrl: './catalogo-page.css',
})
export class CatalogoPage {

  productos: Product[] = [];
  categoriaSeleccionada = '';

  imagenes = [
    'assets/img/portadalimpieza.png',
    'assets/img/tiendasinlogo.png',
    'assets/img/tiendadedonpepe.png'
  ];

  categorias = [
    { nombre: 'Cereales', imagen: 'assets/img/categorias/cereales.png' },
    { nombre: 'Snacks', imagen: 'assets/img/categorias/snacks.png' },
    { nombre: 'Detergentes', imagen: 'assets/img/categorias/detergentes.png' },
    { nombre: 'Bebidas', imagen: 'assets/img/categorias/bebidas.png' },
    { nombre: 'Lácteos', imagen: 'assets/img/categorias/lacteos.png' },
    { nombre: 'Frutas', imagen: 'assets/img/categorias/frutas.png' },
  ];

  marcas = [
    'assets/img/nestle-logo-png_seeklogo-98337.png',
    'assets/img/Angel.png',
    'assets/img/Gloria.png',
    'assets/img/The_Coca-Cola_Company.png',
    'assets/img/P&G_logo.png',
    'assets/img/Pepsico_logo.png',
    'assets/img/Field-208-logo.png',
    'assets/img/Frito Lay.png',
    'assets/img/Alicorp.png'
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

  siguiente(): void {
    this.indice = (this.indice + 1) % this.imagenes.length;
  }

  anterior(): void {
    this.indice =
      (this.indice - 1 + this.imagenes.length) % this.imagenes.length;
  }

  moverDerecha(track: HTMLElement): void {
    track.scrollBy({
      left: 320,
      behavior: 'smooth'
    });
  }

  moverIzquierda(track: HTMLElement): void {
    track.scrollBy({
      left: -320,
      behavior: 'smooth'
    });
  }

  obtenerPorCategoria(categoria: string): Product[] {
    return this.productos.filter(producto => producto.category === categoria);
  }

  irCategoria(categoria: string): void {
    this.categoriaSeleccionada = categoria;

    this.router.navigate(
      ['/store/productos'],
      { queryParams: { categoria } }
    );
  }
}