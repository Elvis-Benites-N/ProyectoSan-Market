import { IsDefined, IsEnum, IsInt, Min } from 'class-validator';
import { ItemCatalogoInterface } from 'src/core/catalogo/catalogo-items/interfaces/item-catalogo.interface';
import { TipoItemCarritoEnum } from '../enums/tipo-item-carrito.enum';
import { GrupoResponse } from '@/core/catalogo/catalogo-grupos/dto/obtener-grupo.dto';

export class AgregarItemRequest {
  @IsDefined()
  @IsInt()
  @Min(1)
  readonly idItem: number;

  @IsDefined()
  @IsEnum(TipoItemCarritoEnum)
  readonly tipoItemCarrito: TipoItemCarritoEnum;
}

export interface ItemCarritoResponse {
  readonly id: number;
  readonly itemCatalogo: ItemCatalogoInterface;
  readonly grupo: GrupoResponse;
  readonly cuota: CuotaResponse;
  readonly cantidad: number;
  readonly precioTotal: number;
}

export interface CarritoResponse {
  readonly precioTotal: number;
  readonly monedaId: number;
  readonly monedaSimbolo: string;
  readonly itemsCarrito: ItemCarritoResponse[];
  readonly cantidadItems: number;
  readonly cantidadGrupos: number;
  readonly cantidadCuotas: number;
  readonly cantidadTotal: number;
}

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
