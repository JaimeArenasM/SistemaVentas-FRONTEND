import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../Services/auth.service";


export const authGuard: CanActivateFn = (route,state)=>{
  /*Inyectamos el Router para poder redireccionar al usuario*/
  const router = inject(Router);
  const authService = inject(AuthService);

  /*Verificamos si existe la variable de sesion en el LocalStorage */
const session = authService.getSession();


if(session){
  /* si hay sesion, da acceso */
return true;
}else{
  /*si no hay sesion, no da el acceso y te manda al login */
  router.navigate(['/auth/login']);
  return false;
}
};
