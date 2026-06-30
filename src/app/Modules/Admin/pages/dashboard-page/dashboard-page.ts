import { DecimalPipe } from '@angular/common';
import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core'; // <-- Importamos ChangeDetectorRef
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

// Importamos los servicios reales
import { ProductService } from '../../../../Core/Services/product.service';
import { UsuarioService } from '../../../../Core/Services/usuario.service';
import { VentaService } from '../../../../Core/Services/venta.service';

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

  private router = inject(Router);
  private productService = inject(ProductService);
  private usuarioService = inject(UsuarioService);
  private ventaService = inject(VentaService);
  private cdr = inject(ChangeDetectorRef); // <-- Inyectamos el salvavidas

  ngOnInit() {
    this.calcularEstadisticas();
  }

  calcularEstadisticas() {
    // 1. Obtener total de productos (A prueba de paginación)
    this.productService.getProductos().subscribe({
      next: (data: any) => {
        const productos = Array.isArray(data) ? data : (data.content || data.data || []);
        this.totalProductos = productos.length;

        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar productos:', err)
    });

    // 2. Obtener total de clientes
    this.usuarioService.obtenerTodosLosUsuarios().subscribe({
      next: (res: any) => {
        const usuarios = Array.isArray(res) ? res : (res.content || res.data || []);

        //console.log("Usuarios recibidos para contar:", usuarios);

        this.totalClientes = usuarios.filter((u: any) => {
          const rol = String(u.tipoUsuario || '').toUpperCase();
          return rol !== 'ADMIN';
        }).length;

        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('Error al cargar usuarios:', err)
    });

    // 3. Obtener y sumar las ventas reales
    this.ventaService.obtenerTodasLasVentas().subscribe({
      next: (ventas: any) => {
        const listaVentas = Array.isArray(ventas) ? ventas : (ventas?.content || ventas?.data || []);

        this.ingresosMensuales = listaVentas
          .filter((v: any) => {
            // Buscamos el estado usando el nombre correcto (estadoPago o estado)
            const estadoReal = v.estado || v.estadoPago || '';
            return estadoReal.toUpperCase() === 'PAGADO';
          })
          .reduce((suma: number, ventaActual: any) => suma + (ventaActual.total || 0), 0);

        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('Error al cargar ventas:', err)
    });}

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
