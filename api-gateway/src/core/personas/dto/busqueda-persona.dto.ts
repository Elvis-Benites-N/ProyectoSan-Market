export interface PersonaDetalle {
    id: number;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    razon_social: string;
    telefono: string;
    direccion: string;
    correos: string[];
    personasDocumentos: {
        numeroDocumento: string;
        tipoDocumento: {
            descripcion: string;
            id: number;
        };
    }[];
}

export interface BusquedaPersonaQuery {
    tipoBusqueda: string;
    valorBusqueda: string;
}
