import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { IAuthenticationRequest, IAuthenticationResponse } from "../Interfaces/IAuth.interface";
import { Observable, of, throwError } from "rxjs";



@Injectable({
  providedIn: 'root' //eso hace que el servicio sea unico en toda la app
})
export class AuthSercice {
  //ESTA SERA LA LLAVE CON LA QUE GUARDAREMOS EL JSON
  private readonly AUTH_KEY = 'sistema_ventas_data';


  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  /*
  *AUTENTICACION SIMULADA
  */
  Authentication(carga: IAuthenticationRequest): Observable<IAuthenticationResponse> {
    if (carga.vUsuario == 'admin@tienda.com' && carga.vPassword == '123456') {
      const response: IAuthenticationResponse = {
        token: 'eidiaokIOSIADJIOkoksoakdopsk56156', //simulado
        user: {
          iIdUsuario: 1,
          vUsuario: 'admin_tienda',
          iIdTipoUsuario: 1,
          iIdPersona: 5
        }
      };
      return of(response);
    }
    return throwError(() => new Error('credenciales incorrectas'));
  }
  //AQUI SE GUARDA EL JSON
  saveSession(data: IAuthenticationResponse): void {
    /*   *Convierte el objeto {} en un String  */
    localStorage.setItem(this.AUTH_KEY, JSON.stringify(data));
  }
  getSession(): IAuthenticationResponse | null {
    const data = localStorage.getItem(this.AUTH_KEY);
    return data ? JSON.parse(data) : null;
  }

  /*
   * Elimina los datos de la sesión del localStorage para cerrar sesión.
   */
  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}


