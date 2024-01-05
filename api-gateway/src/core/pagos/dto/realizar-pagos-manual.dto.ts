import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RealizarPagoManualRequest {
  @IsDefined()
  @IsInt()
  idPago: number;

  @IsString()
  @IsDefined()
  @MinLength(1)
  @MaxLength(8)
  codigoOperacion: string;

  @IsString()
  @IsOptional()
  observacion: string;

  @IsDate()
  @IsDefined()
  fechaRevision: Date;

  @IsOptional()
  @IsBoolean()
  finalizado: boolean;

  @IsOptional()
  @IsBoolean()
  esTransferenciaBancaria: boolean;

  @IsInt()
  @IsDefined()
  idBancoProcedencia: number;

  @IsNotEmpty()
  @IsString()
  readonly base64: string;

  toString() {
    return JSON.stringify({ ...this });
  }
}
