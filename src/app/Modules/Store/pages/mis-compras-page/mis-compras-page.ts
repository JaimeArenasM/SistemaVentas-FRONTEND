import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../../Core/Services/auth.service';

@Component({
  selector: 'app-mis-compras',
  standalone: true,

  // Importamos módulos necesarios
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],

  templateUrl: './mis-compras-page.html',
  styleUrls: ['./mis-compras-page.css']
})
export class MisComprasPage implements OnInit {

private authService = inject(AuthService);

  misHistorial: any[] = [];

  ngOnInit() {
    this.cargarMisCompras();
  }

  cargarMisCompras() {
    const session = this.authService.getSession();
    if (!session) {
      console.log('🔴 No hay sesión activa.');
      return;
    }

    const todasLasVentas = JSON.parse(localStorage.getItem('donPepe_ventas_db') || '[]');

    // --- MODO DETECTIVE ACTIVADO ---
    console.log('=== DEBUG: MIS COMPRAS ===');
    console.log('1. Mi ID de usuario actual es:', session.user.iIdUsuario);
    console.log('2. Total de ventas en la base de datos:', todasLasVentas.length);

    this.misHistorial = todasLasVentas.filter((venta: any) => {
      const idTicket = Number(venta.iIdCliente);
      const miId = Number(session.user.iIdUsuario);

      console.log(`-> Revisando Ticket #${venta.iIdVenta} | iIdCliente del ticket: ${idTicket} | ¿Coincide?: ${idTicket === miId}`);

      return idTicket === miId;
    });

    console.log('3. Ventas finales encontradas para mí:', this.misHistorial.length);
    // ---------------------------------

    this.misHistorial.sort((a, b) => b.iIdVenta - a.iIdVenta);
  }
}
