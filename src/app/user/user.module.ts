import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdIconModule, MdInputModule, MdProgressBarModule, MdSnackBarModule } from '@angular/material';
import { SharedModule } from 'app/shared/shared.module';

import { SettingsComponent } from './settings/settings.component';
import { HistoryComponent } from './history/history.component';

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
    SettingsComponent,
    HistoryComponent
  ],
  providers: [],
  exports: []
})
export class UserModule { }
