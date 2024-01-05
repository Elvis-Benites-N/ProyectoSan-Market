import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomRoutes } from 'src/app/core/interfaces/custom-route.interface';
import { PaymentsTicketsPage } from './payments-tickets.component';

const routes: CustomRoutes = [
  {
    path: '',
    component: PaymentsTicketsPage,
    data: {
      webtitle: 'Tickets de Pago | San Market',
      webdescription: 'Tickets de pagos...',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsTicketsRoutingModule { }
