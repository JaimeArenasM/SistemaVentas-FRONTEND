import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CartService } from '../services/cart.service';
import { CartItem } from '../models/product.model';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css']
})
export class CarritoComponent implements OnInit {

  cartItems: CartItem[] = [];
  total: number = 0;

  private cartService = inject(CartService);
  private router = inject(Router);

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getTotalPrice();
    });
  }

  remove(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  irAPagar(): void {
    if (this.total === 0) {
      alert('El carrito está vacío');
      return;
    }
    this.router.navigate(['/checkout']);
  }

  volverAlDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}