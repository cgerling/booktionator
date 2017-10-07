import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdIconModule, MdInputModule, MdProgressBarModule, MdSnackBarModule, MdTabsModule, MdCardModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';

import { NgxMaskModule } from 'ngx-mask';

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
    MdTabsModule,
    MdCardModule,
    SharedModule,
    NgxMaskModule
  ],
  declarations: [
    SettingsComponent,
    HistoryComponent
  ],
  providers: [],
  exports: []
})
export class UserModule { }
