import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccessComponent } from './access.component';

import { LoginComponent } from './login/login.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { RegisterComponent } from './register/register.component';
import { RequestPasswordComponent } from './request-reset/request-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Routes = [
  {
    path: '',
    component: AccessComponent,
    children: [
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'register', component: RegisterComponent
      },
      {
        path: 'request-reset', component: RequestPasswordComponent
      },
      {
        path: 'password-reset/:oobCode', component: PasswordResetComponent
      },
      {
        path: 'verify-email/:oobCode', component: VerifyEmailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessRoutingModule { }
