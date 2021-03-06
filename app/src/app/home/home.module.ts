import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material';

import { HomeRoutingModule } from './home.routing.module';
import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule,
    RouterModule,
    SharedModule,
  ],
  declarations: [HomeComponent],
  providers: [],
  exports: []
})
export class HomeModule { }
