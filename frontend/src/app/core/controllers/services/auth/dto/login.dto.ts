export interface LoginRequest {
    readonly email: string;
    password: string;
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
    codigoPago: string;
    email: string;
}

export interface LoginResponse {
    usuario: UsuarioInfo;
}
