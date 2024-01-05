import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { MICROSERVICES } from '@Constants';
import {
  CatalogoMaestrosQuery,
  CatalogoMaestrosResponse,
} from './dto/catalogo-maestros.dto';

@Injectable()
export class CatalogoMaestrosService {
  constructor(
    @Inject(MICROSERVICES.CATALOGO.NAME)
    private readonly msCatalogo: ClientKafka
  ) {}

  getMaestros(
    query: CatalogoMaestrosQuery
  ): Observable<CatalogoMaestrosResponse> {
    return this.msCatalogo.send<
      CatalogoMaestrosResponse,
      CatalogoMaestrosQuery
    >(MICROSERVICES.CATALOGO.ENDPOINTS.MAESTROS.CONSULTA, query);
  }
}
