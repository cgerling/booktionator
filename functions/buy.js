'use strict';

const utils = require('./utils');

module.exports = function exportModule(functions, firebase, cors) {
  // Comprar: https://booktionator.firebaseapp.com/api/buy?offer=OFFER_ID&book=BOOK_ID&user=USER_ID&modality=MODALITY
  // Dar lance: https://booktionator.firebaseapp.com/api/bid?auction=AUCTION_ID&user=USER_ID&bidValue=VALUE
  const buy = functions.https.onRequest(function onBuy(req, res) {
    cors(req, res, () => {
      let { offer, book, user, modality } = req.body;
      if (utils.isEmpty(offer)) res.json('Offer field is not optional.');
      if (utils.isEmpty(book)) res.json('Book field is not optional.');
      if (utils.isEmpty(user)) res.json('User field is not optional.');

      //TODO: verify if the offer was not already "used"

      firebase.database().ref(`/books/${book}/offers/${offer}`).once('value').then(function dataArrived(snapshot) {
        const offer = snapshot.val(), now = new Date();
        const transaction = {
          from: offer.author,
          to: user,
          beginAt: now,
          endAt: now,
          product: book,
          modality: modality,
          exhange: offer.exchange
        };

        firebase.database().ref(`/transactions`).push(transaction);

        res.json(offer);
      });
    });
  });

  return {
    buy
  }
}
