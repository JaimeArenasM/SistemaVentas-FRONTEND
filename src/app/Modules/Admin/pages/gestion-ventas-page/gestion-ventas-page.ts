import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ConfirmDialog } from '../../../../Shared/Components/confirm-dialog/confirm-dialog';
import { MatCard } from "@angular/material/card";

@Component({
  selector: 'app-gestion-ventas-page',
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
export class GestionVentasPage {
  private dialog = inject(MatDialog);

  dataSource = new MatTableDataSource<any>([]);
  displayColumns: string[] = ['Id', 'Cliente', 'Fecha', 'Total', 'Estado', 'Acciones'];

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    const ventas = JSON.parse(localStorage.getItem('donPepe_ventas_db') || '[]');
    this.dataSource.data = ventas;
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  completarVenta(venta: any) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Confirmar Pago',
        message: `¿Deseas marcar el ticket #000-${venta.iIdVenta} como Pagado/Completado? El monto se sumará al Dashboard.`,
        confirmText: 'Confirmar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let db = JSON.parse(localStorage.getItem('donPepe_ventas_db') || '[]');

        const index = db.findIndex((v: any) => v.iIdVenta === venta.iIdVenta);
        if (index !== -1) {
          db[index].vEstado = 'Completado'; // Cambiamos a Completado
          localStorage.setItem('donPepe_ventas_db', JSON.stringify(db));
          this.cargarDatos();
        }
      }
    });
  }

  anularVenta(venta: any) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Anular Venta',
        message: `¿Estas seguro de anular el ticket # 000-${venta.iIdVenta} de ${venta.vNombreCliente}? Esta accion descontara el monto del Dashboard.`,
        confirmText: 'Anular Venta'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let db = JSON.parse(localStorage.getItem('donPepe_ventas_db') || '[]');

        const index = db.findIndex((v: any) => v.iIdVenta === venta.iIdVenta);
        if (index !== 1) {
          db[index].vEstado = 'Anulado';
          localStorage.setItem('donPepe_ventas_db', JSON.stringify(db));
          this.cargarDatos();
        }
      }
    });

  }
}
