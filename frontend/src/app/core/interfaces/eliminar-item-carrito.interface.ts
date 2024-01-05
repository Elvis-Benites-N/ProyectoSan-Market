import { TipoItemCarritoEnum } from "../enums/tipoItemCarrito.enum";

export interface EliminarItemCarrito {
    readonly itemCarritoId: number;
    readonly dataId: number;
    readonly tipoItemCarritoEnum: TipoItemCarritoEnum;
}