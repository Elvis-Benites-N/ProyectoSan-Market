import { Unidep } from './unidep.interface';

export interface Establecimiento {
  id_unidep: number;
  codigo: string;
  estado: boolean;
  unidep: Unidep;
}
