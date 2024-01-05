import {
  Controller,
  Get,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
  Query,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { PaginacionResponse } from '@Interfaces';
import { CatalogoGruposService } from './catalogo-grupos.service';
import { ApiTags } from '@nestjs/swagger';
import { MICROSERVICES } from '@Constants';
import { GrupoResponse, ObtenerGruposQuery } from './dto/obtener-grupo.dto';

@ApiTags('Catalogo grupos')
@Controller('catalogo/grupos')
export class CatalogoGruposController implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject(MICROSERVICES.CATALOGO.NAME)
    private readonly microserviceCatalogo: ClientKafka,
    private readonly service: CatalogoGruposService,
  ) {}

  onModuleInit() {
    this.microserviceCatalogo.subscribeToResponseOf(
      MICROSERVICES.CATALOGO.ENDPOINTS.GRUPOS.CONSULTA.CONSULTA_GRUPOS,
    );
  }

  async onModuleDestroy() {
    await this.microserviceCatalogo.close();
  }

  @Get('/')
  obtenerGrupos(
    @Query()
    query: ObtenerGruposQuery,
  ): Observable<GrupoResponse[] | PaginacionResponse<GrupoResponse>> {
    return this.service.obtenerGrupos(query);
  }
}
