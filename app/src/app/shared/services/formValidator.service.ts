import { NgForm } from '@angular/forms';

export class FormValidator {
  form: NgForm;

  private _messages: { [field: string]: { [key: string]: string } };
  private _error: { [field: string]: string };

  get messages(): { [field: string]: { [key: string]: string } } {
    return this._messages;
  }

  get errors(): { [field: string]: string } {
    return this._error;
  }

  constructor(form: NgForm, messages: { [field: string]: { [key: string]: string } }, error: { [field: string]: string }) {
    this.form = form;
    this._messages = messages;
    this._error = error;
  }

  updateForm(form: NgForm): void {
    if (form === this.form) { return; }

    this.form = form;
    if (this.form) {
      this.form.valueChanges.subscribe(data => this.onValueChanged(data));
    }
  }

  private onValueChanged(data?: any): void {
    if (!this.form) { return; }
    const { form } = this.form;

    for (const field in this.errors) {
      this.errors[field] = '';

      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.messages[field];

        for (const key in control.errors) {
          this.errors[field] += messages[key] || '';
        }
      }
    }
  }
}
