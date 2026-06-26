import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const session = authService.getSession();

  // Si no hay sesión, lo mandamos al login
  if (!session) {
    router.navigate(['/auth/login']);
    return false;
  }

  const expectedRole = String(route.data['expectedRole'] || '').toUpperCase();
  const userRole = String(session.tipoUsuario || '').toUpperCase();

  // Si el rol coincide, lo dejamos pasar
  if (userRole === expectedRole) {
    return true;
  } else {
    // Si no coincide, lo redirigimos a donde pertenece
    if (userRole === 'ADMIN') {
      router.navigate(['/admin/dashboard']);
    } else {
      router.navigate(['/store/catalogo']);
    }
    return false;
  }
};
