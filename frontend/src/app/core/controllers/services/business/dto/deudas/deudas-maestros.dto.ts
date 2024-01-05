import { IntBooleanoEnum } from "src/app/core/enums/int-booleano.enum";
import { IdLabel } from "src/app/core/interfaces/id-label.interface";

export interface DeudasMaestrosQuery {
    tiposDeFrecuenciaPenalidad?: IntBooleanoEnum;
    tiposDeTasa?: IntBooleanoEnum;
    estados?: IntBooleanoEnum;
    estadosCuota?: IntBooleanoEnum;
}

export interface DeudasMaestrosResponse {
    tiposDeFrecuenciaPenalidad?: IdLabel[];
    tiposDeTasa?: IdLabel[];
    estados?: IdLabel[];
    estadosCuota?: IdLabel[];
}