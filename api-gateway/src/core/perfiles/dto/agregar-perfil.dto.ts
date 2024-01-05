import { IsDefined, IsInt, IsString, MaxLength } from 'class-validator';

export class AgregarPerfilRequest {
  @IsDefined()
  @IsString()
  @MaxLength(75)
  nombres: string;

  @IsDefined()
  @IsString()
  @MaxLength(75)
  apellidos: string;

  @IsDefined()
  @IsString()
  @MaxLength(120)
  email: string;

  @IsDefined()
  @IsInt()
  idTipoDocumento: number;

  @IsDefined()
  @IsString()
  @MaxLength(15)
  numeroDocumento: string;

  toString() {
    return JSON.stringify({ ...this });
  }
}
