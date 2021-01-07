"use strict";
const { BadRequestError } = require('./expressErrors.js');
const {items} = require('./fakeDb.js');

function invalidItem(req, res, next) {
  // console.log("req.params.name: ", `|${req.params.name}=potato|`);
  // for (let i of items){
  //   console.log("item name: ",i.name);
  // }
  if (items.some(item => item['name'] === req.params.name)) {
    // console.log("Tru.")
    return next();
  } else {
    throw new BadRequestError('Item not found, please enter valid item in url');
  }
}
module.exports = {invalidItem};
