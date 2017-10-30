import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatInputModule, MatProgressBarModule, MatSnackBarModule, MatTabsModule, MatCardModule } from '@angular/material';
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
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTabsModule,
    MatCardModule,
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
