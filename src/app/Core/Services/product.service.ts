import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../Interfaces/IProduct.interface";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/productos`;

  /** GET /api/productos (Listar todo el catálogo) */
  getProductos(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
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

  /** DELETE /api/productos/{id} (Eliminar producto del sistema - Solo Admin) */
  eliminarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
