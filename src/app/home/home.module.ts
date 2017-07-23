import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdCardModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

import { SharedModule } from 'app/shared/shared.module';

import { HomeRoutingModule } from './home.routing.module';

@NgModule({
  imports: [HomeRoutingModule, SharedModule, CommonModule, MdCardModule, RouterModule],
  declarations: [HomeComponent],
  providers: [],
  exports: []
})
export class HomeModule { }
