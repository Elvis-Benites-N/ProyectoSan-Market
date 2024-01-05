import { OrdenamientoEnum, IntBooleanoEnum } from '@Enums';
import { AtributoOrdenamientoItemsEnum } from '../dto/get-items.dto';
import { TipoEstadoItemEnum } from '../enums/tipo-estado-item.enum';
import { TipoFiltroUnidepEnum } from '../enums/tipo-filtro-unidep.enum';
import { TipoDeItemEnum } from '../enums/tipo-item.enum';

interface GetItemsEventNamed {
  readonly unidepCodigo?: string;
  readonly tipoDeFiltroUnidep?: TipoFiltroUnidepEnum;
  readonly tipoDeItem?: TipoDeItemEnum;
  readonly estado?: TipoEstadoItemEnum;
  readonly limit?: number;
  readonly offset?: number;
  readonly esPaginado?: IntBooleanoEnum;
  readonly ordenamiento?: OrdenamientoEnum;
  readonly atributoOrdenamiento?: AtributoOrdenamientoItemsEnum;
  readonly palabraClave?: string;
}

export class GetItemsEvent {
  constructor(private readonly data: GetItemsEventNamed) {}

  toString(): string {
    return JSON.stringify(this.data);
  }
}
