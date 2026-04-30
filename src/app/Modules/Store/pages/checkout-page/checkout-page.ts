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
import { AuthService } from '../../../../Core/Services/auth.service';

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
  private authService = inject(AuthService);

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

  private procesarVenta(): void {
    const session = this.authService.getSession();

    // 1. Validamos que el usuario esté logueado
    if (!session) {
      alert('Error: Debes iniciar sesión para finalizar tu compra.');
      this.router.navigate(['/auth/login']);
      return;
    }

    if (this.cartItems.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }

    // 2. Armamos el ticket
    const nuevaVenta = {
      iIdVenta: Math.floor(Math.random() * 8000) + 1000,
      iIdCliente: session.user.iIdUsuario,
      vNombreCliente: session.user.nombres + ' ' + (session.user.apellidos || ''),
      dTotal: this.total,
      vFechaEmision: new Date().toISOString().split('T')[0],
      vEstado: 'Pendiente', // Pendiente para que el admin lo confirme
      aDetalle: this.cartItems
    };

    // 3. Guardamos en el LocalStorage
    let ventasDB = JSON.parse(localStorage.getItem('donPepe_ventas_db') || '[]');
    ventasDB.push(nuevaVenta);
    localStorage.setItem('donPepe_ventas_db', JSON.stringify(ventasDB));

    // 4. Limpiamos y redirigimos a Mis Compras
    this.cartService.clearCart();
    alert('¡Pago registrado con éxito! Tu pedido está en camino.');

    this.router.navigate(['/store/mis-compras']);
  }

  // --- BOTONES DEL HTML ---

  confirmarPago(): void {
    if (!this.metodoPago) {
      alert('Por favor selecciona un método de pago');
      return;
    }
    // Si es Yape o Plin, llamamos al método maestro
    this.procesarVenta();
  }

  onPagoExitoso(): void {
    // Si el componente de Tarjeta avisa que el pago pasó, llamamos al método maestro
    this.procesarVenta();
  }
}
