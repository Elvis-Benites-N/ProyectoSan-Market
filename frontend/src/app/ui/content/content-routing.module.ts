import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SesionIniciadaGuard } from 'src/app/core/guards/sesion-iniciada.guard';
import { ContentPage } from './content.component';

const routes: Routes = [
  {
    path: '',
    component: ContentPage,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/ecommerce/ecommerce.module').then((m) => m.EcommerceModule),
      },
      {
        path: 'tickets-pago',
        loadChildren: () =>
          import('./modules/payments-tickets/payments-tickets.module').then((m) => m.PaymentsTicketsModule),
      },
      {
        path: 'transacciones',
        loadChildren: () =>
          import('./modules/transactions/transactions.module').then((m) => m.TransactionsModule),
      },
      {
        path: 'pagos-asignados',
        canLoad: [SesionIniciadaGuard],
        loadChildren: () =>
          import('./modules/assigned-payments/assigned-payments.module').then((m) => m.AssignedPaymentsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
