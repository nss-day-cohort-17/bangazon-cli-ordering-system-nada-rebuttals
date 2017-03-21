'use strict';

const { assert: { isObject } } = require("chai");
const { activeCust, list } = require("../lib/activeCust");


describe('activeCust', () => {
  it('should return an object', () => {
    return activeCust()
    .then((res)=>{
      console.log(res);
      isObject(res)
    })
  });
})
