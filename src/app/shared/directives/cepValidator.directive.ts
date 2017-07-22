import { Directive, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, Validators, ValidatorFn } from '@angular/forms';

export function cepValidator(): ValidatorFn {
  const cepRegexp = /\d{5}-\d{3}/;
  return (control: AbstractControl): { [key: string]: any } => {
    const cep = control.value;
    return cepRegexp.test(cep) ? null : { 'pattern': { cep } };
  };
}

@Directive({
  selector: 'input[type=cep]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CepValidatorDirective, multi: true }]
})
export class CepValidatorDirective implements Validator {
  private pattern: RegExp;
  private validatorFn: ValidatorFn;

  constructor() {
    this.validatorFn = cepValidator();
  }

  validate(c: AbstractControl): { [key: string]: any; } {
    return this.validatorFn(c);
  }
}
