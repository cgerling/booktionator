import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdButtonModule, MdDatepickerModule, MdIconModule, MdInputModule, MdSelectModule, MdToolbarModule } from '@angular/material';

import { BookRoutingModule } from './book.routing.module';
import { SharedModule } from 'app/shared/shared.module';

import { DetailsComponent } from './details/details.component';
import { SearchComponent } from './search/search.component';
import { SellComponent } from './sell/sell.component';

@NgModule({
  imports: [
    BookRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    MdButtonModule,
    MdDatepickerModule,
    MdIconModule,
    MdInputModule,
    MdSelectModule,
    MdToolbarModule,
    SharedModule
  ],
  declarations: [
    DetailsComponent,
    SearchComponent,
    SellComponent
  ],
  providers: [],
  exports: []
})
export class BookModule { }
