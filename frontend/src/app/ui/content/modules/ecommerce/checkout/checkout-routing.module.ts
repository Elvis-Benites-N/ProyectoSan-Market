import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomRoutes } from 'src/app/core/interfaces/custom-route.interface';
import { CheckoutPage } from './checkout.component';

const routes: CustomRoutes = [
  {
    path: '',
    component: CheckoutPage,
    data: {
      webtitle: 'Generar Ticket | San Market',
      webdescription: 'Generación de tickets en San Market',
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
