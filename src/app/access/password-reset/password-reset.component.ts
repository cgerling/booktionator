import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService } from 'app/shared/services/auth.service';
import { PasswordToggleComponent } from 'app/shared/components/password-toggle/password-toggle.component';

@Component({
  selector: 'password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['../child.component.scss']
})
export class PasswordResetComponent implements OnInit {
  @ViewChild(PasswordToggleComponent)
  toggler: PasswordToggleComponent;

  private oobCode: string;

  email: string;
  newPassword: string;
  validCode: boolean;

  private activatedRoute: ActivatedRoute;
  private auth: AuthService;
  private router: Router;

  constructor(activatedRoute: ActivatedRoute, auth: AuthService, router: Router) {
    this.activatedRoute = activatedRoute;
    this.auth = auth;
    this.router = router;

    this.validCode = true;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.oobCode = params.oobCode;
      this.auth.verifyPasswordResetCode(this.oobCode)
        .then(email => {
          this.email = email;
        }).catch(error => {
          this.validCode = false;
          console.log(error.message);
        })
    });
  }

  resetPassword(): void {
    this.auth.resetPassword(this.oobCode, this.newPassword).then(() => {
      return this.auth.login(this.email, this.newPassword);
    }).then(() => {
      this.router.navigate(['/home']);
    }).catch(error => {
      console.log(error)
    });
  }
}
