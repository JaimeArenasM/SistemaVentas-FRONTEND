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
import { IUser } from '../../../../Core/Interfaces/IUser.interface';

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

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.formRegister = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], // Solo números
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      vUsuario: ['', [Validators.required, Validators.email]],
      vPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onRegister() {
    this.erroMessage = null;

    if (this.formRegister.valid) {
      const formValues = this.formRegister.value;
      // Armamos el objeto IUser
      const newUser: IUser = {
        iIdUsuario: new Date().getTime(),
        iIdTipoUsuario: 2, // 2 = CLIENTE
        iIdPersona: Math.floor(Math.random() * 1000),
        vUsuario: formValues.vUsuario,
        password: formValues.vPassword,
        nombres: formValues.nombres,
        apellidos: formValues.apellidos,
        telefono: formValues.telefono,
        dni: formValues.dni,
      };

      this.authService.registrar(newUser).subscribe({
        next: () => {
          alert('¡Cuenta creada con éxito! Ahora inicia sesión.');
          this.router.navigate(['/auth/login']); // Lo mandamos a loguearse
        },
        error: (err) => {
          this.erroMessage = err.message;
        },
      });
    } else {
      this.erroMessage = 'Por favor, llena los campos correctamente.';
    }
  }
}
