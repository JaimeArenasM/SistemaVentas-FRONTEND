import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { withInterceptors } from '@angular/common/http';
import { authInterceptor } from './Core/Interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideRouter(routes),
    /*Habilita llamadas a internet y conecta el Token de seguridad*/
    provideHttpClient(withInterceptors([authInterceptor]))
  ],
};
