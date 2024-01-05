import { MICROSERVICES } from '@/common/constants';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AgregarPerfilRequest } from './dto/agregar-perfil.dto';
import { AgregarPerfilEvent } from './events/agregar-perfil.event';
import { ResponseAPI } from '@/common/interfaces';
import { Observable } from 'rxjs/internal/Observable';
import { PerfilInterface } from './interfaces/listar-perfiles.interface';

@Injectable()
export class PerfilesService {
  constructor(
    @Inject(MICROSERVICES.ACCESO.NAME)
    private readonly microserviceAccesoSanMarket: ClientKafka,
  ) {}

  crearPerfil(
    idUsuario: number,
    body: AgregarPerfilRequest,
  ): Observable<ResponseAPI> {
    return this.microserviceAccesoSanMarket.send(
      MICROSERVICES.ACCESO.ENDPOINTS.AUTH.CREAR_PERFILES,
      new AgregarPerfilEvent({
        idUsuario: idUsuario,
        nombres: body.nombres,
        apellidos: body.apellidos,
        email: body.email,
        idTipoDocumento: body.idTipoDocumento,
        numeroDocumento: body.numeroDocumento,
      }),
    );
  }

  listarPerfiles(idUsuario: number): Observable<PerfilInterface> {
    return this.microserviceAccesoSanMarket.send(
      MICROSERVICES.ACCESO.ENDPOINTS.AUTH.LISTAR_PERFILES,
      idUsuario,
    );
  }
}
