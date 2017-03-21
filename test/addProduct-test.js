'use strict';

const { assert: {isArray} } = require("chai");
const { addProduct } = require("../lib/addProduct.js");

describe('addProduct', () => {
  it('should return an array', () => {
    isArray(addProduct());
  });
});
