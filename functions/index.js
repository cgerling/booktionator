'use strict';

const firebase_functions = require('firebase-functions');
const firebase_admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

const utils = require('./utils');

firebase_admin.initializeApp(firebase_functions.config().firebase);

const dependencies = {
  firebase_functions,
  firebase_admin,
  cors
};

const search = utils.functionInjected('./search', dependencies);
const buy = utils.functionInjected('./buy', dependencies);
const bid = utils.functionInjected('./auction', dependencies);

exports.search = search.search;
exports.buy = buy.buy;
exports.bid = bid.bid;
