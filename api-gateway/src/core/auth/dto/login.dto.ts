import { ApiHideProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class LoginRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiHideProperty()
  ip: string;

  @ApiHideProperty()
  userAgent: string;

  toString() {
    return JSON.stringify({ ...this });
  }
}

export interface RefreshInfo {
  idUsuario: number;
  codigo: string;
}

export interface Tokens {
  accessToken: string;
  accessTokenTimeSeconds: number;
  refreshToken: string;
  refreshTokenTimeSeconds: number;
}

export interface UsuarioInfo {
  id: number;
  nombres: string;
  apellidos: string;
  facultadId?: number;
  facultadCodigo?: string;
  tipoDocumentoId?: number;
  numeroDocumento?: string;
  codigoPago: string;
  email: string;
}

export interface LoginResponse {
  usuario: UsuarioInfo;
  tokens: Tokens;
}
