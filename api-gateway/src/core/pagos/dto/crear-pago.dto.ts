import { Type } from 'class-transformer';
import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class ComprobantePagoRequest {
  @IsOptional()
  @IsInt()
  @Min(1)
  idPersona: number;

  @IsDefined()
  @IsInt()
  @Min(1)
  idTipoComprobante: number;

  @IsDefined()
  @IsInt()
  @Min(1)
  idTipoDocumento: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  numeroDocumento: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  nombres: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  apellidos: string;

  @IsOptional()
  @IsString()
  razonSocial: string;

  @IsOptional()
  @IsString()
  direccion: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(75)
  email: string;

  toString() {
    return JSON.stringify({ ...this });
  }
}

export class InformacionPagoRequest {
  @IsDefined()
  @IsInt()
  @Min(1)
  idBancoUniversidad: number;

  toString() {
    return JSON.stringify({ ...this });
  }
}

export class CrearPagoRequest {
  @IsOptional()
  @IsInt()
  @Min(1)
  idUsuarioSanMarket: number;

  @IsOptional()
  @IsString()
  codigoPago: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => ComprobantePagoRequest)
  comprobantePago: ComprobantePagoRequest;

  @IsDefined()
  @ValidateNested()
  @Type(() => InformacionPagoRequest)
  informacionPago: InformacionPagoRequest;

  toString() {
    return JSON.stringify({ ...this });
  }
}
