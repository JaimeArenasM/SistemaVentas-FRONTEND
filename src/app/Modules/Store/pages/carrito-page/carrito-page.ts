import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

/* Angular Material */
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

/* Interfaces y Service */
import { CarritoService } from '../../../../Core/Services/carrito.service';
import { ICarrito, CartItem } from '../../../../Core/Interfaces/ICarrito.interface';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule
  ],
  templateUrl: './carrito-page.html',
  styleUrls: ['./carrito-page.css']
})
export class CarritoPage implements OnInit {

  cartItems: CartItem[] = [];
  totalCarrito: number = 0;

  private router = inject(Router);
  private cartService = inject(CarritoService);

  ngOnInit() {
    this.cargarCarrito();
  }

  // Método centralizado para traer la información fresca desde PostgreSQL
  cargarCarrito() {
    this.cartService.obtenerCarrito().subscribe({
      next: (res: ICarrito) => {
        if (res && res.items) {
          this.cartItems = res.items;
          this.totalCarrito = res.totalCarrito;
        } else {
          this.cartItems = [];
          this.totalCarrito = 0;
        }
      },
      error: (err) => {
        console.error('Error al cargar el carrito:', err);
        this.cartItems = [];
        this.totalCarrito = 0;
      }
    });
  }

  remove(idProducto?: number): void {
    if (!idProducto) {
      console.warn('Cuidado: El backend no está devolviendo el idProducto en el JSON.');
      return;
    }

    // Llamamos al DELETE y si sale bien, recargamos la tabla visual
    this.cartService.eliminarItem(idProducto).subscribe({
      next: () => {
        this.cargarCarrito();
      },
      error: (err) => console.error('Error al eliminar ítem:', err)
    });
  }

  irAPagar(): void {
    if (this.totalCarrito === 0) {
      alert('El carrito está vacío');
      return;
    }
    this.router.navigate(['/store/checkout']);
  }

  volverAlDashboard(): void {
    this.router.navigate(['/store/catalogo']);
  }
}
