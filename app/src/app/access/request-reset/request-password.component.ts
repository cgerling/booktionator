import { AfterViewChecked, Component, ViewChild, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../shared/services/auth.service';
import { FormValidator } from '../../shared/services/formValidator.service';
import { LoaderService } from '../../shared/services/loader.service';

import { MdSnackBar } from '@angular/material';

import { Email } from 'types/email';

@Component({
  selector: 'request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['../child.component.scss']
})
export class RequestPasswordComponent implements AfterViewChecked {
  email: string;
  message: string;

  @ViewChild('requestResetForm')
  currentForm: NgForm;

  validator: FormValidator;

  formError = {
    'email': ''
  };

  validationMessages = {
    'email': {
      'required': 'Campo obrigatório',
      'pattern': 'Email inválido'
    }
  };

  private auth: AuthService;
  private loader: LoaderService;
  private snackbar: MdSnackBar;

  constructor(auth: AuthService, snackbar: MdSnackBar) {
    this.auth = auth;
    this.loader = LoaderService.getInstance();
    this.snackbar = snackbar;
    this.validator = new FormValidator(this.currentForm, this.validationMessages, this.formError);
  }

  ngAfterViewChecked(): void {
    this.validator.updateForm(this.currentForm);
  }

  send(): void {
    if (!this.currentForm.valid) return;
    this.loader.setState(true);

    let self = this;
    let email = new Email(this.email);

    this.auth.requestPasswordReset(email).then(function resetEmailSend() {
      self.loader.setState(false);
      self.snackbar.open('Email send!', null, {
        duration: 2000
      });
    }, function error(error) {
      self.loader.setState(false);
      self.snackbar.open(error.message, null, {
        duration: 3500
      });
    });
  }
}
