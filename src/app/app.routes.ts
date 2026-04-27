import { Routes } from '@angular/router';
import { ShopLayoutPage } from './Layout/shop-layout-page/shop-layout-page';
import { authGuard } from './Core/Guards/auth-guard';
import { roleGuard } from './Core/Guards/role-guard';

export const routes: Routes = [

  /* Zona Publica*/
  {
    path: 'auth',
    loadChildren:()=>import('./Modules/Auth/auth.routes').then(m=> m.AUTH_ROUTES)
  },

  /* Zona administrativa */
  {

    path: 'admin',
    loadChildren: () => import('./Modules/Admin/admin.routes').then(m => m.Admin_ROUTES),
    /*
    vemos si esta logeado y pedimos que pase el filtro rol
    */
   canActivate:[authGuard,roleGuard],
   /* le decimos al guard que si es para entrar aqui, el rol esperado debe ser 1 */
    data:{rolEsperado:1}
  },

  /* Zona del cliente */
  {
    path: 'store',
    component:ShopLayoutPage,
    loadChildren: () => import('./Modules/Store/store.routes').then(m => m.storeRoutes)
  },

  // Rutas por defecto
  { path:'',    redirectTo:'store/catalogo',    pathMatch:'full'  },
  { path:'**',    redirectTo:'store/catalogo'  }
];
