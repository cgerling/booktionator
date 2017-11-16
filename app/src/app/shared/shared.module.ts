import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatInputModule, MatMenuModule, MatToolbarModule, MatCardModule, MatSnackBarModule, MatProgressBarModule } from '@angular/material';
import { HttpModule } from '@angular/http';

import { AppMenuComponent } from './components/app-menu/app-menu.component';
import { PasswordToggleComponent } from './components/password-toggle/password-toggle.component';
import { DividerComponent } from './components/divider/divider.component';
import { ResultViewerComponent } from './components/result-viewer/result-viewer.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { VerifyAccountComponent } from './components/verify-account/verify-account.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RateComponent } from './components/rate/rate.component';
import { InstructionsComponent } from './components/instructions/instructions.component';
import { LoaderComponent } from 'app/shared/components/loader/loader.component';

import { EmailValidatorDirective } from './directives/emailValidator.directive';
import { TelValidatorDirective } from './directives/telValidator.directive';
import { CepValidatorDirective } from './directives/cepValidator.directive';

import { AuthService } from './services/auth.service';
import { BookService } from './services/book.service';
import { GoogleBooks } from './services/googleBooks.service';
import { LoaderService } from './services/loader.service';
import { TransactionService } from './services/transaction.service'

import { AuthGuard } from './guards/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatToolbarModule,
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
    RateComponent,
    ResultViewerComponent,
    TelValidatorDirective,
    SearchBarComponent,
    VerifyAccountComponent,
    InstructionsComponent,
    LoaderComponent
  ],
  providers: [
    AuthGuard,
    AuthService,
    GoogleBooks,
    BookService,
    LoaderService,
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
    RateComponent,
    ResultViewerComponent,
    TelValidatorDirective,
    SearchBarComponent,
    VerifyAccountComponent,
    InstructionsComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
