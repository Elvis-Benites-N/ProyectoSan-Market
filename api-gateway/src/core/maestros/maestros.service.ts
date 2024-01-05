import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { MICROSERVICES } from '@Constants';
import { IntBooleanoEnum } from '@Enums';
import { DependenciasMaestrosResponse } from './dto/dependencias-maestros.dto';
import { TipoDeDocumento } from './dto/tipos-de-documento.dto';
import { DependenciasMaestrosEvent } from './events/dependencias-maestros.event';

@Injectable()
export class MaestrosService {
  constructor(
    @Inject(MICROSERVICES.DEPENDENCIAS.NAME)
    private readonly microserviceDependencias: ClientKafka,
    @Inject(MICROSERVICES.PERSONAS.NAME)
    private readonly microservicePersonas: ClientKafka,
  ) {}

  obtenerFacultadesYDependencias(): Observable<DependenciasMaestrosResponse> {
    return this.microserviceDependencias.send<
      DependenciasMaestrosResponse,
      DependenciasMaestrosEvent
    >(
      MICROSERVICES.DEPENDENCIAS.ENDPOINTS.MAESTROS.CONSULTA,
      new DependenciasMaestrosEvent({
        facultades: IntBooleanoEnum.True,
        dependencias: IntBooleanoEnum.True,
      }),
    );
  }

  obtenerTiposDeDocumento(): Observable<TipoDeDocumento[]> {
    return this.microservicePersonas.send<TipoDeDocumento[], {}>(
      MICROSERVICES.PERSONAS.ENDPOINTS.CONSULTA.CONSULTA_TIPO_DOCUMENTO,
      {},
    );
  }
}
