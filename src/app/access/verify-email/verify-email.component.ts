import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { LoaderService } from 'app/shared/services/loader.service';
import { AuthService } from 'app/shared/services/auth.service';

@Component({
  selector: 'verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['../child.component.scss', './verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  private activatedRoute: ActivatedRoute;
  private auth: AuthService;
  private loader: LoaderService;

  title: string;
  message: string;

  constructor(activatedRoute: ActivatedRoute, auth: AuthService, loader: LoaderService) {
    this.activatedRoute = activatedRoute;
    this.auth = auth;
    this.loader = loader;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.auth.verifyEmail(params.oobCode).then((resp) => {
        this.title = 'Email verificado!';
        this.message = 'Verificação concluída com sucesso.';
      }).catch((error) => {
        this.title = 'Ocorreu um erro!';
        this.message = 'Por favor solicite uma nova verificação.';
      });
    });
  }
}
