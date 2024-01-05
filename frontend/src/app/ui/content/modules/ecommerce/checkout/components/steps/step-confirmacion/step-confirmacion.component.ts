import { Component, OnInit } from '@angular/core';
// import { CheckoutHandler } from '../../../extras/checkout.handler';
import { BusinessService } from 'src/app/core/controllers/services/business/business.service';
import { ENDPOINTS } from 'src/app/core/constants/endpoints.constant';

@Component({
  selector: 'step-confirmacion',
  templateUrl: './step-confirmacion.component.html',
  styleUrls: ['./step-confirmacion.component.scss'],
})
export class StepConfirmacionComponent implements OnInit {
  public pago: any;

  constructor(
    // private readonly checkoutHandler: CheckoutHandler,
    private readonly businessService: BusinessService
  ) {}

  ngOnInit(): void {
    // this.businessService
    //   .methodGet<any, {}>(
    //    {
    //     url: ENDPOINTS.pagos.porId,
    //     params: [this.checkoutHandler.pagoId.toString()],
    //    }
    //   )
    //   .then((pago) => (this.pago = pago));
  }
}
