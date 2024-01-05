import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { MICROSERVICES } from '@Constants';
import { PaginacionResponse } from '@Interfaces';
import { GetGruposDestacadosQuery } from './dto/get-grupos-destacados.dto';
import {
  GetItemsDestacadosQuery,
  DestacadoResponse,
} from './dto/get-items-destacados.dto';

@Injectable()
export class CatalogoDestacadosService {
  constructor(
    @Inject(MICROSERVICES.CATALOGO.NAME)
    private readonly microserviceCatalogo: ClientKafka,
  ) {}

  getItemsDestacados(
    query: GetItemsDestacadosQuery,
  ): Observable<DestacadoResponse[] | PaginacionResponse<DestacadoResponse>> {
    return this.microserviceCatalogo.send<
      DestacadoResponse[] | PaginacionResponse<DestacadoResponse>,
      GetItemsDestacadosQuery
    >(
      MICROSERVICES.CATALOGO.ENDPOINTS.DESTACADOS.CONSULTA
        .CONSULTA_ITEMS_DESTACADOS,
      query,
    );
  }

  getGruposDestacados(
    query: GetGruposDestacadosQuery,
  ): Observable<DestacadoResponse[] | PaginacionResponse<DestacadoResponse>> {
    return this.microserviceCatalogo.send<
      DestacadoResponse[] | PaginacionResponse<DestacadoResponse>,
      GetGruposDestacadosQuery
    >(
      MICROSERVICES.CATALOGO.ENDPOINTS.DESTACADOS.CONSULTA
        .CONSULTA_GRUPOS_DESTACADOS,
      query,
    );
  }
}
