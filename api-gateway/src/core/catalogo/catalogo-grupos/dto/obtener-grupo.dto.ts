import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { IntBooleanoEnum, OrdenamientoEnum } from '@Enums';
import { ItemCatalogoInterface } from '../../catalogo-items/interfaces/item-catalogo.interface';

export enum AtributoOrdenamientoGruposEnum {
  Nombre,
  ID,
  Precio,
}

export class ObtenerGruposQuery {
  @IsOptional()
  @IsInt()
  @Min(10000)
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
  @IsEnum(IntBooleanoEnum)
  esPaginado: IntBooleanoEnum = IntBooleanoEnum.True;

  @IsOptional()
  @IsEnum(OrdenamientoEnum)
  ordenamiento: OrdenamientoEnum = OrdenamientoEnum.Ascendente;

  @IsOptional()
  @IsEnum(AtributoOrdenamientoGruposEnum)
  atributoOrdenamiento: AtributoOrdenamientoGruposEnum =
    AtributoOrdenamientoGruposEnum.Nombre;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(75)
  palabraClave: string;
}

export interface GrupoResponse {
  readonly id: number;
  readonly nombre: string;
  readonly unidep_id: number;
  readonly unidep_descripcion: string;
  readonly moneda_id: number;
  readonly moneda_simbolo: string;
  readonly precio: number;
  readonly items: ItemCatalogoInterface[];
}
