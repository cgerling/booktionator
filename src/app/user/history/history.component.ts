import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'firebase/app';

import { AuthService } from 'app/shared/services/auth.service';

import { AngularFireDatabase } from 'angularfire2/database';

import { Transaction } from '../../../types/transaction';

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})

export class HistoryComponent implements OnInit {
  private auth: AuthService;

  private router: Router;

  private dbFirebase: AngularFireDatabase;

  exchanges: Transaction[];
  buys: Transaction[];

  constructor(auth: AuthService, router: Router, db: AngularFireDatabase) {
    this.router = router;
    this.dbFirebase = db;
    this.auth = auth;

    this.exchanges = [];
    this.buys = [];
  }

  ngOnInit() {
    this.auth.getUserInformation().then(user => {
      this.dbFirebase.list('transactions', {
        query: {
          orderByChild: 'from',
          equalTo: user.uid,
          limitToFirst: 15
        }
      }).subscribe(values => {
        this.exchanges = values.map(opt => new Transaction(opt.$key, opt.from, opt.to, opt.beginAt, opt.endAt, opt.product, opt.exchange));
      });

      this.dbFirebase.list('transactions', {
        query: {
          orderByChild: 'to',
          equalTo: user.uid,
          limitToFirst: 15

        }
      }).subscribe(values => {
        this.buys = values.map(opt => new Transaction(opt.$key, opt.from, opt.to, opt.beginAt, opt.endAt, opt.product, opt.exchange));
      });
    });
  }

}
