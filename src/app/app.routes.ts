import { RedirectCommand, Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'auth',
    loadChildren:()=>import('./Modules/Auth/auth.routes').then(m=> m.AUTH_ROUTES)

  },
  {

     /*
*Si abres localhost:4200 sin escribir nada más, te manda directo al Login.
    */
  path:'',
  redirectTo:'auth',
  pathMatch:'full'
  },
  {
    /*
*Si alguien escribe localhost:4200/rutainventada, lo regresas al Login.
    */
    path:'**',
    redirectTo:'auth'
  }
];
