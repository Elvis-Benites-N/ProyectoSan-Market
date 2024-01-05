import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { MICROSERVICES } from '@Constants';
import { ResponseAPI } from '@Interfaces';
import { UsuarioInfo } from '../auth/dto/login.dto';
import { Usuario } from '../auth/jwt/access-token-jwt/auth.decorator';
import { JwtAuthGuard } from '../auth/jwt/access-token-jwt/auth.guard';
import { CrearPagoRequest } from './dto/crear-pago.dto';
import { PagoInterface } from './interfaces/obtener-pago.interface';
import { ObtenerPagosQuery } from './dto/obtener-pagos.dto';
import { PagosService } from './pagos.service';
import { RealizarPagoManualRequest } from './dto/realizar-pagos-manual.dto';
import {
  AprobarPagoRequest,
  RechazarPagoRequest,
} from './dto/finalizar-pago.dto';
import { ApiTags } from '@nestjs/swagger';
import { PagosListadoInterface } from './interfaces/listado-pagos.interface';

@ApiTags('Pagos')
@Controller('pagos')
export class PagosController implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly service: PagosService,
    @Inject(MICROSERVICES.PAGOS.NAME)
    private readonly microservicePagos: ClientKafka,
  ) {}

  onModuleInit() {
    this.microservicePagos.subscribeToResponseOf(
      MICROSERVICES.PAGOS.ENDPOINTS.PAGOS_CLIENTE.MANETENIMIENTO.CREAR_PAGO,
    );
    this.microservicePagos.subscribeToResponseOf(
      MICROSERVICES.PAGOS.ENDPOINTS.PAGOS_CLIENTE.CONSULTA.OBTENER_POR_ID,
    );
    this.microservicePagos.subscribeToResponseOf(
      MICROSERVICES.PAGOS.ENDPOINTS.PAGOS_CLIENTE.CONSULTA.OBTENER_PAGOS,
    );
    this.microservicePagos.subscribeToResponseOf(
      MICROSERVICES.PAGOS.ENDPOINTS.PAGOS_CLIENTE.MANETENIMIENTO
        .ACTUALIZAR_PAGO,
    );
    this.microservicePagos.subscribeToResponseOf(
      MICROSERVICES.PAGOS.ENDPOINTS.MANUAL.MANTENIMIENTO.CREAR,
    );
    this.microservicePagos.subscribeToResponseOf(
      MICROSERVICES.PAGOS.ENDPOINTS.MANUAL.MANTENIMIENTO.APROBAR,
    );
    this.microservicePagos.subscribeToResponseOf(
      MICROSERVICES.PAGOS.ENDPOINTS.MANUAL.MANTENIMIENTO.REPROBAR,
    );
  }

  async onModuleDestroy() {
    await this.microservicePagos.close();
  }

  @Get('/:pagoId')
  obtenerPagoPorId(
    @Param('pagoId')
    pagoId: number,
  ): Observable<PagoInterface> {
    return this.service.obtenerPagoPorId(pagoId);
  }

  @Patch('/:pagoId')
  actualizarPago(
    @Param('pagoId')
    pagoId: number,
  ): Observable<ResponseAPI> {
    return this.service.actualizarPago(pagoId);
  }

  @Get('/')
  obtenerPagos(
    @Query()
    query: ObtenerPagosQuery,
  ): Observable<PagosListadoInterface[]> {
    return this.service.obtenerPagos(query);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  crearPago(
    @Usuario()
    usuario: UsuarioInfo,
    @Body()
    body: CrearPagoRequest,
  ): Observable<ResponseAPI> {
    return this.service.crearPago(usuario, body);
  }

  @Post('/manual')
  realizarPagoManual(
    @Body()
    body: RealizarPagoManualRequest,
  ): Observable<ResponseAPI> {
    return this.service.realizarPagoManual(body);
  }

  @Put('/aprobar')
  aprobarPago(
    @Body()
    body: AprobarPagoRequest,
  ): Observable<ResponseAPI> {
    return this.service.aprobarPago(body);
  }

  @Put('/rechazar')
  rechazarPago(
    @Body()
    body: RechazarPagoRequest,
  ): Observable<ResponseAPI> {
    return this.service.rechazarPago(body);
  }
}
