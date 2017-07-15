import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'app/shared/services/auth.service';

import { User } from 'firebase/app';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['../child.component.scss']
})
export class LoginComponent {
  private service: AuthService;
  private router: Router;

  email: string;
  password: string;

  passwordMode: string;
  passwordType: string;

  constructor(service: AuthService, router: Router) {
    this.service = service;
    this.router = router;

    this.passwordMode = 'visibility';
    this.passwordType = 'password';
  }

  login(): void {
    this.service.login(this.email, this.password).then((user: User) => {
      this.router.navigate(['/home']);
    });
  }

  togglePassword(): void {
    const visibility = 'visibility', visibility_off = 'visibility_off';
    const text = 'text', password = 'password';

    if (this.passwordType === password) {
      this.passwordMode = visibility_off;
      this.passwordType = text;
    } else if (this.passwordType === text) {
      this.passwordMode = visibility;
      this.passwordType = password;
    }
  }
}
