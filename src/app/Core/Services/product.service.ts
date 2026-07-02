import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../Interfaces/IProduct.interface";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/productos`;

  /** GET /api/productos (Listar todo el catálogo) */
  getProductos(): Observable<any> {
    const params = new HttpParams().set('size', '100');
    return this.http.get<any>(this.apiUrl, { params });
  }

  /** GET /api/productos/{id} (Buscar un producto específico) */
  getProductoPorId(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  /** POST /api/productos (Crear nuevo producto - Solo Admin) */
  saveProducts(producto: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, producto);
  }

  /** PUT /api/productos/{id} (Actualizar stock, precio, etc. - Solo Admin) */
  actualizarProducto(id: number, producto: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, producto);
  }

  /** DELETE /api/productos/{id} (Desactivar lógicamente) */
  eliminarProducto(id: number): Observable<any> {
    // responseType: 'text' evita que Angular colapse buscando un JSON
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

  /** PUT /api/productos/{id}/reactivar (Volver a activar el producto) */
  reactivarProducto(id: number): Observable<any> {
    // Enviamos un cuerpo vacío {} porque es un PUT que solo cambia estado
    return this.http.put(`${this.apiUrl}/${id}/reactivar`, {}, { responseType: 'text' });
  }
}
