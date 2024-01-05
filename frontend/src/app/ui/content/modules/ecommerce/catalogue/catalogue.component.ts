import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseListadoComponent } from 'src/app/core/base-components/base-listado/base-listado.component';
import { ENDPOINTS } from 'src/app/core/constants/endpoints.constant';
import { CatalogoItemsQuery, ItemCatalogo } from 'src/app/core/controllers/services/business/dto/catalogo/items/catalogo.dto';

@Component({
  selector: 'catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CataloguePage
  extends BaseListadoComponent<
  ItemCatalogo,
  CatalogoItemsQuery,
  {}
  >

  implements OnInit {

  constructor(injector: Injector) {
    super(injector, {
      endpoint: ENDPOINTS.catalogo.items.todos,
      formulario: new FormGroup({}),
    });
  }

  ngOnInit(): void {
    this.cargarData();
  }

  toRequest(): CatalogoItemsQuery {
    return {
      limit: this.dataPagination.limit,
      offset: this.dataPagination.offset,
      esPaginado: this.dataPagination.esPaginado,
    };
  }

}
