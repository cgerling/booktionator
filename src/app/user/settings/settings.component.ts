import { AfterViewChecked, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { AuthService } from '../../shared/services/auth.service';
import { LoaderService } from '../../shared/services/loader.service';

import { FormValidator } from '../../shared/services/formValidator.service';

import { PasswordToggleComponent } from '../../shared/components/password-toggle/password-toggle.component';

import { Email } from 'types/email';
import { PostalCode } from 'types/postalcode';
import { Phone } from 'types/phone';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements AfterViewChecked, OnInit {
  @ViewChild(PasswordToggleComponent)
  toggler: PasswordToggleComponent;

  @ViewChild(NgForm)
  form: NgForm;

  email: string;
  password: string;
  postalcode: string;
  phone: string;

  validator: FormValidator;
  private messages = {
    'email': {
      'pattern': 'Email inválido'
    },
    'postalcode': {
      'pattern': 'CEP inválido'
    },
    'phone': {
      'pattern': 'Celular inválido'
    },
    'password': {
      'minlength': 'Mínimo de 6 caracteres'
    }
  };
  private error = {
    'email': '',
    'postalcode': '',
    'phone': '',
    'password': ''
  };

  private service: AuthService;
  private snackbar: MdSnackBar;
  private loader: LoaderService;
  private router: Router;

  constructor(service: AuthService, snackbar: MdSnackBar, loaderService: LoaderService, router: Router) {
    this.service = service;
    this.snackbar = snackbar;
    this.loader = loaderService;
    this.router = router;

    this.validator = new FormValidator(this.form, this.messages, this.error);

  }

  ngOnInit(): void {
    this.service.getUserInformation().then((user) => {
      this.email = user['email'];
      this.phone = user['phone'];
      this.postalcode = user['postalcode'];
    });
  }

  ngAfterViewChecked(): void {
    this.validator.updateForm(this.form);
  }

  update(): void {
    if (!this.form.valid) return;

    this.loader.update(true);

    let email = new Email(this.email);
    let phone = new Phone(this.phone);
    let postalcode = new PostalCode(this.postalcode);

    let self = this;

    this.service.updateUser(email, this.password, postalcode, phone).then(function saved(values) {
      console.log(values);
      self.loader.update(false);

      self.reset();
      self.snackbar.open('Alterações salvas!', undefined, {
        duration: 2000
      });
    }, function error(error) {
      self.loader.update(false);

      self.snackbar.open(error.message, undefined, {
        duration: 2000
      });
    });
  }

  private reset(): void {
    this.form.resetForm();
  }
}
