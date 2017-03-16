'use strict';

const { assert: { isArray } } = require("chai");
const { activeCust } = require("../lib/activeCust");


describe('activeCust', () => {
  it('should return an object', () => {
    isArray(activeCust());
  });
})
