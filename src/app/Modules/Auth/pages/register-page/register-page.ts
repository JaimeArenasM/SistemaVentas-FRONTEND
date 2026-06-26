import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../Core/Services/auth.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {
  formRegister: FormGroup;
  erroMessage: string | null = null;
  erroresCampos: any = {}; // Para capturar errores específicos de Spring Boot

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.formRegister = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]], // Ajustado a 9 dígitos exactos
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      direccion: ['', Validators.required], // Agregamos la dirección que pide el backend
      correo: ['', [Validators.required, Validators.email]], // Renombrado
      password: ['', [Validators.required, Validators.minLength(6)]], // Renombrado
    });
  }

  onRegister() {
    this.erroMessage = null;
    this.erroresCampos = {};

    if (this.formRegister.valid) {
      // El formulario ahora tiene exactamente los mismos nombres que RegistroRequest
      const newUserPayload = this.formRegister.value;

      this.authService.registrar(newUserPayload).subscribe({
        next: () => {
          alert('¡Cuenta creada con éxito! Ahora inicia sesión.');
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          console.error('Error al registrar:', err);

          if (err.status === 400) {
            // Si el backend rechaza por validaciones (ej. correo ya existe)
            this.erroresCampos = err.error;
            this.erroMessage = 'Revisa los datos ingresados.';
          } else {
            this.erroMessage = 'Error del servidor al intentar registrar la cuenta.';
          }
        },
      });
    } else {
      this.erroMessage = 'Por favor, llena todos los campos obligatorios correctamente.';
    }
  }
}
