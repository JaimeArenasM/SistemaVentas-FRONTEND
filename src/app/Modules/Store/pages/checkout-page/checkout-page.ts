import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

import { PagoTarjetaComponent } from '../pago-tarjeta-page/pago-tarjeta';
import { CarritoService } from '../../../../Core/Services/carrito.service';

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

  cartItems: any[] = [];
  metodoPago: string = '';

  private router = inject(Router);
  private cartService = inject(CarritoService);

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  get total(): number {
    return this.cartService.getTotalPrice();
  }

  volverAlCarrito(): void {
    this.router.navigate(['/store/carrito']);
  }

  confirmarPago(): void {
    if (!this.metodoPago) {
      alert('Por favor selecciona un método de pago');
      return;
    }

    alert('Pago realizado con éxito. Gracias por tu compra!');
    this.cartService.clearCart();
    this.router.navigate(['/store/catalogo']);
  }

  onPagoExitoso(): void {
    alert('Pago realizado con éxito. Gracias por tu compra!');
    this.cartService.clearCart();
    this.router.navigate(['/store/catalogo']);
  }
}