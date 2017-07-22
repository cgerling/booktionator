import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdIconModule, MdInputModule, MdMenuModule, MdToolbarModule } from '@angular/material';

import { NavbarComponent } from './components/navbar/navbar.component';
import { PasswordToggleComponent } from './components/password-toggle/password-toggle.component';
import { DividerComponent } from './components/divider/divider.component';

import { EmailValidatorDirective } from './directives/emailValidator.directive';
import { TelValidatorDirective } from './directives/telValidator.directive';
import { CepValidatorDirective } from './directives/cepValidator.directive';

import { AuthService } from './services/auth.service';
import { LoaderService } from './services/loader.service';
import { StorageService } from './services/storage.service';

import { AuthGuard } from './guards/auth.guard';

@NgModule({
  imports: [CommonModule, FormsModule, MdButtonModule, MdIconModule, MdInputModule, MdMenuModule, MdToolbarModule, RouterModule],
  declarations: [CepValidatorDirective, DividerComponent, EmailValidatorDirective, NavbarComponent, PasswordToggleComponent, TelValidatorDirective],
  providers: [AuthGuard, AuthService, LoaderService, StorageService],
  exports: [CepValidatorDirective, DividerComponent, EmailValidatorDirective, NavbarComponent, PasswordToggleComponent, TelValidatorDirective]
})
export class SharedModule { }
