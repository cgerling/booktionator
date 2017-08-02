import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdIconModule, MdInputModule, MdProgressBarModule, MdSnackBarModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';

import { SettingsComponent } from './settings/settings.component';

import { UserRoutingModule } from './user.routing.module';

@NgModule({
  imports: [
    UserRoutingModule,
    CommonModule,
    FormsModule,
    MdButtonModule,
    MdIconModule,
    MdInputModule,
    MdProgressBarModule,
    MdSnackBarModule,
    SharedModule
  ],
  declarations: [
    SettingsComponent
  ],
  providers: [],
  exports: []
})
export class UserModule { }
