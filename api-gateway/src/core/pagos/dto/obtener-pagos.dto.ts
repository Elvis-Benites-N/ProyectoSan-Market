import { IntBooleanoEnum, OrdenamientoEnum } from '@/common/enums';
import { FechaFiltro } from '@/common/validators';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
  Validate,
} from 'class-validator';

export enum AtributoOrdenamientoPagoConsulta {
  ID,
  FechaCreacion,
  Estado,
  IdBancoUniversidad,
}
export class ObtenerPagosQuery {
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly idUsuarioSanMarket?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  readonly idBancoUniversidad?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  readonly idEstado?: number;

  @IsOptional()
  @IsString()
  readonly codigo?: string;

  @IsOptional()
  @Validate(FechaFiltro)
  readonly fechaInicial?: string;

  @IsOptional()
  @Validate(FechaFiltro)
  readonly fechaFinal?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  readonly limit?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(0)
  readonly offset?: number = 0;

  @IsOptional()
  @IsEnum(IntBooleanoEnum)
  readonly esPaginado?: IntBooleanoEnum = IntBooleanoEnum.True;

  @IsOptional()
  @IsEnum(OrdenamientoEnum)
  readonly ordenamiento?: OrdenamientoEnum = OrdenamientoEnum.Descendente;

  @IsOptional()
  @IsEnum(AtributoOrdenamientoPagoConsulta)
  readonly atributoOrdenamiento?: AtributoOrdenamientoPagoConsulta =
    AtributoOrdenamientoPagoConsulta.ID;

  // Para usar localmente
  fechaInicialDate?: Date;
  fechaFinalDate?: Date;

  toString() {
    return JSON.stringify({ ...this });
  }
}
