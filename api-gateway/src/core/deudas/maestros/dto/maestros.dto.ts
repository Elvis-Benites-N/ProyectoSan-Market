import { IntBooleanoEnum } from '@/common/enums';
import { IdLabel } from '@Interfaces';
import { IsEnum, IsOptional } from 'class-validator';

export class MaestrosQuery {
  @IsOptional()
  @IsEnum(IntBooleanoEnum)
  tiposDeFrecuenciaPenalidad: IntBooleanoEnum = IntBooleanoEnum.False;

  @IsOptional()
  @IsEnum(IntBooleanoEnum)
  tiposDeTasa: IntBooleanoEnum = IntBooleanoEnum.False;

  @IsOptional()
  @IsEnum(IntBooleanoEnum)
  estados: IntBooleanoEnum = IntBooleanoEnum.False;

  @IsOptional()
  @IsEnum(IntBooleanoEnum)
  estadosCuota: IntBooleanoEnum = IntBooleanoEnum.False;

  toString() {
    return JSON.stringify({ ...this });
  }
}

export class MaestrosResponse {
  tiposDeFrecuenciaPenalidad?: IdLabel[];
  tiposDeTasa?: IdLabel[];
  estados?: IdLabel[];
  estadosCuota?: IdLabel[];
}
