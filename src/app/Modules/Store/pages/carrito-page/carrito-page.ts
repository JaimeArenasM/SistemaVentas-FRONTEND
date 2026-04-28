import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

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
  templateUrl: './carrito-page.html',
  styleUrls: ['./carrito-page.css']
})
export class CarritoComponent {

  // ✅ Datos simulados (SIN model)
  cartItems = [
    { id: 1, name: 'Laptop', price: 2500, quantity: 1 },
    { id: 2, name: 'Mouse', price: 100, quantity: 2 }
  ];

  constructor(private router: Router) {}


  get total(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  remove(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
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