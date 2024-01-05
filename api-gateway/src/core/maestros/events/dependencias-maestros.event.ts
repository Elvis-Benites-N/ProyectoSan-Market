import { IntBooleanoEnum } from '@Enums';

interface DependenciasMaestrosEventNamed {
  readonly facultades?: IntBooleanoEnum;
  readonly dependencias?: IntBooleanoEnum;
  readonly unidepsOrganicos?: IntBooleanoEnum;
  readonly establecimientos?: IntBooleanoEnum;
}

export class DependenciasMaestrosEvent {
  constructor(private readonly data: DependenciasMaestrosEventNamed) {}

  toString(): string {
    return JSON.stringify(this.data);
  }
}
