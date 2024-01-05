export interface ItemCatalogoInterface {
    readonly id: number;
    readonly itemId: number;
    readonly historialItemId: number;
    readonly unidepId: number;
    readonly unidepCodigo: string;
    readonly unidepDescripcion: string;
    readonly unidepPadreNivel2Id: number;
    readonly unidepPadreNivel2Codigo: string;
    readonly unidepPadreNivel2Descripcion: string;
    readonly tipoItemId: number;
    readonly tipoItemDescripcion: string;
    readonly tipoItemPadreId: number;
    readonly tipoItemPadreDescripcion: string;
    readonly monedaId: number;
    readonly monedaSimbolo: string;
    readonly monedaDescripcion: string;
    readonly unidadMedidaCodigo: string;
    readonly unidadMedidaDescripcion: string;
    readonly categoriaId: number;
    readonly categoriaNombre: string;
    readonly categoriaDescripcion: string;
    readonly itemNombre: string;
    readonly itemValorUnitario: number;
    readonly itemPrecio: number;
    readonly itemIGV: number;
    readonly estadoItemId: number;
    readonly estadoItemDescripcion: string;
    readonly tipoAfectacionId: number;
    readonly tipoAfectacionDescripcion: string;
    readonly itemFechaRegistro: Date;
    readonly itemSustento: string;
    readonly clasificadorIngresoEspecifica?: string;
    readonly clasificadorIngresoDescripcion?: string;
    readonly planContableCodigo?: string;
    readonly planContableDescripcion?: string;
    readonly detraccionId?: number;
    readonly detraccionCodigo?: string;
    readonly detraccionDescripcion?: string;
    readonly detraccionPorcentaje?: number;
    readonly detraccionTipoOperacion?: string;
}