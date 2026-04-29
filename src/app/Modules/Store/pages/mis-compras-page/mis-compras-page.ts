import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-mis-compras',
  standalone: true,

  // Importamos módulos necesarios
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],

  templateUrl: './mis-compras-page.html',
  styleUrls: ['./mis-compras-page.css']
})
export class MisComprasPage implements OnInit {

  // Lista de compras almacenadas
  compras: any[] = [];

  ngOnInit(): void {
    this.cargarCompras();
  }

  // Cargar compras desde localStorage
  cargarCompras(): void {
    this.compras = JSON.parse(localStorage.getItem('compras') || '[]');
  }

  // Limpiar historial
  limpiarHistorial(): void {
    localStorage.removeItem('compras');
    this.compras = [];
  }
}