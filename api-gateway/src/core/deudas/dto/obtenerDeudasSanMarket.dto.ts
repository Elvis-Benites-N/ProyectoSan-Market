import { OrdenamientoEnum } from '@/common/enums/ordenamiento.enum';
import { TipoFiltroFechaEnum } from '@/common/enums/tipoFiltroFecha.enum';
import { IntBooleanoEnum } from '@Enums';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum AtributoOrdenamientoDeudasSanMarketEnum {
  ID,
  fechaCreacion,
  itemNombre,
}

export class ObtenerDeudasSanMarketQuery {
  @IsOptional()
  @IsString()
  itemNombre: string;

  @IsOptional()
  @IsString()
  tipoItemIds: string;

  @IsOptional()
  @IsString()
  estadoDeudaIds: string;

  @IsOptional()
  @IsString()
  primeraCuotaEstadoIds: string;

  @IsOptional()
  @IsEnum(TipoFiltroFechaEnum)
  tipoFiltroFechaEnum: TipoFiltroFechaEnum = TipoFiltroFechaEnum.Treintadias;

  @IsOptional()
  @IsInt()
  @Min(3)
  @Max(50)
  limit: number = 3;

  @IsOptional()
  @IsInt()
  @Min(0)
  offset: number = 0;

  @IsOptional()
  @IsEnum(IntBooleanoEnum)
  esPaginado: IntBooleanoEnum = IntBooleanoEnum.True;

  @IsOptional()
  @IsEnum(OrdenamientoEnum)
  readonly ordenamiento: OrdenamientoEnum = OrdenamientoEnum.Descendente;

  @IsOptional()
  @IsEnum(AtributoOrdenamientoDeudasSanMarketEnum)
  readonly atributoOrdenamiento: AtributoOrdenamientoDeudasSanMarketEnum =
    AtributoOrdenamientoDeudasSanMarketEnum.fechaCreacion;

  toString() {
    return JSON.stringify({ ...this });
  }
}
