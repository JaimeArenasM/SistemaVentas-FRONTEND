import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthSercice } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


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
  ], /* -> necesario para el funcionamiento del Form Group en html :D */
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  formLogin: FormGroup;
erroMessage: string | null=null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthSercice,
    private router: Router,
  ) {
    this.formLogin = this.fb.group({
      vUsuario: ['', [Validators.required, Validators.email]],
      vPassword: ['', Validators.required]
    });
  }

  onAuthentication() {

    this.erroMessage=null;

    if (this.formLogin.valid) {
      this.authService.Authentication(this.formLogin.value).subscribe({
        next: (res) => {
          this.authService.saveSession(res); //se guarda la sesion
          this.router.navigate(['/dasboard']); // nos dirige al sistema

        },
        error: (err)=>{
          //por si falla las credenciales
          this.erroMessage= 'Correo o Contraseña incorrectas.';
        }
      });
    }
  }


}
