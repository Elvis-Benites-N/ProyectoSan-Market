import {
  Controller,
  Get,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
  Query,
} from '@nestjs/common';
import { DeudasMaestrosService } from './deudas-maestros.service';
import { MICROSERVICES } from '@/common/constants';
import { ClientKafka } from '@nestjs/microservices';
import { MaestrosQuery, MaestrosResponse } from './dto/maestros.dto';
import { Observable } from 'rxjs/internal/Observable';

@Controller('deudas-maestros')
export class DeudasMaestrosController implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly service: DeudasMaestrosService,
    @Inject(MICROSERVICES.DEUDAS.NAME)
    private readonly microserviceDeudas: ClientKafka,
  ) {}

  onModuleInit() {
    this.microserviceDeudas.subscribeToResponseOf(
      MICROSERVICES.DEUDAS.ENDPOINTS.MAESTROS,
    );
  }

  async onModuleDestroy() {
    await this.microserviceDeudas.close();
  }

  @Get('/')
  obtenerMaestros(
    @Query()
    query: MaestrosQuery,
  ): Observable<MaestrosResponse> {
    return this.service.obtenerMaestros(query);
  }
}
