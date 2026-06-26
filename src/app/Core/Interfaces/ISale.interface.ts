export interface DetalleVenta {
  nombreProducto: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface ISale {
  idVenta: number;
  nombreCliente: string;
  fechaVenta: string;
  total: number;
  metodoPago: string;
  estadoPago: string;
  detalles: DetalleVenta[];
}
