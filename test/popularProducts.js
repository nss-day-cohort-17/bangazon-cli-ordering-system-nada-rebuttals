'use strict';

const { assert: {isArray} } = require("chai");
const { popularProducts } = require("../lib/popularProducts.js");

describe('popularProducts', () => {
  it('should return an array', () => {
    isArray(popularProducts());
  });
});
