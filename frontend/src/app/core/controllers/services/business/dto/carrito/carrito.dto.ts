import { GrupoResponse } from "../catalogo/grupos/grupos.dto";
import { ItemCatalogo } from "../catalogo/items/catalogo.dto";

export interface CuotaResponse {
  id: number;
  idDeuda: number;
  fechaMaximaPago: Date;
  montoInicial: number;
  montoMora: number;
  montoTotal: number;
  numero: number;
  idEstadoCuota: number;
  estadoCuotaDescripcion: string;
  fechaPago: Date;
  deudaItemCatalogoId: number;
  deudaFechaCreacion: Date;
  itemCatalogoUnidepId: number;
  itemCatalogoUnidepDescripcion: string;
  itemCatalogoUnidepPadreNivel2Id: number;
  itemCatalogoUnidepPadreNivel2Descripcion: string;
  itemCatalogoItemNombre: string;
  itemCatalogoItemIgv: number;
  itemCatalogoItemValorUnitario: number;
  itemCatalogoItemPrecio: number;
  itemCatalogoTipoItemId: number;
  itemCatalogoTipoItemDescripcion: string;
  itemCatalogoMonedaId: number;
  itemCatalogoMonedaSimbolo: string;
}

export interface ItemCarritoResponse {
  id?: number;
  itemCatalogo?: ItemCatalogo;
  grupo?: GrupoResponse;
  cuota?: CuotaResponse;
  cantidad: number;
  precioTotal: number;
}

export interface CarritoResponse {
  precioTotal: number;
  monedaId?: number;
  monedaSimbolo?: string;
  itemsCarrito: ItemCarritoResponse[];
  cantidadItems: number;
  cantidadCuotas: number;
  cantidadGrupos: number;
  cantidadTotal: number;
}
