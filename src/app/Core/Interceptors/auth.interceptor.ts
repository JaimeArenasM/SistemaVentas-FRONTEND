import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const session = authService.getSession();

  // Si existe un token de sesión guardado, clonamos la petición y añadimos la cabecera de seguridad
  if (session && session.token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${session.token}`
      }
    });
    return next(clonedReq);
  }

  // Si no hay sesión, la petición continúa de forma normal (como en Login o Register)
  return next(req);
};
