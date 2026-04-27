import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../../Core/Services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage implements OnInit {
  formLogin: FormGroup;
  erroMessage: string | null = null;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    const session = this.authService.getSession ();

    if (session) {
              this.router.navigate(['store/catalogo'])

    }
  }

  constructor() {
    this.formLogin = this.fb.group({
      vUsuario: ['', [Validators.required, Validators.email]],
      vPassword: ['', Validators.required]
    });
  }

  onAuthentication() {
    this.erroMessage = null;

    if (this.formLogin.valid) {
      // Usamos el método 'login' de AuthService
      this.authService.login(this.formLogin.value).subscribe({
        next: (res) => {
          // El servicio ya guardó la sesión internamente, solo redireccionamos
          if (res.user.iIdTipoUsuario === 1) {
            this.router.navigate(['/admin/dashboard']); // Si es Admin (1)
          } else {
            this.router.navigate(['/store/catalogo']); // Si es Cliente (2)
          }
        },
        error: (err) => {
          this.erroMessage = 'Correo o Contraseña incorrectas.';
        }
      });
    }
  }
}
