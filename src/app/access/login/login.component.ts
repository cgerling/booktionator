import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'app/shared/services/auth.service';

import { User } from 'firebase/app';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string;
  password: string;

  passwordMode: string = 'visibility';
  passwordType: string = 'password';

  constructor(private service: AuthService, private router: Router) { }

  login(): void {
    this.service.login(this.email, this.password).then((user: User) => {
      this.router.navigate(['/home']);
    });
  }

  togglePassword(): void {
    let visibility = 'visibility', visibility_off = 'visibility_off';
    let text = 'text', password = 'password';

    if (this.passwordType === password) {
      this.passwordMode = visibility_off;
      this.passwordType = text;
    } else if (this.passwordType === text) {
      this.passwordMode = visibility;
      this.passwordType = password;
    }
  }
}
