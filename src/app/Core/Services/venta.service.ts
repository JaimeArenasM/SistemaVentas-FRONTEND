import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class VentaService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/ventas`;

  /** POST /api/ventas/checkout (Registrar la compra final de la orden) */
  procesarCheckout(request: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/checkout`, request);
  }

  /** GET /api/ventas/mis-compras (Historial propio del cliente) */
  obtenerMisCompras(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mis-compras`);
  }

  /** GET /api/ventas (Ver todas las órdenes del negocio - Solo Admin) */
  obtenerTodasLasVentas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  /** PUT /api/ventas/{id}/estado (Aprobar, rechazar o despachar - Solo Admin) */
  cambiarEstadoVenta(id: number, estado: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/estado?estado=${estado}`, {});
  }
}
