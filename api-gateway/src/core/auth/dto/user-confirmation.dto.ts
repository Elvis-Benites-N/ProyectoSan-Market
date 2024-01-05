import { IsDefined, IsInt, IsNotEmpty, IsString, Min, MinLength } from "class-validator";

export class UserConfirmationRequest {

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    readonly token: string;

    @IsDefined()
    @IsInt()
    @Min(1000001)
    readonly usuarioId: number;

    toString(){
        return JSON.stringify({...this});
    }

}