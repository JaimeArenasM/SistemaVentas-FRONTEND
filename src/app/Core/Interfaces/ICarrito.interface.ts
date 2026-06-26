export interface CartItem {
  nombreProducto: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  idProducto?: number;
  imagenUrl?: string;
}

export interface ICarrito {
  idCarrito: number;
  totalCarrito: number;
  items: CartItem[];
}
