import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ScrollTopButton } from '../../../../Shared/Components/scroll-top-button/scroll-top-button';
import { Product } from '../../../../Core/Interfaces/IProduct.interface';
import { ProductService } from '../../../../Core/Services/product.service';
import { CarritoService } from '../../../../Core/Services/carrito.service';
import { AuthService } from '../../../../Core/Services/auth.service'; // 🔥 Importamos el servicio de auth
import { ProductDetailModalComponent } from '../../product-detail-modal/product-detail-modal';

@Component({
  standalone: true,
  selector: 'app-catalogo-page',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    ScrollTopButton
  ],
  templateUrl: './catalogo-page.html',
  styleUrl: './catalogo-page.css',
})
export class CatalogoPage implements OnInit {

  productos: Product[] = [];

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

  // Inyectamos diálogos, carrito y autenticación
  private dialog = inject(MatDialog);
  private cartService = inject(CarritoService);
  private authService = inject(AuthService); // 🔥 Inyección del AuthService

ngOnInit(): void {
    this.productService.getProductos().subscribe({
      next: (data: any) => {
        const listaCompleta = data.content ? data.content : data;

        this.productos = listaCompleta.filter((p: Product) => {
          const estado = String(p.estado || '').trim().toUpperCase();
          return estado === 'ACTIVO';
        });

      },
      error: (err) => {
        console.error('Error al cargar el catálogo:', err);
      }
    });

    setInterval(() => {
      this.siguiente();
    }, 3000);
  }

  siguiente(): void {
    this.indice = (this.indice + 1) % this.imagenes.length;
  }

  anterior(): void {
    this.indice = (this.indice - 1 + this.imagenes.length) % this.imagenes.length;
  }

  moverDerecha(index: number): void {
    const track = document.getElementById('track-' + index);
    if (track) {
      track.scrollBy({ left: 320, behavior: 'smooth' });
    }
  }

  moverIzquierda(index: number): void {
    const track = document.getElementById('track-' + index);
    if (track) {
      track.scrollBy({ left: -320, behavior: 'smooth' });
    }
  }

  obtenerPorCategoria(categoria: string): Product[] {
    return this.productos.filter(p => {
      const catProducto = (p.nombreCategoria || '').trim().toLowerCase();
      const catFiltro = categoria.trim().toLowerCase();
      return catProducto === catFiltro;
    });
  }

  irCategoria(nombreCategoria: string): void {
    this.router.navigate(['/store/productos'], {
      queryParams: { categoria: nombreCategoria },
      queryParamsHandling: 'merge'
    });
  }

  // Función para abrir el modal y validar la sesión antes de guardar
 // Función para abrir el modal y validar la sesión antes de guardar
  abrirModalProducto(producto: Product): void {
    const dialogRef = this.dialog.open(ProductDetailModalComponent, {
      width: '750px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      data: producto
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.cantidad > 0) {

        // 🔥 GUARDIA DE SESIÓN
        const session = this.authService.getSession();
        if (!session) {
          alert('¡Ups! Debes iniciar sesión o registrarte para poder agregar productos a tu carrito.');
          this.router.navigate(['/auth/login']);
          return;
        }

        // 🔥 PROCEDEMOS A GUARDAR
        this.cartService.agregarItem({
          idProducto: result.product.idProducto,
          cantidad: result.cantidad
        }).subscribe({
          next: () => {
            console.log('✅ Producto agregado al carrito');

            // 🔥 AQUÍ AGREGAMOS EL MENSAJE DE ÉXITO PARA EL CLIENTE
            alert(`¡Genial! Se agregó "${producto.nombre}" a tu carrito correctamente. 🛒`);

          },
          error: (err) => {
            console.error('Error al agregar al carrito:', err);
            if (err.status === 401 || err.status === 403) {
              alert('Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.');
              this.authService.logout();
              this.router.navigate(['/auth/login']);
            } else {
              alert('Hubo un problema al agregar el producto. Inténtalo de nuevo.');
            }
          }
        });
      }
    });
  }
}
