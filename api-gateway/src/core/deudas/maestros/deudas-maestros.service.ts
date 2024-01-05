import { MICROSERVICES } from '@/common/constants';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { MaestrosQuery, MaestrosResponse } from './dto/maestros.dto';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class DeudasMaestrosService {
  constructor(
    @Inject(MICROSERVICES.DEUDAS.NAME)
    private readonly microserviceDeudas: ClientKafka,
  ) {}

  obtenerMaestros(query: MaestrosQuery): Observable<MaestrosResponse> {
    return this.microserviceDeudas.send<MaestrosResponse>(
      MICROSERVICES.DEUDAS.ENDPOINTS.MAESTROS,
      query,
    );
  }
}
