'use strict';

function filterByName(term = '', values = []) {
  const exp = searchExpression(term);
  return values.filter(n => exp.test(n.title));
}

function searchExpression(val = '') {
  const exp = val.replace(/ /g, '.*');
  return new RegExp(`.*${exp}.*`, 'gi')
}

module.exports = function createModule(functions, firebase, cors) {
  const search = functions.https.onRequest(function onSearch(req, res) {
    cors(req, res, () => {
      let { q, limit } = req.query;
      if (!q) res.status(400).json("Search term parameter is not optional");
      if (!limit) limit = 12;

      firebase.database().ref('/books').limitToFirst(parseInt(limit)).once('value').then(function data(snapshot) {
        const result = filterByName(q, toArray(snapshot.val()));
        res.json({ term: q, result: result });
      }).catch(function onError(error) {
        res.json(error);
      });
    });
  });

  return {
    search
  };
}
