import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'firebase/app';

import { AuthService } from 'app/shared/services/auth.service';

import { AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent {
  private router: Router;
  
  private auth: AuthService;
  
  private dbFirebase: AngularFireDatabase;
  
  private bookKey: string;
  auctionKey: string;
  currentUser: any;
  selectedModality: String;
  modalities: String[];
  exchange: String;
  due: Date;
  minDate: Date;
  maxDate: Date;
  
  constructor(router: Router, auth: AuthService, db: AngularFireDatabase) {
    this.router = router;
    this.auth = auth;
    this.dbFirebase = db;
    this.modalities = ['Venda', 'Troca', 'Leilão'];
    this.exchange = '';
    this.selectedModality = '';
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.maxDate.setDate(this.maxDate.getDate() + 31);
  }
  
  ngOnInit(): void {
    this.currentUser = this.auth.currentUser().then(user => {
      this.currentUser = user;
    });
    let _url = this.router.url.split('/');
    this.bookKey = _url[_url.length - 1];
  }
  
  sell(): void {
    let self = this;
    if(this.selectedModality === this.modalities[3]) {
      this.createAuction();
      this.dbFirebase.object
      (`books/${this.bookKey}/offers/${this.auctionKey}`).set({
        authorUid: self.currentUser.uid,
        exchange: self.exchange,
        modality: self.selectedModality
      });
      return;
    }
    this.dbFirebase.list(`books/${this.bookKey}/offers`).push({
      authorUid: self.currentUser.uid,
      exchange: self.exchange,
      modality: self.selectedModality
    });
  }
  
  private createAuction(): void {
    let self = this;
    this.dbFirebase.list('auctions').push({
      author: self.currentUser.uid,
      createdAt: new Date(),
      due: self.due
    }).then(auction => {
      self.auctionKey = auction.key;
    });
    this.dbFirebase.list(`auctions/${self.auctionKey}/bids`).
    push({
      at: new Date(),
      value: self.exchange
    });
  }
  
}
