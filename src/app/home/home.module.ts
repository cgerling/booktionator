import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MdCardModule } from '@angular/material';

import { HomeRoutingModule } from './home.routing.module';
import { SharedModule } from 'app/shared/shared.module';

import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MdCardModule,
    RouterModule,
    SharedModule,
  ],
  declarations: [HomeComponent],
  providers: [],
  exports: []
})
export class HomeModule { }
