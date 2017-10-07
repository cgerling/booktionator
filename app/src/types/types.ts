export interface Bid {
  at: Date;
  value: string;
}

export interface Auction {
  uid: string;
  author: string;
  at: Date;
  due: Date;
  bids: Bid[]
}

export interface Book {
  uid: string;
  title: string;
  description: string;
  author: string;
  date: Date;
  score: number;
  image: string;
  publisher: string;
}

export interface Offer {
  uid: string;
  author: string;
  exchange: string;
  modality: string;
}

export interface Transaction {
  uid: string;
  from: string;
  to: string;
  beginAt: Date;
  endAt: Date;
  product: string;
  exchange: string | number;
}

export interface User {
  name: string;
  phone: string;
  postalcode: string;
}
