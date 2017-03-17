'use strict';

const { assert: {isArray} } = require("chai");
const { listProducts } = require("../lib/products.js");

describe('listProducts', () => {
  it('should return an array', () => {
    return listProducts()
    .then((data) => {
      isArray(data);
    })
  });
});
