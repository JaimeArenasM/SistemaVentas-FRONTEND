import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

import { PagoTarjetaComponent } from '../pago-tarjeta-page/pago-tarjeta';
import { CarritoService } from '../../../../Core/Services/carrito.service';
import { VentaService } from '../../../../Core/Services/venta.service';
import { CartItem, ICarrito } from '../../../../Core/Interfaces/ICarrito.interface';

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
export class CheckoutPage implements OnInit {

  cartItems: CartItem[] = [];
  totalCarrito: number = 0;
  metodoPago: string = '';

  private router = inject(Router);
  private cartService = inject(CarritoService);
  private ventaService = inject(VentaService);

  ngOnInit(): void {
    this.cargarDatosCheckout();
  }

  cargarDatosCheckout() {
    this.cartService.obtenerCarrito().subscribe({
      next: (res: ICarrito) => {
        if (res && res.items) {
          this.cartItems = res?.items || [];
          this.totalCarrito = res?.totalCarrito || 0;
        }
      }
    });
  }

  volverAlCarrito(): void {
    this.router.navigate(['/store/carrito']);
  }

  private procesarVenta(): void {
    if (this.cartItems.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }

    const requestVenta = {
      metodoPago: this.metodoPago.toUpperCase(),
      detalles: this.cartItems.map(item => ({
        idProducto: item.idProducto,
        cantidad: item.cantidad
      }))
    };

    this.ventaService.procesarCheckout(requestVenta).subscribe({
      next: () => {
        alert('¡Pago registrado con éxito! Tu pedido está en camino.');

        // 1. Guardamos temporalmente los items para borrarlos de la BD
        const itemsParaBorrar = [...this.cartItems];

        // 2. Limpiamos la vista inmediatamente
        this.cartItems = [];
        this.totalCarrito = 0;

        // 3. El Hack Frontend: Hacemos un bucle para borrar cada item de la BD usando tu endpoint existente
      itemsParaBorrar.forEach(item => {
          // 🔥 VALIDACIÓN: Solo intentamos borrar si el ID realmente existe
          if (item.idProducto) {
            this.cartService.eliminarItem(item.idProducto).subscribe({
              error: (err) => console.error('Error limpiando carrito en BD:', err)
            });
          }
        });

        // 4. Redirigimos a Mis Compras
        this.router.navigate(['/store/mis-compras']);
      },
      error: (err) => {
        console.error('Error al procesar el pago:', err);
        alert('Hubo un problema al procesar tu pago. Revisa los datos e intenta de nuevo.');
      }
    });
  }

  confirmarPago(): void {
    if (!this.metodoPago) {
      alert('Por favor selecciona un método de pago');
      return;
    }
    this.procesarVenta();
  }

  onPagoExitoso(): void {
    this.procesarVenta();
  }
}
