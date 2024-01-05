import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsPage } from './groups.component';
import { InDevelopmentComponent } from 'src/app/ui/shared/in-development/in-development.component';


@NgModule({
  declarations: [
    GroupsPage
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    InDevelopmentComponent,
  ]
})
export class GroupsModule { }
