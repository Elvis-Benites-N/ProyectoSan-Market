import {
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    Length,
    Matches,
    MaxLength,
    Min,
    MinLength
} from 'class-validator';

export class RegisterRequest {

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(75)
  @Matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/, {
    message: 'Formato correo inválido'
  })
  @Matches(/.*(?<!unmsm.edu.pe)$/, {
    message: 'No se permite correo institucional'
  })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(75)
  readonly nombres: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(75)
  readonly apellidos: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  readonly idTipoDocumento?: number;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  readonly numeroDocumento?: string;

  @IsOptional()
  @IsInt()
  @Min(10000)
  readonly facultadId?: number;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(75)
  readonly facultadNombre?: string;

  @IsOptional()
  @IsString()
  @Length(5)
  readonly facultadCodigo?: string;

  toString(){
    return JSON.stringify({...this});
  }

}