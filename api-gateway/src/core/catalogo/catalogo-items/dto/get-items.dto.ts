import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { OrdenamientoEnum, IntBooleanoEnum } from '@Enums';
import { TipoEstadoItemEnum } from '../enums/tipo-estado-item.enum';
import { TipoFiltroUnidepEnum } from '../enums/tipo-filtro-unidep.enum';

export enum ItemsOrdenamiento {
  AZ,
  ZA,
  Antiguos,
  Recientes,
}

export enum AtributoOrdenamientoItemsEnum {
  Descripcion,
  FechaRegistro,
  Precio,
}
export class CatalogoItemsQuery {
  @IsOptional()
  @IsNotEmpty()
  unidepCodigo?: string;

  @IsOptional()
  @IsNotEmpty()
  unidepDescripcion?: string;

  @IsOptional()
  @IsEnum(TipoFiltroUnidepEnum)
  readonly tipoDeFiltroUnidep?: TipoFiltroUnidepEnum =
    TipoFiltroUnidepEnum.UnidepEHijos;

  @IsOptional()
  @IsInt()
  readonly tipoDeItem?: number;

  @IsOptional()
  @IsEnum(TipoEstadoItemEnum)
  readonly estado?: TipoEstadoItemEnum;

  @IsOptional()
  @IsInt()
  @Min(3)
  @Max(50)
  readonly limit?: number = 3;

  @IsOptional()
  @IsInt()
  @Min(0)
  readonly offset?: number = 0;

  @IsOptional()
  @IsEnum(IntBooleanoEnum)
  esPaginado?: IntBooleanoEnum = IntBooleanoEnum.True;

  @IsOptional()
  @IsInt()
  @Min(1)
  readonly categoria?: number;

  @IsOptional()
  @IsEnum(ItemsOrdenamiento)
  readonly ordenarPor?: ItemsOrdenamiento = ItemsOrdenamiento.AZ;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  readonly palabraClave?: string;

  // USO LOCAL
  ordenamiento?: OrdenamientoEnum;
  atributoOrdenamiento?: AtributoOrdenamientoItemsEnum;

  toString() {
    this.prepararOrdenamiento();
    return JSON.stringify({ ...this });
  }

  private prepararOrdenamiento(): void {
    switch (this.ordenarPor) {
      case ItemsOrdenamiento.AZ:
        this.atributoOrdenamiento = AtributoOrdenamientoItemsEnum.Descripcion;
        this.ordenamiento = OrdenamientoEnum.Ascendente;
        break;
      case ItemsOrdenamiento.ZA:
        this.atributoOrdenamiento = AtributoOrdenamientoItemsEnum.Descripcion;
        this.ordenamiento = OrdenamientoEnum.Descendente;
        break;
      case ItemsOrdenamiento.Antiguos:
        this.atributoOrdenamiento = AtributoOrdenamientoItemsEnum.FechaRegistro;
        this.ordenamiento = OrdenamientoEnum.Ascendente;
        break;
      case ItemsOrdenamiento.Recientes:
        this.atributoOrdenamiento = AtributoOrdenamientoItemsEnum.FechaRegistro;
        this.ordenamiento = OrdenamientoEnum.Descendente;
        break;
      default:
        this.atributoOrdenamiento = AtributoOrdenamientoItemsEnum.Descripcion;
        this.ordenamiento = OrdenamientoEnum.Ascendente;
    }
  }
}
