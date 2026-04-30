

export interface ISale{
  iIdVenta: number;
  iIdCliente: number;
  vNombreCliente: string;
  dTotal: number;
  vFechaEmision: string;
  vEstado: 'Pendiente' |'Completado'|'Anulado',
  aDetalle:any[]
}
