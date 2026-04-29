import { Routes } from '@angular/router';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';
import { AdminLayoutPage } from '../../Layout/admin-layout-page/admin-layout-page';
import { GestionClientesPage } from './pages/gestion-clientes-page/gestion-clientes-page';

export const Admin_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutPage,
    children: [
      {
        path: 'dashboard',
        component: DashboardPage
      },

      {
        path:'clientes',
        component: GestionClientesPage
      },

      { 
        path: 'gestion-productos', 
        component: GestionProductosPage 
      }


      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      
      

      {path:'**',redirectTo:'dashboard'}
    ]
  }
];
