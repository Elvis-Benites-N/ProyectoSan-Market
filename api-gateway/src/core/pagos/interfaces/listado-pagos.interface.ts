export interface PagosListadoInterface {
  id: number;
  fechaCreacion: Date;
  fechaMaximoPago: Date;
  montoSinIgv: number;
  montoIgv: number;
  montoTotal: number;
  codigoPago: string;
  usuarioSanMarketId: number;
  monedaId: number;
  estadoPagoId: number;
  bancoUniversidadId: number;
  tipoComprobanteId: number;
  tipoDocumentoId: number;
  tipoDocumentoDescripcion: string;
  numeroDocumento: string;
  nombres: string;
  apellidos: string;
  razonSocial: string;
  monedaSimbolo: string;
  monedaDescripcion: string;
  estadoPagoDescripcion: string;
  bancoUniversidadNombre: string;
}
