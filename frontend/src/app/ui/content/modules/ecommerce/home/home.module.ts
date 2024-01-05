import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IconComponent } from 'src/app/ui/shared/icon/icon.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { BannerContentComponent } from './banner-content/banner-content.component';
import { BenefitsComponent } from './benefits/benefits.component';
import { CardBenefitComponent } from './benefits/card-benefit/card-benefit.component';


@NgModule({
  declarations: [
    HomeComponent,
    BannerContentComponent,
    BenefitsComponent,
    CardBenefitComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    NzButtonModule,
    IconComponent,
    TranslateModule,
  ]
})
export class HomeModule { }
