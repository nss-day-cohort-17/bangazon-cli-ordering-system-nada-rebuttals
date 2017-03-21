'use strict';

const { assert: {isObject, isFunction} } = require("chai");
const { mainMenuPrompt } = require("../lib/mainMenu.js");

describe('mainMenu', () => {
  describe('mainMenuPrompt', () => {
    it('should be a function', () => {
      isFunction(mainMenuPrompt);
    });
  })
});
