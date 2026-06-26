import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCard } from "@angular/material/card";
import { ConfirmDialog } from '../../../../Shared/Components/confirm-dialog/confirm-dialog';
import { UserFormDialog } from '../../../../Shared/Components/user-form-dialog/user-form-dialog';
import { UsuarioService } from '../../../../Core/Services/usuario.service';
import { AuthService } from '../../../../Core/Services/auth.service';
import { UsuarioAdminView } from '../../../../Core/Interfaces/IUser.interface';

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
export class GestionClientesPage implements OnInit {

  private dialog = inject(MatDialog);
  private usuarioService = inject(UsuarioService);
  private authService = inject(AuthService); // Instanciamos el servicio de autenticación

  dataSource = new MatTableDataSource<UsuarioAdminView>([]);
  displayedColumns: string[] = ['correo', 'nombreCliente', 'tipoUsuario', 'estado', 'acciones'];

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.usuarioService.obtenerTodosLosUsuarios().subscribe({
      next: (usuarios: UsuarioAdminView[]) => {
        this.dataSource.data = usuarios;
      },
      error: (err) => console.error('Error al cargar la lista de usuarios:', err)
    });
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  abrirModalUsuario(usuario?: any) {
    const dialogRef = this.dialog.open(UserFormDialog, {
      width: '500px',
      // Si recibimos un usuario, lo mandamos al modal para que se llenen los campos
      data: usuario ? { ...usuario } : null
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        if (usuario) {
          // ESTO ES PARA EDITAR (Necesitas tener el método PUT en Spring Boot)
          this.usuarioService.actualizarUsuario(usuario.idUsuario, resultado).subscribe({
            next: () => {
              alert('Usuario actualizado con éxito.');
              this.cargarDatos();
            },
            error: (err :any) => console.error('Error al actualizar:', err)
          });
        } else {
          // ESTO ES PARA CREAR NUEVO
          this.authService.registrar(resultado).subscribe({
            next: () => {
              alert('Usuario registrado con éxito.');
              this.cargarDatos();
            },
            error: (err) => console.error('Error al registrar:', err)
          });
        }
      }
    });
  }

  cambiarEstado(usuario: any) {
    // AHORA USAMOS LAS PALABRAS EXACTAS QUE ESPERA SPRING BOOT
    const estadoActual = usuario.estado ? usuario.estado.toLowerCase() : 'activo';
    const nuevoEstado = estadoActual === 'activo' ? 'bloqueado' : 'activo';
    const accion = estadoActual === 'activo' ? 'Bloquear' : 'Activar';

    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        title: `Confirmar Acción`,
        message: `¿Desea ${accion.toLowerCase()} la cuenta de ${usuario.nombre || usuario.correo}?`,
        confirmText: accion
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Asegúrate de que tu usuarioService tenga el método apuntando al backend
        this.usuarioService.cambiarEstadoUsuario(usuario.idUsuario, nuevoEstado).subscribe({
          next: () => {
            this.cargarDatos(); // Recargamos la tabla
          },
          error: (err) => console.error('Error al cambiar el estado:', err)
        });
      }
    });
  }
}
