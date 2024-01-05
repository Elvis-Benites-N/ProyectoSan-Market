import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { MICROSERVICES } from '@Constants';
import { ResponseAPI } from '@Interfaces';
import { UsuarioInfo } from '../auth/dto/login.dto';
import { CarritoService } from './carrito.service';
import { ActualizarItemRequest } from './dto/actualizar-item-carrito.dto';
import {
  AgregarItemRequest,
  CarritoResponse,
} from './dto/agregar-item-carrito.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/access-token-jwt/auth.guard';
import { Usuario } from '../auth/jwt/access-token-jwt/auth.decorator';

@ApiTags('Carrito')
@Controller('carrito')
@UseGuards(JwtAuthGuard)
export class CarritoController implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly service: CarritoService,
    @Inject(MICROSERVICES.CARRITO.NAME)
    private readonly microserviceCarrito: ClientKafka,
  ) {}

  onModuleInit() {
    this.microserviceCarrito.subscribeToResponseOf(
      MICROSERVICES.CARRITO.ENDPOINTS.CONSULTA.OBTENER,
    );
    this.microserviceCarrito.subscribeToResponseOf(
      MICROSERVICES.CARRITO.ENDPOINTS.MANTENIMIENTO.AGREGAR,
    );
    this.microserviceCarrito.subscribeToResponseOf(
      MICROSERVICES.CARRITO.ENDPOINTS.MANTENIMIENTO.ACTUALIZAR,
    );
    this.microserviceCarrito.subscribeToResponseOf(
      MICROSERVICES.CARRITO.ENDPOINTS.MANTENIMIENTO.ELIMINAR,
    );
  }

  async onModuleDestroy() {
    await this.microserviceCarrito.close();
  }

  @Get()
  getCarrito(
    @Usuario()
    usuario: UsuarioInfo,
  ): Observable<CarritoResponse> {
    return this.service.getCarrito(usuario.id);
  }

  @Post()
  agregarItemCarrito(
    @Usuario()
    usuario: UsuarioInfo,
    @Body()
    body: AgregarItemRequest,
  ): Observable<ResponseAPI<number>> {
    return this.service.agregarItemCarrito(
      usuario.id,
      body,
      usuario.numeroDocumento,
    );
  }

  @Patch()
  actualizarItemCarrito(
    @Usuario()
    usuario: UsuarioInfo,
    @Body()
    body: ActualizarItemRequest,
  ): Observable<ResponseAPI> {
    return this.service.actualizarItemCarrito(usuario.id, body);
  }

  @Delete(':idItemCarrito')
  eliminarItemCarrito(
    @Usuario()
    usuario: UsuarioInfo,
    @Param('idItemCarrito')
    idItemCarrito: number,
  ): Observable<ResponseAPI> {
    return this.service.eliminarItemCarrito(usuario.id, idItemCarrito);
  }
}
