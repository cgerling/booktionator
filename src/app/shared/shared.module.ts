import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdIconModule, MdMenuModule, MdToolbarModule } from '@angular/material';

import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';

@NgModule({
  imports: [CommonModule, MdButtonModule, MdIconModule, MdMenuModule, MdToolbarModule],
  declarations: [NavbarComponent],
  providers: [AuthService, StorageService],
  exports: [NavbarComponent]
})
export class SharedModule { }
