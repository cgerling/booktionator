import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessRoutingModule } from './access.routing.module';

import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdIconModule, MdInputModule, MdProgressBarModule, MdSnackBarModule } from '@angular/material';
import { SharedModule } from 'app/shared/shared.module';

import { AccessComponent } from './access.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [AccessRoutingModule, CommonModule, FormsModule, MdButtonModule, MdIconModule, MdInputModule, MdProgressBarModule, MdSnackBarModule, SharedModule],
  declarations: [AccessComponent, LoginComponent, RegisterComponent],
  providers: [],
  exports: []
})
export class AccessModule { }
