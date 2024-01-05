interface ActualizarItemEventNamed {
  readonly idUsuario: number;
  readonly idItemCarrito: number;
  readonly cantidad: number;
}

export class ActualizarItemEvent {
  constructor(private readonly data: ActualizarItemEventNamed) {}

  toString(): string {
    return JSON.stringify(this.data);
  }
}
