import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { SearchComponent } from './search/search.component';
import { SellComponent } from './sell/sell.component';

const routes: Routes = [
  {
    path: 'sell/:uid', component: SellComponent,
  },
  {
    path: 'search/:term', component: SearchComponent
  },
  {
    path: 'details/:uid', component: DetailsComponent
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
