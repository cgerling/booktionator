import { NgModule } from '@angular/core';

import { AccessRoutingModule } from './access.routing.module';

import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdIconModule, MdInputModule } from '@angular/material';
import { SharedModule } from 'app/shared/shared.module';

import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [AccessRoutingModule, FormsModule, MdButtonModule, MdIconModule, MdInputModule, SharedModule],
  declarations: [LoginComponent],
  providers: [],
  exports: []
})
export class AccessModule { }
