import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdButtonModule, MdDatepickerModule, MdIconModule, MdInputModule, MdProgressBarModule, MdSelectModule, MdToolbarModule, MdCardModule } from '@angular/material';

import { NgxMaskModule } from 'ngx-mask';

import { BookRoutingModule } from './book.routing.module';
import { SharedModule } from '../shared/shared.module';

import { TransactionService } from '../shared/services/transaction.service';
import { AuthService } from '../shared/services/auth.service'

import { CreateBookComponent } from './create-book/create-book.component';
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
    MdProgressBarModule,
    MdSelectModule,
    MdToolbarModule,
    MdCardModule,
    NgxMaskModule,
    SharedModule
  ],
  declarations: [
    CreateBookComponent,
    DetailsComponent,
    SearchComponent,
    SellComponent
  ],
  providers: [TransactionService, AuthService],
  exports: []
})
export class BookModule { }
