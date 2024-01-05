import { IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";

export class SunatQuery {
    @IsNotEmpty()
    @MinLength(11)
    @MaxLength(11)
    @Matches(/[0-9]+/)
    ruc: string;
}

export interface SunatData {
    ruc: string;
    razonSocial: string;
    direccion: string;
}