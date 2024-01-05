export interface DeudasSanMarketListadoInterface {
  id: number;
  publicKey: string;
  cantidadCuotas: number;
  itemNombre: string;
  unidadPadreNivel2Id: number;
  unidadPadreNivel2Descripcion: string;
  tipoItemId: number;
  tipoItemDescripcion: string;
  fechaCreacion: string;
  montoTotal: number;
  montoDescuento: number;
  tipoDocumentoId: number;
  tipoDocumentoDescripcion: string;
  personaNumeroDocumento: string;
  personaNombreCompleto: string;
  personaCorreo: string;
  estadoDeudaId: number;
  estadoDeudaDescripcion: string;
  primeraCuotaPagadaId: number;
  primeraCuotaNoPagadaFecha: Date;
  primeraCuotaNoPagadaEstadoId: number;
  primeraCuotaNoPagadaEstadoDescriocion: string;
  cuotasPagadas: boolean;
}
