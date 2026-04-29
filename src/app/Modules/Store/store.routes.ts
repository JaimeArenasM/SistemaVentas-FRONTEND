import { Routes } from "@angular/router";
import { ProductosPage } from "./pages/productos-page/productos-page";
import { CatalogoPage } from "./pages/catalogo-page/catalogo-page";
import { CarritoPage } from "./pages/carrito-page/carrito-page";
import { CheckoutPage } from "./pages/checkout-page/checkout-page";
import { MisComprasPage } from "./pages/mis-compras-page/mis-compras-page";

// Rutas del módulo Store
export const storeRoutes: Routes = [

  // Página principal de tienda
  {
    path: 'catalogo',
    component: CatalogoPage
  },

  // Lista de productos
  {
    path: 'productos',
    component: ProductosPage
  },

  // Carrito de compras
  {
    path: 'carrito',
    component: CarritoPage
  },

  // Checkout
  {
    path: 'checkout',
    component: CheckoutPage
  },

  // Historial de compras
  {
    path: 'mis-compras',
    component: MisComprasPage
  },

  // Redirección por defecto
  {
    path: '',
    redirectTo: 'catalogo',
    pathMatch: 'full'
  }
];