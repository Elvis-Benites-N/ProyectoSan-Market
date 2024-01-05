export interface DeudaInterface {
  readonly id: number;
  readonly fechaCreacion: Date;
  readonly montoTotal: number;
  readonly montoInicial: number;
  readonly montoDescuento: number;
  readonly montoBase: number;
  readonly montoMora: number;
  readonly cantidadCuotas: number;
  readonly cuotas: CuotaInterface[];
  readonly personaDeuda: PersonaDeudaInterface;
  readonly estadoDeuda: EstadoDeudaInterface;
  readonly penalidad?: PenalidadInterface;
}

export interface CuotaInterface {
  readonly id: number;
  readonly numero: number;
  readonly montoMora: number;
  readonly montoTotal: number;
  readonly montoInicial: number;
  readonly fechaMaximaPago: Date;
  readonly fechaPago: Date;
  readonly estadoCuota: EstadoCuotaInterface;
}

export interface EstadoCuotaInterface {
  readonly id: number;
  readonly descripcion: string;
}

export interface PersonaDeudaInterface {
  readonly id: number;
  readonly nombres: string;
  readonly apellidos: string;
  readonly idTipoDocumento: number;
  readonly numeroDocumento: string;
  readonly email: string;
}

export interface EstadoDeudaInterface {
  readonly id: number;
  readonly descripcion: string;
}

export interface PenalidadInterface {
  readonly id?: number;
  readonly monto?: number;
  readonly idTipoTasa?: number;
}
