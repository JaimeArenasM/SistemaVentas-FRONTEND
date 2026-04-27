import { Routes } from "@angular/router";
import { HomePage } from "./pages/home-page/home-page";
import { CatalogoPage } from "./pages/catalogo-page/catalogo-page";
import { CarritoPage } from "./pages/carrito-page/carrito-page";
import { CheckoutPage } from "./pages/checkout-page/checkout-page";
import { authGuard } from "../../Core/Guards/auth-guard";



export const storeRoutes: Routes =[
/*{
  path:'home',component:HomePage
},*/
{
  path:'catalogo',component:CatalogoPage
},
/*{
path: 'carrito',component:CarritoPage
},*/
/*{
  path: 'checkout', component: CheckoutPage, canActivate: [authGuard]
},*/
{
path:'',redirectTo:'catalogo',pathMatch:'full'
}
];
