export interface RegisterRequest {
  readonly email: string;
  password: string;
  readonly nombres: string;
  readonly apellidos: string;
  readonly facultadId?: number;
  readonly facultadNombre?: string;
  readonly facultadCodigo?: string
}
