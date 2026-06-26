import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ConfirmDialog } from '../../../../Shared/Components/confirm-dialog/confirm-dialog';
import { MatCard } from "@angular/material/card";

import { VentaService } from '../../../../Core/Services/venta.service';
import { ISale } from '../../../../Core/Interfaces/ISale.interface';

@Component({
  selector: 'app-gestion-ventas-page',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCard
  ],
  templateUrl: './gestion-ventas-page.html',
  styleUrl: './gestion-ventas-page.css',
})
export class GestionVentasPage implements OnInit {
  private dialog = inject(MatDialog);
  private ventaService = inject(VentaService); // Inyectamos tu servicio

  dataSource = new MatTableDataSource<ISale>([]);
  // Actualizamos las columnas a los nombres lógicos
  displayColumns: string[] = ['idVenta', 'cliente', 'fechaVenta', 'total', 'estadoPago', 'acciones'];

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    // Llamamos al endpoint del administrador para traer todas las ventas
    this.ventaService.obtenerTodasLasVentas().subscribe({
      next: (ventas: ISale[]) => {
        // Ordenamos para que los pedidos más recientes salgan arriba
        this.dataSource.data = ventas.sort((a, b) => b.idVenta - a.idVenta);
      },
      error: (err) => console.error('Error al cargar el registro de ventas:', err)
    });
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  completarVenta(venta: ISale) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Confirmar Pago',
        message: `¿Deseas marcar el ticket #000-${venta.idVenta} como PAGADO? El monto se sumará a los ingresos.`,
        confirmText: 'Confirmar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Llamamos al endpoint PUT para actualizar el estado
        this.ventaService.cambiarEstadoVenta(venta.idVenta, 'PAGADO').subscribe({
          next: () => {
            alert('Venta marcada como completada/pagada.');
            this.cargarDatos();
          },
          error: (err) => console.error('Error al actualizar venta:', err)
        });
      }
    });
  }

  anularVenta(venta: ISale) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Anular Venta',
        message: `¿Estás seguro de anular el ticket #000-${venta.idVenta}? Esta acción cancelará el pedido.`,
        confirmText: 'Anular Venta'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ventaService.cambiarEstadoVenta(venta.idVenta, 'ANULADO').subscribe({
          next: () => {
            alert('Venta anulada correctamente.');
            this.cargarDatos();
          },
          error: (err) => console.error('Error al anular venta:', err)
        });
      }
    });
  }
}
