import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCard } from "@angular/material/card";
import { UserFormDialog } from '../../../../Shared/Components/user-form-dialog/user-form-dialog';
import { ConfirmDialog } from '../../../../Shared/Components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-gestion-clientes-page',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCard
  ],
  templateUrl: './gestion-clientes-page.html',
  styleUrl: './gestion-clientes-page.css',
})
export class GestionClientesPage {

  private dialog = inject(MatDialog);

  // Usamos MatTableDataSource para que se refresque al instante
  dataSource = new MatTableDataSource<any>([]);

  // ¡AQUÍ ESTÁ EL CAMBIO! Agregamos dni, telefono, y separamos nombres de apellidos
  displayedColumns: string[] = ['usuario', 'dni', 'nombres', 'apellidos', 'telefono', 'rol', 'acciones'];

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    const usuarios = JSON.parse(localStorage.getItem('donPepe_users_db') || '[]');
    const clientesFiltrados = usuarios.filter((U: any) => U.iIdTipoUsuario === 2);
    this.dataSource.data = clientesFiltrados;
  }

  aplicarFiltro(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter= filterValue.trim().toLowerCase();
  }

  abrirModalUsuario(cliente?: any) {
    const dialogRef = this.dialog.open(UserFormDialog, {
      width: '500px',
      data: cliente ? { ...cliente } : null
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        let db = JSON.parse(localStorage.getItem('donPepe_users_db') || '[]');

        if (cliente) {
          const index = db.findIndex((u: any) => u.iIdUsuario === cliente.iIdUsuario);
          if (index !== -1) db[index] = resultado;
        } else {
          db.push(resultado);
        }

        localStorage.setItem('donPepe_users_db', JSON.stringify(db));
        this.cargarDatos();
      }
    });
  }

  eliminar(cliente: any) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Confirmar Eliminación',
        message: `¿Desea eliminar al cliente ${cliente.nombres}?`,
        confirmText: 'Eliminar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let db = JSON.parse(localStorage.getItem('donPepe_users_db') || '[]');
        db = db.filter((u: any) => u.iIdUsuario !== cliente.iIdUsuario);
        localStorage.setItem('donPepe_users_db', JSON.stringify(db));
        this.cargarDatos();
      }
    });
  }
}
