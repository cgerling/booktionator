import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { SellComponent } from './sell/sell.component';

const routes: Routes = [
  {
    path: 'sell', component: SellComponent
  },
  {
    path: 'book/:uid', component: undefined
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
