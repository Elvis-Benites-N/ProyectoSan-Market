import { IntBooleanoEnum } from 'src/app/core/enums/int-booleano.enum';
import { TipoOrdenamiento } from 'src/app/core/enums/tipo-ordenamiento.enum';

export interface ItemCatalogo {
  id: number;
  itemId: number;
  historialItemId: number;
  unidepId: number;
  unidepCodigo: string;
  unidepDescripcion: string;
  unidepPadreNivel2Id: number;
  unidepPadreNivel2Codigo: string;
  unidepPadreNivel2Descripcion: string;
  tipoItemId: number;
  tipoItemDescripcion: string;
  tipoItemPadreId: number;
  tipoItemPadreDescripcion: string;
  monedaId: number;
  monedaSimbolo: string;
  monedaDescripcion: string;
  unidadMedidaCodigo: string;
  unidadMedidaDescripcion: string;
  categoriaId: number;
  categoriaNombre: string;
  categoriaDescripcion: string;
  itemNombre: string;
  itemValorUnitario: number;
  itemPrecio: number;
  itemIGV: number;
  estadoItemId: number;
  estadoItemDescripcion: string;
  tipoAfectacionId: number;
  tipoAfectacionDescripcion: string;
  itemFechaRegistro: Date;
  itemSustento: string;
  clasificadorIngresoEspecifica?: string;
  clasificadorIngresoDescripcion?: string;
  planContableCodigo?: string;
  planContableDescripcion?: string;
  detraccionId?: number;
  detraccionCodigo?: string;
  detraccionDescripcion?: string;
  detraccionPorcentaje?: number;
  detraccionTipoOperacion?: string;
}

export interface CatalogoItemsQuery {
  unidepCodigo?: string;
  tipoDeFiltroUnidep?: number;
  limit?: number;
  offset?: number;
  categoria?: number;
  esPaginado?: IntBooleanoEnum;
  tipoDeItem?: number;
  soloActivos?: IntBooleanoEnum;
  palabraClave?: string;
  ordenarPor?: TipoOrdenamiento;
}
