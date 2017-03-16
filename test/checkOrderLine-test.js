'use strict';

const { assert: {isArray} } = require("chai");
const { checkOrderLine } = require("../lib/checkOrderLine.js");

describe('checkOrderLine', () => {
  it('should return an array', () => {
    isArray(checkOrderLine());
  });
});
