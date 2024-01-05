import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomRoutes } from 'src/app/core/interfaces/custom-route.interface';
import { TransactionsPage } from './transactions.component';

const routes: CustomRoutes = [
  {
    path: '',
    component: TransactionsPage,
    data: {
      webtitle: 'Transacciones | San Market',
      webdescription: 'Transacciones...',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
