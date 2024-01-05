import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemCatalogo } from 'src/app/core/controllers/services/business/dto/catalogo/items/catalogo.dto';
import { PaginacionResponse } from 'src/app/core/interfaces/paginacion-response.interface';

@Component({
  selector: 'card-items',
  templateUrl: './card-items.component.html',
  styleUrls: ['./card-items.component.scss'],
})
export class CardItemsComponent implements OnInit {
  @Input()
  paginacionResponse?: PaginacionResponse<ItemCatalogo>;

  @Input()
  esBusqueda?: boolean;

  @Input()
  esPagina?: boolean;

  @Output()
  cambiarPagina: EventEmitter<number>;

  @Output()
  cambiarTamanio: EventEmitter<number>;

  constructor() {
    this.cambiarPagina = new EventEmitter();
    this.cambiarTamanio = new EventEmitter();
  }

  ngOnInit(): void { }

  nzPageIndexChange(pagina: number) {
    this.cambiarPagina.emit(pagina);
  }

  nzPageSizeChange(size: number) {
    this.cambiarTamanio.emit(size);
  }
}
