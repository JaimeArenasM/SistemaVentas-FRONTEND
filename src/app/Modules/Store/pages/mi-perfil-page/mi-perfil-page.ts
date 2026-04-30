import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../../Core/Services/auth.service';

@Component({
  selector: 'app-mi-perfil-page',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './mi-perfil-page.html',
  styleUrl: './mi-perfil-page.css',
})
export class MiPerfilPage {

  private authService = inject(AuthService);

  usuario: any = {};
  modoEdicion: boolean = false;

  ngOnInit() {
    const session = this.authService.getSession();
    if (session && session.user) {
      // Usamos JSON.parse para hacer una copia y no editar la sesión original por accidente
      this.usuario = JSON.parse(JSON.stringify(session.user));
    }
  }

  activarEdicion() {
    this.modoEdicion = true;
  }

  cancelarEdicion() {
    this.modoEdicion = false;
    this.ngOnInit(); // Restauramos los datos como estaban
  }

  guardarCambios() {
    let dbUsuarios = JSON.parse(localStorage.getItem('donPepe_users_db') || '[]');

    // Buscamos a este usuario en la base de datos local
    const index = dbUsuarios.findIndex((u: any) => u.iIdUsuario === this.usuario.iIdUsuario);

    if (index !== -1) {
      dbUsuarios[index] = this.usuario;
      localStorage.setItem('donPepe_users_db', JSON.stringify(dbUsuarios));

      // Actualizamos la sesión actual para que el Navbar cambie de nombre de inmediato
      const session = this.authService.getSession();
      if (session) {
        session.user = this.usuario;
        this.authService.saveSession(session);
      }

      this.modoEdicion = false;
      alert('¡Perfil actualizado con éxito!');
    }
  }

}
