'use strict';

const { assert: {isFunction} } = require("chai");
const { completeOrder } = require("../lib/completeOrder.js");

describe('completeOrder', () => {
  it('should be a function ', () => {
    isFunction(completeOrder);
  })
})
