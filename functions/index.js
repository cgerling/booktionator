'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp(functions.config().firebase);

exports.search = functions.https.onRequest(function search(req, res) {
  cors(req, res, () => {
    let { q, limit } = req.query;
    if (!q) res.status(400).json("Search term parameter is not optional");
    if (!limit) limit = 12;

    admin.database().ref('/books').limitToFirst(parseInt(limit)).once('value').then(function data(snapshot) {
      const result = filterByName(q, toArray(snapshot.val()));
      res.json({ term: q, result: result });
    }).catch(function onError(error) {
      res.json(error);
    });
  });
});

function toArray(val) {
  const array = [];
  for (const key in val) {
    array.push(Object.assign({ uid: key }, val[key]));
  }

  return array;
}

function filterByName(term = '', values = []) {
  const exp = searchExpression(term);
  return values.filter(n => exp.test(n.title));
}

function searchExpression(val = '') {
  const exp = val.replace(/ /g, '.*');
  return new RegExp(`.*${exp}.*`, 'gi')
}
