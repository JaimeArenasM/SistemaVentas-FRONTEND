import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../../../Core/Interfaces/IProduct.interface';
import { CarritoService } from '../../../../Core/Services/carrito.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../Core/Services/product.service';

@Component({
  selector: 'app-catalogo-page',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './catalogo-page.html',
  styleUrl: './catalogo-page.css',
})
export class CatalogoPage {
  product: Product[]=[];
  filteredProducts:Product[]= [];

private productService = inject(ProductService);
  private cartService = inject(CarritoService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    // 1. Obtiene los productos
    this.productService.getProductos().subscribe(data => {
      this.product = data;
      this.filteredProducts = data;
    });

    // 2. Filtra basándose en la URL que cambia el Sidebar
    this.route.queryParams.subscribe(params => {
      const category = params['categoria'];
      if (category && category !== 'Todos') {
        this.filteredProducts = this.product.filter(p => p.category === category);
      } else {
        this.filteredProducts = this.product;
      }
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    alert(`${product.name} agregado al carrito 🛒`);
  }
}
