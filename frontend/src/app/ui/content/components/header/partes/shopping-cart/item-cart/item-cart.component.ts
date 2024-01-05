import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemCarritoResponse } from 'src/app/core/controllers/services/business/dto/carrito/carrito.dto';
import { TipoItemEnum } from 'src/app/core/enums/tipo-item.enum';
import { TipoItemCarritoEnum } from 'src/app/core/enums/tipoItemCarrito.enum';
import { EliminarItemCarrito } from 'src/app/core/interfaces/eliminar-item-carrito.interface';

@Component({
  selector: 'item-cart[itemCarrito]',
  templateUrl: './item-cart.component.html',
  styleUrls: ['./item-cart.component.scss']
})
export class ItemCartComponent implements OnInit {

  @Input()
  itemCarrito!: ItemCarritoResponse;

  @Output()
  eliminarItem: EventEmitter<EliminarItemCarrito>;

  public readonly TipoItemType = TipoItemEnum;

  constructor() {
    this.eliminarItem = new EventEmitter();
  }

  ngOnInit(): void {
  }

  clicEliminarItem() {
    this.eliminarItem.emit({
      itemCarritoId: this.itemCarrito.id!,
      dataId: this.itemCarrito.itemCatalogo!.id,
      tipoItemCarritoEnum: TipoItemCarritoEnum.Item,
    });
  }

}
