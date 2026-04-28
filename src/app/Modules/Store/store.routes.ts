import { Routes } from "@angular/router";
import { ProductosPage } from "./pages/productos-page/productos-page";
import { CatalogoPage } from "./pages/catalogo-page/catalogo-page";
import { CarritoPage } from "./pages/carrito-page/carrito-page";
import { CheckoutPage } from "./pages/checkout-page/checkout-page";
import { authGuard } from "../../Core/Guards/auth-guard";



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
