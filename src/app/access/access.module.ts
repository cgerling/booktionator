import { NgModule } from '@angular/core';

import { AccessRoutingModule } from './access.routing.module';

import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdIconModule, MdInputModule } from '@angular/material';
import { SharedModule } from 'app/shared/shared.module';

import { AccessComponent } from './access.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [AccessRoutingModule, FormsModule, MdButtonModule, MdIconModule, MdInputModule, SharedModule],
  declarations: [AccessComponent, LoginComponent],
  providers: [],
  exports: []
})
export class AccessModule { }