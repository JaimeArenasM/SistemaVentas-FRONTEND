import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    DecimalPipe
  ],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage implements OnInit {

  totalProductos: number = 0;
  totalClientes: number = 0;
  ingresosMensuales: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.calcularEstadisticas();
  }

  calcularEstadisticas() {
    const productos = JSON.parse(localStorage.getItem('donPepe_products') || '[]');
    this.totalProductos = productos.length;

    const usuarios = JSON.parse(localStorage.getItem('donPepe_users_db') || '[]');
    this.totalClientes = usuarios.filter((u: any) => u.iIdTipoUsuario === 2).length;

    const ventas = JSON.parse(localStorage.getItem('donPepe_ventas_db') || '[]');
    this.ingresosMensuales = ventas
      .filter((v: any) => v.vEstado === 'Completado')
      .reduce((acum: number, ventaActual: any) => acum + ventaActual.dTotal, 0);
  }

  irVentas() {
    this.router.navigate(['/admin/ventas']);
  }

  irProductos() {
    this.router.navigate(['/admin/productos']);
  }

  irClientes() {
    this.router.navigate(['/admin/clientes']);
  }

}