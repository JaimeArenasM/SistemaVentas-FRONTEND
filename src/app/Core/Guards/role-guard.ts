import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../Services/auth.service";
import { inject } from "@angular/core";



export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);


  /*Obtener la sesion actual usando el servicio*/

  const session = authService.getSession();
  /* por si llega sin sesion */
  if (!session) {
    router.navigate(['/auth/login']);
    return false;
  }

  /*Leemos que rol exige esta pagina especifica*/
  const rolEsperado = route.data['rolEsperado'];

  /* Comparamos si el rol del usuario */
  if (session.user.iIdTipoUsuario === rolEsperado) {
    return true;
  } else {
    /**por si no coincide */
    if (session.user.iIdTipoUsuario === 1) {
      router.navigate(['/admin/dashboard']);
    } else {
      router.navigate(['/store/catalogo']);
    }
    return false;
  }
};
