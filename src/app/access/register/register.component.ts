import { Component, ViewChild } from '@angular/core';
import { PasswordToggleComponent } from 'app/shared/components/password-toggle/password-toggle.component';
import { AuthService } from 'app/shared/services/auth.service';
import { Email } from "types/email";
import { PostalCode } from "types/postalcode";
import { Phone } from "types/phone";

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['../child.component.scss']
})
export class RegisterComponent {
  @ViewChild(PasswordToggleComponent)
  toggler: PasswordToggleComponent;

  name: string;
  email: string;
  password: string;
  postalcode: string;
  phone: string;

  errors: { [input: string]: string };

  private service: AuthService;

  constructor(service: AuthService) {
    this.service = service;
    this.errors = {};
  }

  register(): void {
    if (!this.validate()) return;

    let email = new Email(this.email);
    let postalcode = new PostalCode(this.postalcode);
    let phone = new Phone(this.phone);

    this.service.register(this.name, email, this.password, postalcode, phone);
  }

  private validate(): boolean {
    this.errors = {};
    let name = this.name !== '';
    let email = Email.validate(this.email);
    let password = this.password.length > 6;
    let postalcode = PostalCode.validate(this.postalcode);
    let phone = Phone.validate(this.phone);

    if (!email) {
      this.errors['email'] = 'Invalid format';
    }

    if (!password) {
      this.errors['password'] = 'Must have at least 6 characters';
    }

    if (!postalcode) {
      this.errors['postalcode'] = 'Invalid format';
    }

    if (!phone) {
      this.errors['phone'] = 'Invalid format';
    }

    return name && email && password && postalcode && phone;
  }
}
