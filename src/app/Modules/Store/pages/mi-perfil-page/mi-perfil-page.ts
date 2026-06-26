import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../../Core/Services/auth.service';
import { UsuarioService } from '../../../../Core/Services/usuario.service';
import { ClienteProfile } from '../../../../Core/Interfaces/IUser.interface';

@Component({
  selector: 'app-mi-perfil-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './mi-perfil-page.html',
  styleUrl: './mi-perfil-page.css',
})
export class MiPerfilPage implements OnInit {

  private authService = inject(AuthService);
  private usuarioService = inject(UsuarioService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  usuario: ClienteProfile = {
    nombres: '', apellidos: '', dni: '', telefono: '', direccion: '', correo: ''
  };

  modoEdicion: boolean = false;
  sesionActual: any = null;
  cargandoContrasena: boolean = false;

  // === VARIABLES DEL NUEVO MODAL INTERNO ===
  mostrarModalClave: boolean = false;
  codigoVerificacion: string = '';
  nuevaContrasena: string = '';
  mensajeModal: string = '';
  tipoMensaje: 'info' | 'error' = 'info';

  ngOnInit() {
    this.sesionActual = this.authService.getSession();
    this.cargarDatosDelBackend();
  }

  cargarDatosDelBackend() {
    this.usuarioService.obtenerMiPerfil().subscribe({
      next: (perfil: any) => {
        const data = perfil.content || perfil.data || perfil;
        this.usuario.nombres = data.nombres || '';
        this.usuario.apellidos = data.apellidos || '';
        this.usuario.dni = data.dni || '';
        this.usuario.telefono = data.telefono || '';
        this.usuario.direccion = data.direccion || '';
        this.usuario.correo = data.correo || this.sesionActual?.correo || '';
        this.cdr.detectChanges();
      },
      error: (err) => {
        if (this.sesionActual) {
          this.usuario.correo = this.sesionActual.correo || '';
          if (String(this.sesionActual.tipoUsuario).toUpperCase() === 'ADMIN') {
            this.usuario.nombres = 'Administrador';
          } else {
            this.usuario.nombres = this.sesionActual.nombres || 'Usuario Fantasma';
          }
          this.cdr.detectChanges();
        }
      }
    });
  }

  activarEdicion() { this.modoEdicion = true; }

  cancelarEdicion() {
    this.modoEdicion = false;
    this.cargarDatosDelBackend();
  }

  guardarCambios() {
    const payloadActualizacion = {
      nombres: this.usuario.nombres,
      apellidos: this.usuario.apellidos,
      dni: this.usuario.dni,
      telefono: this.usuario.telefono,
      direccion: this.usuario.direccion
    };

    this.usuarioService.actualizarMiPerfil(payloadActualizacion).subscribe({
      next: () => {
        this.modoEdicion = false;
        alert('¡Perfil actualizado con éxito!');
      },
      error: (err) => {
        const msg = err.status === 400 ? 'Revisa los datos. ' + JSON.stringify(err.error) : 'Hubo un problema.';
        alert(msg);
      }
    });
  }


  solicitarCambioContrasena() {
    if (!this.usuario.correo) return;

    const confirmacion = confirm(`Se generará un código de seguridad para ${this.usuario.correo}. ¿Deseas continuar?`);

    if (confirmacion) {
      this.cargandoContrasena = true;
      this.cdr.detectChanges();

      this.authService.solicitarRecuperacion(this.usuario.correo).subscribe({
        next: () => {
          this.cargandoContrasena = false;
          this.mostrarModalClave = true;
          this.codigoVerificacion = '';
          this.nuevaContrasena = '';
          this.mensajeModal = '';

          this.cdr.detectChanges();
        },
        error: (err: any) => {
          this.cargandoContrasena = false;
          alert('No se pudo generar el código:\n' + (err.error?.mensaje || 'Error del servidor.'));
          this.cdr.detectChanges();
        }
      });
    }
  }

  cerrarModalClave() {
    if (!this.cargandoContrasena) {
      this.mostrarModalClave = false;
      this.cdr.detectChanges();
    }
  }

  cambiarClaveDefinitiva() {
    if (!this.codigoVerificacion || !this.nuevaContrasena) {
      this.tipoMensaje = 'error';
      this.mensajeModal = 'Por favor, completa ambos campos.';
      this.cdr.detectChanges();
      return;
    }

    this.cargandoContrasena = true;
    this.tipoMensaje = 'info';
    this.mensajeModal = 'Validando código y guardando nueva contraseña...';
    this.cdr.detectChanges();

    this.authService.resetPassword(this.codigoVerificacion, this.nuevaContrasena).subscribe({
      next: () => {
        this.cargandoContrasena = false;
        this.cdr.detectChanges();

        alert('¡Contraseña cambiada con éxito! Por seguridad, tu sesión se cerrará ahora.');

        // Destruimos sesión y mandamos al login
        localStorage.removeItem('sistema_ventas_data');
        this.router.navigate(['/auth/login']);
      },
      error: (err: any) => {
        this.cargandoContrasena = false;
        this.tipoMensaje = 'error';
        this.mensajeModal = err.error?.mensaje || 'El código ingresado es incorrecto o ya expiró.';
        this.cdr.detectChanges(); // Despierta a Angular para que muestre el error en rojo
      }
    });
  }}
