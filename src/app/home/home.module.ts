import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';

import { SharedModule } from 'app/shared/shared.module';

import { HomeRoutingModule } from './home.routing.module';

@NgModule({
  imports: [HomeRoutingModule, SharedModule],
  declarations: [HomeComponent],
  providers: [],
  exports: []
})
export class HomeModule { }
