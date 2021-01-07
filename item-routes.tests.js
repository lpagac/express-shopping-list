"use strict";
const request = require("supertest");

const app = require("./app");
let { items } = require("./fakeDb");


beforeEach(function () {
  items = [{ "name": "potato", "price": 100 }];
});

afterEach(function () {
  //
});

/** GET /items - returns `{items: [item, ...]}` */

describe("GET /items", function () {
  it("Gets a list of items", async function () {
    const resp = await request(app).get(`/items`);

    expect(resp.body).toEqual({ "items": [{ "name": "potato", "price": 100 }] });
  });
});


/* POST /items - create item from data
 * return item as JSON
 */
describe("POST /items", function () {
  it("Creates a new item", async function () {
    const resp = await request(app)
      .post(`/items`)
      .send({ "name": "socks", "price": 900 });
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual(
      { "added": { "name": "socks", "price": 900 } });
  })

});

/** GET /item/:name - update item; return item as JSON */

describe("GET /items/:name", function () {
  it("Updates a single item", async function () {
    const resp = await request(app)
      .get(`/items/potato`)
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual(
      { "name": "potato", "price": 100 });
  })

  it("Responds with 404 if name invalid", async function () {
    const resp = await request(app).patch(`/items/gimmie404`);
    expect(resp.statusCode).toEqual(404);
  });
});


/** PATCH /item/:name - update item; return item as JSON */

describe("PATCH /items/:name", function () {
  it("Updates a single item", async function () {
    const resp = await request(app)
      .patch(`/items/potato`)
      .send({ "name": "baked potato", "price": 200 });
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual(
      { "updated": { "name": "baked potato", "price": 200 } });
  })

  it("Responds with 404 if name invalid", async function () {
    const resp = await request(app).patch(`/items/not-here`);
    expect(resp.statusCode).toEqual(404);
  });
});

/** DELETE /item/:name - delete item,
 *  return `{message: "Deleted"}` */

describe("DELETE /items/:name", function () {
  it("Deletes a single a item", async function () {
    const resp = await request(app)
      .delete(`/items/${pickles.name}`);
    expect(resp.body).toEqual({ message: "Deleted" });
    expect(db.item.all().length).toEqual(0);
  });
  it("Responds with 404 if name invalid", async function () {
    const resp = await request(app).patch(`/items/whatsGoinOn`);
    expect(resp.statusCode).toEqual(404);
  });
});
