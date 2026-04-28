import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

/* Angular Material */
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

/* Service */
import { CarritoService } from '../../../../Core/Services/carrito.service';

@Component({
  selector: 'app-carrito',
  standalone: true,

  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ],

  templateUrl: './carrito-page.html',
  styleUrls: ['./carrito-page.css']
})

export class CarritoPage {

  cartItems: any[] = [];

  private router = inject(Router);

  private cartService =
    inject(CarritoService);

  ngOnInit() {

    this.cartService.cartItems$
      .subscribe(items => {

        this.cartItems = items;

      });

  }

  get total(): number {

    return this.cartService
      .getTotalPrice();

  }

  remove(productId: number): void {

    this.cartService
      .removeFromCart(productId);

  }

  irAPagar(): void {

    if (this.total === 0) {

      alert('El carrito está vacío');

      return;

    }

    this.router.navigate(
      ['/store/checkout']
    );

  }

  volverAlDashboard(): void {

    this.router.navigate(
      ['/store/catalogo']
    );

  }

}