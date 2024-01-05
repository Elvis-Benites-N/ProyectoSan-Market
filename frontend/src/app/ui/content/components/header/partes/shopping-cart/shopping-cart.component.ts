import { Component, Input, OnInit } from '@angular/core';
import { CarritoManager } from 'src/app/core/controllers/managers/carrito/carrito.manager';
import { CarritoResponse } from 'src/app/core/controllers/services/business/dto/carrito/carrito.dto';
import { EliminarItemCarrito } from 'src/app/core/interfaces/eliminar-item-carrito.interface';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  @Input()
  isTablet: boolean = false;

  public carrito?: CarritoResponse;
  public estaCarritoAbierto = false;

  constructor(
    private readonly carritoManager: CarritoManager,
  ) { 
    this.carritoManager.getCarrito()
      .then(carrito=>this.carrito = carrito)
      .catch(error=>{});
  }

  ngOnInit(): void {
  }

  eliminarItem(eliminarItemCarrito: EliminarItemCarrito) {
    this.carritoManager.eliminarItemCarrito(
      eliminarItemCarrito.itemCarritoId,
      eliminarItemCarrito.dataId,
      eliminarItemCarrito.tipoItemCarritoEnum
    );
  }
  
  cerrarCarrito(): void {
    this.estaCarritoAbierto = false;
  }

}
