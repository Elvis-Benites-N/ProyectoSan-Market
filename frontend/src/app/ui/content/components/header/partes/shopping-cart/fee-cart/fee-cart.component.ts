import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemCarritoResponse } from 'src/app/core/controllers/services/business/dto/carrito/carrito.dto';
import { TipoItemEnum } from 'src/app/core/enums/tipo-item.enum';
import { TipoItemCarritoEnum } from 'src/app/core/enums/tipoItemCarrito.enum';
import { EliminarItemCarrito } from 'src/app/core/interfaces/eliminar-item-carrito.interface';

@Component({
  selector: 'fee-cart',
  templateUrl: './fee-cart.component.html',
  styleUrls: ['./fee-cart.component.scss']
})
export class FeeCartComponent implements OnInit {

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
      dataId: this.itemCarrito.cuota!.id,
      tipoItemCarritoEnum: TipoItemCarritoEnum.Cuota,
    });
  }

}
