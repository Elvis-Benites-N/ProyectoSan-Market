import { MICROSERVICES } from '@/common/constants';
import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { UsuarioInfo } from '../auth/dto/login.dto';
import { Usuario } from '../auth/jwt/access-token-jwt/auth.decorator';
import { AgregarPerfilRequest } from './dto/agregar-perfil.dto';
import { PerfilesService } from './perfiles.service';
import { ApiTags } from '@nestjs/swagger';
import { ResponseAPI } from '@/common/interfaces';
import { Observable } from 'rxjs/internal/Observable';
import { PerfilInterface } from './interfaces/listar-perfiles.interface';
import { JwtAuthGuard } from '../auth/jwt/access-token-jwt/auth.guard';

@ApiTags('Perfiles')
@Controller('perfiles')
@UseGuards(JwtAuthGuard)
export class PerfilesController implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly service: PerfilesService,
    @Inject(MICROSERVICES.ACCESO.NAME)
    private readonly microserviceAccesoSanMarket: ClientKafka,
  ) {}

  onModuleInit() {
    this.microserviceAccesoSanMarket.subscribeToResponseOf(
      MICROSERVICES.ACCESO.ENDPOINTS.AUTH.CREAR_PERFILES,
    );
    this.microserviceAccesoSanMarket.subscribeToResponseOf(
      MICROSERVICES.ACCESO.ENDPOINTS.AUTH.LISTAR_PERFILES,
    );
  }

  async onModuleDestroy() {
    await this.microserviceAccesoSanMarket.close();
  }

  @Post()
  crearPerfil(
    @Usuario()
    usuario: UsuarioInfo,
    @Body()
    body: AgregarPerfilRequest,
  ): Observable<ResponseAPI> {
    return this.service.crearPerfil(usuario.id, body);
  }

  @Get()
  listarPerfiles(
    @Usuario()
    usuario: UsuarioInfo,
  ): Observable<PerfilInterface> {
    return this.service.listarPerfiles(usuario.id);
  }
}
