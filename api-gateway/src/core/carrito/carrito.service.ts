import { MICROSERVICES } from '@Constants';
import { ResponseAPI } from '@Interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs/internal/Observable';
import { ActualizarItemRequest } from './dto/actualizar-item-carrito.dto';
import {
  AgregarItemRequest,
  CarritoResponse,
} from './dto/agregar-item-carrito.dto';
import { ActualizarItemEvent } from './events/actualizar-item.event';
import { AgregarItemEvent } from './events/agregar-item.event';
import { EliminarItemEvent } from './events/eliminar-item.event';

@Injectable()
export class CarritoService {
  constructor(
    @Inject(MICROSERVICES.CARRITO.NAME)
    private readonly microserviceCarrito: ClientKafka,
  ) {}

  getCarrito(usuarioId: number): Observable<CarritoResponse> {
    return this.microserviceCarrito.send<CarritoResponse, number>(
      MICROSERVICES.CARRITO.ENDPOINTS.CONSULTA.OBTENER,
      usuarioId,
    );
  }

  agregarItemCarrito(
    usuarioId: number,
    body: AgregarItemRequest,
    numeroDocumentoUsuario?: string,
  ): Observable<ResponseAPI<number>> {
    return this.microserviceCarrito.send<ResponseAPI<number>, AgregarItemEvent>(
      MICROSERVICES.CARRITO.ENDPOINTS.MANTENIMIENTO.AGREGAR,
      new AgregarItemEvent({
        cantidad: 1,
        idItem: body.idItem,
        idUsuario: usuarioId,
        tipoItemCarrito: body.tipoItemCarrito,
        numeroDocumentoUsuario: numeroDocumentoUsuario,
      }),
    );
  }

  actualizarItemCarrito(
    usuarioId: number,
    body: ActualizarItemRequest,
  ): Observable<ResponseAPI> {
    return this.microserviceCarrito.send<ResponseAPI, ActualizarItemEvent>(
      MICROSERVICES.CARRITO.ENDPOINTS.MANTENIMIENTO.ACTUALIZAR,
      new ActualizarItemEvent({
        idUsuario: usuarioId,
        cantidad: body.cantidad,
        idItemCarrito: body.idItemCarrito,
      }),
    );
  }

  eliminarItemCarrito(
    usuarioId: number,
    idItemCarrito: number,
  ): Observable<ResponseAPI> {
    return this.microserviceCarrito.send<ResponseAPI, EliminarItemEvent>(
      MICROSERVICES.CARRITO.ENDPOINTS.MANTENIMIENTO.ELIMINAR,
      new EliminarItemEvent({
        idUsuario: usuarioId,
        idItemCarrito: idItemCarrito,
      }),
    );
  }
}
