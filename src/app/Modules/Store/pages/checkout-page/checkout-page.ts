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
import { VentaService } from '../../../../Core/Services/venta.service'; // NUEVO SERVICIO
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
    // Obtenemos el carrito real desde el servidor para mostrar el resumen
    this.cartService.obtenerCarrito().subscribe({
      next: (res: ICarrito) => {
        if (res && res.items) {
          this.cartItems = res.items;
          this.totalCarrito = res.totalCarrito;
        }
      },
      error: (err) => console.error('Error al cargar el resumen del carrito:', err)
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

    // Armamos el JSON exactamente como lo exige CrearVentaRequest en Swagger
    const requestVenta = {
      metodoPago: this.metodoPago.toUpperCase(), // Ej: "TARJETA", "YAPE"
      detalles: this.cartItems.map(item => ({
        idProducto: item.idProducto,
        cantidad: item.cantidad
      }))
    };

    // Enviamos la petición a Render
    this.ventaService.procesarCheckout(requestVenta).subscribe({
      next: () => {
        alert('¡Pago registrado con éxito! Tu pedido está en camino.');
        // Tu backend debería limpiar el carrito automáticamente al procesar la venta.
        this.router.navigate(['/store/mis-compras']);
      },
      error: (err) => {
        console.error('Error al procesar el pago:', err);
        alert('Hubo un problema al procesar tu pago. Revisa los datos e intenta de nuevo.');
      }
    });
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
