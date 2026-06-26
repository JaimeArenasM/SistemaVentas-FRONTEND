import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { VentaService } from '../../../../Core/Services/venta.service';
import { ISale } from '../../../../Core/Interfaces/ISale.interface';

@Component({
  selector: 'app-mis-compras',
  standalone: true,
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

  private ventaService = inject(VentaService);
  misHistorial: ISale[] = [];

  ngOnInit() {
    this.cargarMisCompras();
  }

  cargarMisCompras() {
    // Ya no necesitamos sacar el ID del usuario ni filtrar a mano.
    // El Token viaja solo y el backend nos da solo nuestras compras.
    this.ventaService.obtenerMisCompras().subscribe({
      next: (ventas: ISale[]) => {
        // Ordenamos para que la compra más reciente (ID más alto) salga primero
        this.misHistorial = ventas.sort((a, b) => b.idVenta - a.idVenta);
      },
      error: (err) => {
        console.error('Error al cargar el historial de compras:', err);
      }
    });
  }
}
