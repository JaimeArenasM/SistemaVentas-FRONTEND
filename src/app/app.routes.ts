import { RedirectCommand, Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'auth',
    loadChildren:()=>import('./Modules/Auth/auth.routes').then(m=> m.AUTH_ROUTES)
  },
  {
    path: 'dashboard', 
    loadComponent: () => import('./Modules/main/dashboard/dashboard').then(m => m.Dashboard)
  },
  {
    path: 'carrito',
    loadComponent: () => import('./Modules/main/carrito/carrito').then(m => m.CarritoComponent)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./Modules/main/checkout/checkout').then(m => m.CheckoutComponent)
  },
  {
    path:'',
    redirectTo:'auth',
    pathMatch:'full'
  },
  {
    path:'**',
    redirectTo:'auth'
  }
];