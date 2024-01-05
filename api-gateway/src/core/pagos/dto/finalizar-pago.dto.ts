import { IsBoolean, IsDefined, IsInt, IsString } from 'class-validator';

export class AprobarPagoRequest {
  /**
   * @example 1
   */
  @IsInt()
  @IsDefined()
  idPago: number;

  /**
   * @example 1
   */
  @IsInt()
  @IsDefined()
  idPagoManual: number;

  toJSON() {
    return {
      idPago: this.idPago,
      idPayment: this.idPagoManual,
    };
  }
}

export class RechazarPagoRequest {
  /**
   * @example 1
   */
  @IsInt()
  @IsDefined()
  idPago: number;

  /**
   * @example 1
   */
  @IsInt()
  @IsDefined()
  idPagoManual: number;

  /**
   * @example "observacion prueba"
   */
  @IsString()
  @IsDefined()
  observacion: string;

  /**
   * @example false
   */
  @IsBoolean()
  @IsDefined()
  finalizado: boolean;

  toString() {
    return JSON.stringify({ ...this });
  }
}
