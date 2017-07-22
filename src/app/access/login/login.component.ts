import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'app/shared/services/auth.service';

import { User } from 'firebase/app';
import { PasswordToggleComponent } from 'app/shared/components/password-toggle/password-toggle.component';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['../child.component.scss', './login.component.scss']
})
export class LoginComponent {
  private service: AuthService;
  private router: Router;

  @ViewChild(PasswordToggleComponent)
  toggler: PasswordToggleComponent;

  email: string;
  password: string;
  errorMessage: string;
  error: boolean;

  constructor(service: AuthService, router: Router) {
    this.service = service;
    this.router = router;
  }

  login(): void {
    this.error = false;
    this.service.login(this.email, this.password).then((user: User) => {
      this.router.navigate(['/home']);
    }).catch(error => {
      this.error = true;
      this.errorMessage = 'Email ou senha inválidos.';
    });
  }
}
