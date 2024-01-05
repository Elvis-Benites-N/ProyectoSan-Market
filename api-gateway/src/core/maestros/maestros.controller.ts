import {
  Controller,
  Get,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { MICROSERVICES } from '@Constants';
import { DependenciasMaestrosResponse } from './dto/dependencias-maestros.dto';
import { TipoDeDocumento } from './dto/tipos-de-documento.dto';
import { MaestrosService } from './maestros.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Maestros')
@Controller('maestros')
export class MaestrosController implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject(MICROSERVICES.DEPENDENCIAS.NAME)
    private readonly microserviceDependencias: ClientKafka,
    @Inject(MICROSERVICES.PERSONAS.NAME)
    private readonly microservicePersonas: ClientKafka,
    private readonly service: MaestrosService,
  ) {}

  onModuleInit() {
    this.microserviceDependencias.subscribeToResponseOf(
      MICROSERVICES.DEPENDENCIAS.ENDPOINTS.MAESTROS.CONSULTA,
    );
    this.microservicePersonas.subscribeToResponseOf(
      MICROSERVICES.PERSONAS.ENDPOINTS.CONSULTA.CONSULTA_TIPO_DOCUMENTO,
    );
  }

  async onModuleDestroy() {
    await this.microserviceDependencias.close();
    await this.microservicePersonas.close();
  }

  @Get('/facultades-y-dependencias')
  obtenerFacultadesYDependencias(): Observable<DependenciasMaestrosResponse> {
    return this.service.obtenerFacultadesYDependencias();
  }

  @Get('/tipos-de-documento')
  obtenerTiposDeDocumento(): Observable<TipoDeDocumento[]> {
    return this.service.obtenerTiposDeDocumento();
  }
}
