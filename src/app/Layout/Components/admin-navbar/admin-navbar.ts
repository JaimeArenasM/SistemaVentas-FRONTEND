import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-navbar',
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './admin-navbar.html',
  styleUrl: './admin-navbar.css',
})
export class AdminNavbar implements OnInit{

  nombreAdmin: string = 'Administrador';

  ngOnInit() {
    /*leemos la seccion actual que guardo el authservice*/
    const sessionData= localStorage.getItem('sistema_ventas_data');

    if (sessionData) {
      const parsedData=JSON.parse(sessionData);
      if (parsedData.user && parsedData.user.nombres) {
        this.nombreAdmin = parsedData.user.nombres;
      }
    }
  }
}
