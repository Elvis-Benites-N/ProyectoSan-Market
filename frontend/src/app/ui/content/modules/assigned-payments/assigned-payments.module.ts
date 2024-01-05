import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignedPaymentsRoutingModule } from './assigned-payments-routing.module';
import { AssignedPaymentsPage } from './assigned-payments.component';
import { IconComponent } from 'src/app/ui/shared/icon/icon.component';
// NG ZORRO MODULES
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { PaymentAssignedComponent } from './payment-assigned/payment-assigned.component';
import { SafetyCallComponent } from 'src/app/ui/shared/safety-call/safety-call.component';
import { PaymentAssignedSkeletonComponent } from './payment-assigned-skeleton/payment-assigned-skeleton.component';
import { TagTipoItemComponent } from 'src/app/ui/shared/tag-tipo-item/tag-tipo-item.component';
import { FeeComponent } from './fee/fee.component';
import { FeeSkeletonComponent } from './fee-skeleton/fee-skeleton.component';
import { FiltersComponent } from './filters/filters.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { TranslateModule } from '@ngx-translate/core';
import { NextTimePipe } from 'src/app/core/pipes/next-time.pipe';


@NgModule({
  declarations: [
    AssignedPaymentsPage,
    PaymentAssignedComponent,
    PaymentAssignedSkeletonComponent,
    FeeComponent,
    FeeSkeletonComponent,
    FiltersComponent,
  ],
  imports: [
    CommonModule,
    AssignedPaymentsRoutingModule,
    IconComponent,
    ReactiveFormsModule,
    NzCollapseModule,
    NzDividerModule,
    NzInputModule,
    NzButtonModule,
    NzFormModule,
    NzSkeletonModule,
    NzPaginationModule,
    NzProgressModule,
    NzTagModule,
    SafetyCallComponent,
    TagTipoItemComponent,
    TranslateModule,
    NextTimePipe,
  ]
})
export class AssignedPaymentsModule { }
