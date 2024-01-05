import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogueRoutingModule } from './catalogue-routing.module';
import { CataloguePage } from './catalogue.component';

// NG ZORRO
import { CardItemsModule } from 'src/app/ui/shared/card-items/card-items.module';
import { SafetyCallComponent } from 'src/app/ui/shared/safety-call/safety-call.component';


@NgModule({
  declarations: [
    CataloguePage
  ],
  imports: [
    CommonModule,
    CatalogueRoutingModule,
    SafetyCallComponent,
    CardItemsModule,
  ]
})
export class CatalogueModule { }
