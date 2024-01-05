import { IntBooleanoEnum } from "src/app/core/enums/int-booleano.enum";

export interface ObtenerDeudasQuery {
    itemNombre?: string | null;
    tipoItemIds?: string | null;
    estadoDeudaIds?: string | null;
    primeraCuotaEstadoIds?: string | null;
    tipoFiltroFechaEnum?: number | null;
    limit?: number;
    offset?: number;
    esPaginado?: IntBooleanoEnum;
}

export interface DeudaView {
    id: number;
    publicKey: string;
    cantidadCuotas: number;
    itemNombre: string;
    unidadPadreNivel2Id: number;
    unidadPadreNivel2Descripcion: string;
    tipoItemId: number;
    tipoItemDescripcion: string;
    fechaCreacion: string;
    montoMora: number;
    montoBase: number;
    montoTotal: number;
    monedaId: number;
    monedaSimbolo: string;  
    montoDescuento: number;
    tipoDocumentoId: number;
    tipoDocumentoDescripcion: string;
    personaNumeroDocumento: string;
    personaNombreCompleto: string;
    personaCorreo: string;
    estadoDeudaId: number;
    estadoDeudaDescripcion: string;
    primeraCuotaPagadaId: number;
    primeraCuotaNoPagadaFecha: Date;
    primeraCuotaNoPagadaEstadoId: number;
    primeraCuotaNoPagadaEstadoDescriocion: string;
    cuotasPagadas: boolean;
}
