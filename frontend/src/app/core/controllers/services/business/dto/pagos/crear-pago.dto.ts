export interface ComprobantePagoRequest {
  idTipoComprobante: number;
  idTipoDocumento: number;
  numeroDocumento: string;
  nombres?: string;
  apellidos?: string;
  razonSocial?: string;
  direccion?: string;
  email: string;
}

export interface InformacionPagoRequest {
  idBancoUniversidad: number;
}

export interface CrearPagoRequest {
  codigoPago: string;
  comprobantePago: ComprobantePagoRequest;
  informacionPago: InformacionPagoRequest;
}
