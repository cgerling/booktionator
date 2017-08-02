'use strict';

const utils = require('./utils');

module.exports = function exportModule(functions, firebase, cors) {
  const order = functions.https.onRequest(function onBuy(req, res) {
    cors(req, res, () => {
      let { offer, book, user, modality } = req.body;
      if (utils.isEmpty(offer)) res.json('Offer field is not optional.');
      if (utils.isEmpty(book)) res.json('Book field is not optional.');
      if (utils.isEmpty(user)) res.json('User field is not optional.');

      firebase.database().ref(`/transactions`).once('value').then(snapshot => {
        const transactions = utils.toArray(snapshot.val());
        const exists = transactions.filter(trans => trans.from == user && trans.modality == modality && trans.product == book);

        if (exists.length > 0) res.json('The user already own this product.');
      });

      firebase.database().ref(`/books/${book}/offers/${offer}`).once('value')
        .then(function dataArrived(snapshot) {
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

  const rate = functions.https.onRequest(function onRate(req, res) {
    cors(req, res, () => {
      const { book, note } = req.body;

      let total_buyers = 0;
      firebase.database().ref(`/transactions`)
        .orderByChild('product').equalTo(book).once('value').then(snapshot => {
          //Get number of buys
        });

      firebase.database().ref(`/books/${book}`).once('value').then(snapshot => {
        const book = snapshot.val();
        b
      });
    });
  });

  return {
    order,
    rate
  }
}
