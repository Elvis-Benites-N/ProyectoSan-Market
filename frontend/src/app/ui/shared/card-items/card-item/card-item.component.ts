import { Component, Input, OnInit } from '@angular/core';
import { CarritoManager } from 'src/app/core/controllers/managers/carrito/carrito.manager';
import { ItemCatalogo } from 'src/app/core/controllers/services/business/dto/catalogo/items/catalogo.dto';
import { TipoItemCarritoEnum } from 'src/app/core/enums/tipoItemCarrito.enum';
import { customDebounce } from 'src/app/core/utils/function.util';

@Component({
  selector: 'card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent implements OnInit {
  @Input()
  item!: ItemCatalogo;

  procesandoPeticion = false;

  constructor(
    private readonly carritoManager: CarritoManager,
  ) { }

  ngOnInit(): void { }

  // agregarItemCarrito = customDebounce(() => {
  //   if (this.procesandoPeticion) return;

  //   this.procesandoPeticion = true;
  //   this.carritoManager.agregarItemCarrito(
  //     this.item,
  //     TipoItemCarritoEnum.Item
  //   ).then(() => { })
  //     .catch()
  //     .finally(() => {
  //       this.procesandoPeticion = false;
  //     });
  // }, 300);

  agregarItemCarrito() {
    if (this.procesandoPeticion) return;

    this.procesandoPeticion = true;
    this.carritoManager.agregarItemCarrito(
      this.item,
      TipoItemCarritoEnum.Item
    ).then(() => { })
      .catch()
      .finally(() => {
        this.procesandoPeticion = false;
      });
  }

}
