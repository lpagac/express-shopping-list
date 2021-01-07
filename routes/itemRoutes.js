"use strict";

const express = require("express");

const { items } = require("../fakeDb.js");
const { NotFoundError, BadRequestError } = require('../expressErrors.js');
const router = new express.Router();
const middleware = require('../middleware.js');

/** GET /users: get list of items */
router.get("/", function (req, res, next) {
  return res.status(200).json({items});
});

/** POST an item to DB, return JSON of item add
 * POST body - {name: "popsicle", price: 1.45} =>
 * response body - {added: {name: "popsicle", price: 1.45}}
 * */

router.post('/', function(req, res, next) {
  if (!(req.body.name && req.body.price)) {
    throw new BadRequestError();
  }
  items.push({"name":req.body.name, "price":req.body.price});
  return res.status(201).json({added: items[items.length - 1]});
});

/** GET indivdual item returns JSON
 * {name: "popsicle", "price": 1.45}
 */
router.get('/:name', middleware.invalidItem, function(req, res, next) {
  let item = items.find(item => item['name'] === req.params.name);
  return res.status(200).json(item);
});

/** PATCH /items/:name: accept JSON body, modify item, return it:
 * {updated: {name: "new popsicle", price: 2.45}}
 */
router.patch('/:name', middleware.invalidItem, function(req, res, next) {
  let item = items.find(item => item['name'] === req.params.name);
  item['name'] = req.body.name || item['name'];
  item['price'] = req.body.price || item['price'];

  return res.status(200).json({updated: item});
})

/** DELETE /items/:name: delete item:
 * {message: "Deleted"}
 */
router.delete("/:name", middleware.invalidItem, function (req, res, next) {
  let item = items.find(item => item['name'] === req.params.name);
  let itemIndex = items.indexOf(item);
  items.splice(itemIndex, 1);

  return res.json({ message: "Deleted" });
});

module.exports = router;
