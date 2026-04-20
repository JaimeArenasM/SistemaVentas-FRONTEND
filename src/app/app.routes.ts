import { RedirectCommand, Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'auth',
    loadChildren:()=>import('./Modules/Auth/auth.routes').then(m=> m.AUTH_ROUTES)
  },
  {
    /* 
    * ESTA ES LA NUEVA RUTA QUE VAMOS A AGREGAR PARA ENTRAR A TU TIENDA 
    * Pongo 'dasboard' (sin la h) porque así lo escribió tu compañero en el login.
    */
    path: 'dashboard', 
    loadComponent: () => import('./Modules/main/dashboard/dashboard').then(m => m.Dashboard)
  },
  {
    /*Si abres localhost:4200 sin escribir nada más, te manda directo al Login.*/
    path:'',
    redirectTo:'auth',
    pathMatch:'full'
  },
  {
    /*Si alguien escribe localhost:4200/rutainventada, lo regresas al Login.*/
    path:'**',
    redirectTo:'auth'
  }
];