import { Component } from '@angular/core';

import { AuthService } from 'app/shared/services/auth.service';
import { LoaderService } from 'app/shared/services/loader.service';

import { MdSnackBar } from '@angular/material';

import { Email } from 'types/email';

@Component({
  selector: 'request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['../child.component.scss']
})
export class RequestPasswordComponent {
  email: string;
  message: string;

  private auth: AuthService;
  private loader: LoaderService;
  private snackbar: MdSnackBar;

  constructor(auth: AuthService, loader: LoaderService, snackbar: MdSnackBar) {
    this.auth = auth;
    this.loader = loader;
    this.snackbar = snackbar;
  }

  send(): void {
    if (!this.valid()) return;

    this.loader.update(true);

    let self = this;
    let email = new Email(this.email);

    this.auth.requestPasswordReset(email).then(function resetEmailSend() {
      self.loader.update(false);
      self.snackbar.open('Email send!', null, {
        duration: 2000
      });
    }, function error(error) {
      self.loader.update(false);
      self.snackbar.open(error.message, null, {
        duration: 3500
      });
    });
  }

  private valid(): boolean {
    this.message = '';

    let email = Email.validate(this.email);

    if (!email) {
      this.message = 'Invalid email format';
    }

    return email;
  }
}
