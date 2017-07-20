import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdIconModule, MdInputModule, MdMenuModule, MdToolbarModule } from '@angular/material';

import { NavbarComponent } from './components/navbar/navbar.component';
import { PasswordToggleComponent } from './components/password-toggle/password-toggle.component';
import { DividerComponent } from './components/divider/divider.component';

import { AuthService } from './services/auth.service';
import { LoaderService } from './services/loader.service';
import { StorageService } from './services/storage.service';

import { AuthGuard } from './guards/auth.guard';

@NgModule({
  imports: [CommonModule, FormsModule, MdButtonModule, MdIconModule, MdInputModule, MdMenuModule, MdToolbarModule, RouterModule],
  declarations: [DividerComponent, NavbarComponent, PasswordToggleComponent],
  providers: [AuthGuard, AuthService, LoaderService, StorageService],
  exports: [DividerComponent, NavbarComponent, PasswordToggleComponent]
})
export class SharedModule { }
