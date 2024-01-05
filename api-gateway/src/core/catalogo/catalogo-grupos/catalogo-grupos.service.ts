import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { PaginacionResponse } from '@Interfaces';
import { MICROSERVICES } from '@Constants';
import { GrupoResponse, ObtenerGruposQuery } from './dto/obtener-grupo.dto';
import { ObtenerGrupoEvent } from './events/obtener-grupo.event';

@Injectable()
export class CatalogoGruposService {
  constructor(
    @Inject(MICROSERVICES.CATALOGO.NAME)
    private readonly microserviceCatalogo: ClientKafka,
  ) {}

  obtenerGrupos(
    query: ObtenerGruposQuery,
  ): Observable<GrupoResponse[] | PaginacionResponse<GrupoResponse>> {
    return this.microserviceCatalogo.send<
      GrupoResponse[] | PaginacionResponse<GrupoResponse>,
      ObtenerGrupoEvent
    >(
      MICROSERVICES.CATALOGO.ENDPOINTS.GRUPOS.CONSULTA.CONSULTA_GRUPOS,
      new ObtenerGrupoEvent({
        ...query,
      }),
    );
  }
}
