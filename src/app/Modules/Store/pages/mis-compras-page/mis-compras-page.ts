import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef); // 🔥 INYECTAMOS EL DETECTOR DE CAMBIOS
  misHistorial: ISale[] = [];

  ngOnInit() {
    this.cargarMisCompras();
  }

  cargarMisCompras() {
    this.ventaService.obtenerMisCompras().subscribe({
      next: (ventas: ISale[]) => {
        this.misHistorial = ventas.sort((a, b) => b.idVenta - a.idVenta);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar el historial de compras:', err);
      }
    });
  }
}
