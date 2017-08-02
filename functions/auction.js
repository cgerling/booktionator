'use strict';

let functions, firebase, cors;

const utils = require('./utils');

module.exports = function exportModule(functions, firebase, cors) {
  const bid = functions.https.onRequest(function onBuy(req, res) {
    cors(req, res, () => {

    });
  });

  return {
    bid
  };
}
