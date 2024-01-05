import { PaginacionResponse } from '@Interfaces';

export namespace ConstructorUtil {
  export function buildPaginationData<T>(
    paginacionResponse: [T[], number],
    limit: number,
    offset: number,
  ): PaginacionResponse<T> {
    const totalData = paginacionResponse[1];
    let numberOfPages = Math.trunc(totalData / limit);

    if (numberOfPages != totalData / limit) numberOfPages++;

    let page: number;

    if (offset == 0) page = 1;
    else page = Math.trunc(offset / limit) + 1;

    return {
      data: paginacionResponse[0],
      totalData: totalData,
      itemsPerPage: limit,
      numberOfPages: numberOfPages,
      page: page,
    };
  }

  export function obtenerDateDeFechaCadena(fecha: string): Date {
    const partes = fecha.split('-');

    const year = Number(partes[2]);
    const month = Number(partes[1]) - 1;
    const day = Number(partes[0]);

    return new Date(year, month, day);
  }
}
