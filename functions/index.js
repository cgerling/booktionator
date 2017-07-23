'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.search = functions.https.onRequest(function search(req, res) {
  const searchTerm = req.query.q;
  admin.database().ref('/books').once('value').then(function data(snapshot) {
    const valAsArray = convertToArray(snapshot.val());
    const result = filterByName(searchTerm, valAsArray);
    res.json({ result: result });
  }).catch(function onError(error) {
    res.json(error);
  });
});

function convertToArray(val) {
  const array = [];
  for (const key in val) {
    array.push(Object.assign({ uid: key }, val[key]));
  }

  return array;
}

function filterByName(term = '', values = []) {
  const search = createSearchExp(term);
  return values.filter(n => search.test(n.title));
}

function createSearchExp(val = '') {
  const exp = val.replace(/ /g, '.*');
  return new RegExp(`.*${exp}.*`, 'gi')
}
