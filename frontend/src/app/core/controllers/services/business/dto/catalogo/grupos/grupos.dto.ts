import { ItemCatalogo } from "../items/catalogo.dto";

export interface GrupoResponse {
    readonly id: number;
    readonly nombre: string;
    readonly unidepId: number;
    readonly unidepDescripcion: string;
    readonly monedaId: number;
    readonly monedaSimbolo: string;
    readonly precio: number;
    readonly items: ItemCatalogo[];
  }