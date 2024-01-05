import { MICROSERVICES } from '@/common/constants';
import { PaginacionResponse } from '@/common/interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs/internal/Observable';
import { ObtenerDeudasSanMarketQuery } from './dto/obtenerDeudasSanMarket.dto';
import { DeudasSanMarketListadoInterface } from './interfaces/listar-deudas-san-market.dto';
import { ListarItemsDeudasEvent } from './events/listar-deudas.event';
import { DeudaInterface } from './interfaces/deuda.interface';

@Injectable()
export class DeudasService {
  constructor(
    @Inject(MICROSERVICES.DEUDAS.NAME)
    private readonly microserviceDeudas: ClientKafka,
  ) {}

  obtenerDeudasSanMarket(
    usuarioNumeroDocumento: string,
    query: ObtenerDeudasSanMarketQuery,
  ): Observable<
    | PaginacionResponse<DeudasSanMarketListadoInterface>
    | DeudasSanMarketListadoInterface[]
  > {
    return this.microserviceDeudas.send(
      MICROSERVICES.DEUDAS.ENDPOINTS.CONSULTA.DEUDAS_SAN_MARKET,
      new ListarItemsDeudasEvent({
        usuarioNumeroDocumento: usuarioNumeroDocumento,
        itemNombre: query.itemNombre,
        tipoItemIds: query.tipoItemIds,
        estadoDeudaIds: query.estadoDeudaIds,
        tipoFiltroFechaEnum: query.tipoFiltroFechaEnum,
        primeraCuotaEstadoIds: query.primeraCuotaEstadoIds,
        limit: query.limit,
        offset: query.offset,
        esPaginado: query.esPaginado,
        ordenamiento: query.ordenamiento,
        atributoOrdenamiento: query.atributoOrdenamiento,
      }),
    );
  }

  obtenerDeudaDetalle(id: number): Observable<DeudaInterface> {
    return this.microserviceDeudas.send(
      MICROSERVICES.DEUDAS.ENDPOINTS.CONSULTA.DETALLE,
      id,
    );
  }
}
