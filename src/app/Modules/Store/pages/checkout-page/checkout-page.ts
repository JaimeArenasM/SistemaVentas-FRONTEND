import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { PagoTarjetaComponent } from '../pago-tarjeta-page/pago-tarjeta';

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
  templateUrl: './checkout-page.html',  
  styleUrls: ['./checkout-page.css']   
})
export class CheckoutPage {

  cartItems = [
    { id: 1, name: 'Laptop', price: 2500, quantity: 1 },
    { id: 2, name: 'Mouse', price: 100, quantity: 2 }
  ];

  metodoPago: string = '';

  constructor(private router: Router) {}

  get total(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
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
      return;
    }

    alert('Pago realizado con éxito. Gracias por tu compra!');
    this.router.navigate(['/dashboard']);
  }

  onPagoExitoso(): void {
    alert('Pago realizado con éxito. Gracias por tu compra!');
    this.router.navigate(['/dashboard']);
  }
}