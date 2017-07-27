import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'
import { MdToolbarModule, MdButtonModule, MdIconModule } from '@angular/material';

import { BookRoutingModule } from './book.routing.module';
import { SharedModule } from 'app/shared/shared.module';

import { SellComponent } from './sell/sell.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  imports: [BookRoutingModule, SharedModule, MdToolbarModule, MdButtonModule, MdIconModule, HttpModule],
  declarations: [SellComponent, SearchComponent],
  providers: [],
  exports: []
})
export class BookModule { }
