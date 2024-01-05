import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { IconComponent } from '../icon/icon.component';
import { TagTipoItemComponent } from '../tag-tipo-item/tag-tipo-item.component';
import { CardItemComponent } from './card-item/card-item.component';
import { CardItemsComponent } from './card-items.component';
import { CardSkeletonComponent } from './card-skeleton/card-skeleton.component';

@NgModule({
  declarations: [CardItemsComponent, CardItemComponent, CardSkeletonComponent],
  exports: [CardItemComponent, CardItemsComponent],
  imports: [
    CommonModule,
    TranslateModule,
    NzToolTipModule,
    NzGridModule,
    NzButtonModule,
    NzSkeletonModule,
    NzDividerModule,
    NzPaginationModule,
    TagTipoItemComponent,
    IconComponent,
  ],
})
export class CardItemsModule {}
