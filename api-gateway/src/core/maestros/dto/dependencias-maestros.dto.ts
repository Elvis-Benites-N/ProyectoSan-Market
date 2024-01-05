import { Establecimiento, Unidep } from '@Interfaces';

export interface DependenciasMaestrosResponse {
  facultades?: Unidep[];
  dependencias?: Unidep[];
  unidepsOrganico?: Unidep[];
  establecimiento?: Establecimiento[];
}
