import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'app/shared/services/auth.service';

import { User } from 'firebase/app';
import { PasswordToggleComponent } from 'app/shared/components/password-toggle/password-toggle.component';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['../child.component.scss']
})
export class LoginComponent {
  private service: AuthService;
  private router: Router;

  @ViewChild(PasswordToggleComponent)
  toggler: PasswordToggleComponent;

  email: string;
  password: string;

  constructor(service: AuthService, router: Router) {
    this.service = service;
    this.router = router;
  }

  login(): void {
    this.service.login(this.email, this.password).then((user: User) => {
      this.router.navigate(['/home']);
    });
  }
}
