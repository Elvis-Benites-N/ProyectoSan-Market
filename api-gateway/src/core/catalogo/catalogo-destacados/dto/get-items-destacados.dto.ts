import {
  IsOptional,
  IsInt,
  Min,
  Max,
  IsEnum,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { MIN_UNIDEP, MAX_UNIDEP } from '@Constants';
import { IntBooleanoEnum, OrdenamientoEnum } from '@Enums';
import { Unidep } from '@Interfaces';
import { EstadoItemDestacadoEnum } from '../enums/estado-item-destacado.enum';
import { TipoDeItemEnum } from '../../catalogo-items/enums/tipo-item.enum';
import { AtributoOrdenamientoItemsEnum } from '../../catalogo-items/dto/get-items.dto';
import { GrupoResponse } from '../../catalogo-grupos/dto/obtener-grupo.dto';
import { ItemCatalogoInterface } from '../../catalogo-items/interfaces/item-catalogo.interface';

export class GetItemsDestacadosQuery {
  @IsOptional()
  @IsInt()
  @Min(MIN_UNIDEP)
  @Max(MAX_UNIDEP)
  idUnidep: number;

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
  @IsEnum(TipoDeItemEnum)
  tipoDeItem: TipoDeItemEnum;

  @IsOptional()
  @IsEnum(IntBooleanoEnum)
  esPaginado: IntBooleanoEnum = IntBooleanoEnum.True;

  @IsOptional()
  @IsEnum(IntBooleanoEnum)
  soloActivos: IntBooleanoEnum = IntBooleanoEnum.True;

  @IsOptional()
  @IsEnum(EstadoItemDestacadoEnum)
  estadoItemDestacado: EstadoItemDestacadoEnum;

  @IsOptional()
  @IsEnum(OrdenamientoEnum)
  ordenamiento: OrdenamientoEnum = OrdenamientoEnum.Ascendente;

  @IsOptional()
  @IsEnum(AtributoOrdenamientoItemsEnum)
  atributoOrdenamiento: AtributoOrdenamientoItemsEnum =
    AtributoOrdenamientoItemsEnum.Descripcion;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  palabraClave: string;

  toString() {
    return JSON.stringify({ ...this });
  }
}

export interface EstadoDestacado {
  id: number;
  descripcion: string;
}

export interface DestacadoResponse {
  id: number;
  titulo_destacado: string;
  fecha_inicio: Date;
  fecha_fin: Date;
  itemCatalogo?: ItemCatalogoInterface;
  grupo?: GrupoResponse;
  unidep: Unidep;
  estadoDestacado: EstadoDestacado;
}
