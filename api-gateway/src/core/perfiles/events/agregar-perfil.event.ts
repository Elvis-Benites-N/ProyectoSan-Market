interface AgregarPerfilEventNamed {
  readonly idUsuario: number;
  readonly nombres: string;
  readonly apellidos: string;
  readonly email: string;
  readonly idTipoDocumento: number;
  readonly numeroDocumento: string;
}

export class AgregarPerfilEvent {
  constructor(private readonly data: AgregarPerfilEventNamed) {}

  toString(): string {
    return JSON.stringify(this.data);
  }
}
