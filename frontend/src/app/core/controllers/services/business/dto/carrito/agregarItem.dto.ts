import { TipoItemCarritoEnum } from 'src/app/core/enums/tipoItemCarrito.enum';

export interface AgregarItemRequest {
  idItem: number;
  tipoItemCarrito: TipoItemCarritoEnum;
}
