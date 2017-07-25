import { NgModule } from '@angular/core';

import { BookRoutingModule } from './book.routing.module';
import { SharedModule } from 'app/shared/shared.module';

import { SellComponent } from './sell/sell.component';


@NgModule({
  imports: [BookRoutingModule, SharedModule],
  declarations: [SellComponent],
  providers: [],
  exports: []
})
export class BookModule { }
