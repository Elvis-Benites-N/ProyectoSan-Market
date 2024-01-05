import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LanguagePickerComponent } from './components/header/partes/language-picker/language-picker.component';
import { SearchComponent } from './components/header/partes/search/search.component';
import { ShoppingCartComponent } from './components/header/partes/shopping-cart/shopping-cart.component';
import { ContentRoutingModule } from './content-routing.module';
import { ContentPage } from './content.component';

// PIPES
import { TranslateModule } from '@ngx-translate/core';

// NG ZORRO
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { ItemCartComponent } from './components/header/partes/shopping-cart/item-cart/item-cart.component';
import { IconComponent } from '../shared/icon/icon.component';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { FeeCartComponent } from './components/header/partes/shopping-cart/fee-cart/fee-cart.component';

@NgModule({
  declarations: [
    ContentPage,
    HeaderComponent,
    FooterComponent,
    ShoppingCartComponent,
    SearchComponent,
    LanguagePickerComponent,
    ItemCartComponent,
    FeeCartComponent,
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    TranslateModule,
    NzBadgeModule,
    NzButtonModule,
    NzDividerModule,
    NzMenuModule,
    NzPopoverModule,
    IconComponent,
    SpinnerComponent,
  ]
})
export class ContentModule { }
