export interface Product {
  idProducto: number;
  nombreCategoria: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagenUrl: string;
  estado: string; // Ej: "ACTIVO", "INACTIVO"
}

// Interfaz para cuando el administrador CREA o EDITA un producto (ProductoRequest)
export interface ProductRequest {
  idCategoria: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagenUrl: string;
}

export interface PageProductoResponse {
  content: Product[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
