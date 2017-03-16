'use strict';

const { assert: {isObject} } = require("chai");
const { mainMenu } = require("../lib/mainMenu.js");

describe('mainMenu', () => {
  it('should return an object', () => {
    isObject(mainMenu());
  });
});
