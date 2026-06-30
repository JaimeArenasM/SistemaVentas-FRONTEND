import { Component, inject, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Subscription } from 'rxjs';
import { CarritoService } from '../../../../Core/Services/carrito.service';
import { ICarrito, CartItem } from '../../../../Core/Interfaces/ICarrito.interface';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatToolbarModule, RouterModule],
  templateUrl: './carrito-page.html',
  styleUrls: ['./carrito-page.css']
})

export class CarritoPage implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  totalCarrito: number = 0;
  private carritoSub?: Subscription;

  private router = inject(Router);
  private cartService = inject(CarritoService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.cargarCarrito();
    this.carritoSub = this.cartService.carritoActualizado$.subscribe(() => {
      this.cargarCarrito();
    });
  }

  ngOnDestroy() {
    this.carritoSub?.unsubscribe();
  }

  cargarCarrito() {
    this.cartService.obtenerCarrito().subscribe({
      next: (res: ICarrito) => {
        // Aseguramos la actualización
        this.cartItems = res?.items ? [...res.items] : [];
        this.totalCarrito = res?.totalCarrito || 0;

        this.cdr.detectChanges();
        console.log("🔥 Items cargados en vista:", this.cartItems);
      },
      error: (err) => {
        console.error('Error al cargar el carrito:', err);
        this.cartItems = [];
        this.totalCarrito = 0;
        this.cdr.detectChanges();
      }
    });
  }

  remove(item: CartItem): void {
    // Usamos el ID que viene en el JSON que me mostraste: "idProducto"
    const id = item.idProducto;

    if (!id) {
      console.error('No se pudo eliminar: ID no encontrado en:', item);
      return;
    }

    this.cartService.eliminarItem(id).subscribe({
      next: () => {
        // No hace falta llamar a cargarCarrito aquí,
        // porque el Subject en el servicio ya dispara la carga en el ngOnInit
        console.log("Producto eliminado correctamente");
      },
      error: (err) => console.error('Error al eliminar:', err)
    });
  }

  irAPagar(): void {
    if (this.totalCarrito === 0) {
      alert('El carrito está vacío');
      return;
    }
    this.router.navigate(['/store/checkout']);
  }
}
