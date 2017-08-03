import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'firebase/app';

import { AuthService } from 'app/shared/services/auth.service';

import { AngularFireDatabase} from 'angularfire2/database';

import { Transaction } from '../../../types/transaction';

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})

export class HistoryComponent implements OnInit{
  private auth: AuthService;

  private router: Router;

  private dbFirebase: AngularFireDatabase;

  private self: User;

  exchange: Transaction[];
  buy: Transaction[];

  constructor(auth: AuthService, router: Router, db: AngularFireDatabase) {
    this.auth = auth;
    this.router = router;
    this.dbFirebase = db;
  }

  ngOnInit(){
    this.auth.getUserInformation().then(user => {
      this.dbFirebase.list('transactions', {
        query: {
          orderByChild: 'from',
          equalTo: user.uid
        }
      }).subscribe(values => {
        this.exchange = values;
      });

      this.dbFirebase.list('transactions', {
        query: {
          orderByChild: 'to',
          equalTo: user.uid
        }
      }).subscribe(values => {
        this.buy = values;
      });
    });
  }

}
