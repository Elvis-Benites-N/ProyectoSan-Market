import {
  Controller,
  Get,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
  Param,
  Query,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { MICROSERVICES } from '@Constants';
import { CatalogoItemsService } from './catalogo-items.service';
import { PaginacionResponse } from '@Interfaces';
import { Observable } from 'rxjs';
import { CatalogoItemsQuery } from './dto/get-items.dto';
import { ItemCatalogoInterface } from './interfaces/item-catalogo.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Catalogo')
@Controller('catalogo/items')
export class CatalogoItemsController implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject(MICROSERVICES.CATALOGO.NAME)
    private readonly microserviceCatalogo: ClientKafka,
    private readonly service: CatalogoItemsService,
  ) {}

  onModuleInit() {
    this.microserviceCatalogo.subscribeToResponseOf(
      MICROSERVICES.CATALOGO.ENDPOINTS.ITEMS.CONSULTA.ITEMS,
    );

    this.microserviceCatalogo.subscribeToResponseOf(
      MICROSERVICES.CATALOGO.ENDPOINTS.ITEMS.CONSULTA.POR_ID,
    );
  }

  async onModuleDestroy() {
    await this.microserviceCatalogo.close();
  }

  @Get('/')
  getItems(
    @Query()
    query: CatalogoItemsQuery,
  ): Observable<
    ItemCatalogoInterface[] | PaginacionResponse<ItemCatalogoInterface>
  > {
    return this.service.getItems(query);
  }

  @Get('/:id')
  getItemPodId(
    @Param('id')
    id: number,
  ): Observable<ItemCatalogoInterface> {
    return this.service.getItemPodId(id);
  }
}
