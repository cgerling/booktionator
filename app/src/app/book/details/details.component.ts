import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from 'firebase/app';

import { AngularFireDatabase } from 'angularfire2/database';

import { TransactionService } from '../../shared/services/transaction.service';
import { AuthService } from '../../shared/services/auth.service'

import { Bid } from 'types/bid';
import { Book } from 'types/book';
import { Offer } from 'types/offer';
import { Auction } from 'types/auction';

@Component({
  selector: 'book-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  private router: Router;
  private activated: ActivatedRoute;
  private dbFirebase: AngularFireDatabase;
  private auth: AuthService;
  private transaction: TransactionService;

  private user: User;
  private auction: Auction;
  private bookKey: string;
  book: Book;
  offers: Offer[];

  constructor(router: Router, activated: ActivatedRoute, db: AngularFireDatabase, tr: TransactionService, auth: AuthService) {
    this.router = router;
    this.auth = auth;
    this.dbFirebase = db;
    this.transaction = tr;
    this.activated = activated;

    this.book = new Book('', '', '', '', new Date(), '', 0, '');
  }

  ngOnInit(): void {
    let self = this;

    this.activated.params.subscribe((params) => {
      this.bookKey = params.uid;

      this.auth.currentUser().then((user) => {
        this.user = user;
      });

      this.dbFirebase.object(`books/${this.bookKey}`).valueChanges().subscribe(value => {
        self.book = new Book(value['$key'], value['title'], value['description'],
          value['author'], new Date(value['date']), value['publisher'], value['score'], value['image']);
      });

      this.dbFirebase.list(`books/${this.bookKey}/offers`).valueChanges().subscribe(values => {
        self.offers = values.map(value => new Offer(value['authorUid'], value['exchange'], value['modality'], value['$key']));
        for (let offer of self.offers) {
          if (offer.modality === 'Leilão') {
            self.highestBid(offer.uid, (highestBid) => {
              offer.exchange = (parseFloat(highestBid) * 1.05).toString();
            });
          }
        }
      });
    });
  }

  buy(offerUid: string) {
    this.transaction.buy(offerUid, this.book.uid, this.user.uid);
  }

  bid(offerUid: string, exchange: string) {
    this.dbFirebase.object(`auctions/${offerUid}/bids/${this.user.uid}`).
      set(new Bid(new Date(), exchange));
  }

  private highestBid(offerKey: string, useValue: Function) {
    let bids: Bid[];
    this.dbFirebase.list(`auctions/${offerKey}/bids`, (ref) => {
      return ref.orderByChild('value').limitToLast(1);
    }).valueChanges().subscribe(values => {
      bids = values.map(value => new Bid(value['at'], value['value']));

      useValue(bids[bids.length - 1]);
    });
  }
}
