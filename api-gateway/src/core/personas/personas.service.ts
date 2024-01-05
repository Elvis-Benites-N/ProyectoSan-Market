import { HttpService } from '@nestjs/axios';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import { MICROSERVICES } from '@Constants';
import {
  BusquedaPersonaQuery,
  PersonaDetalle,
} from './dto/busqueda-persona.dto';
import { SunatQuery, SunatData } from './dto/sunat.dto';

@Injectable()
export class PersonasService {
  constructor(
    @Inject(MICROSERVICES.PERSONAS.NAME)
    private readonly microservicePersonas: ClientKafka,
    private readonly httpService: HttpService,
  ) {}

  buscarPersona(query: BusquedaPersonaQuery): Observable<PersonaDetalle> {
    return this.microservicePersonas.send<PersonaDetalle, any>(
      MICROSERVICES.PERSONAS.ENDPOINTS.CONSULTA.CONSULTA_OBTENER_PERSONA,
      {
        tipoBusqueda: query.tipoBusqueda,
        valorBusqueda: query.valorBusqueda,
      },
    );
  }

  async buscarPersonaRUC(query: SunatQuery): Promise<SunatData> {
    const url =
      'https://quipucamayoc.unmsm.edu.pe/ConsultaWS_RUC/rest/sunat/consulta';

    const response = await firstValueFrom(
      this.httpService.post(url, {
        ruc: query.ruc,
        user: 'prueba1.quipucamayoc',
        passw: 'prueba1quipu',
      }),
    );

    if (response.status !== 200) {
      throw new InternalServerErrorException({
        message: 'Algo salió mal...',
      });
    }

    if (!response.data.ruc) {
      throw new NotFoundException({
        message: 'No se encontró el ruc',
      });
    }

    return {
      direccion: response.data.direccion,
      razonSocial: response.data.razonSocial,
      ruc: response.data.ruc,
    };
  }
}
