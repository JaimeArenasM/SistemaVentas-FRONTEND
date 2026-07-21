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
    // 1. PRODUCTOS
    this.productService.getProductos().subscribe({
      next: (res: any) => {
        // Lógica "bulldozer" para atrapar el número donde sea que venga
        let total = 0;
        if (res && res.totalElements !== undefined) total = res.totalElements;
        else if (res && res.content) total = res.content.length;
        else if (Array.isArray(res)) total = res.length;
        else if (res && res.data) total = res.data.length;

        this.totalProductos = total;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('❌ Error al cargar productos:', err)
    });

    // 2. USUARIOS (CLIENTES)
    this.usuarioService.obtenerTodosLosUsuarios().subscribe({
      next: (res: any) => {
        const usuarios = Array.isArray(res) ? res : (res?.content || res?.data || []);

        this.totalClientes = usuarios.filter((u: any) => {
          const rol = String(u.tipoUsuario || '').trim().toUpperCase();
          return rol !== 'ADMIN';
        }).length;

        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('❌ Error al cargar usuarios:', err)
    });

    // 3. VENTAS
    this.ventaService.obtenerTodasLasVentas().subscribe({
      next: (res: any) => {
        const listaVentas = Array.isArray(res) ? res : (res?.content || res?.data || []);

        // Vamos a sumar TODO para que desaparezca el S/ 0.00.
        // Si quieres que solo sume las pagadas, quita el comentario del 'if'
        this.ingresosMensuales = listaVentas.reduce((suma: number, v: any) => {

          const estado = String(v.estadoPago || '').trim().toUpperCase();

          // if (estado === 'PAGADO') {
            return suma + (Number(v.total) || 0);
          // }
          // return suma;

        }, 0);

        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('❌ Error al cargar ventas:', err)
    });
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
