import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Componentes Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Servicios del Core
import { AuthService } from '../../../../Core/Services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  formLogin!: FormGroup;
  erroMessage: string = '';
  cuentaBloqueada: boolean = false;
  erroresCampos: { [key: string]: string } = {};

  // === ESTADOS DEL MODAL DE RECUPERACIÓN ===
  mostrarModalRecuperacion: boolean = false;
  pasoRecuperacion: number = 1;
  correoRecuperacion: string = '';
  codigoRecuperacion: string = '';
  nuevaContrasena: string = '';
  mensajeRecuperacion: string = '';
  cargandoRecuperacion: boolean = false;
  tipoMensaje: 'info' | 'error' | 'exito' = 'info';

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onAuthentication(): void {
    if (this.formLogin.invalid) {
      this.erroMessage = 'Por favor, complete los campos obligatorios.';
      return;
    }

  const payload = this.formLogin.value;
    this.authService.login(payload).subscribe({
      next: (response) => {
        if (response.tipoUsuario === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/store/catalogo']);
        }
      },
      error: (err: any) => {
        const mensajeBackend = err.error?.mensaje || '';

        if (err.status === 403 || mensajeBackend === 'CUENTA_BLOQUEADA') {
          this.erroMessage = 'Por motivos de seguridad, esta cuenta ha sido suspendida.';
          this.cuentaBloqueada = true;
        } else {
          this.erroMessage = mensajeBackend || 'Credenciales incorrectas. Intente nuevamente.';
          this.cuentaBloqueada = false;
        }

        // Obligamos a Angular a mostrar el mensaje ROJO instantáneamente
        this.cdr.detectChanges();
      }
    });
  }

  cerrarError(): void {
    this.erroMessage = '';
    this.cuentaBloqueada = false;
  }

  irAlContacto(): void {
    // Opción PRO: Abre el gestor de correos del cliente (Outlook, Gmail) listo para enviar a tu equipo
    window.location.href = 'mailto:contacto@tiendadonpepe.com?subject=Solicitud de Desbloqueo de Cuenta - Tienda Don Pepe';
    this.router.navigate(['/store/catalogo']);
  }

  irRegistro(): void {
    this.router.navigate(['/auth/registro']);
  }

  // === LÓGICA DEFENSIVA DEL MODAL ===

  abrirModalRecuperacion(event: Event): void {
    event.preventDefault();
    this.mostrarModalRecuperacion = true;
    this.pasoRecuperacion = 1;
    this.correoRecuperacion = '';
    this.codigoRecuperacion = '';
    this.nuevaContrasena = '';
    this.mensajeRecuperacion = '';
    this.cargandoRecuperacion = false;
  }

  cerrarModalRecuperacion(): void {
    // Solo permitimos cerrar si no está procesando una petición crítica
    if (!this.cargandoRecuperacion) {
      this.mostrarModalRecuperacion = false;
    }
  }

  solicitarCodigo(): void {
    if (!this.correoRecuperacion) {
      this.tipoMensaje = 'error';
      this.mensajeRecuperacion = 'Debe ingresar el correo electrónico asociado a su cuenta.';
      return;
    }

    this.cargandoRecuperacion = true;
    this.tipoMensaje = 'info';
    this.mensajeRecuperacion = 'Validando cuenta y generando código seguro...';

    this.authService.solicitarRecuperacion(this.correoRecuperacion).subscribe({
      next: () => {
        this.cargandoRecuperacion = false;
        this.tipoMensaje = 'info';
        this.mensajeRecuperacion = '';
        this.pasoRecuperacion = 2; // Avanzamos fluidamente al paso 2
      },
      error: (err: any) => {
        this.cargandoRecuperacion = false;
        this.tipoMensaje = 'error';
        this.mensajeRecuperacion = err.error?.mensaje || 'No pudimos conectar con el servidor. Intente nuevamente.';
      }
    });
  }

  cambiarContrasena(): void {
    if (!this.codigoRecuperacion || !this.nuevaContrasena) {
      this.tipoMensaje = 'error';
      this.mensajeRecuperacion = 'Debe ingresar el código de 6 dígitos y su nueva contraseña.';
      return;
    }

    this.cargandoRecuperacion = true;
    this.tipoMensaje = 'info';
    this.mensajeRecuperacion = 'Actualizando credenciales en el sistema...';

    this.authService.resetPassword(this.codigoRecuperacion, this.nuevaContrasena).subscribe({
      next: () => {
        this.cargandoRecuperacion = false;
        this.mostrarModalRecuperacion = false;
        alert('¡Operación Exitosa! Su contraseña ha sido actualizada. Ya puede iniciar sesión.');

        // Limpiamos el formulario principal para que inicie de cero
        this.formLogin.reset();
        this.formLogin.patchValue({ correo: this.correoRecuperacion });
      },
      error: (err: any) => {
        this.cargandoRecuperacion = false;
        this.tipoMensaje = 'error';
        this.mensajeRecuperacion = err.error?.mensaje || 'El código es inválido o el servidor rechazó la conexión.';
      }
    });
  }
}
