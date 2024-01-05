
export interface DependenciasMaestrosResponse {
  facultades?: Unidep[];
  dependencias?: Unidep[];
}

export interface Unidep {
  readonly id: number;
  readonly codigo: string;
  readonly descripcion: string;
}
