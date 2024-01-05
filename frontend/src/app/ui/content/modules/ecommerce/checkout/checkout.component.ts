import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { BaseCreacionComponent } from 'src/app/core/base-components/base-creacion/base-creacion.components';
import { ENDPOINTS } from 'src/app/core/constants/endpoints.constant';
import { CarritoManager } from 'src/app/core/controllers/managers/carrito/carrito.manager';
import { CarritoResponse } from 'src/app/core/controllers/services/business/dto/carrito/carrito.dto';
import { CrearPagoRequest } from 'src/app/core/controllers/services/business/dto/pagos/crear-pago.dto';
import { TipoComprobanteEnum } from 'src/app/core/enums/tipo-comprobante.enum';
import { TipoDocumentoEnum } from 'src/app/core/enums/tipo-documento.enum';
import { ResponseAPI } from 'src/app/core/interfaces/response-api.interface';
import { CheckoutFW, CheckoutPasoActual } from './checkout.form';



interface IData {
  carrito?: CarritoResponse;
  tiposDeDocumento?: {
    id: number;
    nombre: string;
  }[];
}

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutPage
  extends BaseCreacionComponent<
    IData,
    CheckoutFW,
    CrearPagoRequest,
    ResponseAPI
  >
  implements OnInit, OnDestroy {

  public readonly PasoActualType = CheckoutPasoActual;

  constructor(
    injector: Injector,
    private readonly carritoManager: CarritoManager
  ) {
    super(injector, ENDPOINTS.pagos.obtener);
  }

  ngOnInit(): void {
    this.cargarData();
  }

  override async cargarData(): Promise<void> {
    Promise.allSettled([
      this.carritoManager.getCarrito(),
      this.businessService
        .methodGet<any[], {}>(
          ENDPOINTS.maestros.tiposDeDocumento
        )
    ]).then(res => {
      if (res[0].status === 'fulfilled') {
        this.data.carrito = res[0].value;
      }

      if (res[1].status === 'fulfilled') {
        this.data.tiposDeDocumento = res[1].value;
      }

      this.dataCargada = res[0].status === 'fulfilled' &&
        res[1].status === 'fulfilled';
    }).catch(e => {

    })
  }

  override getTopPosition(): number {
    return 0;
  }

  override onSucessCall(response: ResponseAPI<{}>): void {

  }

  override inicializarFormWrapperYData(): void {
    this.formWrapper = new CheckoutFW();
    this.data = {};

    this.formWrapper.formulario.patchValue({
      informacionDeFacturacion: {
        tipoDeComprobante: TipoComprobanteEnum.Boleta,
        email: this.authService.usuario.email,
        tipoDeDocumentoDeIdentidad: TipoDocumentoEnum.DNI,
      },
    });
  }

  override onErrorCall(): void {

  }

  ngOnDestroy(): void {
  }

}
