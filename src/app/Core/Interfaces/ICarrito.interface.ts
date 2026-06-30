// 1. La interfaz robusta para los ítems
export interface CartItem {
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  idItemCarrito?: number;

  // Por si el backend manda los datos sueltos
  idProducto?: number;
  nombreProducto?: string;
  imagenUrl?: string;

  // Por si el backend los manda en sub-caja (Como lo está haciendo tu Spring Boot)
  producto?: {
    idProducto: number;
    nombre: string;
    precio: number;
    imagenUrl: string;
  };
}

// 2. La interfaz general del carrito (LA QUE FALTABA)
export interface ICarrito {
  idCarrito: number;
  totalCarrito: number;
  items: CartItem[];
}
