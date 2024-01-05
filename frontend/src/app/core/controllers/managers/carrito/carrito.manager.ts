import { Injectable } from '@angular/core';
import { ENDPOINTS } from 'src/app/core/constants/endpoints.constant';
import { TipoItemCarritoEnum } from 'src/app/core/enums/tipoItemCarrito.enum';
import { ResponseAPI } from 'src/app/core/interfaces/response-api.interface';
import { CarritoProvider } from '../../providers/carrito/carrito.provider';
import { AuthService } from '../../services/auth/auth.service';
import { BusinessService } from '../../services/business/business.service';
import { AgregarItemRequest } from '../../services/business/dto/carrito/agregarItem.dto';
import { CarritoResponse } from '../../services/business/dto/carrito/carrito.dto';
import { GrupoResponse } from '../../services/business/dto/catalogo/grupos/grupos.dto';
import { ItemCatalogo } from '../../services/business/dto/catalogo/items/catalogo.dto';

@Injectable({
  providedIn: 'root',
})
export class CarritoManager {

  public carrito?: CarritoResponse;

  constructor(
    private readonly authService: AuthService,
    private readonly businessService: BusinessService,
    private readonly carritoProvider: CarritoProvider,
  ) {}

  closeCarrito() {
    this.carrito = undefined;
  }

  async getCarrito(): Promise<CarritoResponse> {
    if (this.carrito) return this.carrito;

    if (this.authService.existeSesion()) {
      this.carrito = await this.businessService.methodGet<CarritoResponse, {}>(
        ENDPOINTS.carrito.obtener,
      );
    } else {
      this.carrito = this.carritoProvider.getCarrito();
    }

    return this.carrito;
  }

  async agregarItemCarrito(
    data: ItemCatalogo | GrupoResponse,
    tipoItemCarrito: TipoItemCarritoEnum
  ): Promise<void> {
    let idItem: number | undefined;

    if (this.authService.existeSesion()) {
      const response = await this.businessService.methodPost<
        ResponseAPI<number>,
        AgregarItemRequest
      >(ENDPOINTS.carrito.obtener, {
        idItem: data.id,
        tipoItemCarrito,
      });
      idItem = response.data;
    }

    this.carritoProvider.agregarItemCarrito(
      this.carrito,
      idItem,
      data,
      tipoItemCarrito,
      !this.authService.existeSesion()
    );
  }

  eliminarItemCarrito(
    idItemCarrito: number,
    idData: number,
    tipoItemCarrito: TipoItemCarritoEnum
  ) {
    if (this.authService.existeSesion()) {
      this.businessService
        .methodDelete<ResponseAPI, {}>({
          url: ENDPOINTS.carrito.eliminar,
          params: [idItemCarrito.toString()]
        }
        )
        .then()
        .catch();
    }

    this.carritoProvider.eliminarItemCarrito(
      this.carrito!,
      idItemCarrito,
      idData,
      tipoItemCarrito,
      !this.authService.existeSesion()
    );
  }

  // async actualizarItemCarrito(
  //   idItemCarrito: number,
  //   idData: number,
  //   tipoItemCarrito: TipoItemCarritoEnum,
  //   cantidad: number
  // ) {
  //   if (cantidad === 0 || cantidad > CANTIDAD_MAXIMA_ITEM_CARRITO) return;

  //   if (this.authService.existeSesion()) {
  //     this.businessService
  //       .methodPatch<ResponseAPI, ActualizarItemRequest>(
  //         this.businessService.endpoints.CARRITO.ACTUALIZAR_ITEM_CARRITO,
  //         {
  //           cantidad,
  //           idItemCarrito,
  //         }
  //       )
  //       .then();
  //   }

  //   this.carritoProvider.actualizarItemCarrito(
  //     this.carrito,
  //     idItemCarrito,
  //     idData,
  //     tipoItemCarrito,
  //     cantidad,
  //     !this.authService.existeSesion()
  //   );
  // }
}
