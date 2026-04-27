import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of, throwError } from "rxjs";
import { IAuthenticationRequest, IAuthenticationResponse, IUser } from "../Interfaces/IUser.interface";


@Injectable({
  providedIn:'root'
})
export class AuthService{

  private router = inject(Router);
  /* llave para la lista de todos los usuarios y asi funcione el register */
  private readonly DB_USERS_KEY = 'donPepe_users_db';
  /* para el usuario logueado actualmente se le simule un token */
  private readonly SESSION_KEY = 'sistema_ventas_data';

  constructor(){
    this.crearAdminPorDefecto();
  }

  /**LOGIN */
  login(carga: IAuthenticationRequest): Observable<IAuthenticationResponse>{
    const usuarios = this.obtenerTodosLosUsuarios();

    /**buscar si la contraseña y correo coinciden */
    const usuarioValido = usuarios.find(u => u.vUsuario === carga.vUsuario && u.password===carga.vPassword);

    if (usuarioValido) {
      const response: IAuthenticationResponse={
        token: 'eisjaimdsNASDJSA51asd'+ new Date().getTime(), /**token */
        user: usuarioValido
      };
      this.saveSession(response);
      return of(response);
    }
    return throwError(()=> new Error('Credenciales incorrectas'));
  }

  /**REGISTROOO */
  registrar(nuevoUsuario: IUser):Observable<boolean>{
    const usuarios =this.obtenerTodosLosUsuarios();

    if(usuarios.find(u=> u.vUsuario === nuevoUsuario.vUsuario)){
      return throwError(()=> new Error('El correo ya esta registrado'));
    }

    usuarios.push(nuevoUsuario);
    localStorage.setItem(this.DB_USERS_KEY,JSON.stringify(usuarios));
    return of(true);
  }

/**MANEJO DE LA SESION LOCAL */

saveSession(data: IAuthenticationResponse): void{
  localStorage.setItem(this.SESSION_KEY,JSON.stringify(data));
}

getSession(): IAuthenticationResponse | null{
const data = localStorage.getItem(this.SESSION_KEY);
return data ? JSON.parse(data): null;
}

logout(): void{
  localStorage.removeItem(this.SESSION_KEY);
  this.router.navigate(['/auth/login']);
}

  /** METODOS PRIVADOS */
  private obtenerTodosLosUsuarios():any[]{
const data = localStorage.getItem(this.DB_USERS_KEY);
return data ? JSON.parse(data) : [];
  }

  private crearAdminPorDefecto():void {
    const usuarios = this.obtenerTodosLosUsuarios();
    if ( usuarios.length === 0){
      const admin = {
        vUsuario:'admin@tienda.com',
        password: '123456',
        iIdTipoUsuario: 1 /** ADMIN: 1 , CLIENTE: 2 */
      };
      localStorage.setItem(this.DB_USERS_KEY,JSON.stringify([admin]));
    }
  }
}
