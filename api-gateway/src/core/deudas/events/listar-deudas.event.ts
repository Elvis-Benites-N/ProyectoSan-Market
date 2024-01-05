import { IntBooleanoEnum, OrdenamientoEnum } from '@/common/enums';
import { AtributoOrdenamientoDeudasSanMarketEnum } from '../dto/obtenerDeudasSanMarket.dto';
import { TipoFiltroFechaEnum } from '@Enums';

interface ListarItemsDeudasEventNamed {
  readonly usuarioNumeroDocumento: string;
  readonly itemNombre: string;
  readonly tipoItemIds: string;
  readonly estadoDeudaIds: string;
  readonly primeraCuotaEstadoIds: string;
  readonly tipoFiltroFechaEnum: TipoFiltroFechaEnum;
  readonly limit: number;
  readonly offset: number;
  readonly esPaginado: IntBooleanoEnum;
  readonly ordenamiento: OrdenamientoEnum;
  readonly atributoOrdenamiento: AtributoOrdenamientoDeudasSanMarketEnum;
}

export class ListarItemsDeudasEvent {
  constructor(private readonly data: ListarItemsDeudasEventNamed) {}

  toString(): string {
    return JSON.stringify(this.data);
  }
}
