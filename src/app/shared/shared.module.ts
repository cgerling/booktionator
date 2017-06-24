import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdIconModule, MdMenuModule, MdToolbarModule } from '@angular/material';

import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  imports: [CommonModule, MdButtonModule, MdIconModule, MdMenuModule, MdToolbarModule],
  declarations: [NavbarComponent],
  providers: [],
  exports: [NavbarComponent]
})
export class SharedModule { }
