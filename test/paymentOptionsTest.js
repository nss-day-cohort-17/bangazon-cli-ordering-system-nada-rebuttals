'use strict';

const { assert: {isArray} } = require("chai");
const { paymentOptions } = require("../lib/paymentOptions.js");

describe('paymentOptions', () => {
  it('should return an array', () => {
    isArray(paymentOptions());
  });
});
