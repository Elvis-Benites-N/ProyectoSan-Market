import {
  IsEnum,
  IsInt,
  IsOptional,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';
import { MAX_UNIDEP, MIN_UNIDEP } from '@Constants';
import { IntBooleanoEnum } from '@Enums';

export class CatalogoMaestrosQuery {
  @IsOptional()
  @IsEnum(IntBooleanoEnum)
  categoria: IntBooleanoEnum = IntBooleanoEnum.False;

  @IsOptional()
  @IsEnum(IntBooleanoEnum)
  moneda: IntBooleanoEnum = IntBooleanoEnum.False;

  @IsOptional()
  @IsEnum(IntBooleanoEnum)
  tipoAfectacion: IntBooleanoEnum = IntBooleanoEnum.False;

  @IsOptional()
  @IsEnum(IntBooleanoEnum)
  tipoItem: IntBooleanoEnum = IntBooleanoEnum.False;

  @IsOptional()
  @IsEnum(IntBooleanoEnum)
  arbol: IntBooleanoEnum = IntBooleanoEnum.False;

  @ValidateIf((o) => o.arbol === IntBooleanoEnum.True)
  @IsOptional()
  @IsInt()
  @Min(MIN_UNIDEP)
  @Max(MAX_UNIDEP)
  unidep: number = MIN_UNIDEP;

  toString() {
    return JSON.stringify({ ...this });
  }
}

export interface CatalogoMaestrosResponse {
  categorias?: {
    id: number;
    tipo: string;
    items: {
      id: number;
      descripcion: string;
    }[];
  }[];
  clasificadoresIngreso?: {
    id: number;
    especifica: string;
    descripcion: string;
  }[];
  monedas?: {
    id: number;
    simbolo: string;
    descripcion: string;
    eq_sunat: string;
  }[];
  tiposAfectacion?: {
    id: number;
    descripcion: string;
  }[];
  tiposItem?: {
    id: number;
    descripcion: string;
    tipoItems?: {
      id: number;
      descripcion: string;
    }[];
  }[];
  unidadesMedida?: {
    codigo: string;
    descripcion: string;
  }[];

  detracciones?: {
    id: number;
    codigo: string;
    descripcion: string;
    porcentaje: number;
  }[];
}
