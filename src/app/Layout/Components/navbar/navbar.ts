import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CarritoService } from '../../../Core/Services/carrito.service';
import { AuthService } from '../../../Core/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  cartItems: any[] = [];
  cartCount: number = 0;
  total: number = 0;
  mostrarCarrito: boolean = false;
  metodoPago: string = '';

  private cartService = inject(CarritoService);
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.cartCount = items.reduce((t, i) => t + i.quantity, 0);
      this.total = this.cartService.getTotalPrice();
    });
  }

  abrirCarrito() {
    this.mostrarCarrito = true;
  }
  cerrarCarrito() {
    this.mostrarCarrito = false;
  }
  remove(id: number) {
    this.cartService.removeFromCart(id);
  }

  pagar() {
    if (this.total === 0) {
      alert('Carrito vacio');
      return;
    }
    if (!this.metodoPago) {
      alert('Selelciona un metodo de pago');
      return;
    }
    alert(`Compra exitosa \nTotal: S/. ${this.total}\nMetodo: ${this.metodoPago}`);
    this.cartService.clearCart();
    this.metodoPago = '';
    this.cerrarCarrito();
  }

  logout() {
    this.authService.logout();
  }
}
