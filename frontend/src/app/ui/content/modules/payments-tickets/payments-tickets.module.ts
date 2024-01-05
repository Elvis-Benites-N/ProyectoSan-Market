import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsTicketsRoutingModule } from './payments-tickets-routing.module';
import { PaymentsTicketsPage } from './payments-tickets.component';
import { InDevelopmentComponent } from 'src/app/ui/shared/in-development/in-development.component';


@NgModule({
  declarations: [
    PaymentsTicketsPage
  ],
  imports: [
    CommonModule,
    PaymentsTicketsRoutingModule,
    InDevelopmentComponent,
  ]
})
export class PaymentsTicketsModule { }
