import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdIconModule, MdInputModule, MdMenuModule, MdToolbarModule, MdCardModule, MdSnackBarModule } from '@angular/material';
import { HttpModule } from '@angular/http';

import { AppMenuComponent } from './components/app-menu/app-menu.component';
import { PasswordToggleComponent } from './components/password-toggle/password-toggle.component';
import { DividerComponent } from './components/divider/divider.component';
import { ResultViewerComponent } from './components/result-viewer/result-viewer.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { VerifyAccountComponent } from './components/verify-account/verify-account.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RatingComponent } from './components/rating/rating.component';

import { EmailValidatorDirective } from './directives/emailValidator.directive';
import { TelValidatorDirective } from './directives/telValidator.directive';
import { CepValidatorDirective } from './directives/cepValidator.directive';

import { AuthService } from './services/auth.service';
import { BookService } from './services/book.service';
import { LoaderService } from './services/loader.service';
import { StorageService } from './services/storage.service';
import { TransactionService } from './services/transaction.service'

import { AuthGuard } from './guards/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdMenuModule,
    MdSnackBarModule,
    MdToolbarModule,
    RouterModule
  ],
  declarations: [
    AppMenuComponent,
    BookListComponent,
    CepValidatorDirective,
    DividerComponent,
    EmailValidatorDirective,
    NavbarComponent,
    PasswordToggleComponent,
    RatingComponent,
    ResultViewerComponent,
    TelValidatorDirective,
    SearchBarComponent,
    VerifyAccountComponent
  ],
  providers: [
    AuthGuard,
    AuthService,
    BookService,
    LoaderService,
    StorageService,
    TransactionService
  ],
  exports: [
    AppMenuComponent,
    BookListComponent,
    CepValidatorDirective,
    DividerComponent,
    EmailValidatorDirective,
    NavbarComponent,
    PasswordToggleComponent,
    RatingComponent,
    ResultViewerComponent,
    TelValidatorDirective,
    SearchBarComponent,
    VerifyAccountComponent
  ]
})
export class SharedModule { }
