import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private http = inject(HttpClient);
  private readonly apiUrlUsuarios = `${environment.apiUrl}/usuarios`;
  private readonly apiUrlClientes = `${environment.apiUrl}/clientes`;

  // === MÉTODOS DE CLIENTE (cliente-controller) ===

  /** GET /api/clientes/perfil */
  obtenerMiPerfil(): Observable<any> {
    return this.http.get<any>(`${this.apiUrlClientes}/perfil`);
  }

  /** PUT /api/clientes/perfil */
  actualizarMiPerfil(datosActualizados: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrlClientes}/perfil`, datosActualizados);
  }

  // === MÉTODOS DE CONTROL (usuario-controller) ===

  /** GET /api/usuarios (Listar todos los trabajadores/clientes en el panel de Admin) */
  obtenerTodosLosUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlUsuarios);
  }

  /** PUT /api/usuarios/{id}/estado (Dar de baja o activar cuentas - Solo Admin) */
  cambiarEstadoUsuario(id: number, estado: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrlUsuarios}/${id}/estado?estado=${estado}`, {});
  }

  actualizarUsuario(id: number, datosActualizados:any): Observable<any>{
    return this.http.put<any>(`${this.apiUrlUsuarios}/${id}`, datosActualizados);
  }
}
