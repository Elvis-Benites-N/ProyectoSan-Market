import {
  Controller,
  Get,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
  Query,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { MICROSERVICES } from '@Constants';
import { CatalogoMaestrosQuery } from './dto/catalogo-maestros.dto';
import { CatalogoMaestrosService } from './catalogo-maestros.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Catalogo maestros')
@Controller('catalogo/maestros')
export class CatalogoMaestrosController
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    @Inject(MICROSERVICES.CATALOGO.NAME)
    private readonly msCatalogo: ClientKafka,
    private readonly service: CatalogoMaestrosService
  ) {}

  onModuleInit() {
    this.msCatalogo.subscribeToResponseOf(
      MICROSERVICES.CATALOGO.ENDPOINTS.MAESTROS.CONSULTA
    );
  }

  async onModuleDestroy() {
    await this.msCatalogo.close();
  }

  @Get('/')
  getMaestros(
    @Query()
    query: CatalogoMaestrosQuery
  ) {
    return this.service.getMaestros(query);
  }
}
