import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutPage } from './checkout.component';
import { ResumenCarritoGrupoComponent } from './components/resumen-carrito/resumen-carrito-grupo/resumen-carrito-grupo.component';
import { ResumenCarritoItemCatalogoComponent } from './components/resumen-carrito/resumen-carrito-item-catalogo/resumen-carrito-item-catalogo.component';
import { StepConfirmacionComponent } from './components/steps/step-confirmacion/step-confirmacion.component';
import { StepFacturacionComponent } from './components/steps/step-facturacion/step-facturacion.component';
import { StepTransferenciaBancariaComponent } from './components/steps/step-transferencia-bancaria/step-transferencia-bancaria.component';
// import { CheckoutHandler } from './extras/checkout.handler';
// import { CheckoutForm } from './extras/checkout.form';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from 'src/app/ui/shared/icon/icon.component';
import { ResumenCarritoCuotaComponent } from './components/resumen-carrito/resumen-carrito-cuota/resumen-carrito-cuota.component';
import { CheckoutNgZorroModule } from './extras/checkout.ngzorro';
import { CheckoutSkeletonComponent } from './components/checkout-skeleton/checkout-skeleton.component';


@NgModule({
  declarations: [
    CheckoutPage,
    StepFacturacionComponent,
    StepConfirmacionComponent,
    StepTransferenciaBancariaComponent,
    ResumenCarritoItemCatalogoComponent,
    ResumenCarritoGrupoComponent,
    ResumenCarritoCuotaComponent,
    CheckoutSkeletonComponent,
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    CheckoutNgZorroModule,
    IconComponent,
  ],
})
export class CheckoutModule { }
