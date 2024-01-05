import {
  IsInt,
  Min,
  Max,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { MIN_UNIDEP, MAX_UNIDEP } from '@Constants';
import { IntBooleanoEnum } from '@Enums';
import { EstadoItemDestacadoEnum } from '../enums/estado-item-destacado.enum';

export class GetGruposDestacadosQuery {
  @IsOptional()
  @IsInt()
  @Min(MIN_UNIDEP)
  @Max(MAX_UNIDEP)
  idUnidep: number;

  @IsOptional()
  @IsInt()
  @Min(5)
  @Max(25)
  limit: number = 5;

  @IsOptional()
  @IsInt()
  @Min(0)
  offset: number = 0;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  palabraClave: string;

  @IsOptional()
  @IsEnum(IntBooleanoEnum)
  esPaginado: IntBooleanoEnum = IntBooleanoEnum.True;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(EstadoItemDestacadoEnum)
  estadoItemDestacado: EstadoItemDestacadoEnum;

  toString() {
    return JSON.stringify({ ...this });
  }
}
