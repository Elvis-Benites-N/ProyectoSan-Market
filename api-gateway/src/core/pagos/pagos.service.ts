import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { MICROSERVICES } from '@Constants';
import { ResponseAPI } from '@Interfaces';
import { UsuarioInfo } from '../auth/dto/login.dto';
import { CrearPagoRequest } from './dto/crear-pago.dto';
import { PagoInterface } from './interfaces/obtener-pago.interface';
import { ObtenerPagosQuery } from './dto/obtener-pagos.dto';
import { RealizarPagoManualRequest } from './dto/realizar-pagos-manual.dto';
import {
  AprobarPagoRequest,
  RechazarPagoRequest,
} from './dto/finalizar-pago.dto';
import {
  AprobarPagoEvent,
  RechazarPagoEvent,
} from './events/finalizar-pago.event';
import { PagosListadoInterface } from './interfaces/listado-pagos.interface';

@Injectable()
export class PagosService {
  constructor(
    @Inject(MICROSERVICES.PAGOS.NAME)
    private readonly microservicePagos: ClientKafka,
  ) {}

  obtenerPagoPorId(pagoId: number): Observable<PagoInterface> {
    return this.microservicePagos.send<PagoInterface, number>(
      MICROSERVICES.PAGOS.ENDPOINTS.PAGOS_CLIENTE.CONSULTA.OBTENER_POR_ID,
      pagoId,
    );
  }

  actualizarPago(pagoId: number): Observable<ResponseAPI> {
    return this.microservicePagos.send<ResponseAPI, number>(
      MICROSERVICES.PAGOS.ENDPOINTS.PAGOS_CLIENTE.MANETENIMIENTO
        .ACTUALIZAR_PAGO,
      pagoId,
    );
  }

  obtenerPagos(query: ObtenerPagosQuery): Observable<PagosListadoInterface[]> {
    return this.microservicePagos.send<
      PagosListadoInterface[],
      ObtenerPagosQuery
    >(
      MICROSERVICES.PAGOS.ENDPOINTS.PAGOS_CLIENTE.CONSULTA.OBTENER_PAGOS,
      query,
    );
  }

  crearPago(
    usuario: UsuarioInfo,
    body: CrearPagoRequest,
  ): Observable<ResponseAPI> {
    body.codigoPago = usuario.codigoPago;
    body.idUsuarioSanMarket = usuario.id;

    return this.microservicePagos.send<ResponseAPI, CrearPagoRequest>(
      MICROSERVICES.PAGOS.ENDPOINTS.PAGOS_CLIENTE.MANETENIMIENTO.CREAR_PAGO,
      body,
    );
  }

  realizarPagoManual(body: RealizarPagoManualRequest): Observable<ResponseAPI> {
    return this.microservicePagos.send<ResponseAPI, RealizarPagoManualRequest>(
      MICROSERVICES.PAGOS.ENDPOINTS.MANUAL.MANTENIMIENTO.CREAR,
      body,
    );
  }

  aprobarPago(body: AprobarPagoRequest): Observable<ResponseAPI> {
    return this.microservicePagos.send<ResponseAPI, AprobarPagoEvent>(
      MICROSERVICES.PAGOS.ENDPOINTS.MANUAL.MANTENIMIENTO.APROBAR,
      new AprobarPagoEvent({
        idPago: body.idPago,
        idPagoManual: body.idPagoManual,
      }),
    );
  }
  rechazarPago(body: RechazarPagoRequest): Observable<ResponseAPI> {
    return this.microservicePagos.send<ResponseAPI, RechazarPagoEvent>(
      MICROSERVICES.PAGOS.ENDPOINTS.MANUAL.MANTENIMIENTO.REPROBAR,
      new RechazarPagoEvent({
        idPago: body.idPago,
        idPagoManual: body.idPagoManual,
        observacion: body.observacion,
        finalizado: body.finalizado,
      }),
    );
  }
}
