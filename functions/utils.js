'use strict';

const toArray = function toArray(val) {
  const array = [];
  for (const key in val) {
    array.push(Object.assign({ uid: key }, val[key]));
  }

  return array;
}

const isEmpty = function isEmpty(value) {
  return !value || value.trim() === '';
}

const functionInjected = function functionInjected(path, { firebase_functions, firebase_admin, cors }) {
  return require(path)(firebase_functions, firebase_admin, cors);
}

const maxValue = function maxValue(array = [], comparator) {
  return array.sort(comparator)[0];
}

module.exports = {
  toArray,
  isEmpty,
  functionInjected,
  maxValue
}
