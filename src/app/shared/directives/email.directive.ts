import { Directive, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, Validators, ValidatorFn } from '@angular/forms';

export function emailValidator(): ValidatorFn {
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return (control: AbstractControl): { [key: string]: any } => {
    const email = control.value;
    return emailRegexp.test(email) ? null : { 'pattern': { email } };
  };
}

@Directive({
  selector: 'input[type=email]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true }]
})
export class EmailValidatorDirective implements Validator {
  private pattern: RegExp;
  private validatorFn: ValidatorFn;

  constructor() {
    this.validatorFn = emailValidator();
  }

  validate(c: AbstractControl): { [key: string]: any; } {
    return this.validatorFn(c);
  }
}
