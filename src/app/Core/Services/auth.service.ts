import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

// IMPORTAMOS LAS INTERFACES ACTUALIZADAS (Las que creamos según el Swagger)
import { LoginRequest, LoginResponse, RegistroRequest } from "../Interfaces/IUser.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private router = inject(Router);
  private http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/auth`;
  private readonly SESSION_KEY = 'sistema_ventas_data';

  constructor() {}

  /** LOGIN REAL A SPRING BOOT */
  login(carga: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/iniciarSesion`, carga).pipe(
      tap(response => {
        this.saveSession(response);
      })
    );
  }

  /** REGISTRO REAL A SPRING BOOT */
  registrar(nuevoUsuario: RegistroRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar`, nuevoUsuario);
  }

  /** MANEJO DE LA SESION LOCAL */
  saveSession(data: LoginResponse): void {
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(data));
  }

  getSession(): any | null {
    const data = localStorage.getItem(this.SESSION_KEY);
    if (data) {
      const parsedData = JSON.parse(data);
      // Validamos que el token exista y que el usuario tenga un correo o rol asignado
      if (parsedData && parsedData.token && parsedData.nombres) {
        return parsedData;
      }
    }
    // Si la data está corrupta, la borramos y fingimos que no hay nadie
    localStorage.removeItem(this.SESSION_KEY);
    return null;
  }

  logout(): void {
    localStorage.removeItem(this.SESSION_KEY);
    // Redirigimos al catálogo público en lugar del inexistente '/auth/catalogo'
    this.router.navigate(['/store/catalogo']);
  }

  solicitarRecuperacion(correo: string): Observable<any>{
    return this.http.post(`${this.apiUrl}/solicitar-recuperacion`, {correo});
  }

  resetPassword(token: string, nuevaPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { token, nuevaPassword });
  }
}
