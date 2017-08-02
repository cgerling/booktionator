import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdIconModule, MdInputModule, MdProgressBarModule, MdSnackBarModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';

import { AccessRoutingModule } from './access.routing.module';

import { AccessComponent } from './access.component';
import { LoginComponent } from './login/login.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { RegisterComponent } from './register/register.component';
import { RequestPasswordComponent } from './request-reset/request-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

@NgModule({
  imports: [
    AccessRoutingModule,
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
    AccessComponent,
    LoginComponent,
    PasswordResetComponent,
    RegisterComponent,
    RequestPasswordComponent,
    VerifyEmailComponent
  ],
  providers: [],
  exports: []
})
export class AccessModule { }
