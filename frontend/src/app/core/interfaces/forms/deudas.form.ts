import { FormControl } from "@angular/forms";

export interface ObtenerDeudasForm {
    itemNombre: FormControl<string | null>;
    tipoItemIds: FormControl<number[] | null>;
    estadoDeudaIds: FormControl<number[] | null>;
    estadoCuotaIds: FormControl<number[] | null>;
    tipoFiltroFecha: FormControl<number | null>;
}