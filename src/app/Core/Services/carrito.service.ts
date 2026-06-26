import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/carrito`;

  /** GET /api/carrito (Obtener los items actuales del usuario) */
  obtenerCarrito(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  /** POST /api/carrito/items (Agregar un producto al carrito) */
  agregarItem(item: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/items`, item);
  }

  /** PUT /api/carrito/items/{idProducto} (Modificar cantidad desde la tabla) */
  actualizarCantidad(idProducto: number, cantidadDto: { cantidad: number }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/items/${idProducto}`, cantidadDto);
  }

  /** DELETE /api/carrito/items/{idProducto} (Quitar un producto específico) */
  eliminarItem(idProducto: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/items/${idProducto}`);
  }

  /** DELETE /api/carrito/limpiar (Vaciar por completo) */
  limpiarCarrito(): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/limpiar`);
  }
}
