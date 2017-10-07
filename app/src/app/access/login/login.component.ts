import { Component, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/services/auth.service';

import { User, FirebaseError } from 'firebase/app';
import { PasswordToggleComponent } from '../../shared/components/password-toggle/password-toggle.component';

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
    }).catch((error: FirebaseError) => {
      this.error = true;
      switch (error.code) {
        case 'auth/network-request-failed':
          this.errorMessage = 'Não foi possível completar a operação. Por favor verifique a sua conexão.';
          break;
        case 'auth/user-disabled':
          this.errorMessage = 'Esse usuário foi desabilitado.';
          break;
        case 'auth/web-storage-unsupported':
          this.errorMessage = 'Web Storage desabilitado ou o navegador não suporta este recurso.';
          break;
        case 'auth/too-many-requests':
          this.errorMessage = 'Limite de tentavias excedido, tente novamente mais tarde.';
          break;
        case 'auth/user-not-found':
          this.errorMessage = 'Email ou senha inválidas.';
          break;
        default:
          this.errorMessage = 'Ocorreu um erro inesperado, tente novamente.';
      }
    });
  }
}
