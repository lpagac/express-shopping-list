"use strict";
const { BadRequestError } = require('./expressErrors.js');
const {items} = require('./fakeDb.js');

function invalidItem(req, res, next) {
  if (items.some(item => item['name'] === req.params.name)) {
    return next();
  } else {
    throw new BadRequestError('Item not found, please enter valid item in url');
  }
}
module.exports = {invalidItem};
