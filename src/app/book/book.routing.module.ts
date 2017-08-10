import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { DetailsComponent } from './details/details.component';
import { SearchComponent } from './search/search.component';
import { SellComponent } from './sell/sell.component';
import { CreateBookComponent } from './create-book/create-book.component';

import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'sell/:uid', component: SellComponent,
    canActivate: [AuthGuard], canLoad: [AuthGuard]
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
    path: 'create', component: CreateBookComponent,
    canActivate: [AuthGuard], canLoad: [AuthGuard]
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
