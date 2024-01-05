import {
  Controller,
  Get,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { MICROSERVICES } from '@Constants';
import { JwtAuthGuard } from '../auth/jwt/access-token-jwt/auth.guard';
import {
  BusquedaPersonaQuery,
  PersonaDetalle,
} from './dto/busqueda-persona.dto';
import { SunatData, SunatQuery } from './dto/sunat.dto';
import { PersonasService } from './personas.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Personas')
@UseGuards(JwtAuthGuard)
@Controller('personas')
export class PersonasController implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly service: PersonasService,
    @Inject(MICROSERVICES.PERSONAS.NAME)
    private readonly microservicePersonas: ClientKafka,
  ) {}

  onModuleInit() {
    this.microservicePersonas.subscribeToResponseOf(
      MICROSERVICES.PERSONAS.ENDPOINTS.CONSULTA.CONSULTA_OBTENER_PERSONA,
    );
  }

  async onModuleDestroy() {
    await this.microservicePersonas.close();
  }

  @Get('/buscar')
  buscarPersona(
    @Query()
    query: BusquedaPersonaQuery,
  ): Observable<PersonaDetalle> {
    return this.service.buscarPersona(query);
  }

  @Get('/sunat')
  buscarPersonaRUC(
    @Query()
    query: SunatQuery,
  ): Promise<SunatData> {
    return this.service.buscarPersonaRUC(query);
  }
}
