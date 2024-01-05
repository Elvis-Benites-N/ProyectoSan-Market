import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/core/controllers/services/business/business.service';

@Component({
  selector: 'step-transferencia-bancaria',
  templateUrl: './step-transferencia-bancaria.component.html',
  styleUrls: ['./step-transferencia-bancaria.component.scss'],
})
export class StepTransferenciaBancariaComponent implements OnInit {
  constructor(
    // public readonly checkoutForm: CheckoutForm,
    // private readonly checkoutHandler: CheckoutHandler,
    private readonly businessService: BusinessService
  ) {}

  ngOnInit(): void {}

  async onSubmit() {
    // if (!this.checkoutForm.validateMetodoDePago()) {
    //   return;
    // }

    // try {
    //   this.checkoutForm.prepararFormularioToAPI();

    //   const response = await this.businessService.methodPost<
    //     ResponseAPI<number>,
    //     CrearPagoRequest
    //   >(
    //     ENDPOINTS.pagos.obtener,
    //     this.checkoutForm.toRequest()
    //   );

    //   this.checkoutHandler.pagoId = response.data!;
    //   this.checkoutHandler.cambiarComponente(CheckoutPasoActual.Confirmacion);
    // } catch (error) {
    //   console.log('error:', error);
    //   this.checkoutForm.hasErrorFromAPI = true;
    //   this.checkoutForm.errorMessageFromAPI =
    //     ErrorUtil.getApiErrorMessage(error);
    // } finally {
    //   this.checkoutForm.resetear();
    // }
  }

  regresar() {
    // this.checkoutHandler.cambiarComponente(CheckoutPasoActual.Facturacion);
  }
}
