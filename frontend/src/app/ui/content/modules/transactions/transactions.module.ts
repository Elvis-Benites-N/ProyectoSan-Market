import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsPage } from './transactions.component';
import { InDevelopmentComponent } from 'src/app/ui/shared/in-development/in-development.component';


@NgModule({
  declarations: [
    TransactionsPage
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    InDevelopmentComponent,
  ]
})
export class TransactionsModule { }
