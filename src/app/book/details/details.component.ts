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

      this.dbFirebase.object(`books/${this.bookKey}`).subscribe(value => {
        self.book = new Book(value.$key, value.title, value.description, value.author.name._name, new Date(value.date), value.publisher, value.score, value.imageUrl);
      });

      this.dbFirebase.list(`books/${this.bookKey}/offers`).subscribe(values => {
        self.offers = values.map(value => new Offer(value.authorUid, value.exchange, value.modality, value.$key));
        for (let offer of self.offers) {
          if (offer.modality === 'Leilão') {
            offer.exchange = ""+ ((+self.highestBid(offer.uid))*1.05);
          }
        }
      });
    });
  }

  buy(offerUid: string) {
    this.auth.currentUser().then((user) => this.user = user);
    this.transaction.buy(offerUid, this.book.uid, this.user.uid);
  }
  
  bid(offerUid: string, exchange: string) {
    this.auth.currentUser().then((user) => this.user = user);
    this.dbFirebase.
    object(`auctions/${offerUid}/bids/${this.user.uid}`).
    set(new Bid(new Date(), exchange));
  }

  private highestBid(offerKey: string): string {
    let bids: Bid[];
    this.dbFirebase.list(`auctions/${offerKey}/bids`, {
      query: {
        orderByChild: 'value',
        limitToLast: 1
      }
    }).
      subscribe(values => {
        bids = values.map(value => new Bid(value.at, value.value));
        return bids[bids.length - 1];
      });
    return null;
  }
}
