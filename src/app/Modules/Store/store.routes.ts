import { Routes } from "@angular/router";
import { ProductosPage } from "./pages/productos-page/productos-page";
import { CatalogoPage } from "./pages/catalogo-page/catalogo-page";
import { CarritoPage } from "./pages/carrito-page/carrito-page";
import { CheckoutPage } from "./pages/checkout-page/checkout-page";
import { TermsComponent } from "./pages/terminos-page/terminos-page";
import { MisComprasPage } from "./pages/mis-compras-page/mis-compras-page";
import { PoliticaprivPage } from "./pages/politicapriv-page/politicapriv-page";
import { authGuard } from "../../Core/Guards/auth-guard";
import { MiPerfilPage } from "./pages/mi-perfil-page/mi-perfil-page";



export const storeRoutes: Routes =[
/*{
  path:'productos',component:ProductosPage
},*/
{
  path:'catalogo',component:CatalogoPage
},
{
  path: 'productos',
  component: ProductosPage
},
{
path: 'carrito',component:CarritoPage
},
{
  path:'mis-compras',
  component:MisComprasPage, canActivate:[authGuard]
},
{
  path:'terminos',
  component:TermsComponent
},
{
  path:'politica-de-privacidad',
  component: PoliticaprivPage
},
{
  path:'perfil',
  component: MiPerfilPage, canActivate:[authGuard]
},
{
  path: 'checkout', component: CheckoutPage, canActivate: [authGuard]
},
{
path:'',redirectTo:'catalogo',pathMatch:'full'
}
];
