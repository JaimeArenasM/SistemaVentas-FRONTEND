import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

import { CartService } from '../services/cart.service';
import { PagoTarjetaComponent } from '../pago-tarjeta/pago-tarjeta';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    FormsModule,
    PagoTarjetaComponent
  ],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class CheckoutComponent implements OnInit {

  cartItems: any[] = [];
  total: number = 0;
  metodoPago: string = '';

  private cartService = inject(CartService);
  private router = inject(Router);

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getTotalPrice();
    });
  }

  seleccionarMetodo(metodo: string): void {
    this.metodoPago = metodo;
  }

  volverAlCarrito(): void {
    this.router.navigate(['/carrito']);
  }

  confirmarPago(): void {
    if (!this.metodoPago) {
      alert('Por favor selecciona un método de pago');
      return;
    }

    if (this.metodoPago === 'tarjeta') {
      // El componente PagoTarjeta maneja la confirmación
      return;
    }

    // Para Yape y Plin, mostrar QR
    alert('Pago realizado con éxito. Gracias por tu compra!');
    this.cartService.clearCart();
    this.router.navigate(['/dashboard']);
  }

  onPagoExitoso(): void {
    alert('Pago realizado con éxito. Gracias por tu compra!');
    this.cartService.clearCart();
    this.router.navigate(['/dashboard']);
  }
}