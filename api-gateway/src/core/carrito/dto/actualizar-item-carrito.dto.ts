import { IsDefined, IsInt, Max, Min } from "class-validator";

export class ActualizarItemRequest {
    @IsDefined()
    @IsInt()
    @Min(1)
    readonly idItemCarrito: number;

    @IsDefined()
    @IsInt()
    @Min(1)
    @Max(10)
    readonly cantidad: number;
}