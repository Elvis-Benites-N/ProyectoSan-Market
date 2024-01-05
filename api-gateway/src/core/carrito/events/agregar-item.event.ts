import { TipoItemCarritoEnum } from '../enums/tipo-item-carrito.enum';

interface AgregarItemEventNamed {
  readonly idUsuario: number;
  readonly idItem: number;
  readonly cantidad: number;
  readonly tipoItemCarrito: TipoItemCarritoEnum;
  readonly numeroDocumentoUsuario?: string;
}

export class AgregarItemEvent {
  constructor(private readonly data: AgregarItemEventNamed) {}

  toString(): string {
    return JSON.stringify(this.data);
  }
}
