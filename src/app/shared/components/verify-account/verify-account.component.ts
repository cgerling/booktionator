import { Component, OnInit, Inject } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit {
  private auth: AuthService;
  private snackbar: MdSnackBar;

  verified: boolean;
  sent: boolean;
  content: string;

  constructor(auth: AuthService, snackbar: MdSnackBar) {
    this.auth = auth;
    this.snackbar = snackbar;
    this.content = 'Verifique seu email';
    this.sent = false;
  }

  sendEmail(): void {
    this.auth.currentUser().then((user) => {
      user.sendEmailVerification();
      this.snackbar.open('Email enviado!', undefined, {
        duration: 4000
      });
      this.sent = true;
    }).catch((error) => {
      //Tratar erros aqui
    });
  }

  ngOnInit(): void {
    this.auth.currentUser().then((user) => {
      this.verified = user.emailVerified;
    });
  }
}
