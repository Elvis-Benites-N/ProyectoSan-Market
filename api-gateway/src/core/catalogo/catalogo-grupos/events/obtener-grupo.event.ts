import { IntBooleanoEnum, OrdenamientoEnum } from '@Enums';
import { AtributoOrdenamientoGruposEnum } from '../dto/obtener-grupo.dto';

interface ObtenerGrupoEventNamed {
  readonly idUnidep: number;
  readonly limit: number;
  readonly offset: number;
  readonly esPaginado: IntBooleanoEnum;
  readonly ordenamiento: OrdenamientoEnum;
  readonly atributoOrdenamiento: AtributoOrdenamientoGruposEnum;
  readonly palabraClave: string;
}

export class ObtenerGrupoEvent {
  constructor(private readonly data: ObtenerGrupoEventNamed) {}

  toString(): string {
    return JSON.stringify(this.data);
  }
}
