'use strict';

const utils = require('./utils');

module.exports = function exportModule(functions, firebase, cors) {
  const bid = functions.https.onRequest(function onBuy(req, res) {
    cors(req, res, () => {
      const { auction, bid, user } = req.body;
      if (utils.isEmpty(auction)) res.json('Auction parameter is not optional');
      if (utils.isEmpty(bid)) res.json('Bid value is not optional');
      if (utils.isEmpty(user)) res.json('User identifier is not optional');

      const auctionRef = firebase.database().ref(`/auctions/${auction}`);
      auctionRef.once('value').then(snapshot => {
        const auction = snapshot.val();
        if (new Date() > auction.due) res.json("Auction closed.");
      });

      auctionRef.child('bids').once('value').then(snapshot => {
        const bids = utils.toArray(snapshot.val());
        const biggestBid = utils.maxValue(bids, (a, b) => b.value - a.value);
        if (bid <= biggestBid) res.json('There is already a bigger or equivalent bid.');
      });

      firebase.database().ref(`/auctions/${auction}/bids/${user}`).set({
        value: bid,
        at: new Date()
      });
    });
  });

  return {
    bid
  };
}
