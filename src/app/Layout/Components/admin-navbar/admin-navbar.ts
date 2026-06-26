import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../../Core/Services/auth.service';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './admin-navbar.html',
  styleUrl: './admin-navbar.css',
})
export class AdminNavbar implements OnInit {

  nombreAdmin: string = 'Administrador';
  private authService = inject(AuthService);

  ngOnInit() {
    const session = this.authService.getSession();

    if (session) {
      // Usamos el correo directo o el del objeto user por si el backend lo anida
      this.nombreAdmin = session.correo || session.user?.correo || 'Administrador';
    }
  }
}
