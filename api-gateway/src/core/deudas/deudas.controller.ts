import { MICROSERVICES } from '@/common/constants';
import { PaginacionResponse } from '@/common/interfaces';
import {
  Controller,
  Get,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs/internal/Observable';
import { DeudasService } from './deudas.service';
import { ObtenerDeudasSanMarketQuery } from './dto/obtenerDeudasSanMarket.dto';
import { DeudasSanMarketListadoInterface } from './interfaces/listar-deudas-san-market.dto';
import { Usuario } from '../auth/jwt/access-token-jwt/auth.decorator';
import { UsuarioInfo } from '../auth/dto/login.dto';
import { JwtAuthGuard } from '../auth/jwt/access-token-jwt/auth.guard';
import { DeudaInterface } from './interfaces/deuda.interface';
@ApiTags('Deudas')
@Controller('deudas')
@UseGuards(JwtAuthGuard)
export class DeudasController implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly service: DeudasService,
    @Inject(MICROSERVICES.DEUDAS.NAME)
    private readonly microserviceDeudas: ClientKafka,
  ) {}

  onModuleInit() {
    this.microserviceDeudas.subscribeToResponseOf(
      MICROSERVICES.DEUDAS.ENDPOINTS.CONSULTA.DEUDAS_SAN_MARKET,
    );

    this.microserviceDeudas.subscribeToResponseOf(
      MICROSERVICES.DEUDAS.ENDPOINTS.CONSULTA.DETALLE,
    );
  }

  async onModuleDestroy() {
    await this.microserviceDeudas.close();
  }

  @Get()
  obtenerDeudasSanMarket(
    @Usuario()
    usuario: UsuarioInfo,
    @Query()
    query: ObtenerDeudasSanMarketQuery,
  ): Observable<
    | PaginacionResponse<DeudasSanMarketListadoInterface>
    | DeudasSanMarketListadoInterface[]
  > {
    return this.service.obtenerDeudasSanMarket(usuario.numeroDocumento, query);
  }

  @Get('/detalle/:id')
  obtenerDeudaDetalle(
    @Param('id')
    id: number,
  ): Observable<DeudaInterface> {
    return this.service.obtenerDeudaDetalle(id);
  }
}
