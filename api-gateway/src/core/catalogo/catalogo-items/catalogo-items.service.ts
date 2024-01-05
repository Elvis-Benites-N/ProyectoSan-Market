import { Inject, Injectable, Param } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { MICROSERVICES } from '@Constants';
import { CatalogoItemsQuery } from './dto/get-items.dto';
import { Observable } from 'rxjs';
import { PaginacionResponse } from '@Interfaces';
import { ItemCatalogoInterface } from './interfaces/item-catalogo.interface';

@Injectable()
export class CatalogoItemsService {
  constructor(
    @Inject(MICROSERVICES.CATALOGO.NAME)
    private readonly microserviceCatalogo: ClientKafka,
  ) {}

  getItems(
    query: CatalogoItemsQuery,
  ): Observable<
    ItemCatalogoInterface[] | PaginacionResponse<ItemCatalogoInterface>
  > {
    return this.microserviceCatalogo.send<
      ItemCatalogoInterface[] | PaginacionResponse<ItemCatalogoInterface>,
      CatalogoItemsQuery
    >(MICROSERVICES.CATALOGO.ENDPOINTS.ITEMS.CONSULTA.ITEMS, query);
  }

  getItemPodId(id: number): Observable<ItemCatalogoInterface> {
    return this.microserviceCatalogo.send(
      MICROSERVICES.CATALOGO.ENDPOINTS.ITEMS.CONSULTA.POR_ID,
      id,
    );
  }
}
