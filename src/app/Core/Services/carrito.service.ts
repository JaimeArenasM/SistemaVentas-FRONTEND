import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs'; // 1. Importar Subject y tap
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/carrito`;

  // 2. EL MEGÁFONO
  private _carritoActualizado = new Subject<void>();
  carritoActualizado$ = this._carritoActualizado.asObservable();

  obtenerCarrito(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // 3. Al agregar, avisamos a todos: "¡Oigan, el carrito cambió!"
  agregarItem(item: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/items`, item)
      .pipe(tap(() => this._carritoActualizado.next()));
  }

  eliminarItem(idProducto: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/items/${idProducto}`)
      .pipe(tap(() => this._carritoActualizado.next()));
  }

  /** DELETE /api/carrito/limpiar (Vaciar por completo) */
  limpiarCarrito(): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/limpiar`);
  }
}
