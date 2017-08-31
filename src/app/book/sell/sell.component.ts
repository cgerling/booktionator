import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'firebase/app';

import { AuthService } from '../../shared/services/auth.service';

import { AngularFireDatabase } from 'angularfire2/database';

import { Bid } from 'types/bid';
import { Offer } from 'types/offer';
import { Auction } from 'types/auction';

@Component({
  selector: 'sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent {
  private router: Router;

  private auth: AuthService;

  private dbFirebase: AngularFireDatabase;

  private bid: Bid;
  private offer: Offer;
  private auction: Auction;

  private bookKey: string;
  private auctionKey: string;
  private currentUser: User;

  selectedModality: string;
  modalities: string[];
  exchange: string;
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
    this.auth.currentUser().then(user => {
      this.currentUser = user;
    });
    let _url = this.router.url.split('/');
    this.bookKey = _url[_url.length - 1];
  }

  sell(): void {
    this.offer = new Offer(this.currentUser.uid, this.exchange, this.selectedModality);
    if (this.selectedModality === this.modalities[3]) {
      this.createAuction();
      this.dbFirebase.object(`books/${this.bookKey}/offers/${this.auctionKey}`).set(this.offer);
    } else {
      this.dbFirebase.list(`books/${this.bookKey}/offers`).push(this.offer);
    }
  }

  private createAuction(): void {
    let self = this;
    this.auction = new Auction(this.currentUser.uid, new Date(), this.due);
    this.bid = new Bid(new Date(), this.exchange);
    this.dbFirebase.list('auctions').push({
      ...this.auction,
      due: this.auction.due.toJSON()
    }).then(auction => {
      self.auctionKey = auction.key;
    });
    this.dbFirebase.list(`auctions/${self.auctionKey}/bids`).push(this.bid);
  }

}
