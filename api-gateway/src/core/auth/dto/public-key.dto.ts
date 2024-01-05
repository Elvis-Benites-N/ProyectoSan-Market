import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class PublicKeyRequest {

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(120)
    @Matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/, {
      message: 'Formato correo inválido'
    })
    readonly email: string;

    toString(){
      return JSON.stringify({...this});
    }

}

export interface PublicKeyResponse{
    secretKey: string;
}