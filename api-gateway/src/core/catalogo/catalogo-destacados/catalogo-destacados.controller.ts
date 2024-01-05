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
import { MICROSERVICES } from '@Constants';
import { PaginacionResponse } from '@Interfaces';
import { CatalogoDestacadosService } from './catalogo-destacados.service';
import { GetGruposDestacadosQuery } from './dto/get-grupos-destacados.dto';
import {
  DestacadoResponse,
  GetItemsDestacadosQuery,
} from './dto/get-items-destacados.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Catalogo destacados')
@Controller('catalogo/destacados')
export class CatalogoDestacadosController
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    @Inject(MICROSERVICES.CATALOGO.NAME)
    private readonly microserviceCatalogo: ClientKafka,
    private readonly service: CatalogoDestacadosService,
  ) {}

  onModuleInit() {
    this.microserviceCatalogo.subscribeToResponseOf(
      MICROSERVICES.CATALOGO.ENDPOINTS.DESTACADOS.CONSULTA
        .CONSULTA_ITEMS_DESTACADOS,
    );
    this.microserviceCatalogo.subscribeToResponseOf(
      MICROSERVICES.CATALOGO.ENDPOINTS.DESTACADOS.CONSULTA
        .CONSULTA_GRUPOS_DESTACADOS,
    );
  }

  async onModuleDestroy() {
    await this.microserviceCatalogo.close();
  }

  @Get('/items')
  getItemsDestacados(
    @Query()
    query: GetItemsDestacadosQuery,
  ): Observable<DestacadoResponse[] | PaginacionResponse<DestacadoResponse>> {
    return this.service.getItemsDestacados(query);
  }

  @Get('/grupos')
  getGruposDestacados(
    @Query()
    query: GetGruposDestacadosQuery,
  ): Observable<DestacadoResponse[] | PaginacionResponse<DestacadoResponse>> {
    return this.service.getGruposDestacados(query);
  }
}
