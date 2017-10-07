import { Directive, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, Validators, ValidatorFn } from '@angular/forms';

export function telValidator(): ValidatorFn {
  const telRegexp = /\d{9}/;
  return (control: AbstractControl): { [key: string]: any } => {
    const tel = control.value;
    return telRegexp.test(tel) ? null : { 'pattern': { tel } };
  };
}

@Directive({
  selector: 'input[type=tel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: TelValidatorDirective, multi: true }]
})
export class TelValidatorDirective implements Validator {
  private pattern: RegExp;
  private validatorFn: ValidatorFn;

  constructor() {
    this.validatorFn = telValidator();
  }

  validate(c: AbstractControl): { [key: string]: any; } {
    return this.validatorFn(c);
  }
}
