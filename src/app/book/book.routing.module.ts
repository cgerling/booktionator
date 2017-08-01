import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { DetailsComponent } from './details/details.component';
import { SearchComponent } from './search/search.component';
import { SellComponent } from './sell/sell.component';
import { CreateBookComponent } from './create-book/create-book.component';

const routes: Routes = [
  {
    path: 'sell/:uid', component: SellComponent,
  },
  {
    path: 'search', component: SearchComponent
  },
  {
    path: 'search/:term', component: SearchComponent
  },
  {
    path: 'details/:uid', component: DetailsComponent
  },
  {
    path: 'create', component: CreateBookComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }

// /home
// /book/register
// /details/uid
// /book/search/searchstring
// /book/sell/uid
// /user/settings
// /user/offers
